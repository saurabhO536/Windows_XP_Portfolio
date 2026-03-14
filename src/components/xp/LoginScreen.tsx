import { useState } from "react";
import { User, HelpCircle } from "lucide-react";
import ShutdownDialog from "./ShutdownDialog";
import GoImg from "@/assets/xp/Go.png";
import WindowsLogo from "@/assets/xp/Windowslogo.png";
import PowerIcon from "@/assets/xp/310_32x32.png";

interface LoginScreenProps {
  onLogin: () => void;
}

const CORRECT_PASSWORD = "Saurabh@8426";

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [selectedUser, setSelectedUser] = useState<"saurabh" | "guest" | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showShutdown, setShowShutdown] = useState(false);

  const handleSaurabhClick = () => {
    setSelectedUser("saurabh");
    setPassword("");
    setError(false);
  };

  const handleGuestClick = () => {
    try {
      const audio = new Audio("/sounds/xp-logon.wav");
      audio.volume = 0.5;
      audio.play().catch(() => {});
    } catch (e) {}
    onLogin();
  };

  const handlePasswordSubmit = () => {
    if (password === CORRECT_PASSWORD) {
      try {
        const audio = new Audio("/sounds/xp-logon.wav");
        audio.volume = 0.5;
        audio.play().catch(() => {});
      } catch (e) {}
      onLogin();
    } else {
      setError(true);
      setPassword("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handlePasswordSubmit();
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden" style={{ fontFamily: "'Source Sans Pro', Tahoma, sans-serif" }}>
      {/* Header bar */}
      <div className="relative flex-shrink-0" style={{ minHeight: "12.5vh", background: "#084da3" }}>
        <div
          className="absolute bottom-0 left-0 right-0 h-[7px]"
          style={{
            background: "linear-gradient(270deg, #084da3 -33%, #084da3 6%, #ffffff 50%, #084da3 83%, #084da3 121%)",
          }}
        />
      </div>

      {/* Main area */}
      <main
        className="flex-1 grid items-center"
        style={{
          gridTemplateColumns: "1fr auto 1fr",
          background: "radial-gradient(19.48% 42.48% at 10% 22.48%, #9cc0e9 0%, #508fd9 100%)",
        }}
      >
        {/* Left side - Logo & text */}
        <div className="flex flex-col items-end pr-4">
          <div className="flex items-center gap-3">
            <img src={WindowsLogo} alt="Windows XP" className="w-[52px] h-[48px]" />
            <div>
              <div className="text-white text-[12px] tracking-wide">
                Microsoft<span className="align-super text-[7px]">®</span>
              </div>
              <div className="text-white font-bold text-[36px] leading-none" style={{ letterSpacing: "-0.5px" }}>
                Windows<span className="text-[#FF6600] text-[22px] align-super font-bold ml-1">xp</span>
              </div>
            </div>
          </div>

          <h1 className="text-white text-[22px] font-light mt-8 mr-10" style={{ fontWeight: 400 }}>
            To begin, click your user name
          </h1>
        </div>

        {/* Vertical separator */}
        <div
          className="w-[2px] mx-10 self-center"
          style={{
            height: "80%",
            background: "linear-gradient(180deg, #508fd9 0%, #ffffff 47%, #508fd9 99%)",
          }}
        />

        {/* Right side - Users */}
        <div className="flex flex-col gap-6 pl-4">
          {/* Saurabh Patil */}
          <UserCard
            name="Saurabh Patil"
            isSelected={selectedUser === "saurabh"}
            onClick={handleSaurabhClick}
          >
            {selectedUser === "saurabh" && (
              <div className="mt-2">
                <p className="text-[13px] mb-2" style={{ fontFamily: "Verdana, sans-serif" }}>
                  Type your password
                </p>
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(false); }}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="h-[36px] w-[200px] px-2 text-sm bg-white text-black border rounded outline-none"
                    style={{ border: "0.5px solid #333" }}
                  />
                  <button onClick={handlePasswordSubmit} className="w-[36px] h-[36px] cursor-pointer">
                    <img src={GoImg} alt="Submit" className="w-full h-full" />
                  </button>
                  <button
                    className="w-[36px] h-[36px] rounded flex items-center justify-center cursor-pointer border border-white"
                    style={{
                      background: "#2266f5",
                      boxShadow: "inset 4px 2px 8px rgba(255,255,255,0.6), inset -2px -3px 5px #0844c3",
                    }}
                    onClick={() => alert("Hint: Name@LastFourDigits")}
                  >
                    <HelpCircle size={16} className="text-white" />
                  </button>
                </div>
                {error && (
                  <p className="text-red-200 text-[12px] mt-2">
                    ⚠️ The password is incorrect. Please try again.
                  </p>
                )}
              </div>
            )}
          </UserCard>

          {/* Guest */}
          <UserCard name="Guest" isSelected={false} onClick={handleGuestClick} />
        </div>
      </main>

      {/* Footer */}
      <div className="relative flex-shrink-0 flex items-center justify-between px-12" style={{ minHeight: "14.5vh", background: "#084da3" }}>
        <div
          className="absolute top-0 left-0 right-0 h-[7px]"
          style={{
            background: "linear-gradient(270deg, #084da3 -33%, #084da3 6%, #ff9933 50%, #084da3 83%, #084da3 121%)",
          }}
        />

        <button className="flex items-center gap-5 cursor-pointer" onClick={() => setShowShutdown(true)}>
          <img src={PowerIcon} alt="Turn off" className="w-10 h-10" />
          <span className="text-white text-[18px] font-normal">Turn off computer</span>
        </button>

        <div className="text-right text-white text-[13px] tracking-wide" style={{ fontWeight: 300, letterSpacing: "0.5px" }}>
          <p>After you log on, you can add or change accounts.</p>
          <p>Just go to your Control Panel and click User Accounts</p>
        </div>
      </div>

      {showShutdown && <ShutdownDialog onClose={() => setShowShutdown(false)} />}
    </div>
  );
};

/* Extracted user card sub-component */
function UserCard({ name, isSelected, onClick, children }: {
  name: string;
  isSelected: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}) {
  return (
    <section
      className="flex items-center rounded-l cursor-pointer transition-all duration-300"
      style={{
        width: 420,
        minHeight: 100,
        padding: "15px 20px",
        opacity: isSelected ? 1 : 0.6,
        background: isSelected
          ? "linear-gradient(90deg, #084da3 0%, #508fd9 100%)"
          : "transparent",
      }}
      onClick={onClick}
      onMouseEnter={(e) => { if (!isSelected) (e.currentTarget as HTMLElement).style.opacity = "1"; }}
      onMouseLeave={(e) => { if (!isSelected) (e.currentTarget as HTMLElement).style.opacity = "0.6"; }}
    >
      <div
        className="w-[76px] h-[76px] flex-shrink-0 rounded flex items-center justify-center transition-all duration-200"
        style={{
          background: "rgba(255,255,255,0.15)",
          border: isSelected ? "2px solid #ffcc00" : "2px solid #fff",
        }}
      >
        <User size={42} className="text-white/90" />
      </div>
      <div className="ml-5 text-white flex-1">
        <h3 className="text-[20px] font-normal">{name}</h3>
        {children}
      </div>
    </section>
  );
}

export default LoginScreen;
