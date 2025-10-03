"use client"

import { useState } from "react"
import Navbar from "./components/Navbar"
import Dashboard from "./components/Dashboard"
import ResultDisplay from "./components/ResultDisplay";
import Footer from "./components/Footer";

const App = () => {
  const [selectedQuery, setSelectedQuery] = useState("")
  const [naturalLanguageQuery, setNaturalLanguageQuery] = useState("")
  const [isResultVisible, setIsResultVisible] = useState(false)

  const handleQuerySelect = (queryKey) => {
    setSelectedQuery(queryKey)
    setNaturalLanguageQuery("")
    setIsResultVisible(true)
  }

  const handleQuerySubmit = (userQuery) => {
    setNaturalLanguageQuery(userQuery)
    setSelectedQuery("")
    setIsResultVisible(true)
  }

  const toggleResultVisibility = () => {
    setIsResultVisible(!isResultVisible)
  }

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white flex flex-col">
      <Navbar onQuerySelect={handleQuerySelect} onQuerySubmit={handleQuerySubmit} />
      {isResultVisible && (
        <div className="flex flex-col items-center mt-4 w-full"> {/* Changed to flex-col and added items-center */}
          <button
            onClick={toggleResultVisibility}
            className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-full shadow-md transition-transform duration-300 hover:bg-teal-700 hover:scale-105"
          >
            Hide Results
          </button>
          <ResultDisplay classname="py-90" selectedQuery={selectedQuery} naturalLanguageQuery={naturalLanguageQuery} />
        </div>
      )}
      <Dashboard selectedQuery={selectedQuery} naturalLanguageQuery={naturalLanguageQuery} />
      <Footer />
    </div>
  )
}

export default App
