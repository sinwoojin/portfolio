import { useRef, useState } from "react";

const PaintApp = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null); // 캔버스 참조
  const [isDrawing, setIsDrawing] = useState(false); // 그리기 상태
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 }); // 마지막 그린 좌표
  const [color, setColor] = useState("#000000"); // 선 색상
  const [lineWidth, setLineWidth] = useState(5); // 선 굵기
  const [tool, setTool] = useState("brush"); // 선택된 도구 (brush, erase)

  // 마우스 다운 이벤트: 그리기 시작
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const rect = canvasRef.current!.getBoundingClientRect();
    setLastPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // 마우스 무브 이벤트: 그리기 중
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const rect = canvasRef.current!.getBoundingClientRect();
    const newX = e.clientX - rect.left;
    const newY = e.clientY - rect.top;

    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;

    ctx.beginPath();
    if (tool === "brush") {
      ctx.moveTo(lastPosition.x, lastPosition.y);
      ctx.lineTo(newX, newY);
    } else if (tool === "erase") {
      ctx.clearRect(
        newX - lineWidth / 2,
        newY - lineWidth / 2,
        lineWidth,
        lineWidth
      );
    }
    ctx.stroke();
    setLastPosition({ x: newX, y: newY });
  };

  // 마우스 업 이벤트: 그리기 종료
  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  // 마우스 아웃 이벤트: 캔버스를 벗어나면 그리기 종료
  const handleMouseOut = () => {
    setIsDrawing(false);
  };

  // 캔버스 초기화
  const clearCanvas = () => {
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
  };

  // 도구 변경 (그리기 도구 선택)
  const handleToolChange = (newTool: string) => {
    setTool(newTool);
  };

  // 색상 선택 변경
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  // 선 굵기 변경
  const handleLineWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLineWidth(Number(e.target.value));
  };

  return (
    <div>
      <h1>그림판</h1>

      {/* 도구 선택 */}
      <div>
        <button onClick={() => handleToolChange("brush")}>브러시</button>
        <button onClick={() => handleToolChange("erase")}>지우개</button>
      </div>

      {/* 색상 선택 */}
      <div>
        <label>색상: </label>
        <input type="color" value={color} onChange={handleColorChange} />
      </div>

      {/* 선 굵기 선택 */}
      <div>
        <label>선 굵기: </label>
        <input
          type="range"
          min="1"
          max="20"
          value={lineWidth}
          onChange={handleLineWidthChange}
        />
      </div>

      {/* 캔버스 */}
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: "1px solid black" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseOut}
      ></canvas>

      {/* 캔버스 초기화 버튼 */}
      <div>
        <button onClick={clearCanvas}>캔버스 지우기</button>
      </div>
    </div>
  );
};

export default PaintApp;
