import { useState, useCallback } from "react";
import xpWallpaper from "@/assets/xp-bliss.jpg";
import DesktopIcon from "@/components/xp/DesktopIcon";
import LoginScreen from "@/components/xp/LoginScreen";
import BootScreen from "@/components/xp/BootScreen";
import XPWindow from "@/components/xp/XPWindow";
import Taskbar from "@/components/xp/Taskbar";
import StartMenu from "@/components/xp/StartMenu";
import ShutdownDialog from "@/components/xp/ShutdownDialog";
import DesktopContextMenu from "@/components/xp/DesktopContextMenu";
import NotepadWindow from "@/components/xp/windows/NotepadWindow";
import PaintWindow from "@/components/xp/windows/PaintWindow";
import MyComputerWindow from "@/components/xp/windows/MyComputerWindow";
import RecycleBinWindow from "@/components/xp/windows/RecycleBinWindow";
import BrowserWindow from "@/components/xp/windows/BrowserWindow";

import RecycleIcon from "@/assets/xp/Recycle_Bin_empty.png";
import ComputerIcon from "@/assets/xp/My_Computer.png";
import NotepadIcon from "@/assets/xp/Notepad.png";
import FolderIcon from "@/assets/xp/My_Documents.png";
import MailIcon from "@/assets/xp/Outlook_Express.png";
import PaintIcon from "@/assets/xp/Paint.png";
import ExplorerIcon from "@/assets/xp/Explorer.png";

type WindowId = "about" | "notepad" | "paint" | "computer" | "recycle" | "contact";

interface WindowConfig {
  title: string;
  width: number;
  height: number;
  component: React.ReactNode;
  variant: "explorer" | "notepad" | "paint" | "browser" | "plain";
  icon?: string;
  addressBar?: string;
}

const windowConfigs: Record<WindowId, WindowConfig> = {
  about: {
    title: "Maxthon",
    width: 900,
    height: 600,
    component: <BrowserWindow />,
    variant: "browser",
    icon: ExplorerIcon,
    addressBar: "https://myspace.com/saurabhcodes",
  },
  notepad: {
    title: "Untitled - Notepad",
    width: 700,
    height: 500,
    component: <NotepadWindow />,
    variant: "notepad",
    icon: NotepadIcon,
  },
  paint: {
    title: "Untitled - Paint",
    width: 750,
    height: 520,
    component: <PaintWindow />,
    variant: "paint",
    icon: PaintIcon,
  },
  computer: {
    title: "My Computer",
    width: 700,
    height: 480,
    component: <MyComputerWindow />,
    variant: "explorer",
    icon: ComputerIcon,
    addressBar: "My Computer",
  },
  recycle: {
    title: "Recycle Bin",
    width: 650,
    height: 440,
    component: <RecycleBinWindow />,
    variant: "explorer",
    icon: RecycleIcon,
    addressBar: "Recycle Bin",
  },
  contact: {
    title: "Outlook Express",
    width: 580,
    height: 380,
    component: <BrowserWindow />,
    variant: "browser",
    icon: MailIcon,
    addressBar: "mailto:saurabhpatil8426@gmail.com",
  },
};

const desktopIcons = [
  { id: "recycle" as WindowId, icon: "recycle", label: "Recycle Bin" },
  { id: "computer" as WindowId, icon: "computer", label: "My Computer" },
  { id: "notepad" as WindowId, icon: "notepad", label: "Notepad" },
  { id: "about" as WindowId, icon: "folder", label: "My Projects" },
  { id: "contact" as WindowId, icon: "mail", label: "Outlook Express" },
  { id: "paint" as WindowId, icon: "paint", label: "Paint" },
];

const ICON_SPACING = 90;
const initialPositions = desktopIcons.map((_, i) => ({ x: 20, y: 20 + i * ICON_SPACING }));

