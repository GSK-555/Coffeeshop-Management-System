import React from "react";
import { DollarSign, ShoppingBag, TrendingUp, Coffee } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import SqlQueryButton from "./SqlQueryButton";
import ProductCard from "../ProductCard"; // Import the ProductCard component

const SalesStatistics = ({ data, buttonClick }) => {
  // SQL queries for each statistic
  const sqlQueries = {
    todaySales: `SELECT 
    SUM(total_amount) as today_sales 
FROM 
    orders 
WHERE 
    DATE(order_date) = CURRENT_DATE;`,

    ordersCompleted: `SELECT 
    COUNT(*) as orders_completed 
FROM 
    orders 
WHERE 
    DATE(order_date) = CURRENT_DATE 
    AND status = 'completed';`,

    bestSeller: `SELECT 
    p.name as product_name,
    COUNT(*) as order_count
FROM 
    order_items oi
JOIN 
    products p ON oi.product_id = p.id
JOIN 
    orders o ON oi.order_id = o.id
WHERE 
    DATE(o.order_date) = CURRENT_DATE
    AND p.category = 'coffee'
GROUP BY 
    p.id
ORDER BY 
    order_count DESC
LIMIT 1;`,

    averageOrderValue: `SELECT 
    AVG(total_amount) as average_order_value 
FROM 
    orders 
WHERE 
    DATE(order_date) = CURRENT_DATE;`,

    dailySales: `SELECT 
    HOUR(order_date) as hour,
    COUNT(*) as sales
FROM 
    orders
WHERE 
    DATE(order_date) = CURRENT_DATE
GROUP BY 
    HOUR(order_date)
ORDER BY 
    hour;`,
  };

  const statCardStyles = [
    "bg-gradient-to-r from-lime-500/90 to-lime-600/90 shadow-lg border-l-4 border-lime-400",
    "bg-gradient-to-r from-cyan-500/90 to-cyan-600/90 shadow-lg border-l-4 border-cyan-400",
    "bg-gradient-to-r from-yellow-400/90 to-yellow-500/90 text-black shadow-lg border-l-4 border-yellow-300",
    "bg-gradient-to-r from-pink-500/90 to-pink-600/90 shadow-lg border-l-4 border-pink-400",
  ];

    // Dummy product data for the example
    const sampleProducts = [
      {
          name: "Cappuccino Coffee",
          price: 3.45,
          description: "A classic Italian coffee drink with espresso, steamed milk, and a frothy foam topping.",
          image: "https://coffeeatcorner.com/wp-content/uploads/2024/02/image-4.jpeg",
      },
      {
          name: "White Mocha",
          price: 4.50,
          description: "A sweet and creamy coffee beverage made with white chocolate syrup, espresso, and steamed milk.",
          image: "https://midwestniceblog.com/wp-content/uploads/2024/11/white-mocha-social-image.jpeg",
      },
      {
          name: "Hot Chocolate",
          price: 3.45,
          description: "A rich and comforting beverage made with cocoa powder, milk, and sugar, often topped with whipped cream or marshmallows.",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpA4TWrtFWR7OQzWbw0xu9gnO2igHzOpIgog&s",
      },
      {
          name: "Sandwich Ham-n-Cheese",
          price: 5.75,
          description: "A savory sandwich filled with ham and cheese, perfect for a quick meal.",
          image: "https://images3.alphacoders.com/101/thumb-1920-1016293.jpg",
      },
  ];

  return (
    <div className="fade-in">
      <h2 className="section-title text-3xl font-semibold text-white mb-6 flex items-center gap-3">
        <DollarSign size={30} className="text-lime-400" />
        Sales & Revenue Statistics
      </h2>

      <div className="stat-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`stat-card ${statCardStyles[0]} text-white shadow-xl rounded-xl p-6 transition-all transform hover:scale-103 hover:shadow-2xl`}>
          <DollarSign size={28} className="text-lime-300 mb-3 animate-pulse" />
          <div className="stat-value text-5xl font-bold">${data.todaySales.toFixed(2)}</div>
          <div className="stat-label text-lg font-semibold">Total Sales Today</div>
          <SqlQueryButton handleButtonClick={buttonClick} query={sqlQueries.todaySales} title="Total Sales Query" />
        </div>

        <div className={`stat-card ${statCardStyles[1]} text-white shadow-xl rounded-xl p-6 transition-all transform hover:scale-103 hover:shadow-2xl`}>
          <ShoppingBag size={28} className="text-cyan-300 mb-3 animate-pulse" />
          <div className="stat-value text-5xl font-bold">{data.ordersCompleted}</div>
          <div className="stat-label text-lg font-semibold">Orders Completed</div>
          <SqlQueryButton handleButtonClick={buttonClick} query={sqlQueries.ordersCompleted} title="Orders Completed Query" />
        </div>

        <div className={`stat-card ${statCardStyles[2]} text-black shadow-xl rounded-xl p-6 transition-all transform hover:scale-103 hover:shadow-2xl`}>
          <Coffee size={28} className="text-yellow-300 mb-3 animate-spin" />
          <div className="stat-value text-xl font-bold">{data.bestSeller}</div>
          <div className="stat-label text-lg font-semibold">Best-Selling Coffee</div>
          <SqlQueryButton handleButtonClick={buttonClick} query={sqlQueries.bestSeller} title="Best-Selling Coffee Query" />
        </div>

        <div className={`stat-card ${statCardStyles[3]} text-white shadow-xl rounded-xl p-6 transition-all transform hover:scale-103 hover:shadow-2xl`}>
          <TrendingUp size={28} className="text-pink-300 mb-3 animate-bounce" />
          <div className="stat-value text-5xl font-bold">${data.averageOrderValue.toFixed(2)}</div>
          <div className="stat-label text-lg font-semibold">Average Order Value</div>
          <SqlQueryButton handleButtonClick={buttonClick} query={sqlQueries.averageOrderValue} title="Average Order Value Query" />
        </div>
      </div>

      <div className="card bg-gray-800/90 shadow-2xl rounded-xl p-6 mt-8 border-t-4 border-lime-500 flex flex-col items-center">
        <div className="flex justify-between items-center mb-5 w-full">
          <h3 className="text-xl font-semibold text-lime-300 flex items-center gap-2">
            <TrendingUp size={24} className="text-lime-400 animate-pulse" />
            Daily Sales Graph
          </h3>
          <SqlQueryButton handleButtonClick={buttonClick} query={sqlQueries.dailySales} title="Daily Sales Graph Query" />
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data.dailySales}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
              <XAxis dataKey="hour" tick={{ fontSize: 14, fill: "#f56565" }} />
              <YAxis tick={{ fontSize: 14, fill: "#f56565" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#2d3748",
                  borderRadius: "8px",
                  border: "1px solid #a7f3d0",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                }}
                labelStyle={{ fontWeight: "bold", color: "#a7f3d0" }}
                itemStyle={{ color: '#fff' }}
                formatter={(value) => [`${value} orders`, "Sales"]}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#a7f3d0"
                strokeWidth={3}
                dot={{
                  r: 6,
                  fill: "#a7f3d0",
                  strokeWidth: 2,
                  stroke: "#16a34a",
                }}
                activeDot={{
                  r: 10,
                  fill: "#16a34a",
                  stroke: "#16a34a",
                  strokeWidth: 3,
                }}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Product Display Section */}
        <div className="mt-8 w-full">
          <div className="text-2xl flex gap-2 font-semibold text-lime-400 mb-6 text-left"> <ShoppingBag size={28} className="text-lime-300 mb-3 animate-pulse" />Featured Products</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleProducts.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                className={`
                  shadow-md hover:shadow-lg transition-shadow duration-300
                  border-2
                  ${index % 4 === 0 ? 'border-pink-500' : ''}
                  ${index % 4 === 1 ? 'border-green-500' : ''}
                  ${index % 4 === 2 ? 'border-blue-500' : ''}
                  ${index % 4 === 3 ? 'border-yellow-500' : ''}
                  hover:border-4
                  hover:border-opacity-70
                  ${index % 4 === 0 ? 'hover:border-pink-400' : ''}
                  ${index % 4 === 1 ? 'hover:border-green-400' : ''}
                  ${index % 4 === 2 ? 'hover:border-blue-400' : ''}
                  ${index % 4 === 3 ? 'hover:border-yellow-400' : ''}
                  box-shadow-lg
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesStatistics;
