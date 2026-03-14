import { useState, useRef, useCallback } from "react";
import recycleIcon from "@/assets/xp/Recycle_Bin_empty.png";
import computerIcon from "@/assets/xp/My_Computer.png";
import notepadIcon from "@/assets/xp/Notepad.png";
import folderIcon from "@/assets/xp/My_Documents.png";
import globeIcon from "@/assets/xp/Network_Connections.png";
import mailIcon from "@/assets/xp/Outlook_Express.png";
import paintIcon from "@/assets/xp/Paint.png";
import musicIcon from "@/assets/xp/My_Music.png";

interface DesktopIconProps {
  icon: string;
  label: string;
  onClick: () => void;
  selected?: boolean;
  x: number;
  y: number;
  onDragEnd: (x: number, y: number) => void;
}

const iconMap: Record<string, string> = {
  recycle: recycleIcon,
  computer: computerIcon,
  notepad: notepadIcon,
  folder: folderIcon,
  globe: globeIcon,
  mail: mailIcon,
  paint: paintIcon,
  mediaplayer: musicIcon,
};

const DesktopIcon = ({ icon, label, onClick, selected, x, y, onDragEnd }: DesktopIconProps) => {
  const [dragging, setDragging] = useState(false);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);
  const dragStart = useRef<{ mouseX: number; mouseY: number; iconX: number; iconY: number } | null>(null);
  const hasMoved = useRef(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragStart.current = { mouseX: e.clientX, mouseY: e.clientY, iconX: x, iconY: y };
    hasMoved.current = false;

    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - dragStart.current!.mouseX;
      const dy = ev.clientY - dragStart.current!.mouseY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        hasMoved.current = true;
        setDragging(true);
        setDragPos({
          x: dragStart.current!.iconX + dx,
          y: dragStart.current!.iconY + dy,
        });
      }
    };

    const onUp = (ev: MouseEvent) => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      if (hasMoved.current && dragStart.current) {
        const dx = ev.clientX - dragStart.current.mouseX;
        const dy = ev.clientY - dragStart.current.mouseY;
        onDragEnd(dragStart.current.iconX + dx, dragStart.current.iconY + dy);
      }
      setDragging(false);
      setDragPos(null);
      dragStart.current = null;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [x, y, onDragEnd]);

  const displayX = dragPos ? dragPos.x : x;
  const displayY = dragPos ? dragPos.y : y;

  return (
    <div
      className={`desktop-icon absolute ${selected ? "selected" : ""}`}
      style={{
        left: displayX,
        top: displayY,
        opacity: dragging ? 0.7 : 1,
        zIndex: dragging ? 50 : 1,
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={(e) => {
        if (!hasMoved.current) {
          e.stopPropagation();
          onClick();
        }
      }}
    >
      <img
        src={iconMap[icon] || iconMap.folder}
        alt={label}
        className="w-[48px] h-[48px] drop-shadow-lg"
        draggable={false}
      />
      <span className="desktop-icon-label">{label}</span>
    </div>
  );
};

export default DesktopIcon;
