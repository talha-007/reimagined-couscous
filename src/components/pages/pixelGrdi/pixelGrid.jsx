import { useRef, useState, useEffect } from "react";
import Layout from "../../layout/layout";
import filledGrid from "../../../assets/icons/filledGrid.svg";
import outlinedGrid from "../../../assets/icons/outlinedGrid.svg";
import dimension from "../../../assets/icons/dimension.svg";
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

function PixelGrid() {
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

  useEffect(() => {
    updateGridSize();
    window.addEventListener("resize", updateGridSize);
    return () => window.removeEventListener("resize", updateGridSize);
  }, []);

  useEffect(() => {
    drawGrid();
  }, [startPos, endPos, gridSize, pixelSize, users]);

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
          ctx.shadowColor = "#000";
          ctx.shadowBlur = 25;
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
      });
    });
    if (startPos && endPos) {
      const x = Math.min(startPos.x, endPos.x);
      const y = Math.min(startPos.y, endPos.y);
      const width = Math.abs(endPos.x - startPos.x);
      const height = Math.abs(endPos.y - startPos.y);

      ctx.fillStyle = "#FEEA9AA3";
      ctx.fillRect(x, y, width, height);
      ctx.strokeStyle = "#FFF8C5";
      ctx.strokeRect(x, y, width, height);
    }
  };

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    console.log("rect", rect);

    const x = Math.floor((e.clientX - rect.left) / pixelSize) * pixelSize;
    const y = Math.floor((e.clientY - rect.top) / pixelSize) * pixelSize;

    setStartPos({ x, y });
    setEndPos(null);
    setDragging(true);
  };

  const handleMouseUp = () => {
    if (startPos && endPos) {
      const newSelection = { startPos, endPos };

      setSelections((prevSelections) => [...prevSelections, newSelection]);
    }

    setDragging(false);
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
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
      setTooltipPos({ x: e.clientX, y: e.clientY });
    } else if (foundSelection) {
      setHoveredUser(null);
      setHoveredSelection(foundSelection);
      setTooltipPos({ x: e.clientX, y: e.clientY });
    } else {
      setHoveredUser(null);
      setHoveredSelection(null);
      setTooltipPos(null);
    }
  };

  console.log("hovered", hoveredUser);

  return (
    <Layout>
      <div
        style={{ padding: "20px", margin: "8rem auto" }}
        className="max-w-7xl"
      >
        <div className="flex justify-center items-center">
          <div>
            <div className="flex justify-evenly items-center">
              <div className="flex items-center gap-2">
                <img src={filledGrid} alt="" />
                <p className="text-[#FFF8C5] text-[10px] md:text-[16px]">
                  Total Pixel sold:{" "}
                  <span className="font-[500] text-[#FEDF7A]">5,000</span>
                </p>
              </div>
              <div className="w-[2px] h-8 bg-[#FEF6C026]"></div>
              <div className="flex items-center gap-2">
                <img src={outlinedGrid} alt="" />
                <p className="text-[#FFF8C5] text-[10px] md:text-[16px]">
                  Remaining Pixels:{" "}
                  <span className="font-[500] text-[#FEDF7A]">5,000</span>
                </p>
              </div>
              <div className="w-[2px] h-8 bg-[#FEF6C026]"></div>
              <div className="flex items-center gap-2">
                <img src={dimension} alt="" />
                <p className="text-[#FFF8C5] text-[10px] md:text-[16px]">
                  Per Pixel Dimension:{" "}
                  <span className="font-[500] text-[#FEDF7A]">10x10</span>
                </p>
              </div>
            </div>
            <div
              className="border border-transparent flex items-center justify-center p-6 mt-6"
              style={{
                borderImage:
                  "linear-gradient(to right, #7A5018cc, #FEEA9Acc) 1",
              }}
            >
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
                <UserToolTip
                  hoveredUser={hoveredUser}
                  tooltipPos={tooltipPos}
                />
              )}
              {hoveredSelection && tooltipPos && (
                <SelectionToolTip tooltipPos={tooltipPos} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PixelGrid;
