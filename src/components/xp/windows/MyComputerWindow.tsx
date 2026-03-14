import FolderIcon from "@/assets/xp/Folder_Closed.png";
import MyDocumentsIcon from "@/assets/xp/My_Documents.png";
import ComputerIcon from "@/assets/xp/My_Computer.png";
import NetworkIcon from "@/assets/xp/Network_Connections.png";

const MyComputerWindow = () => {
  return (
    <div className="flex h-full">
      {/* Left sidebar */}
      <div className="w-[200px] flex-shrink-0 p-2 space-y-2" style={{ background: "linear-gradient(180deg, #6b99d1 0%, #4479c1 100%)" }}>
        <SidePanel title="System Tasks">
          <SideLink icon="🔧" label="View system information" />
          <SideLink icon="📦" label="Add or remove programs" />
          <SideLink icon="⚙️" label="Change a setting" />
        </SidePanel>
        <SidePanel title="Other Places">
          <SideLink icon={NetworkIcon} label="My Network Places" />
          <SideLink icon={MyDocumentsIcon} label="My Documents" />
          <SideLink icon={FolderIcon} label="Shared Documents" />
          <SideLink icon="🛡️" label="Control Panel" />
        </SidePanel>
        <SidePanel title="Details" collapsed />
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 bg-white overflow-auto">
        <h3 className="text-xs font-bold text-gray-700 mb-3 border-b border-gray-300 pb-1">
          Files Stored on This Computer
        </h3>
        <div className="flex gap-6 mb-6">
          <FolderItem icon={FolderIcon} label="Shared Documents" />
          <FolderItem icon={FolderIcon} label="User's Documents" />
        </div>

        <h3 className="text-xs font-bold text-gray-700 mb-3 border-b border-gray-300 pb-1">
          Hard Disk Drives
        </h3>
        <div className="flex gap-6 mb-6">
          <FolderItem icon={ComputerIcon} label="Local Disk (C:)" />
        </div>

        <h3 className="text-xs font-bold text-gray-700 mb-3 border-b border-gray-300 pb-1">
          Devices with Removable Storage
        </h3>
        <div className="flex gap-6">
          <FolderItem icon={ComputerIcon} label="3½ Floppy (A:)" />
        </div>
      </div>
    </div>
  );
};

const SidePanel = ({ title, children, collapsed }: { title: string; children?: React.ReactNode; collapsed?: boolean }) => (
  <div className="bg-white/90 rounded border border-blue-300 overflow-hidden">
    <div className="flex items-center justify-between px-2 py-1 bg-gradient-to-r from-[#2c5aa0] to-[#5b8dd9]">
      <span className="text-white text-[11px] font-bold">{title}</span>
      <span className="text-white text-[10px]">{collapsed ? "▶" : "▲"}</span>
    </div>
    {!collapsed && <div className="p-2 space-y-1">{children}</div>}
  </div>
);

const SideLink = ({ icon, label }: { icon: string; label: string }) => (
  <div className="flex items-center gap-1.5 text-[11px] text-blue-700 hover:underline cursor-pointer">
    {typeof icon === "string" && icon.startsWith("/") || (typeof icon === "string" && icon.includes("/")) ? (
      <img src={icon} alt="" className="w-4 h-4" />
    ) : (
      <span className="text-sm">{icon}</span>
    )}
    <span>{label}</span>
  </div>
);

const FolderItem = ({ icon, label }: { icon: string; label: string }) => (
  <div className="flex flex-col items-center gap-1 w-[90px] text-center cursor-pointer hover:bg-blue-100 p-2 rounded">
    <img src={icon} alt={label} className="w-10 h-10" />
    <span className="text-[11px] text-gray-700">{label}</span>
  </div>
);

export default MyComputerWindow;
