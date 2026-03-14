import { useState, useRef, useEffect, ReactNode, useCallback } from "react";
import BackIcon from "@/assets/xp/Back.png";
import ForwardIcon from "@/assets/xp/Forward.png";
import SearchIcon from "@/assets/xp/Search.png";
import FolderIcon from "@/assets/xp/Folder_Closed.png";
import GoIcon from "@/assets/xp/Go.png";
import WindowsLogoIcon from "@/assets/xp/Windowslogo.png";

interface XPWindowProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
  defaultWidth?: number;
  defaultHeight?: number;
  defaultX?: number;
  defaultY?: number;
  icon?: string;
  variant?: "explorer" | "notepad" | "paint" | "browser" | "plain";
  addressBar?: string;
  menuItems?: string[];
  minimized?: boolean;
  onMinimize?: () => void;
}

type ResizeDir = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw" | null;

const MIN_W = 300;
const MIN_H = 200;

const XPWindow = ({
  title,
  children,
  onClose,
  onFocus,
  zIndex,
  defaultWidth = 600,
  defaultHeight = 420,
  defaultX,
  defaultY,
  icon,
  variant = "plain",
  addressBar,
  menuItems,
  minimized = false,
  onMinimize,
}: XPWindowProps) => {
  const [pos, setPos] = useState({
    x: defaultX ?? Math.random() * 200 + 100,
    y: defaultY ?? Math.random() * 100 + 40,
  });
  const [size, setSize] = useState({ w: defaultWidth, h: defaultHeight });
  const [maximized, setMaximized] = useState(false);
  
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState<ResizeDir>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ mouseX: 0, mouseY: 0, x: 0, y: 0, w: 0, h: 0 });
  const prevState = useRef({ pos, size });

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging]);

  useEffect(() => {
    if (!resizing) return;
    const onMove = (e: MouseEvent) => {
      const s = resizeStart.current;
      const dx = e.clientX - s.mouseX;
      const dy = e.clientY - s.mouseY;
      let newX = s.x, newY = s.y, newW = s.w, newH = s.h;
      if (resizing.includes("e")) newW = Math.max(MIN_W, s.w + dx);
      if (resizing.includes("s")) newH = Math.max(MIN_H, s.h + dy);
      if (resizing.includes("w")) {
        newW = Math.max(MIN_W, s.w - dx);
        if (newW > MIN_W) newX = s.x + dx;
      }
      if (resizing.includes("n")) {
        newH = Math.max(MIN_H, s.h - dy);
        if (newH > MIN_H) newY = s.y + dy;
      }
      setPos({ x: newX, y: newY });
      setSize({ w: newW, h: newH });
    };
    const onUp = () => setResizing(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [resizing]);

  const startResize = useCallback((dir: ResizeDir, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (maximized) return;
    resizeStart.current = { mouseX: e.clientX, mouseY: e.clientY, x: pos.x, y: pos.y, w: size.w, h: size.h };
    setResizing(dir);
  }, [maximized, pos, size]);

  const handleMaximize = () => {
    if (maximized) {
      setPos(prevState.current.pos);
      setSize(prevState.current.size);
    } else {
      prevState.current = { pos, size };
      setPos({ x: 0, y: 0 });
      setSize({ w: window.innerWidth, h: window.innerHeight - 36 });
    }
    setMaximized(!maximized);
  };

  const handleMinimize = () => onMinimize?.();

  if (minimized) return null;

  const defaultMenus: Record<string, string[]> = {
    explorer: ["File", "Edit", "View", "Favorites", "Tools", "Help"],
    notepad: ["File", "Edit", "Format", "View", "Help"],
    paint: ["File", "Edit", "View", "Image", "Colors", "Help", "Extras"],
    browser: ["File", "Edit", "View", "Favorites", "Tools", "Help"],
    plain: [],
  };

  const menus = menuItems || defaultMenus[variant] || [];
  const showToolbar = variant === "explorer" || variant === "browser";
  const showAddressBar = variant === "explorer" || variant === "browser";

  return (
    <div
      className="xp-window absolute"
      style={{ left: pos.x, top: pos.y, width: size.w, height: size.h, zIndex }}
      onMouseDown={onFocus}
    >
      {/* Resize handles */}
      {!maximized && (
        <>
          <div className="absolute -top-[3px] left-[6px] right-[6px] h-[6px] z-50" style={{ cursor: "n-resize" }} onMouseDown={(e) => startResize("n", e)} />
          <div className="absolute -bottom-[3px] left-[6px] right-[6px] h-[6px] z-50" style={{ cursor: "s-resize" }} onMouseDown={(e) => startResize("s", e)} />
          <div className="absolute top-[6px] -left-[3px] bottom-[6px] w-[6px] z-50" style={{ cursor: "w-resize" }} onMouseDown={(e) => startResize("w", e)} />
          <div className="absolute top-[6px] -right-[3px] bottom-[6px] w-[6px] z-50" style={{ cursor: "e-resize" }} onMouseDown={(e) => startResize("e", e)} />
          <div className="absolute -top-[3px] -left-[3px] w-[10px] h-[10px] z-[51]" style={{ cursor: "nw-resize" }} onMouseDown={(e) => startResize("nw", e)} />
          <div className="absolute -top-[3px] -right-[3px] w-[10px] h-[10px] z-[51]" style={{ cursor: "ne-resize" }} onMouseDown={(e) => startResize("ne", e)} />
          <div className="absolute -bottom-[3px] -left-[3px] w-[10px] h-[10px] z-[51]" style={{ cursor: "sw-resize" }} onMouseDown={(e) => startResize("sw", e)} />
          <div className="absolute -bottom-[3px] -right-[3px] w-[10px] h-[10px] z-[51]" style={{ cursor: "se-resize" }} onMouseDown={(e) => startResize("se", e)} />
        </>
      )}

      {/* Title bar */}
      <div
        className="xp-titlebar"
        onMouseDown={(e) => {
          if (maximized) return;
          dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
          setDragging(true);
        }}
        onDoubleClick={handleMaximize}
      >
        <div className="flex items-center gap-1.5">
          {icon && <img src={icon} alt="" className="w-4 h-4" />}
          <span className="truncate">{title}</span>
        </div>
        <div className="flex gap-[2px]">
          <button className="xp-titlebar-btn xp-titlebar-minmax" onClick={handleMinimize} title="Minimize">
            <span style={{ fontSize: 14, lineHeight: '14px' }}>—</span>
          </button>
          <button className="xp-titlebar-btn xp-titlebar-minmax" onClick={handleMaximize} title="Maximize">
            <span style={{ fontSize: 10 }}>{maximized ? "❐" : "▢"}</span>
          </button>
          <button className="xp-titlebar-btn xp-titlebar-close" onClick={onClose} title="Close">
            <span style={{ fontSize: 12 }}>✕</span>
          </button>
        </div>
      </div>

      {/* Menu bar */}
      {menus.length > 0 && (
        <div className="xp-menubar">
          {menus.map((m) => (
            <span key={m} className="xp-menubar-item">{m}</span>
          ))}
          {variant === "browser" && (
            <div className="ml-auto">
              <img src={WindowsLogoIcon} alt="" className="w-[30px] h-[26px]" />
            </div>
          )}
        </div>
      )}

      {/* Toolbar */}
      {showToolbar && (
        <div className="xp-toolbar">
          <div className="xp-toolbar-btn">
            <img src={BackIcon} alt="Back" className="w-6 h-6" />
            <span>Back</span>
          </div>
          <div className="xp-toolbar-btn">
            <img src={ForwardIcon} alt="Forward" className="w-6 h-6" />
            <span>Forward</span>
          </div>
          {variant === "explorer" && (
            <>
              <div className="xp-toolbar-separator" />
              <div className="xp-toolbar-btn">
                <img src={SearchIcon} alt="Search" className="w-6 h-6" />
                <span>Search</span>
              </div>
              <div className="xp-toolbar-btn">
                <img src={FolderIcon} alt="Folders" className="w-6 h-6" />
                <span>Folders</span>
              </div>
            </>
          )}
        </div>
      )}

      {/* Address bar */}
      {showAddressBar && (
        <div className="xp-addressbar">
          <span className="text-xs text-gray-600 mr-1">Address</span>
          <div className="flex-1 bg-white border border-gray-400 px-2 py-0.5 text-xs flex items-center">
            {icon && <img src={icon} alt="" className="w-3.5 h-3.5 mr-1" />}
            {addressBar || title}
          </div>
          <div className="flex items-center gap-1 ml-1">
            <span className="text-xs text-gray-500">▾</span>
            <img src={GoIcon} alt="Go" className="w-5 h-5" />
            <span className="text-xs">Go</span>
          </div>
        </div>
      )}

      {/* Content */}
      <div
        className="xp-scrollbar overflow-auto flex-1"
        style={{ height: `calc(100% - ${getTitleOffset(variant, menus.length > 0)}px)`, background: "hsl(0, 0%, 94%)" }}
      >
        {children}
      </div>
    </div>
  );
};

function getTitleOffset(variant: string, hasMenu: boolean): number {
  let h = 28; // titlebar
  if (hasMenu) h += 22; // menubar
  if (variant === "explorer" || variant === "browser") h += 38; // toolbar
  if (variant === "explorer" || variant === "browser") h += 26; // addressbar
  return h;
}

export default XPWindow;
