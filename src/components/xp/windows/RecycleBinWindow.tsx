import MyDocumentsIcon from "@/assets/xp/My_Documents.png";
import FolderIcon from "@/assets/xp/Folder_Closed.png";
import NetworkIcon from "@/assets/xp/Network_Connections.png";

const RecycleBinWindow = () => {
  return (
    <div className="flex h-full">
      {/* Left sidebar */}
      <div className="w-[200px] flex-shrink-0 p-2 space-y-2" style={{ background: "linear-gradient(180deg, #6b99d1 0%, #4479c1 100%)" }}>
        <SidePanel title="Recycle Bin Tasks">
          <SideLink label="Empty the Recycle Bin" />
          <SideLink label="Restore all items" />
        </SidePanel>
        <SidePanel title="Other Places">
          <SideLink icon={NetworkIcon} label="My Network Places" />
          <SideLink icon={MyDocumentsIcon} label="My Documents" />
          <SideLink icon={FolderIcon} label="Shared Documents" />
          <SideLink label="Control Panel" />
        </SidePanel>
        <SidePanel title="Details" collapsed />
      </div>

      {/* Main content - empty */}
      <div className="flex-1 bg-white" />
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

const SideLink = ({ icon, label }: { icon?: string; label: string }) => (
  <div className="flex items-center gap-1.5 text-[11px] text-blue-700 hover:underline cursor-pointer">
    {icon ? <img src={icon} alt="" className="w-4 h-4" /> : <span className="text-sm">📄</span>}
    <span>{label}</span>
  </div>
);

export default RecycleBinWindow;
