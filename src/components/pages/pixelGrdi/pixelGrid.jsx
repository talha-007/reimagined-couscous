import { useRef, useState, useEffect } from "react";
import Layout from "../../layout/layout";
import { motion } from "framer-motion";
import filledGrid from "../../../assets/icons/filledGrid.svg";
import outlinedGrid from "../../../assets/icons/outlinedGrid.svg";
import dimension from "../../../assets/icons/dimension.svg";
import user1 from "../../../assets/users/image1.png";
import user2 from "../../../assets/users/image2.png";
import user3 from "../../../assets/users/image3.png";

const BASE_GRID_SIZE = 100;
const BASE_PIXEL_SIZE = 10;

const dummyUsers = [
  {
    id: 1,
    name: "Alice",
    profilePic: user1,
    selectedPixels: [{ startPos: { x: 0, y: 0 }, endPos: { x: 30, y: 30 } }],
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
      { startPos: { x: 130, y: 70 }, endPos: { x: 170, y: 90 } },
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
  const [hoveredUser, setHoveredUser] = useState(null);

  const [tooltipPos, setTooltipPos] = useState(null);
  console.log("start", startPos, endPos);

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

    // Draw Grid
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        ctx.strokeStyle = "#000";
        ctx.strokeRect(col * pixelSize, row * pixelSize, pixelSize, pixelSize);
      }
    }

    // Highlight user-selected areas and draw images
    dummyUsers.forEach((user) => {
      user.selectedPixels.forEach(({ startPos, endPos }) => {
        const x = startPos.x;
        const y = startPos.y;
        const width = endPos.x - startPos.x;
        const height = endPos.y - startPos.y;

        // Highlight selection
        ctx.fillStyle = "#FEEA9AA3";
        ctx.fillRect(x, y, width, height);
        ctx.strokeStyle = "#FFF8C5";
        ctx.strokeRect(x, y, width, height);

        // Load and draw user image in the selected area
        const img = new Image();
        img.src = user.profilePic;
        img.onload = () => {
          ctx.drawImage(img, x, y, width, height);
        };
      });
    });

    // Highlight the newly selected area (without image)
    if (startPos && endPos) {
      const x = Math.min(startPos.x, endPos.x);
      const y = Math.min(startPos.y, endPos.y);
      const width = Math.abs(endPos.x - startPos.x) + pixelSize;
      const height = Math.abs(endPos.y - startPos.y) + pixelSize;

      ctx.fillStyle = "#FEEA9AA3"; // Blue transparent selection
      ctx.fillRect(x, y, width, height);
      ctx.strokeStyle = "#FFF8C5";
      ctx.strokeRect(x, y, width, height);
    }
  };

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / pixelSize) * pixelSize;
    const y = Math.floor((e.clientY - rect.top) / pixelSize) * pixelSize;

    setStartPos({ x, y });
    setEndPos(null);
    setDragging(true);
  };

  //   const handleMouseMove = (e) => {
  //     if (!dragging || !startPos) return;

  //     const rect = canvasRef.current.getBoundingClientRect();
  //     const x = Math.floor((e.clientX - rect.left) / pixelSize) * pixelSize;
  //     const y = Math.floor((e.clientY - rect.top) / pixelSize) * pixelSize;

  //     setEndPos({ x, y });
  //   };

  const handleMouseUp = () => {
    if (startPos && endPos) {
      const newSelection = { startPos, endPos };

      // Add selection to a dummy user (you can modify this logic to select a specific user)
      setUsers((prevUsers) => {
        const updatedUsers = [...prevUsers];
        updatedUsers[0].selectedPixels.push(newSelection);
        return updatedUsers;
      });
    }

    setDragging(false);
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (dragging && startPos) {
      // Selection logic
      const newX = Math.floor(x / pixelSize) * pixelSize;
      const newY = Math.floor(y / pixelSize) * pixelSize;
      setEndPos({ x: newX, y: newY });
    } else {
      // Tooltip logic
      let foundUser = null;
      users.forEach((user) => {
        user.selectedPixels.forEach(({ startPos, endPos }) => {
          if (
            x >= startPos.x &&
            x <= endPos.x &&
            y >= startPos.y &&
            y <= endPos.y
          ) {
            foundUser = user;
            setTooltipPos({ x: e.clientX, y: e.clientY });
          }
        });
      });

      setHoveredUser(foundUser);
    }
  };

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
                <motion.div
                  className="absolute bg-white text-black text-sm px-3 py-2 rounded shadow-lg"
                  style={{ top: tooltipPos.y + 10, left: tooltipPos.x + 10 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={hoveredUser.profilePic}
                      alt={hoveredUser.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <p className="font-medium">{hoveredUser.name}</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PixelGrid;
