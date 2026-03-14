import { useState, useEffect } from "react";
import { RefreshCw, Settings, FolderPlus, AlignLeft, Monitor } from "lucide-react";

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
}

const menuItems = [
  { label: "View", icon: <AlignLeft size={14} />, submenu: true },
  { label: "Sort By", icon: null, submenu: true },
  { type: "separator" as const },
  { label: "Refresh", icon: <RefreshCw size={14} />, action: () => window.location.reload() },
  { type: "separator" as const },
  { label: "New Folder", icon: <FolderPlus size={14} /> },
  { type: "separator" as const },
  { label: "Properties", icon: <Settings size={14} /> },
];

const DesktopContextMenu = ({ x, y, onClose }: ContextMenuProps) => {
  useEffect(() => {
    const handler = () => onClose();
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [onClose]);

  // Keep menu within viewport
  const adjustedX = Math.min(x, window.innerWidth - 180);
  const adjustedY = Math.min(y, window.innerHeight - 250);

  return (
    <div
      className="fixed z-[9998]"
      style={{ left: adjustedX, top: adjustedY }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="w-[172px] py-1 shadow-md"
        style={{
          background: "hsl(0, 0%, 96%)",
          border: "1px solid hsl(0, 0%, 68%)",
          boxShadow: "2px 2px 6px rgba(0,0,0,0.2)",
        }}
      >
        {menuItems.map((item, i) => {
          if ("type" in item && item.type === "separator") {
            return (
              <div
                key={`sep-${i}`}
                className="mx-2 my-1"
                style={{ borderTop: "1px solid hsl(0, 0%, 80%)" }}
              />
            );
          }
          return (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-6 py-[3px] text-xs text-left hover:text-white cursor-pointer"
              style={{ fontFamily: "Tahoma, sans-serif" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "hsl(213, 58%, 46%)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "";
              }}
              onClick={() => {
                if ("action" in item && item.action) item.action();
                onClose();
              }}
            >
              <span className="w-4 flex items-center justify-center">
                {"icon" in item && item.icon}
              </span>
              <span>{item.label}</span>
              {"submenu" in item && item.submenu && (
                <span className="ml-auto text-[10px]">▸</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DesktopContextMenu;
