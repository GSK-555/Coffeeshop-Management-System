import { Package, AlertTriangle, BarChart2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import SqlQueryButton from "./SqlQueryButton";

const InventoryOverview = ({ data, buttonClick }) => {
  const sqlQueries = {
    totalItems: `SELECT COUNT(*) as total_items 
FROM ingredients 
WHERE quantity > 0;`,

    lowStock: `SELECT 
    name, 
    quantity, 
    unit, 
    min_threshold as threshold
FROM 
    ingredients
WHERE 
    quantity <= min_threshold
ORDER BY 
    (quantity / min_threshold) ASC;`,

    stockUsage: `SELECT 
    i.name, 
    SUM(iu.quantity_used) as usage
FROM 
    ingredient_usage iu
JOIN 
    ingredients i ON iu.ingredient_id = i.id
WHERE 
    iu.usage_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
GROUP BY 
    i.name
ORDER BY 
    usage DESC
LIMIT 5;`,
  };

  return (
    <div className="fade-in">
      <h1 className="section-title text-3xl font-semibold text-red-500 mb-6 flex items-center gap-3">
        <Package size={30} className="text-red-500" />
        Inventory Overview
      </h1>

      <div className="stat-card bg-gradient-to-br from-gray-800/80 to-gray-900/80 shadow-xl rounded-xl p-6 mb-6 transition-transform transform hover:scale-105 hover:shadow-2xl border-t-4 border-amber-500">
        <div className="stat-label text-lg font-medium text-amber-500">Total Ingredients Available</div>
        <div className="stat-value text-4xl font-light text-amber-400">{data.totalItems}</div>
        <div className="stat-label text-lg font-medium text-amber-500 mt-2">items in stock</div>
        <SqlQueryButton handleButtonClick={buttonClick} query={sqlQueries.totalItems} title="Total Ingredients Query" />
      </div>

      <div className="card bg-gradient-to-br from-gray-800/80 to-gray-900/80 shadow-xl rounded-xl p-6 mb-6 transition-transform transform hover:scale-101 hover:shadow-2xl border-t-4 border-red-500">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold text-red-500 flex items-center gap-2">
            <AlertTriangle size={24} className="text-red-500" />
            Low Stock Alerts
          </h3>
          <SqlQueryButton handleButtonClick={buttonClick} query={sqlQueries.lowStock} title="Low Stock Alerts Query" />
        </div>

        <div>
          {data.lowStock.map((item, index) => (
            <div key={index} className={`flex justify-between p-2 ${index % 2 === 0 ? "bg-gray-800/50" : "bg-gray-900/50"} rounded mb-1`}>
              <div>
                <div className="font-medium text-gray-300">{item.name}</div>
                <div className="text-xs text-gray-500">
                  Threshold: {item.threshold} {item.unit}
                </div>
              </div>
              <div className={`font-bold text-red-500`}>
                {item.quantity} {item.unit}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-gradient-to-br from-gray-800/80 to-gray-900/80 shadow-xl rounded-xl p-6 transition-transform transform hover:scale-101 hover:shadow-2xl border-t-4 border-red-500">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold text-red-500 flex items-center gap-2">
            <BarChart2 size={24} className="text-red-500" />
            Stock Usage Chart
          </h3>
          <SqlQueryButton handleButtonClick={buttonClick} query={sqlQueries.stockUsage} title="Stock Usage Chart Query" />
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.stockUsage}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e53e3e" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#fca5a5" }} />
              <YAxis tick={{ fontSize: 12, fill: "#fca5a5" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#2d3748",
                  borderRadius: "5px",
                  border: "1px solid #e53e3e",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                }}
                labelStyle={{ fontWeight: "bold", color: "#fca5a5" }}
              />
              <Bar dataKey="usage" fill="#f87171" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default InventoryOverview;