import React from "react";
import { createRoot } from "react-dom/client";
import MessageBox from "./MessageBox";

export function showMessageBox(title, text, buttons = [{ label: "OK", value: true }]) {
  return new Promise((resolve) => {
    const modalRoot = document.createElement("div");
    document.body.appendChild(modalRoot);
    const root = createRoot(modalRoot);

    const handleClose = (response) => {
      root.unmount();
      document.body.removeChild(modalRoot);
      resolve(response); // Resolve the promise with the button's value
    };

    root.render(<MessageBox title={title} text={text} onClose={handleClose} buttons={buttons} />);
  });
}
