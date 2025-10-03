import { useState, useEffect } from "react";
import Modal from "./Modal";

const ResultDisplay = ({ selectedQuery, naturalLanguageQuery }) => {
  const [result, setResult] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [tableError, setTableError] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [descLoading, setDescLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);

  useEffect(() => {
    const fetchDescription = async (tableData) => {
      setDescLoading(true);
      setImageError(null);
      try {
        const response = await fetch("http://localhost:5000/api/describe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tableData }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate image.");
        }

        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageUrl(imageUrl);
      } catch (err) {
        console.error("Image fetch error:", err);
        setImageError("Failed to generate image.");
      } finally {
        setDescLoading(false);
      }
    };

    const fetchResults = async (url, options) => {
      setLoading(true);
      setTableError(null);
      setImageUrl(null);

      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        if (!data.success) {
          setTableError("Failed to fetch results.");
        } else if (!data.sqlResult || data.sqlResult.length === 0) {
          setTableError("No results found.");
          setResult([]);
        } else {
          setResult(data.sqlResult);
          fetchDescription(data.sqlResult);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setTableError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    if (selectedQuery) {
      fetchResults(`http://localhost:5000/api/query?key=${encodeURIComponent(selectedQuery)}`);
    } else if (naturalLanguageQuery) {
      fetchResults(`http://localhost:5000/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: naturalLanguageQuery }),
      });
    }
  }, [naturalLanguageQuery, selectedQuery]);

  return (
    <div className="flex justify-center items-start w-full min-h-screen p-5 bg-gray-900 text-white">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 w-full max-w-7xl bg-gray-800 p-10 rounded-lg shadow-lg overflow-y-auto">
        {/* Table Section */}
        {loading ? (
          <p className="text-lg italic text-center text-gray-400">Fetching data...</p>
        ) : tableError ? (
          <p className="text-lg font-bold text-center text-red-500">{tableError}</p>
        ) : result.length > 0 && result[0] ? (
          <div className="w-full overflow-hidden cursor-pointer flex-grow" onClick={() => setIsTableModalOpen(true)}> {/* Make table section use available space */}
            <div className="max-h-[600px] overflow-y-auto">
              <table className="w-full border-collapse font-sans text-lg text-left bg-gray-800 rounded-lg overflow-hidden shadow-md transition-shadow duration-300 border border-gray-700">
                <thead>
                  <tr>
                    {Object.keys(result[0]).map((col, index) => (
                      <th
                        key={index}
                        className="p-3 bg-orange-500 text-white font-semibold uppercase sticky top-0 z-10 border-b border-gray-600"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.map((row, rowIndex) => {
                    const isEvenRow = rowIndex % 2 === 0;
                    const rowStyle = isEvenRow
                      ? "bg-gray-800/90"
                      : "bg-purple-700/80";
                    const borderStyle = "border border-gray-700";

                    return (
                      <tr
                        key={rowIndex}
                        className={`${rowStyle} hover:bg-gray-700 transition-colors duration-300`}

                      >
                        {Object.values(row).map((val, colIndex) => (
                          <td key={colIndex} className={`${borderStyle} p-3`}>
                            {val}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-lg text-center text-gray-500">Select a query to see results...</p>
        )}

        {/* Image Section */}
        <div className="flex-none w-full lg:w-1/2 bg-gray-800 p-5 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-bold text-teal-400 mb-4">Here's a visualization (click to zoom)</h3>
          {descLoading ? (
            <p className="text-lg italic text-center text-gray-400">Generating image...</p>
          ) : imageError ? (
            <p className="text-lg font-bold text-center text-red-500">{imageError}</p>
          ) : imageUrl ? (
            <img
              className="block max-w-full h-auto rounded-lg transition-transform duration-400 mt-4 cursor-pointer hover:scale-105"
              src={imageUrl}
              alt="Generated Chart"
              onClick={() => setIsModalOpen(true)}
            />
          ) : (
            <p className="text-lg text-center text-gray-500">No image available.</p>
          )}
        </div>
      </div>

      {/* Modal for Image */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <img src={imageUrl} alt="Generated Chart" className="max-w-full h-auto" />
      </Modal>

      {/* Modal for Table */}
      <Modal isOpen={isTableModalOpen} onClose={() => setIsTableModalOpen(false)}>
         <div className="overflow-auto max-h-[80vh] p-5 bg-gray-800 rounded-lg shadow-lg" style={{width: '90vw', maxWidth: '95%'}}>
          <table className="w-full border-collapse font-sans text-lg text-left bg-gray-800 rounded-lg overflow-hidden shadow-md transition-shadow duration-300 border border-gray-700">
            <thead>
              <tr>
                {result.length > 0 && result[0] && Object.keys(result[0]).map((col, index) => (
                  <th key={index} className="p-3 bg-orange-500 text-white font-semibold uppercase sticky top-0 z-10 border-b border-gray-600">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.map((row, rowIndex) => {
                const isEvenRow = rowIndex % 2 === 0;
                const rowStyle = isEvenRow
                  ? "bg-gray-800/90"
                  : "bg-purple-700/80";
                const borderStyle = "border border-gray-700";

                return (
                  <tr
                    key={rowIndex}
                    className={`${rowStyle} hover:bg-gray-700 transition-colors duration-300`}

                  >
                    {Object.values(row).map((val, colIndex) => (
                      <td key={colIndex} className={`${borderStyle} p-3`}>{val}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
};

export default ResultDisplay;
