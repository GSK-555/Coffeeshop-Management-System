import { Users, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import SqlQueryButton from "./SqlQueryButton";

const CustomerInsights = ({ data, buttonClick }) => {
  // Calculate percentage of repeat customers
  const repeatPercentage = Math.round((data.repeatCustomers / data.totalCustomers) * 100);

  // SQL queries for each statistic
  const sqlQueries = {
    totalCustomers: `SELECT 
    COUNT(DISTINCT customer_id) as total_customers
FROM 
    orders
WHERE 
    DATE(order_date) = CURRENT_DATE;`,

    repeatCustomers: `SELECT 
    COUNT(*) as repeat_customers
FROM (
    SELECT 
        customer_id,
        COUNT(*) as visit_count
    FROM 
        orders
    WHERE 
        order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
    GROUP BY 
        customer_id
    HAVING 
        COUNT(*) > 1
) as repeat_visitors
WHERE 
    repeat_visitors.customer_id IN (
        SELECT DISTINCT customer_id 
        FROM orders 
        WHERE DATE(order_date) = CURRENT_DATE
    );`,

    peakHours: `SELECT 
    CONCAT(
        HOUR(order_date), 
        'AM', 
        '-', 
        HOUR(order_date) + 1,
        'AM'
    ) as hour,
    COUNT(DISTINCT customer_id) as customers
FROM 
    orders
WHERE 
    DATE(order_date) = CURRENT_DATE
GROUP BY 
    HOUR(order_date)
ORDER BY 
    customers DESC
LIMIT 3;`,
  };

  return (
    <div className="fade-in">
      <h2 className="section-title text-3xl font-semibold text-purple-400 mb-6 flex items-center gap-3">
        <Users size={30} className="text-purple-300" />
        Customer Insights
      </h2>

      <div className="stat-grid grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="stat-card p-6 bg-gradient-to-br from-gray-800/80 to-gray-900/80 shadow-xl rounded-xl transition-transform transform hover:scale-102 hover:shadow-2xl border-t-4 border-purple-500">
          <div className="stat-value text-5xl font-light text-purple-300">{data.totalCustomers}</div>
          <div className="stat-label text-lg font-medium text-purple-400 mt-2">Total Customers Today</div>
          <SqlQueryButton handleButtonClick={buttonClick} query={sqlQueries.totalCustomers} title="Total Customers Query" />
        </div>

        <div className="stat-card p-6 bg-gradient-to-br from-gray-800/80 to-gray-900/80 shadow-xl rounded-xl transition-transform transform hover:scale-102 hover:shadow-2xl border-t-4 border-purple-500">
          <div className="stat-value text-5xl font-light text-purple-300">{repeatPercentage}%</div>
          <div className="stat-label text-lg font-medium text-purple-400 mt-2">Repeat Customers</div>
          <SqlQueryButton handleButtonClick={buttonClick} query={sqlQueries.repeatCustomers} title="Repeat Customers Query" />
        </div>
      </div>

      <div className="card mt-8 p-6 bg-gradient-to-br from-gray-900/80 to-gray-800/80 shadow-xl rounded-xl transition-transform transform hover:scale-102 hover:shadow-2xl border-t-4 border-purple-500">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-xl font-semibold text-purple-400 flex items-center gap-2">
            <Clock size={24} className="text-purple-300" />
            Peak Sales Hours
          </h3>
          <SqlQueryButton handleButtonClick={buttonClick} query={sqlQueries.peakHours} title="Peak Hours Query" />
        </div>

        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.peakHours}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d8b4fe" />
              <XAxis dataKey="hour" tick={{ fontSize: 14, fill: "#c084fc" }} />
              <YAxis tick={{ fontSize: 14, fill: "#c084fc" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a202c",
                  borderRadius: "8px",
                  border: "1px solid #d8b4fe",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
                labelStyle={{ fontWeight: "bold", color: "#c084fc" }}
                formatter={(value) => [`${value} customers`, "Customers"]}
              />
              <Bar dataKey="customers" fill="#9f7aea" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card mt-8 flex justify-center items-center flex-col p-6 bg-gradient-to-br from-gray-900/80 to-gray-800/80 shadow-xl rounded-xl transition-transform transform hover:scale-102 hover:shadow-2xl border-t-4 border-purple-500">
        <div
          className="w-28 h-28 rounded-full relative flex justify-center items-center mb-4"
          style={{ background: `conic-gradient(#9f7aea ${repeatPercentage}%, #d8b4fe 0)` }}
        >
          <div className="w-20 h-20 rounded-full bg-gray-800 flex justify-center items-center font-bold text-2xl text-purple-300">
            {repeatPercentage}%
          </div>
        </div>
        <div className="text-lg font-medium text-purple-400">Repeat Customer Rate</div>
      </div>
    </div>
  );
};

export default CustomerInsights;