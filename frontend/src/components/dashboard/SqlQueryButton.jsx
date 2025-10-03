// import { useState } from "react";
import { Code } from "lucide-react";
import SqlQueryModal from "./SqlQueryModal";

const SqlQueryButton = ({ handleButtonClick, query, title }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // // Memoized function to prevent unnecessary re-renders
  // const openModal = () => setIsModalOpen(true)
  // const closeModal = () => setIsModalOpen(false)
  console.log("SqlQueryButton");
  return (
    <>
      <button
        className="bg-coffee-cream/30 border border-coffee-light text-coffee-dark text-xs py-1 px-2 rounded flex items-center gap-1 hover: bg-coffee-cream transition-colors mt-1 cursor-pointer"
        onClick={() => handleButtonClick(query, title)}
        title="Show SQL Query"
      >
        <Code size={14} />
        <span>SQL Query</span>
      </button>

      {/* {isModalOpen && (<SqlQueryModal onClose={closeModal} query={query} title={title} />)} */}
    </>
  );
};

export default SqlQueryButton;
