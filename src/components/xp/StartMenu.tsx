import { useState } from "react";
import MyComputerIcon from "@/assets/xp/My_Computer.png";
import NetworkIcon from "@/assets/xp/Network_Connections.png";
import FolderIcon from "@/assets/xp/My_Documents.png";
import OutlookIcon from "@/assets/xp/Outlook_Express.png";
import MyPicturesIcon from "@/assets/xp/My_Pictures.png";
import MyMusicIcon from "@/assets/xp/My_Music.png";
import SearchIcon from "@/assets/xp/Search.png";
import NotepadIcon from "@/assets/xp/Notepad.png";
import PaintIcon from "@/assets/xp/Paint.png";
import ExplorerIcon from "@/assets/xp/Explorer.png";
import LogoutIcon from "@/assets/xp/Logout.png";
import PowerIcon from "@/assets/xp/310_32x32.png";
import DefaultProgramsIcon from "@/assets/xp/Default_Programs.png";
import { User } from "lucide-react";

interface StartMenuProps {
  onOpen: (id: string) => void;
  onClose: () => void;
  onShutdown: () => void;
}

const leftPinned = [
  { id: "about", label: "Internet", sub: "About Me", icon: NetworkIcon, bold: true },
  { id: "contact", label: "E-mail", sub: "Contact Me", icon: OutlookIcon, bold: true },
];

const leftPrograms = [
  { id: "notepad", label: "Notepad", icon: NotepadIcon },
  { id: "paint", label: "Paint", icon: PaintIcon },
  { id: "about", label: "My Portfolio", icon: ExplorerIcon },
  { id: "computer", label: "My Computer", icon: FolderIcon },
];

interface AllProgramItem {
  id?: string;
  label: string;
  icon: string;
  folder?: boolean;
  children?: { id: string; label: string; icon: string }[];
}

const allPrograms: AllProgramItem[] = [
  { label: "Set Program Access and Defaults", icon: DefaultProgramsIcon },
  { label: "Windows Catalog", icon: ExplorerIcon },
  { label: "Windows Update", icon: ExplorerIcon },
  {
    label: "Accessories", icon: FolderIcon, folder: true,
    children: [
      { id: "notepad", label: "Notepad", icon: NotepadIcon },
      { id: "paint", label: "Paint", icon: PaintIcon },
      { id: "computer", label: "Calculator", icon: MyComputerIcon },
      { id: "about", label: "Windows Explorer", icon: ExplorerIcon },
      { id: "about", label: "Command Prompt", icon: ExplorerIcon },
    ],
  },
  {
    label: "Games", icon: FolderIcon, folder: true,
    children: [
      { id: "about", label: "Solitaire", icon: ExplorerIcon },
      { id: "about", label: "Minesweeper", icon: ExplorerIcon },
      { id: "about", label: "Pinball", icon: ExplorerIcon },
    ],
  },
  { label: "Startup", icon: FolderIcon },
  { id: "about", label: "Internet Explorer", icon: NetworkIcon },
  { id: "contact", label: "Outlook Express", icon: OutlookIcon },
  { id: "about", label: "Remote Assistance", icon: ExplorerIcon },
  { id: "about", label: "Windows Media Player", icon: MyMusicIcon },
  { id: "about", label: "Windows Messenger", icon: ExplorerIcon },
];

const rightItems = [
  { label: "My Documents", icon: FolderIcon },
  { label: "My Pictures", icon: MyPicturesIcon },
  { label: "My Music", icon: MyMusicIcon },
  { label: "My Computer", icon: MyComputerIcon },
];

const rightBottom = [
  { label: "Help and Support", icon: SearchIcon },
  { label: "Search", icon: SearchIcon },
];

