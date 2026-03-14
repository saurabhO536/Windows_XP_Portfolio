import { User, MapPin, Code } from "lucide-react";

const AboutWindow = () => {
  return (
    <div className="p-6 font-[Tahoma]">
      <div className="flex items-start gap-6">
        <div className="w-28 h-28 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
          <User size={56} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-1">Saurabh Patil</h2>
          <p className="text-sm font-semibold text-blue-600 mb-3 flex items-center gap-1">
            <Code size={14} /> Web Developer
          </p>
          <p className="text-xs text-gray-600 leading-relaxed max-w-md">
            I'm a passionate Web Developer specializing in building responsive,
            user-friendly websites and web applications. With a strong foundation
            in HTML, CSS, JavaScript, and modern frameworks like React, I create
            digital experiences that are both functional and visually engaging.
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-300 pt-4">
        <h3 className="text-sm font-bold text-gray-700 mb-3">System Properties</h3>
        <table className="text-xs w-full">
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="py-2 font-semibold text-gray-600 w-32">Name:</td>
              <td className="py-2">Saurabh Patil</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-2 font-semibold text-gray-600">Role:</td>
              <td className="py-2">Web Developer</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-2 font-semibold text-gray-600">Email:</td>
              <td className="py-2 text-blue-600">saurabhpatil8426@gmail.com</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-2 font-semibold text-gray-600">GitHub:</td>
              <td className="py-2">
                <a href="https://github.com/saurabhO536" target="_blank" className="text-blue-600 underline hover:text-blue-800">
                  github.com/saurabhO536
                </a>
              </td>
            </tr>
            <tr>
              <td className="py-2 font-semibold text-gray-600">LinkedIn:</td>
              <td className="py-2">
                <a href="https://www.linkedin.com/in/saurabh-patil-453a13157/" target="_blank" className="text-blue-600 underline hover:text-blue-800">
                  linkedin.com/in/saurabh-patil
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AboutWindow;
