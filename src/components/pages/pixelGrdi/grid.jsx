import { useRef, useState, useEffect } from "react";

import user2 from "../../../assets/users/image2.png";
import user3 from "../../../assets/users/image3.png";
import user4 from "../../../assets/users/image4.png";
import UserToolTip from "./userToolTip";
import SelectionToolTip from "./selectionToolTip";

const BASE_GRID_SIZE = 100;
const BASE_PIXEL_SIZE = 10;

const dummyUsers = [
  {
    id: 1,
    name: "Alex Carter",
    profilePic: user4,
    bio: "A creative soul blending design, tech, and a dash of humor, Alex shares their journey through design tips and daily life quirks. Coffee lover and weekend adventurer.Socials:",
    fbLink: "@acarterdesigns",
    instaLink: "@alexdesigns",
    tiktokLink: "@alexcarterdesigns",
    selectedPixels: [{ startPos: { x: 40, y: 40 }, endPos: { x: 80, y: 80 } }],
  },
  {
    id: 2,
    name: "Bob",
    profilePic: user2,
    selectedPixels: [
      { startPos: { x: 130, y: 70 }, endPos: { x: 170, y: 90 } },
    ],
  },
  {
    id: 3,
    name: "Bob",
    profilePic: user3,
    selectedPixels: [
      { startPos: { x: 230, y: 90 }, endPos: { x: 270, y: 130 } },
    ],
  },
];

