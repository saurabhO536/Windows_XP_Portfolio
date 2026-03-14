import { useState, useEffect } from "react";

interface TaskbarProps {
  openWindows: { id: string; title: string }[];
  activeWindow: string | null;
  onWindowClick: (id: string) => void;
  onStartClick: () => void;
  startOpen: boolean;
}

const Taskbar = ({ openWindows, activeWindow, onWindowClick, onStartClick, startOpen }: TaskbarProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="xp-taskbar">
      <button
        className={`xp-start-btn ${startOpen ? "active" : ""}`}
        onClick={(e) => { e.stopPropagation(); onStartClick(); }}
      >
        <span style={{ fontSize: 16 }}>🪟</span>
        <span>start</span>
      </button>

      <div className="flex items-center gap-1 px-2 flex-1 overflow-hidden">
        {openWindows.map((win) => (
          <button
            key={win.id}
            className={`xp-taskbar-window-btn ${activeWindow === win.id ? "active" : ""}`}
            onClick={() => onWindowClick(win.id)}
          >
            {win.title}
          </button>
        ))}
      </div>

      <div className="xp-clock">
        <div className="flex items-center gap-2 mr-2">
          <span className="text-[14px] cursor-pointer hover:opacity-80" title="Internet">🌐</span>
          <span className="text-[14px] cursor-pointer hover:opacity-80" title="Volume">🔊</span>
        </div>
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
    </div>
  );
};

export default Taskbar;
