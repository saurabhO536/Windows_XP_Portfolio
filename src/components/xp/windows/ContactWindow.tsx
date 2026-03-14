import { useState } from "react";
import { Mail, Phone, Linkedin, Github } from "lucide-react";

const ContactWindow = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  return (
    <div className="p-5 font-[Tahoma]">
      <div className="flex gap-5">
        {/* Contact Info */}
        <div className="w-[200px] flex-shrink-0 space-y-3">
          <h3 className="text-sm font-bold text-gray-800 border-b border-gray-300 pb-1">📇 Contact Info</h3>
          
          <div className="space-y-2 text-xs">
            <a href="tel:9619502455" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
              <Phone size={14} /> 9619502455
            </a>
            <a href="mailto:saurabhpatil8426@gmail.com" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
              <Mail size={14} /> saurabhpatil8426@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/saurabh-patil-453a13157/" target="_blank" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
              <Linkedin size={14} /> LinkedIn
            </a>
            <a href="https://github.com/saurabhO536" target="_blank" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
              <Github size={14} /> GitHub
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="flex-1">
          <h3 className="text-sm font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3">✉️ New Message</h3>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-600 w-12">To:</label>
              <div className="flex-1 bg-gray-200 border border-gray-400 px-2 py-1 text-xs text-gray-500">
                saurabhpatil8426@gmail.com
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-600 w-12">From:</label>
              <input
                className="flex-1 border border-gray-400 px-2 py-1 text-xs bg-white focus:outline-none focus:border-blue-500"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-600 w-12">Email:</label>
              <input
                className="flex-1 border border-gray-400 px-2 py-1 text-xs bg-white focus:outline-none focus:border-blue-500"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <label className="text-xs text-gray-600 w-12 pt-1">Body:</label>
              <textarea
                className="flex-1 border border-gray-400 px-2 py-1 text-xs bg-white focus:outline-none focus:border-blue-500 h-24 resize-none"
                placeholder="Your message..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <div className="flex justify-end">
              <button className="bg-gray-200 border border-gray-400 px-4 py-1 text-xs font-semibold hover:bg-gray-300 active:bg-gray-400">
                📤 Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactWindow;
