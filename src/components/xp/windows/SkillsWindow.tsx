const skills = [
  { name: "HTML", level: 90, color: "hsl(14, 77%, 52%)" },
  { name: "CSS", level: 85, color: "hsl(210, 65%, 50%)" },
  { name: "JavaScript", level: 80, color: "hsl(50, 90%, 45%)" },
  { name: "React", level: 78, color: "hsl(193, 95%, 42%)" },
  { name: "Java", level: 70, color: "hsl(0, 72%, 48%)" },
  { name: "SQL", level: 65, color: "hsl(210, 50%, 40%)" },
];

const SkillsWindow = () => {
  return (
    <div className="p-5 font-[Tahoma]">
      <div className="bg-white border border-gray-300 p-3 mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-blue-600 text-lg">ℹ️</span>
          <span className="font-bold text-sm text-gray-700">System Information</span>
        </div>
        <p className="text-xs text-gray-500">Installed skills and proficiency levels</p>
      </div>

      <div className="space-y-3">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-gray-700">{skill.name}</span>
              <span className="text-gray-500">{skill.level}%</span>
            </div>
            <div className="w-full h-5 bg-gray-200 border border-gray-400 rounded-sm overflow-hidden">
              <div
                className="h-full transition-all duration-1000"
                style={{
                  width: `${skill.level}%`,
                  background: `linear-gradient(180deg, ${skill.color}, ${skill.color}dd)`,
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.3)`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-white border border-gray-300 p-3">
        <p className="text-xs text-gray-500">
          <span className="font-bold">Total Skills Installed:</span> {skills.length} |{" "}
          <span className="font-bold">Status:</span> All skills running optimally ✅
        </p>
      </div>
    </div>
  );
};

export default SkillsWindow;
