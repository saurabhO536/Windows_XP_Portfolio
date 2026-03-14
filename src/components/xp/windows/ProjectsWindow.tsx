import { FolderOpen, ExternalLink } from "lucide-react";

const projects = [
  {
    name: "Shopper Clothing Website",
    description:
      "A modern clothing e-commerce website where users can browse and order clothes for men, women, and kids. Includes login/signup authentication and a dynamic cart system.",
    link: "https://github.com/saurabhO536/Shopper-Clothing-Website",
    tech: "React, Node.js, MongoDB",
  },
  {
    name: "HungerBeatz Food Website",
    description:
      "A food ordering website with a wide variety of items, search functionality, categorized items, shopping cart, and notifications.",
    link: "https://github.com/saurabhO536/Food-ordering-",
    tech: "React, CSS, JavaScript",
  },
  {
    name: "My Portfolio",
    description:
      "Personal portfolio website built using React with sections for About, Skills, Projects, and Contact.",
    link: "https://my-portfol-web.netlify.app/",
    tech: "React, CSS",
  },
];

const ProjectsWindow = () => {
  return (
    <div className="font-[Tahoma]">
      {/* XP Explorer toolbar */}
      <div className="bg-gray-100 border-b border-gray-300 px-3 py-1 flex items-center gap-4 text-xs text-gray-600">
        <span>📁 File</span>
        <span>✏️ Edit</span>
        <span>👁️ View</span>
        <span>⭐ Favorites</span>
        <span>🛠️ Tools</span>
        <span>❓ Help</span>
      </div>
      
      {/* Address bar */}
      <div className="bg-gray-100 border-b border-gray-300 px-3 py-1 flex items-center gap-2">
        <span className="text-xs text-gray-600">Address</span>
        <div className="flex-1 bg-white border border-gray-400 px-2 py-0.5 text-xs flex items-center">
          <FolderOpen size={12} className="text-yellow-500 mr-1" />
          C:\Users\Saurabh\Projects
        </div>
      </div>

      <div className="flex">
        {/* Side panel */}
        <div className="w-[180px] bg-gradient-to-b from-blue-50 to-blue-100 border-r border-gray-300 p-3 flex-shrink-0">
          <div className="bg-white rounded border border-blue-200 p-2 mb-2">
            <p className="text-xs font-bold text-blue-700 mb-1">📂 Project Tasks</p>
            <p className="text-[10px] text-gray-500">View my GitHub repos and live projects</p>
          </div>
          <div className="bg-white rounded border border-blue-200 p-2">
            <p className="text-xs font-bold text-blue-700 mb-1">📋 Details</p>
            <p className="text-[10px] text-gray-500">{projects.length} items</p>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 space-y-3">
          {projects.map((project) => (
            <div
              key={project.name}
              className="bg-white border border-gray-300 p-3 hover:bg-blue-50 cursor-pointer transition-colors"
            >
              <div className="flex items-start gap-3">
                <FolderOpen size={32} className="text-yellow-500 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-800">{project.name}</h3>
                  <p className="text-[11px] text-gray-500 mt-1">{project.description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[10px] bg-gray-100 px-2 py-0.5 border border-gray-300 text-gray-600">
                      {project.tech}
                    </span>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-blue-600 underline hover:text-blue-800 flex items-center gap-1"
                    >
                      <ExternalLink size={10} /> Open
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsWindow;
