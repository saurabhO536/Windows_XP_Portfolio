import { useState } from "react";
import { User } from "lucide-react";

const tabs = ["About", "Projects", "Contact"] as const;
type Tab = typeof tabs[number];

const BrowserWindow = () => {
  const [activeTab, setActiveTab] = useState<Tab>("About");

  return (
    <div className="flex flex-col h-full">
      {/* Browser tabs */}
      <div className="bg-[#e8e8e8] flex items-end border-b border-gray-400">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1 text-[11px] border border-gray-400 border-b-0 rounded-t-sm mr-[1px] ${
              activeTab === tab
                ? "bg-white font-bold border-b-white -mb-[1px] z-10"
                : "bg-[#d4d0c8] hover:bg-[#e0ddd5]"
            }`}
          >
            {tab === "About" && "🏠 "}{tab === "Projects" && "🔥 "}{tab === "Contact" && "✉️ "}
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-white">
        {activeTab === "About" && <AboutTab />}
        {activeTab === "Projects" && <ProjectsTab />}
        {activeTab === "Contact" && <ContactTab />}
      </div>
    </div>
  );
};

/* ===== MySpace-style About page ===== */
const AboutTab = () => (
  <div>
    {/* MySpace header */}
    <div className="bg-[#003399] text-white py-4">
      <div className="flex items-center justify-center gap-4 text-sm">
        <span className="font-bold">MySpace.com</span>
        <span>|</span>
        <span>Home</span>
      </div>
      <div className="flex items-center justify-center gap-3 mt-2 text-xs">
        <label className="flex items-center gap-1"><input type="radio" name="search" className="accent-white" /> The Web</label>
        <label className="flex items-center gap-1"><input type="radio" name="search" defaultChecked className="accent-orange-500" /> MySpace</label>
        <input className="border px-2 py-0.5 text-black text-xs w-40" />
        <button className="bg-white text-black px-2 py-0.5 text-xs border">search</button>
        <span className="ml-4">Help | SignUp</span>
      </div>
    </div>

    {/* Nav bar */}
    <div className="bg-[#6699CC] text-white flex justify-center gap-2 py-1 text-[11px] flex-wrap">
      {["Home", "Browse", "Search", "Invite", "Film", "Mail", "Blog", "Favorites", "Forum", "Group", "Events", "Video", "Music", "Comedy", "Classifieds"].map((n) => (
        <span key={n} className="hover:underline cursor-pointer px-1">| {n}</span>
      ))}
    </div>

    {/* Profile content */}
    <div className="flex flex-wrap p-4 gap-6">
      {/* Left column */}
      <div className="w-[320px] space-y-4">
        <h1 className="text-xl font-bold text-gray-800">Saurabh Patil</h1>
        <div className="flex gap-4">
          <div className="w-[120px] h-[120px] rounded bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
            <User size={56} className="text-white" />
          </div>
          <div className="text-sm space-y-0.5">
            <p className="text-orange-600 font-bold italic">"Code. Create. Conquer."</p>
            <p>Male</p>
            <p>Web Developer</p>
            <p>India</p>
            <p className="text-green-600 font-bold text-xs mt-1">🟢 Online Now!</p>
            <p className="text-xs text-gray-500 mt-1">Last Login: {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
          </div>
        </div>

        {/* Contacting */}
        <div>
          <div className="bg-[#5892c5] text-white px-2 py-1 text-xs font-bold rounded-t">
            Contacting Saurabh Patil
          </div>
          <div className="border border-[#b5d2ec] p-2 grid grid-cols-2 gap-2 text-xs text-blue-700">
            <a href="mailto:saurabhpatil8426@gmail.com" className="hover:underline">✉️ Send Message</a>
            <span className="cursor-pointer hover:underline">📨 Forward to Friend</span>
            <span className="cursor-pointer hover:underline">👥 Add to Friends</span>
            <span className="cursor-pointer hover:underline">⭐ Add to Favorites</span>
            <span className="cursor-pointer hover:underline">💬 Instant Message</span>
            <span className="cursor-pointer hover:underline">🚫 Block User</span>
          </div>
        </div>

        {/* Interests */}
        <div>
          <div className="bg-[#5892c5] text-white px-2 py-1 text-xs font-bold rounded-t">
            Saurabh's Interests
          </div>
          <table className="w-full text-xs border border-[#b5d2ec]">
            <tbody>
              {[
                ["General:", "Internet, Web Development, React, Node.js"],
                ["Music:", "Lo-fi, Bollywood, EDM"],
                ["Movies:", "Sci-fi, Thriller, Marvel"],
                ["Goals:", "To become an expert full-stack developer and build products that impact millions"],
              ].map(([k, v]) => (
                <tr key={k} className="border-b border-[#d5e6f5]">
                  <td className="bg-[#d5e8f8] px-2 py-1.5 font-bold text-[#2c5aa0] w-[100px]">{k}</td>
                  <td className="px-2 py-1.5">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Details */}
        <div>
          <div className="bg-[#5892c5] text-white px-2 py-1 text-xs font-bold rounded-t">
            Saurabh's Details
          </div>
          <table className="w-full text-xs border border-[#b5d2ec]">
            <tbody>
              {[
                ["Status:", "Web Developer"],
                ["Here For:", "Skills, Collaborators, Work opportunities"],
                ["Hobbies:", "Coding, Reading Tech Blogs"],
                ["Hometown:", "India"],
                ["Occupation:", "Web Developer"],
              ].map(([k, v]) => (
                <tr key={k} className="border-b border-[#d5e6f5]">
                  <td className="bg-[#d5e8f8] px-2 py-1.5 font-bold text-[#2c5aa0] w-[110px]">{k}</td>
                  <td className="px-2 py-1.5">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right column */}
      <div className="flex-1 min-w-[280px] space-y-4">
        {/* Network */}
        <div className="border-2 border-black p-4 text-center">
          <p className="text-lg font-bold">Saurabh Patil is in your extended network</p>
        </div>

        {/* Blurbs */}
        <div>
          <div className="bg-[#ffc87c] px-2 py-1 text-xs font-bold text-orange-700 rounded-t">
            Saurabh's blurbs
          </div>
          <div className="border border-orange-200 p-3 text-sm space-y-2">
            <p className="font-bold text-orange-600">About me:</p>
            <p>Bet you didn't know...</p>
            <p>I'm a passionate Web Developer who loves building modern, user-friendly applications. With experience in HTML, CSS, JavaScript, React, and more, I create digital experiences that are both functional and visually engaging.</p>
            <p className="font-bold text-orange-600 mt-3">Who I'd Like to meet:</p>
            <p>Fellow web devs, coders, and tech enthusiasts.</p>
          </div>
        </div>

        {/* Skills */}
        <div>
          <div className="bg-[#ffc87c] px-2 py-1 text-xs font-bold text-orange-700 rounded-t">
            Saurabh's skill space
          </div>
          <div className="border border-orange-200 p-3">
            <p className="font-bold text-sm mb-3">Saurabh has <span className="text-orange-600">6</span> skills.</p>
            <div className="grid grid-cols-4 gap-4 text-center text-xs">
              {[
                { name: "HTML", emoji: "🌐" },
                { name: "CSS", emoji: "🎨" },
                { name: "JavaScript", emoji: "⚡" },
                { name: "React", emoji: "⚛️" },
                { name: "Java", emoji: "☕" },
                { name: "SQL", emoji: "🗄️" },
              ].map((s) => (
                <div key={s.name} className="flex flex-col items-center gap-1">
                  <span className="text-3xl">{s.emoji}</span>
                  <span className="font-semibold">{s.name}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-orange-600 text-right mt-2 hover:underline cursor-pointer">View All of Saurabh's skills</p>
          </div>
        </div>

        {/* Comments */}
        <div>
          <div className="bg-[#ffc87c] px-2 py-1 text-xs font-bold text-orange-700 rounded-t">
            Comments
          </div>
          <div className="border border-orange-200 p-3">
            <div className="flex justify-between text-xs mb-2">
              <span>Displaying <span className="text-orange-600">1</span> of comments</span>
              <span className="text-blue-600">View All | Add Comment</span>
            </div>
            <div className="bg-[#ffecd0] p-3 rounded flex gap-3 text-xs">
              <div className="text-center w-16 flex-shrink-0">
                <div className="text-2xl">🤖</div>
                <p className="text-[10px] mt-1">Visitor</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Jan 1, 2025 &nbsp; Reply | Report | View All</p>
                <p className="font-bold text-purple-700 text-sm italic">
                  if (brain.isEmpty()) {"{"} keepCoding(); {"}"}
                  <br />
                  else {"{"} orderCoffee(); {"}"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ===== Projects Tab ===== */
const projects = [
  {
    name: "Shopper Clothing Website",
    description: "A modern clothing e-commerce website where users can browse and order clothes.",
    link: "https://github.com/saurabhO536/Shopper-Clothing-Website",
    tech: "React, Node.js, MongoDB",
  },
  {
    name: "HungerBeatz Food Website",
    description: "A food ordering website with search functionality and shopping cart.",
    link: "https://github.com/saurabhO536/Food-ordering-",
    tech: "React, CSS, JavaScript",
  },
  {
    name: "My Portfolio",
    description: "Personal portfolio website built using React.",
    link: "https://my-portfol-web.netlify.app/",
    tech: "React, CSS",
  },
];

const ProjectsTab = () => (
  <div className="p-4 space-y-4">
    <h2 className="text-lg font-bold text-gray-800">📁 My Projects</h2>
    {projects.map((p) => (
      <div key={p.name} className="border border-gray-300 p-3 rounded hover:bg-blue-50 transition-colors">
        <h3 className="font-bold text-sm text-blue-800">{p.name}</h3>
        <p className="text-xs text-gray-600 mt-1">{p.description}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-[10px] bg-gray-100 px-2 py-0.5 border border-gray-300">{p.tech}</span>
          <a href={p.link} target="_blank" rel="noreferrer" className="text-[11px] text-blue-600 underline hover:text-blue-800">
            🔗 Open
          </a>
        </div>
      </div>
    ))}
  </div>
);

/* ===== Contact Tab ===== */
const ContactTab = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-bold text-gray-800">✉️ Contact Me</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-gray-700">📇 Contact Info</h3>
          <div className="text-xs space-y-1.5">
            <p>📞 <a href="tel:9619502455">9619502455</a></p>
            <p>✉️ <a href="mailto:saurabhpatil8426@gmail.com" className="text-blue-600 hover:underline">saurabhpatil8426@gmail.com</a></p>
            <p>💼 <a href="https://www.linkedin.com/in/saurabh-patil-453a13157/" target="_blank" className="text-blue-600 hover:underline">LinkedIn</a></p>
            <p>🐙 <a href="https://github.com/saurabhO536" target="_blank" className="text-blue-600 hover:underline">GitHub</a></p>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-gray-700">📝 Send a Message</h3>
          <input
            className="w-full border border-gray-400 px-2 py-1 text-xs"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            className="w-full border border-gray-400 px-2 py-1 text-xs"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <textarea
            className="w-full border border-gray-400 px-2 py-1 text-xs h-20 resize-none"
            placeholder="Your message..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
          <button className="bg-gray-200 border border-gray-400 px-4 py-1 text-xs font-semibold hover:bg-gray-300">
            📤 Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrowserWindow;
