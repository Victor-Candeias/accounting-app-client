// messageBoxService.js
import React from "react";
import { createRoot } from "react-dom/client";
import MessageBox from "./MessageBox";

export function showMessageBox(title, text) {
  return new Promise((resolve) => {
    const modalRoot = document.createElement("div");
    document.body.appendChild(modalRoot);
    const root = createRoot(modalRoot);

    const handleClose = () => {
      root.unmount();
      document.body.removeChild(modalRoot);
      resolve(); // Resolve the promise when closed
    };

    root.render(<MessageBox title={title} text={text} onClose={handleClose} />);
  });
}
