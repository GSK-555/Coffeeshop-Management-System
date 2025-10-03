import React, { useState } from "react";
import logo from "../assets/Image.png";
import { ShoppingCart, User, LogIn, LogOut, Coffee, ChevronDown } from 'lucide-react'; // Added icons

const Navbar = ({ onQuerySelect, onQuerySubmit }) => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [inputQuery, setInputQuery] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Added login state
    const entities = [
        {
            name: "Ingredients",
            color: "text-orange-400",
            queries: [
              { key: "1", text: "Ingredients of Cappuccino (Medium)" },
              { key: "2", text: "Most Expensive Ingredient" },
              { key: "3", text: "Ingredients in Multiple Recipes" },
              { key: "4", text: "Total Quantity of Each Ingredient" },
           ],
        },
        {
            name: "Sales",
            color: "text-teal-400",
            queries: [
                { key: "5", text: "Which type of coffee is sold the most?" },
                { key: "6", text: "What are the total sales per item category?" },
                { key: "7", text: "What is the total revenue generated from each item?" },
                { key: "8", text: "Which day/time has the most sales?" },
            ],
        },
        {
            name: "Staff",
            color: "text-purple-400",
            queries: [
                { key: "9", text: "List all staff members and their positions." },
                { key: "10", text: "What is the average salary per hour for staff?" },
                { key: "11", text: "How many baristas are currently employed?" },
                { key: "12", text: "Who are the top 3 employees with the highest hourly salary?" },
            ],
        },
        {
            name: "Inventory",
            color: "text-yellow-400",
            queries: [
                { key: "13", text: "What is the current stock level for each ingredient?" },
                { key: "14", text: "Which ingredients are low in stock (less than 5 units)?" },
                { key: "15", text: "What is the total cost of all ingredients in stock?" },
                { key: "16", text: "Which ingredient takes up the most space in inventory (by quantity)?" },
            ],
        },
    ];


    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputQuery.trim()) {
            onQuerySubmit(inputQuery);
            setInputQuery("");
        }
    };

    const handleLoginLogout = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    return (
        <nav className="flex items-center justify-between bg-gray-900 p-4 text-white shadow-md sticky top-0 z-10 font-sans border-b border-gray-800">
            <div className="flex items-center gap-6">
                <img src={logo} alt="Logo" className="h-16 w-18 object-contain" />
                <div className="flex items-center gap-2">
                    {entities.map((entity, index) => (
                        <div
                            key={entity.name}
                            className="relative group"
                            onMouseLeave={() => {
                                if (activeDropdown !== index) {
                                    setActiveDropdown(null);
                                }
                            }}
                        >
                            <button
                                className={`font-semibold text-lg px-4 py-2 rounded-md transition-colors duration-300
                                           ${activeDropdown === index ? 'bg-gray-800' : 'hover:bg-gray-800/50'}
                                           flex items-center gap-1.5`} // Added flex and gap
                                onClick={() => setActiveDropdown(index)}
                            >
                                <span className={`font-bold tracking-wide text-lg ${entity.color}`}>{entity.name}</span>
                                <ChevronDown className={activeDropdown === index ? "w-4 h-4 transition-transform rotate-180" : "w-4 h-4 transition-transform"} />

                            </button>
                            {activeDropdown === index && (
                                <div
                                    className="absolute left-0 rounded-md shadow-lg mt-2 w-64 py-2 bg-gray-800 border border-gray-700 z-1000"
                                    onMouseLeave={() => setActiveDropdown(null)}

                                >
                                    {entity.queries.map((query) => (
                                        <div
                                            key={query.key}
                                            className="px-4 py-2 cursor-pointer text-sm transition-colors duration-200 font-medium hover:bg-gray-700"
                                            onClick={() => {
                                                onQuerySelect(query.key);
                                                setActiveDropdown(null);
                                            }}
                                            style={{ color: entity.color }}
                                        >
                                            {query.text}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 flex justify-end items-center gap-4"> {/* Added items-center */}
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Ask a question..."
                        value={inputQuery}
                        onChange={(e) => setInputQuery(e.target.value)}
                        className="w-[300px] p-2.5 rounded-md bg-gray-800 border border-gray-700 shadow-sm transition-all duration-300 focus:w-[350px] focus:shadow-lg focus:outline-none font-medium focus:border-blue-500 placeholder:text-gray-400"
                    />
                    <button
                        type="submit"
                        className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-md font-bold transition-colors duration-300  tracking-wide"
                    >
                        Submit
                    </button>
                </form>

                {/* Shopping Cart Icon */}
                <button className="text-gray-300 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800">
                    <ShoppingCart size={24} />
                </button>

                {/* User Profile / Login Section */}
                {isLoggedIn ? (
                    <div className="relative group">
                        <button className="text-gray-300 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800 flex items-center">
                            <User size={24} />
                            <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg origin-top-right transform scale-0 group-hover:scale-100 transition-transform duration-200">
                            <div className="py-1">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">Profile</a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">Settings</a>
                                <div className="border-t border-gray-700"></div>
                                <button
                                    onClick={handleLoginLogout}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                                >
                                    <LogOut size={16} className="inline-block mr-2" /> Logout
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={handleLoginLogout}
                        className="text-gray-300 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800 flex items-center"
                    >
                        <LogIn size={24} className="mr-2" /> Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
