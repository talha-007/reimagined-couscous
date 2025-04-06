import { useRef, useState, useEffect } from "react";

import user2 from "../../../assets/users/image2.png";
import user3 from "../../../assets/users/image3.png";
import user4 from "../../../assets/users/image4.png";
import UserToolTip from "./userToolTip";
import SelectionToolTip from "./selectionToolTip";
import { useDispatch, useSelector } from "react-redux";
import { getInfluencers } from "../../../redux/slice/InfluencerSlice";
import { IMAGE_BASEURL } from "../../../redux/services/http-comman";

const BASE_GRID_SIZE = 100;
const BASE_PIXEL_SIZE = 10;

const Grid = ({ Summary, image }) => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const imagesRef = useRef({});

  const [gridSize, setGridSize] = useState(BASE_GRID_SIZE);
  const [pixelSize, setPixelSize] = useState(BASE_PIXEL_SIZE);
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState(null);
  const [endPos, setEndPos] = useState(null);
  // const [users, setUsers] = useState(dummyUsers);
  const [mousePos, setMousePos] = useState(null);
  const [hoveredUser, setHoveredUser] = useState(null);
  const [tooltipPos, setTooltipPos] = useState(null);
  const [selections, setSelections] = useState([]);
  const [hoveredSelection, setHoveredSelection] = useState([]);
  const [saveSelection, setSaveSelection] = useState(false);
  const [tooltipActive, setToolTipActive] = useState(false);
  const [clickedUser, setClickedUser] = useState(null);

  const influencersData = useSelector((s) => s?.influencer?.data?.data);
  // console.log("influencersData", influencersData);
  let users = influencersData?.map((user) => ({ ...user })); // Make objects mutable
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const res = dispatch(getInfluencers());
      // console.log(res);
    } catch (error) {
      console.log("error", error);
    }
  };

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
  }, [
    startPos,
    endPos,
    gridSize,
    pixelSize,
    saveSelection,
    users,
    Summary,
    image,
  ]);
  useEffect(() => {
    if (!Summary) return; // Ensure Summary exists

    Summary.imgElement = null; // Reset previous image
    if (image) {
      Summary.imgElement = null; // Reset previous image
      const img = new Image();
      img.src = image;
      img.onload = () => {
        Summary.imgElement = img;
        drawGrid();
      };
    } else {
      Summary.imgElement = null;
      drawGrid();
    }
  }, [image]);

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

    const width = gridSize * pixelSize;
    const height = gridSize * pixelSize;

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    // Draw grid
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        ctx.strokeStyle = "#000";
        ctx.strokeRect(col * pixelSize, row * pixelSize, pixelSize, pixelSize);
      }
    }

    // Draw users' selections
    users?.forEach((user) => {
      user?.selectedPixels?.forEach(({ startPos, endPos }) => {
        const x = startPos.x;
        const y = startPos.y;
        const width = endPos.x - startPos.x;
        const height = endPos.y - startPos.y;

        const isHovered =
          mousePos &&
          mousePos.x >= x &&
          mousePos.x < x + width &&
          mousePos.y >= y &&
          mousePos.y < y + height;

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

        // Check if image is already loaded
        const userId = user._id; // Use a stable ID if possible
        const imgData = imagesRef.current[userId];

        // If image not loaded yet, load it
        if (!imgData) {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = IMAGE_BASEURL + user.pixelImage;

          img.onload = () => {
            imagesRef.current[userId] = {
              loaded: true,
              element: img,
            };
            drawGrid(); // Redraw once image is loaded
          };

          img.onerror = () => {
            console.error("Failed to load image:", user.pixelImage);
          };

          imagesRef.current[userId] = {
            loaded: false,
            element: img,
          };
        }

        // If loaded, draw image
        if (imgData?.loaded) {
          ctx.drawImage(imgData.element, x, y, width, height);

          if (isHovered) {
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#FFD700";
            ctx.strokeRect(x + 1, y + 1, width - 2, height - 2);
          }
        }

        ctx.restore();
      });
    });

    // Draw summary selection
    if (Summary?.selectedCoordinates) {
      Summary.selectedCoordinates.forEach(({ startPos, endPos }) => {
        const x = Math.min(startPos.x, endPos.x);
        const y = Math.min(startPos.y, endPos.y);
        const width = Math.abs(endPos.x - startPos.x);
        const height = Math.abs(endPos.y - startPos.y);

        if (Summary.imgElement) {
          ctx.drawImage(Summary.imgElement, x, y, width, height);
        } else {
          ctx.fillStyle = "#FEEA9A";
          ctx.fillRect(x, y, width, height);
          ctx.strokeStyle = "#FFF8C5";
          ctx.strokeRect(x, y, width, height);
        }
      });
    }

    // Draw currently selected region (drag area)
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
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cellX = Math.floor(x / pixelSize) * pixelSize;
    const cellY = Math.floor(y / pixelSize) * pixelSize;

    setStartPos({ x: cellX, y: cellY });
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

      setSelections(() => [newSelection]);
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

    // Clamp within canvas bounds
    const clampedX = Math.min(x, gridSize * pixelSize - 1);
    const clampedY = Math.min(y, gridSize * pixelSize - 1);

    // Set actual mouse position for drawing/highlighting
    setMousePos({ x: clampedX, y: clampedY });

    const cellX = Math.floor(clampedX / pixelSize) * pixelSize;
    const cellY = Math.floor(clampedY / pixelSize) * pixelSize;

    if (dragging && startPos) {
      setEndPos({
        x: cellX + pixelSize,
        y: cellY + pixelSize,
      });
      return;
    }

    let foundUser = null;
    let foundSelection = null;

    // Check for hovered user
    for (const user of users) {
      for (const { startPos, endPos } of user.selectedPixels) {
        if (
          clampedX >= startPos.x &&
          clampedX < endPos.x &&
          clampedY >= startPos.y &&
          clampedY < endPos.y
        ) {
          foundUser = user;
          break;
        }
      }
      if (foundUser) break;
    }

    // Check for hovered selection
    for (const { startPos, endPos } of selections) {
      if (
        clampedX >= startPos.x &&
        clampedX < endPos.x &&
        clampedY >= startPos.y &&
        clampedY < endPos.y
      ) {
        foundSelection = { startPos, endPos };
        break;
      }
    }

    if (clickedUser) return;

    // Only update state if there is a change
    if (foundUser !== hoveredUser || foundSelection !== hoveredSelection) {
      setHoveredUser(foundUser);
      setHoveredSelection(foundSelection);
      setTooltipPos(
        foundUser || foundSelection ? { x: e.pageX, y: e.pageY } : null
      );
    }
  };

  const handleClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let foundUser = null;
    let foundSelection = null;

    // Check if click is inside a user image
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

    // If no user image was clicked, check for normal selected pixels
    if (!foundUser) {
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
    }

    if (foundUser) {
      setClickedUser(foundUser); // Store clicked user to keep tooltip persistent
      setHoveredUser(foundUser);
      setHoveredSelection(null);
      setTooltipPos({ x: e.pageX, y: e.pageY });
    } else if (foundSelection) {
      setClickedUser(null);
      setHoveredUser(null);
      setHoveredSelection(foundSelection);
      setTooltipPos({ x: e.pageX, y: e.pageY });
    } else {
      setClickedUser(null);
      setHoveredUser(null);
      setHoveredSelection(null);
      setTooltipPos(null);
    }
  };

  // Attach event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("click", handleClick);
    return () => {
      canvas.removeEventListener("click", handleClick);
    };
  }, [users]);

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
