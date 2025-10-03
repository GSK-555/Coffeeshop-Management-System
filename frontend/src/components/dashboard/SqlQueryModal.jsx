import { useState } from "react";
import { Code, X, Clipboard } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SqlQueryModal = ({ onClose, query, title }) => {
  // Function to generate a random color
  const getRandomColor = () => {
    const letters = '89ABCDEF'; // Use a subset for more cohesive colors
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  };

  // Split the query into words and assign a random color to each
  const coloredQuery = query.split(' ').map((word, index) => (
    <span key={index} style={{ color: getRandomColor() }}>
      {word}{' '}
    </span>
  ));

  // Function to copy the query to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(query).then(() => {
      toast.success("SQL query copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy text: ", err);
      toast.error("Failed to copy text.");
    });
  };

  console.log("SqlQueryModal", onClose, query, title);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50" onClick={onClose}>
        <div
          className="bg-gray-900 w-[90%] max-w-3xl max-h-[90vh] rounded-lg overflow-hidden flex flex-col shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-4 bg-gray-800 text-white border-b border-gray-900">
            <h3 className="text-lg flex items-center gap-2">
              <Code size={18} />
              {title || "SQL Query"}
            </h3>
            <div className="flex items-center gap-2">
              <button onClick={copyToClipboard} className="text-white hover:bg-gray-900 p-1 rounded">
                <Clipboard size={18} />
              </button>
              <button onClick={onClose} className="text-white hover:bg-gray-900 p-1 rounded">
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="p-5 overflow-y-auto flex-1">
            <pre className="text-sm bg-gray-900 text-white p-4 rounded">
              {coloredQuery}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default SqlQueryModal;