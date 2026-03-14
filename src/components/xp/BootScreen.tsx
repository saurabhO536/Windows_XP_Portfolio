import { useState, useEffect } from "react";
import WindowsLogo from "@/assets/xp/windows-off.png";

interface BootScreenProps {
  onComplete: () => void;
}

const BootScreen = ({ onComplete }: BootScreenProps) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [barPosition, setBarPosition] = useState(0);

  useEffect(() => {
    try {
      const audio = new Audio("/sounds/xp-startup.wav");
      audio.volume = 0.6;
      audio.play().catch(() => {});
    } catch (e) {}

    const barInterval = setInterval(() => {
      setBarPosition((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 50);

    const fadeTimer = setTimeout(() => setFadeOut(true), 6000);
    const completeTimer = setTimeout(() => onComplete(), 7000);

    return () => {
      clearInterval(barInterval);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`h-screen w-screen bg-black flex flex-col items-center justify-center transition-opacity duration-1000 ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
      <div className="flex flex-col items-center">
        <img src={WindowsLogo} alt="Windows XP" className="w-[80px] h-auto mb-3" />

        <div className="text-center mt-1">
          <span className="text-white text-[15px] tracking-wide" style={{ fontFamily: "Franklin Gothic Medium, Tahoma, sans-serif" }}>
            Microsoft<span className="align-super text-[8px]">®</span>
          </span>
        </div>
        <div className="text-center -mt-1">
          <span className="text-white font-bold text-[48px] leading-none" style={{ fontFamily: "Franklin Gothic Medium, Tahoma, sans-serif", letterSpacing: "-1px" }}>
            Windows
          </span>
          <span className="text-[#FF6600] font-bold text-[28px] align-super ml-1" style={{ fontFamily: "Franklin Gothic Medium, Tahoma, sans-serif" }}>
            xp
          </span>
        </div>
      </div>

      {/* Loading bar */}
      <div className="mt-16">
        <div
          className="w-[200px] h-[22px] rounded-[2px] overflow-hidden relative"
          style={{
            background: "#1a1a1a",
            border: "1px solid #555",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.5)",
          }}
        >
          <div
            className="absolute top-[3px] bottom-[3px] flex gap-[3px] transition-none"
            style={{ left: `${barPosition - 30}%`, width: "30%" }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-full w-[12px] rounded-[1px]"
                style={{ background: "linear-gradient(180deg, #5B9BD5 0%, #2B6CB0 50%, #5B9BD5 100%)" }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-10 right-10 flex justify-between items-end">
        <p className="text-gray-500 text-[11px]" style={{ fontFamily: "Lucida Console, Consolas, monospace" }}>
          Copyright © Microsoft Corporation
        </p>
        <p className="text-white text-[13px] font-bold italic" style={{ fontFamily: "Franklin Gothic Medium, Tahoma, sans-serif" }}>
          Microsoft<span className="align-super text-[6px]">®</span>
        </p>
      </div>
    </div>
  );
};

export default BootScreen;
