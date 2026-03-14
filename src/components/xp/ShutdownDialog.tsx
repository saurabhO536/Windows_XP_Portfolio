import { useState } from "react";
import WindowsLogoIcon from "@/assets/xp/Windowslogo.png";
import PowerImg from "@/assets/xp/Power.png";
import StandbyImg from "@/assets/xp/Standby.png";
import RestartImg from "@/assets/xp/Restart.png";

interface ShutdownDialogProps {
  onClose: () => void;
}

const ShutdownDialog = ({ onClose }: ShutdownDialogProps) => {
  const [fading, setFading] = useState(false);

  const handleShutdown = () => {
    setFading(true);
    setTimeout(() => {
      document.body.style.background = "black";
      document.getElementById("root")!.style.display = "none";
    }, 1500);
  };

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <>
      {fading && (
        <div className="fixed inset-0 bg-black z-[100000] animate-fade-in" />
      )}
      {/* Overlay */}
      <div className="fixed inset-0 z-[10001]" style={{ background: "rgba(0, 48, 120, 0.65)" }} onClick={onClose} />
      {/* Dialog */}
      <div
        className="fixed z-[10002] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 400,
          background: "linear-gradient(180deg, #4b7fbb 0%, #3568a2 100%)",
          borderRadius: 10,
          border: "2px solid #1e4070",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3">
          <span className="text-white font-bold text-base" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.4)" }}>
            Turn Off Computer
          </span>
          <img src={WindowsLogoIcon} alt="Windows" className="w-[40px] h-[36px]" />
        </div>

        {/* Body */}
        <div
          className="mx-3 mb-3 rounded-lg py-8 flex items-center justify-center gap-10"
          style={{
            background: "linear-gradient(180deg, #6ca0d9 0%, #5a90c8 100%)",
            border: "1px solid #4a7db5",
          }}
        >
          <button className="flex flex-col items-center gap-2 group cursor-pointer" onClick={onClose}>
            <img src={StandbyImg} alt="Stand By" className="w-14 h-14 group-hover:scale-110 transition-transform drop-shadow-lg" />
            <span className="text-white text-xs font-semibold" style={{ textShadow: "1px 1px 1px rgba(0,0,0,0.5)" }}>
              Stand By
            </span>
          </button>

          <button className="flex flex-col items-center gap-2 group cursor-pointer" onClick={handleShutdown}>
            <img src={PowerImg} alt="Turn Off" className="w-14 h-14 group-hover:scale-110 transition-transform drop-shadow-lg" />
            <span className="text-white text-xs font-semibold" style={{ textShadow: "1px 1px 1px rgba(0,0,0,0.5)" }}>
              Turn Off
            </span>
          </button>

          <button className="flex flex-col items-center gap-2 group cursor-pointer" onClick={handleRestart}>
            <img src={RestartImg} alt="Restart" className="w-14 h-14 group-hover:scale-110 transition-transform drop-shadow-lg" />
            <span className="text-white text-xs font-semibold" style={{ textShadow: "1px 1px 1px rgba(0,0,0,0.5)" }}>
              Restart
            </span>
          </button>
        </div>

        {/* Cancel */}
        <div className="flex justify-end pb-3 pr-4">
          <button
            onClick={onClose}
            className="px-6 py-1 text-gray-800 text-xs font-semibold rounded border"
            style={{
              background: "linear-gradient(180deg, #f0f0f0 0%, #d8d8d8 100%)",
              border: "1px solid #888",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default ShutdownDialog;
