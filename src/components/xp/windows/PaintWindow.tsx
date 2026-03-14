import { useRef, useState, useCallback, useEffect } from "react";

const COLORS = [
  "#000000", "#808080", "#800000", "#808000", "#008000", "#008080", "#000080", "#800080",
  "#808040", "#004040", "#0080FF", "#004080", "#4000FF", "#804000",
  "#FFFFFF", "#C0C0C0", "#FF0000", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#FF00FF",
  "#FFFF80", "#00FF80", "#80FFFF", "#8080FF", "#FF0080", "#FF8040",
];

const PaintWindow = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [tool, setTool] = useState<"pencil" | "eraser">("pencil");
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getPos = (e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const draw = useCallback((e: React.MouseEvent) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const pos = getPos(e);
    setCoords(pos);

    ctx.strokeStyle = tool === "eraser" ? "#FFFFFF" : color;
    ctx.lineWidth = tool === "eraser" ? 10 : 2;
    ctx.lineCap = "round";
    ctx.beginPath();
    if (lastPos.current) {
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
    } else {
      ctx.moveTo(pos.x, pos.y);
    }
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
  }, [drawing, color, tool]);

  const tools = [
    "✏️", "🔲", "🪣", "💧", "🔍", "✂️",
    "🖌️", "A", "↗", "↘", "⬜", "⬡", "⭕", "⬮",
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-1 min-h-0">
        {/* Tool palette */}
        <div className="w-[50px] bg-[#c0c0c0] border-r border-gray-400 p-1 grid grid-cols-2 gap-0.5 content-start">
          {tools.map((t, i) => (
            <button
              key={i}
              className={`w-[20px] h-[20px] flex items-center justify-center text-[10px] border ${i === 0 && tool === "pencil" ? "border-gray-600 bg-white" : "border-gray-400 bg-[#c0c0c0]"} hover:bg-gray-200`}
              onClick={() => i === 0 ? setTool("pencil") : i === 5 ? setTool("eraser") : null}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Canvas area */}
        <div className="flex-1 overflow-auto bg-[#808080] p-1">
          <canvas
            ref={canvasRef}
            width={800}
            height={500}
            className="bg-white cursor-crosshair"
            onMouseDown={(e) => { setDrawing(true); lastPos.current = getPos(e); }}
            onMouseMove={(e) => { draw(e); const p = getPos(e); setCoords(p); }}
            onMouseUp={() => { setDrawing(false); lastPos.current = null; }}
            onMouseLeave={() => { setDrawing(false); lastPos.current = null; }}
          />
        </div>
      </div>

      {/* Color palette */}
      <div className="bg-[#c0c0c0] border-t border-gray-400 px-2 py-1 flex items-center gap-2">
        <div className="relative w-[28px] h-[28px]">
          <div className="absolute bottom-0 right-0 w-[20px] h-[20px] border border-gray-600" style={{ background: "#FFFFFF" }} />
          <div className="absolute top-0 left-0 w-[20px] h-[20px] border border-gray-600" style={{ background: color }} />
        </div>
        <div className="flex flex-wrap gap-[1px]">
          {COLORS.map((c) => (
            <button
              key={c}
              className="w-[14px] h-[14px] border border-gray-600 hover:border-white"
              style={{ background: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
      </div>

      {/* Status bar */}
      <div className="bg-[#c0c0c0] border-t border-gray-300 px-2 py-0.5 text-[10px] text-gray-600 flex justify-between">
        <span>For Help, click Help Topics on the Help Menu.</span>
        <span>{Math.round(coords.x)},{Math.round(coords.y)}</span>
      </div>
    </div>
  );
};

export default PaintWindow;
