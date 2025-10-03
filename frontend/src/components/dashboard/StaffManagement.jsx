import { Users, Clock, BarChart } from "lucide-react";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import SqlQueryButton from "./SqlQueryButton";

const StaffManagement = ({ data, buttonClick }) => {
  const sqlQueries = {
    currentShift: `SELECT 
    e.name, 
    p.title as position,
    s.hours
FROM 
    employees e
JOIN 
    positions p ON e.position_id = p.id
JOIN 
    shifts s ON e.id = s.employee_id
WHERE 
    DATE(s.shift_date) = CURRENT_DATE
    AND TIME(NOW()) BETWEEN s.start_time AND s.end_time;`,

    upcomingShifts: `SELECT 
    e.name, 
    p.title as position,
    CONCAT(
        TIME_FORMAT(s.start_time, '%h:%i %p'), 
        ' - ', 
        TIME_FORMAT(s.end_time, '%h:%i %p')
    ) as time
FROM 
    employees e
JOIN 
    positions p ON e.position_id = p.id
JOIN 
    shifts s ON e.id = s.employee_id
WHERE 
    DATE(s.shift_date) = CURRENT_DATE
    AND s.start_time > NOW()
ORDER BY 
    s.start_time
LIMIT 5;`,

    workHours: `SELECT 
    e.name,
    SUM(TIMESTAMPDIFF(HOUR, s.start_time, s.end_time)) as hours
FROM 
    employees e
JOIN 
    shifts s ON e.id = s.employee_id
WHERE 
    s.shift_date BETWEEN DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY) AND CURRENT_DATE
GROUP BY 
    e.id
ORDER BY 
    hours DESC;`,
  };

  return (
    <div className="fade-in">
      <h2 className="section-title text-3xl font-semibold text-teal-400 mb-6 flex items-center gap-3">
        <Users size={30} className="text-teal-300 animate-pulse" />
        Staff Management
      </h2>

      <div className="card bg-gradient-to-br from-gray-800/80 to-gray-900/80 shadow-2xl rounded-xl p-6 mb-6 transition-all transform hover:scale-102 hover:shadow-xl border-t-4 border-teal-500">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold text-teal-300 flex items-center gap-2">
            <Users size={24} className="text-teal-300 animate-pulse" />
            Current Staff on Shift
          </h3>
          <SqlQueryButton handleButtonClick={buttonClick} query={sqlQueries.currentShift} title="Current Staff Query" />
        </div>

        <div>
          {data.currentShift.map((staff, index) => (
            <div
              key={index}
              className={`flex justify-between p-3 ${index % 2 === 0 ? "bg-gray-800/50" : "bg-gray-900/50"} rounded mb-2 transition-colors duration-300 hover:bg-gray-700/50`}
            >
              <div>
                <div className="font-semibold text-gray-300">{staff.name}</div>
                <div className="text-sm text-gray-500">{staff.position}</div>
              </div>
              <div className="font-bold text-orange-300 flex items-center gap-1">
                <Clock size={16} className="animate-spin" />
                {staff.hours} hrs
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-gradient-to-br from-gray-800/80 to-gray-900/80 shadow-2xl rounded-xl p-6 mb-6 transition-all transform hover:scale-102 hover:shadow-xl border-t-4 border-teal-500">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold text-teal-300 flex items-center gap-2">
            <Clock size={24} className="text-teal-300 animate-pulse" />
            Upcoming Shift Schedule
          </h3>
          <SqlQueryButton handleButtonClick={buttonClick} query={sqlQueries.upcomingShifts} title="Upcoming Shifts Query" />
        </div>

        <div>
          {data.upcomingShifts.map((shift, index) => (
            <div key={index} className="flex justify-between p-3 bg-gray-800/50 rounded mb-2 transition-colors duration-300 hover:bg-gray-700/50">
              <div>
                <div className="font-semibold text-gray-300">{shift.name}</div>
                <div className="text-sm text-gray-500">{shift.position}</div>
              </div>
              <div className="font-bold text-orange-300">{shift.time}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-gradient-to-br from-gray-800/80 to-gray-900/80 shadow-2xl rounded-xl p-6 transition-all transform hover:scale-102 hover:shadow-xl border-t-4 border-teal-500">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold text-teal-300 flex items-center gap-2">
            <BarChart size={24} className="text-teal-300 animate-pulse" />
            Staff Work Hours
          </h3>
          <SqlQueryButton handleButtonClick={buttonClick} query={sqlQueries.workHours} title="Staff Work Hours Query" />
        </div>

        <div className="h-auto">
          <ResponsiveContainer width="100%" height={data.workHours.length * 50}>
            <RechartsBarChart data={data.workHours} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#4fd1c5" />
              <XAxis type="number" tick={{ fontSize: 13, fill: "#8decf9" }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 13, fill: "#8decf9" }} width={120} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#2d3748",
                  borderRadius: "8px",
                  border: "1px solid #4fd1c5",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                }}
                labelStyle={{ fontWeight: "bold", color: "#8decf9" }}
                itemStyle={{ color: "#fff" }}
                formatter={(value) => [`${value} hours`, "Hours Worked"]}
              />
              <Bar dataKey="hours" fill="#63b3ed" radius={[0, 8, 8, 0]} />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StaffManagement;