const Grid = ({ Summary }) => {
  const canvasRef = useRef(null);
  const [gridSize, setGridSize] = useState(BASE_GRID_SIZE);
  const [pixelSize, setPixelSize] = useState(BASE_PIXEL_SIZE);
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState(null);
  const [endPos, setEndPos] = useState(null);
  const [users, setUsers] = useState(dummyUsers);
  const [mousePos, setMousePos] = useState(null);
  const [hoveredUser, setHoveredUser] = useState(null);
  const [tooltipPos, setTooltipPos] = useState(null);
  const [selections, setSelections] = useState([]);
  const [hoveredSelection, setHoveredSelection] = useState([]);
  const [saveSelection, setSaveSelection] = useState(false);
  const [tooltipActive, setToolTipActive] = useState(false);
  console.log("selections", selections);

  const [selectionSummary, setSelectionSummary] = useState({
    totalBlocks: 0,
    subtotal: 0,
    pixelsInRow: 0,
    pixelsInColumn: 0,
  });

  useEffect(() => {
    const calculateSelectionMetrics = () => {
      let totalBlocks = 0;
      let pixelsInRow = 0;
      let pixelsInColumn = 0;
      let selectedCoordinates = [];

      selections.forEach(({ startPos, endPos }) => {
        const width = Math.abs(endPos.x - startPos.x);
        const height = Math.abs(endPos.y - startPos.y);

        pixelsInRow += width; // Sum of all row pixels across selections
        pixelsInColumn += height; // Sum of all column pixels across selections

        const blocks = (width / 10) * (height / 10);
        totalBlocks += blocks;
        // Store the coordinates of the selection
        selectedCoordinates.push({ startPos, endPos });
      });

      const subtotal = pixelsInRow * pixelsInColumn; // Each block has 10 pixels, each pixel is $1

      setSelectionSummary({
        totalBlocks,
        pixelsInRow,
        pixelsInColumn,
        subtotal,
        selectedCoordinates, // Include coordinates in the summary
      });
    };

    calculateSelectionMetrics();
  }, [selections]); // Runs whenever selections change

  useEffect(() => {
    updateGridSize();
    window.addEventListener("resize", updateGridSize);
    return () => window.removeEventListener("resize", updateGridSize);
  }, []);

  useEffect(() => {
    drawGrid();
  }, [startPos, endPos, gridSize, pixelSize, users, saveSelection, Summary]);

  const updateGridSize = () => {
    const screenWidth = window.innerWidth;
    let newGridSize = BASE_GRID_SIZE;
    let newPixelSize = BASE_PIXEL_SIZE;

    if (screenWidth < 768) {
      newGridSize = 50;
      newPixelSize = 6;
    } else if (screenWidth < 1024) {
      newGridSize = 80;
      newPixelSize = 8;
    }

    setGridSize(newGridSize);
    setPixelSize(newPixelSize);
  };

  const drawGrid = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    canvas.width = gridSize * pixelSize;
    canvas.height = gridSize * pixelSize;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        ctx.strokeStyle = "#000";
        ctx.strokeRect(col * pixelSize, row * pixelSize, pixelSize, pixelSize);
      }
    }

    dummyUsers.forEach((user) => {
      user.selectedPixels.forEach(({ startPos, endPos }) => {
        const x = startPos.x;
        const y = startPos.y;
        const width = endPos.x - startPos.x;
        const height = endPos.y - startPos.y;

        const isHovered =
          mousePos &&
          mousePos.x >= x &&
          mousePos.x <= x + width &&
          mousePos.y >= y &&
          mousePos.y <= y + height;

        ctx.save();

        if (isHovered) {
          ctx.shadowColor = "#0007";
          ctx.shadowBlur = 25;

          setToolTipActive(true);
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = "#FEEA9AA3";
        ctx.fillRect(x, y, width, height);
        ctx.strokeStyle = "#FFF8C5";
        ctx.strokeRect(x, y, width, height);

        if (!user.imgElement) {
          user.imgElement = new Image();
          user.imgElement.src = user.profilePic;
          user.imgElement.onload = () => {
            drawGrid(); // Redraw grid to show image after loading
          };
        }

        if (user.imgElement.complete) {
          ctx.drawImage(user.imgElement, x, y, width, height);

          if (isHovered) {
            // Draw inner border only when hovered
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#FFD700"; // Gold inner border
            ctx.strokeRect(x + 1, y + 1, width - 2, height - 2);
          }
        }

        ctx.restore(); // Restore state after drawing
        // setToolTipActive(false);
      });
    });
    if (Summary?.selectedCoordinates) {
      Summary.selectedCoordinates?.forEach(({ startPos, endPos }) => {
        const x = Math.min(startPos.x, endPos.x);
        const y = Math.min(startPos.y, endPos.y);
        const width = Math.abs(endPos.x - startPos.x);
        const height = Math.abs(endPos.y - startPos.y);

        ctx.fillStyle = Summary ? "#FEEA9A" : "#FEEA9AA3"; // Highlight color
        ctx.fillRect(x, y, width, height);
        ctx.strokeStyle = "#FFF8C5";
        ctx.strokeRect(x, y, width, height);
      });
    }

    if (startPos && endPos) {
      const x = Math.min(startPos.x, endPos.x);
      const y = Math.min(startPos.y, endPos.y);
      const width = Math.abs(endPos.x - startPos.x);
      const height = Math.abs(endPos.y - startPos.y);

      ctx.fillStyle = saveSelection ? "#FEEA9A" : "#FEEA9AA3";
      ctx.fillRect(x, y, width, height);
      ctx.strokeStyle = "#FFF8C5";
      ctx.strokeRect(x, y, width, height);
    }
  };
  console.log(tooltipActive);

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    console.log("rect", rect);

    const x = Math.floor((e.clientX - rect.left) / pixelSize) * pixelSize;
    const y = Math.floor((e.clientY - rect.top) / pixelSize) * pixelSize;

    setStartPos({ x, y });
    setEndPos(null);
    setDragging(true);
  };

  const handleMouseUp = (e) => {
    if (startPos && endPos) {
      const newSelection = { startPos, endPos };

      // Check if the mouse click is inside any existing selection
      const isInsideSelection = selections.some(({ startPos, endPos }) => {
        return (
          mousePos.x >= startPos.x &&
          mousePos.x <= endPos.x &&
          mousePos.y >= startPos.y &&
          mousePos.y <= endPos.y
        );
      });

      if (isInsideSelection) {
        setDragging(false);
        return; // Do not clear selections if clicking inside
      }

      setSelections((prevSelections) => [...prevSelections, newSelection]);
    } else {
      // Clear selections when clicking outside
      setSelections([]);
    }

    setDragging(false);
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });

    if (dragging && startPos) {
      const newX = Math.floor(x / pixelSize) * pixelSize;
      const newY = Math.floor(y / pixelSize) * pixelSize;

      const width = newX - startPos.x;
      const height = newY - startPos.y;

      setEndPos({
        x: startPos.x + width + pixelSize,
        y: startPos.y + height + pixelSize,
      });

      setHoveredUser(null);
      setHoveredSelection(null);
      setTooltipPos(null);

      return;
    }

    let foundUser = null;
    let foundSelection = null;

    for (const user of users) {
      for (const { startPos, endPos } of user.selectedPixels) {
        if (
          x >= startPos.x &&
          x <= endPos.x &&
          y >= startPos.y &&
          y <= endPos.y
        ) {
          foundUser = user;
          break;
        }
      }
      if (foundUser) break;
    }

    for (const { startPos, endPos } of selections) {
      if (
        x >= startPos.x &&
        x <= endPos.x &&
        y >= startPos.y &&
        y <= endPos.y
      ) {
        foundSelection = { startPos, endPos };
        break;
      }
    }
    if (foundUser) {
      setHoveredUser(foundUser);
      setHoveredSelection(null);
      setTooltipPos({ x: e.pageX, y: e.pageY }); // Use pageX and pageY
    } else if (foundSelection) {
      setHoveredUser(null);
      setHoveredSelection(foundSelection);
      setTooltipPos({ x: e.pageX, y: e.pageY }); // Use pageX and pageY
    } else {
      setHoveredUser(null);
      setHoveredSelection(null);
      setTooltipPos(null);
    }
  };

  const handleSelectPixels = () => {
    localStorage.setItem("selectionSummary", JSON.stringify(selectionSummary));
    setSaveSelection(true);
  };

  const handleClickOutside = (event) => {
    if (!canvasRef.current.contains(event.target)) {
      // Clicked outside canvas → clear everything
      setToolTipActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          border: "1px solid #000",
          display: "block",
          background: "#FFD36366",
          maxWidth: "100%",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      {hoveredUser && tooltipPos && (
        <UserToolTip hoveredUser={hoveredUser} tooltipPos={tooltipPos} />
      )}
      {hoveredSelection && tooltipPos && (
        <SelectionToolTip
          hoveredSelection={hoveredSelection}
          tooltipPos={tooltipPos}
          selectionSummary={selectionSummary}
          handleSelectPixels={handleSelectPixels}
        />
      )}
    </>
  );
};

export default Grid;
