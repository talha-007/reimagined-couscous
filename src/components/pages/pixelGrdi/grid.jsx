import { useRef, useState, useEffect } from "react";
import UserToolTip from "./userToolTip";
import SelectionToolTip from "./selectionToolTip";
import { useDispatch, useSelector } from "react-redux";
import { getInfluencers } from "../../../redux/slice/InfluencerSlice";
import { IMAGE_BASEURL } from "../../../redux/services/http-comman";
import PropTypes from "prop-types";

const BASE_GRID_SIZE = 100;
const BASE_PIXEL_SIZE = 10;

const Grid = ({ Summary, image, selection }) => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const imagesRef = useRef({});
  const tooltipRef = useRef(null);

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
  const [isTooltipPersistent, setIsTooltipPersistent] = useState(false);
  const [selectionTooltipPos, setSelectionTooltipPos] = useState(null);

  const influencersData = useSelector((s) => s?.influencer?.data?.data);
  // console.log("influencersData", influencersData);
  let users = influencersData?.map((user) => ({ ...user })); // Make objects mutable
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      dispatch(getInfluencers());
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
    if (!selection) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cellX = Math.floor(x / pixelSize) * pixelSize;
    const cellY = Math.floor(y / pixelSize) * pixelSize;

    // Check if the starting position overlaps with any user's selected pixels
    for (const user of users) {
      for (const { startPos, endPos } of user.selectedPixels) {
        if (
          cellX >= startPos.x &&
          cellX < endPos.x &&
          cellY >= startPos.y &&
          cellY < endPos.y
        ) {
          // Disable selection if it overlaps
          return;
        }
      }
    }

    setStartPos({ x: cellX, y: cellY });
    setEndPos(null);
    setDragging(true);
  };

  const handleMouseUp = () => {
    if (!selection) return;
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

      // Set tooltip position to the center of the selection, robust to scroll
      const left = Math.min(startPos.x, endPos.x);
      const top = Math.min(startPos.y, endPos.y);
      const width = Math.abs(endPos.x - startPos.x);
      const height = Math.abs(endPos.y - startPos.y);
      const TOOLTIP_WIDTH = 215; // px
      const TOOLTIP_HEIGHT = 180; // px (adjust if needed)
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      // Canvas position relative to the document
      const canvasDocLeft = canvasRect.left + scrollLeft;
      const canvasDocTop = canvasRect.top + scrollTop;
      // Center of selection in canvas coordinates
      let x = canvasDocLeft + left + width / 2;
      let y = canvasDocTop + top + height / 2;
      // Clamp to canvas area (relative to document)
      const canvasRight = canvasDocLeft + canvasRef.current.width;
      const canvasBottom = canvasDocTop + canvasRef.current.height;
      if (x + TOOLTIP_WIDTH > canvasRight) x = canvasRight - TOOLTIP_WIDTH;
      if (y + TOOLTIP_HEIGHT > canvasBottom) y = canvasBottom - TOOLTIP_HEIGHT;
      if (x < canvasDocLeft) x = canvasDocLeft;
      if (y < canvasDocTop) y = canvasDocTop;
      setSelectionTooltipPos({ x, y });
    } else {
      // Clear selections when clicking outside
      setSelections([]);
      setSelectionTooltipPos(null);
    }

    setDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isTooltipPersistent) return;
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
      // Prevent selection from overlapping with any user's selected pixels
      let maxX = cellX + pixelSize;
      let maxY = cellY + pixelSize;
      for (const user of users) {
        for (const { startPos: uStart, endPos: uEnd } of user.selectedPixels) {
          // If dragging right/down, clamp to before the occupied area
          if (
            startPos.x < uEnd.x &&
            maxX > uStart.x &&
            startPos.y < uEnd.y &&
            maxY > uStart.y
          ) {
            if (cellX >= uStart.x && cellX < uEnd.x) {
              maxX = uStart.x;
            }
            if (cellY >= uStart.y && cellY < uEnd.y) {
              maxY = uStart.y;
            }
          }
        }
      }
      setEndPos({
        x: maxX,
        y: maxY,
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
      setIsTooltipPersistent(true);
      setHoveredUser(foundUser);
      setHoveredSelection(null);
      setTooltipPos({ x: e.pageX, y: e.pageY });
    } else if (foundSelection) {
      setIsTooltipPersistent(true);
      setHoveredUser(null);
      setHoveredSelection(foundSelection);
      setTooltipPos({ x: e.pageX, y: e.pageY });
    } else {
      setIsTooltipPersistent(false);
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
    const isOverTooltip =
      tooltipRef.current && tooltipRef.current.contains(event.target);
    if (!canvasRef.current.contains(event.target) && !isOverTooltip) {
      // Clicked outside canvas and tooltip → clear everything
      setToolTipActive(false);
      setIsTooltipPersistent(false);
      setHoveredUser(null);
      setHoveredSelection(null);
      setTooltipPos(null);
      setSelectionTooltipPos(null);
      setSelections([]);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Also clear persistent mode on mouse leave
  const handleMouseLeave = (event) => {
    // Only clear if not moving into the tooltip
    if (
      tooltipRef.current &&
      event.relatedTarget &&
      tooltipRef.current.contains(event.relatedTarget)
    ) {
      return;
    }
    setIsTooltipPersistent(false);
    setHoveredUser(null);
    setHoveredSelection(null);
    setTooltipPos(null);
    setSelectionTooltipPos(null);
    setSelections([]);
  };

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
        onMouseLeave={handleMouseLeave}
      />
      {hoveredUser && tooltipPos && (
        <UserToolTip
          ref={tooltipRef}
          hoveredUser={hoveredUser}
          tooltipPos={tooltipPos}
        />
      )}
      {selections.length > 0 && selectionTooltipPos && (
        <SelectionToolTip
          ref={tooltipRef}
          hoveredSelection={selections[0]}
          tooltipPos={selectionTooltipPos}
          selectionSummary={selectionSummary}
          handleSelectPixels={handleSelectPixels}
        />
      )}
    </>
  );
};

Grid.propTypes = {
  Summary: PropTypes.shape({
    imgElement: PropTypes.any,
    selectedCoordinates: PropTypes.arrayOf(
      PropTypes.shape({
        startPos: PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired,
        }),
        endPos: PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired,
        }),
      })
    ),
  }),
  image: PropTypes.string,
  selection: PropTypes.bool,
};

export default Grid;