const Index = () => {
  const [phase, setPhase] = useState<"boot" | "login" | "desktop">("boot");
  const [openWindows, setOpenWindows] = useState<WindowId[]>([]);
  const [windowOrder, setWindowOrder] = useState<WindowId[]>([]);
  const [startOpen, setStartOpen] = useState(false);
  const [showShutdown, setShowShutdown] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [iconPositions, setIconPositions] = useState(initialPositions);
  const [minimizedWindows, setMinimizedWindows] = useState<Set<WindowId>>(new Set());

  const openWindow = useCallback((id: WindowId) => {
    setOpenWindows((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setWindowOrder((prev) => [...prev.filter((w) => w !== id), id]);
    setMinimizedWindows((prev) => { const next = new Set(prev); next.delete(id); return next; });
  }, []);

  const closeWindow = useCallback((id: WindowId) => {
    setOpenWindows((prev) => prev.filter((w) => w !== id));
    setWindowOrder((prev) => prev.filter((w) => w !== id));
    setMinimizedWindows((prev) => { const next = new Set(prev); next.delete(id); return next; });
  }, []);

  const focusWindow = useCallback((id: WindowId) => {
    setWindowOrder((prev) => [...prev.filter((w) => w !== id), id]);
    setMinimizedWindows((prev) => { const next = new Set(prev); next.delete(id); return next; });
  }, []);

  const toggleWindow = useCallback((id: WindowId) => {
    const isActive = windowOrder[windowOrder.length - 1] === id && !minimizedWindows.has(id);
    if (isActive) {
      setMinimizedWindows((prev) => new Set(prev).add(id));
    } else {
      setMinimizedWindows((prev) => { const next = new Set(prev); next.delete(id); return next; });
      setWindowOrder((prev) => [...prev.filter((w) => w !== id), id]);
    }
  }, [windowOrder, minimizedWindows]);

  const activeWindow = windowOrder.length > 0 ? windowOrder[windowOrder.length - 1] : null;

  if (phase === "boot") return <BootScreen onComplete={() => setPhase("login")} />;
  if (phase === "login") return <LoginScreen onLogin={() => setPhase("desktop")} />;

  return (
    <div
      className="h-screen w-screen overflow-hidden relative select-none"
      style={{
        backgroundImage: `url(${xpWallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={() => { setStartOpen(false); setContextMenu(null); }}
      onContextMenu={(e) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
        setStartOpen(false);
      }}
    >
      {/* Desktop Icons */}
      {desktopIcons.map((item, index) => (
        <DesktopIcon
          key={`${item.icon}-${index}`}
          icon={item.icon}
          label={item.label}
          onClick={() => openWindow(item.id)}
          x={iconPositions[index].x}
          y={iconPositions[index].y}
          onDragEnd={(x, y) => {
            setIconPositions((prev) => {
              const next = [...prev];
              next[index] = { x, y };
              return next;
            });
          }}
        />
      ))}

      {/* Windows */}
      {openWindows.map((id) => {
        const config = windowConfigs[id];
        const zIndex = 100 + windowOrder.indexOf(id);
        return (
          <XPWindow
            key={id}
            title={config.title}
            onClose={() => closeWindow(id)}
            onFocus={() => focusWindow(id)}
            zIndex={zIndex}
            defaultWidth={config.width}
            defaultHeight={config.height}
            variant={config.variant}
            icon={config.icon}
            addressBar={config.addressBar}
            minimized={minimizedWindows.has(id)}
            onMinimize={() => setMinimizedWindows((prev) => new Set(prev).add(id))}
          >
            {config.component}
          </XPWindow>
        );
      })}

      {startOpen && (
        <StartMenu
          onOpen={(id) => openWindow(id as WindowId)}
          onClose={() => setStartOpen(false)}
          onShutdown={() => setShowShutdown(true)}
        />
      )}

      {showShutdown && <ShutdownDialog onClose={() => setShowShutdown(false)} />}

      {contextMenu && (
        <DesktopContextMenu x={contextMenu.x} y={contextMenu.y} onClose={() => setContextMenu(null)} />
      )}

      <Taskbar
        openWindows={openWindows.map((id) => ({ id, title: windowConfigs[id].title }))}
        activeWindow={activeWindow}
        onWindowClick={(id) => toggleWindow(id as WindowId)}
        onStartClick={() => setStartOpen(!startOpen)}
        startOpen={startOpen}
      />
    </div>
  );
};

export default Index;
