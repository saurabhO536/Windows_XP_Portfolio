import { useState } from "react";

const defaultText = `Hello World! 🌍 ✨

Reorganize the draggable icons on the desktop, then double-click to open the apps and explore.

This project is my way of taking a delightful trip down memory lane, back to the early 2000s—a time of AOL Instant Messenger, MySpace, and the early days of online creativity. It was an exciting era of innovation and discovery.

You'll find the classic sections—About, Projects, and Contact—inside the Maxthon Browser on the desktop. Think of it as blending nostalgic charm with modern tech, all wrapped up in the iconic XP style.

So go ahead, double-click those icons, and dive into a nostalgic adventure! Enjoy!`;

const NotepadWindow = () => {
  const [text, setText] = useState(defaultText);

  return (
    <textarea
      className="w-full h-full resize-none border-none outline-none p-1 font-mono text-sm bg-white"
      style={{ fontFamily: "'Lucida Console', 'Courier New', monospace", fontSize: 13, lineHeight: 1.4 }}
      value={text}
      onChange={(e) => setText(e.target.value)}
      spellCheck={false}
    />
  );
};

export default NotepadWindow;
