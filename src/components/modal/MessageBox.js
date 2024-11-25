import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function MessageBox({ title, text, onClose, buttons = [{ label: "OK", value: true }] }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleButtonClick = (value) => {
    setIsOpen(false);
    onClose(value); // Pass the button value to resolve the promise
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
        <p className="text-gray-600 mb-6">{text}</p>
        <button
          onClick={() => handleButtonClick(null)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>
        <div className="flex justify-end space-x-4">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(button.value)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default MessageBox;