const StartMenu = ({ onOpen, onClose, onShutdown }: StartMenuProps) => {
  const [showAllPrograms, setShowAllPrograms] = useState(false);
  const [hoveredFolder, setHoveredFolder] = useState<string | null>(null);

  return (
    <div className="xp-start-menu" onClick={(e) => e.stopPropagation()}>
      {/* Header with user */}
      <div className="xp-start-menu-header">
        <div className="w-[48px] h-[48px] rounded-[4px] overflow-hidden border-2 border-white/60 flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600">
          <User size={28} className="text-white" />
        </div>
        <span className="text-[14px]">Saurabh Patil</span>
      </div>

      {/* Body: left programs + right places */}
      <div className="flex min-h-[540px] relative">
        {/* Left column - white */}
        <div className="flex-1 bg-white py-1 flex flex-col">
          {!showAllPrograms ? (
            <>
              {/* Pinned items */}
              {leftPinned.map((item, i) => (
                <div
                  key={`pin-${i}`}
                  className="xp-start-menu-item"
                  onClick={() => { onOpen(item.id); onClose(); }}
                >
                  <img src={item.icon} alt={item.label} className="w-8 h-8" />
                  <div className="flex flex-col">
                    <span className="font-bold text-[12px]">{item.label}</span>
                    <span className="text-[10px] text-gray-500">{item.sub}</span>
                  </div>
                </div>
              ))}

              {/* Separator */}
              <div className="mx-3 my-1 border-t border-gray-300" />

              {/* Programs */}
              {leftPrograms.map((item, i) => (
                <div
                  key={`prog-${i}`}
                  className="xp-start-menu-item"
                  onClick={() => { onOpen(item.id); onClose(); }}
                >
                  <img src={item.icon} alt={item.label} className="w-8 h-8" />
                  <span className="text-[12px]">{item.label}</span>
                </div>
              ))}
            </>
          ) : (
            /* All Programs list */
            <div className="py-1 overflow-auto relative">
              {allPrograms.map((item, i) => (
                <div
                  key={`all-${i}`}
                  className={`xp-start-menu-item relative ${item.folder ? 'justify-between' : ''} ${hoveredFolder === item.label ? 'bg-[hsl(213,58%,46%)] text-white' : ''}`}
                  onClick={() => { if (item.id) { onOpen(item.id); onClose(); } }}
                  onMouseEnter={() => item.folder ? setHoveredFolder(item.label) : setHoveredFolder(null)}
                >
                  <div className="flex items-center gap-2">
                    <img src={item.icon} alt={item.label} className="w-6 h-6" />
                    <span className="text-[12px]">{item.label}</span>
                  </div>
                  {item.folder && <span className="text-[10px]">▶</span>}

                  {/* Flyout submenu */}
                  {item.folder && hoveredFolder === item.label && item.children && (
                    <div
                      className="absolute left-full top-0 bg-white border-2 border-[hsl(213,58%,36%)] shadow-lg min-w-[200px] py-1 z-[10001]"
                      onMouseLeave={() => setHoveredFolder(null)}
                    >
                      {item.children.map((child, ci) => (
                        <div
                          key={`child-${ci}`}
                          className="xp-start-menu-item"
                          onClick={(e) => { e.stopPropagation(); onOpen(child.id); onClose(); }}
                        >
                          <img src={child.icon} alt={child.label} className="w-6 h-6" />
                          <span className="text-[12px]">{child.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* All Programs / Back */}
          <div className="mx-3 my-1 border-t border-gray-300" />
          <div
            className="flex items-center justify-between px-4 py-2 cursor-pointer rounded-sm mx-1 transition-colors"
            style={{
              background: "linear-gradient(180deg, #2a6dce 0%, #1a4fa0 100%)",
              color: "white",
            }}
            onClick={() => setShowAllPrograms(!showAllPrograms)}
          >
            {showAllPrograms ? (
              <>
                <span className="text-[#3ddb3d] text-lg font-bold">◀</span>
                <span className="font-bold text-[12px]">Back</span>
              </>
            ) : (
              <>
                <span className="font-bold text-[12px]">All Programs</span>
                <span className="text-[#3ddb3d] text-lg font-bold">▶</span>
              </>
            )}
          </div>
        </div>

        {/* Right column - blue tinted */}
        <div className="w-[190px] py-1 flex flex-col" style={{ background: "linear-gradient(180deg, #d3e5fa 0%, #b9d4f1 100%)" }}>
          {rightItems.map((item, i) => (
            <div key={`right-${i}`} className="xp-start-menu-item-right">
              <img src={item.icon} alt={item.label} className="w-6 h-6" />
              <span className="font-bold text-[11px] text-[#21437e]">{item.label}</span>
            </div>
          ))}

          <div className="mx-3 my-1 border-t border-[#8bb5df]" />

          {rightBottom.map((item, i) => (
            <div key={`rb-${i}`} className="xp-start-menu-item-right">
              <img src={item.icon} alt={item.label} className="w-6 h-6" />
              <span className="text-[11px] text-[#21437e]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="xp-start-menu-footer">
        <button
          className="flex items-center gap-2 text-white text-[12px] font-semibold cursor-pointer px-3 py-1 rounded hover:bg-white/20 transition-colors"
          onClick={() => { onClose(); }}
        >
          <img src={LogoutIcon} alt="Log Off" className="w-7 h-7" />
          Log Off
        </button>
        <button
          className="flex items-center gap-2 text-white text-[12px] font-semibold cursor-pointer px-3 py-1 rounded hover:bg-white/20 transition-colors"
          onClick={() => { onClose(); onShutdown(); }}
        >
          <img src={PowerIcon} alt="Turn Off" className="w-7 h-7" />
          Turn Off Computer
        </button>
      </div>
    </div>
  );
};

export default StartMenu;
