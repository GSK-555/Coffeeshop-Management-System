import { useState, useEffect, useCallback, useRef } from "react";
import InventoryOverview from "./dashboard/InventoryOverview";
import SalesStatistics from "./dashboard/SalesStatistics";
import StaffManagement from "./dashboard/StaffManagement";
import CustomerInsights from "./dashboard/CustomerInsights";
import FeaturedRecipe from "./dashboard/FeaturedRecipe";
import SqlQueryModal from "./dashboard/SqlQueryModal";

const Dashboard = ({}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalQuery, setModalQuery] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const sqlQueryRef = useRef("");

  const dashboardData = {
    inventory: {
      lowStock: [
        { name: "Coffee Beans (Arabica)", quantity: 5, unit: "kg", threshold: 10 },
        { name: "Milk", quantity: 3, unit: "liters", threshold: 5 },
        { name: "Vanilla Syrup", quantity: 2, unit: "bottles", threshold: 3 },
      ],
      totalItems: 42,
      stockUsage: [
        { name: "Milk", usage: 75 },
        { name: "Coffee Beans", usage: 60 },
        { name: "Chocolate Syrup", usage: 45 },
        { name: "Caramel Syrup", usage: 30 },
        { name: "Whipped Cream", usage: 25 },
      ],
    },
    sales: {
      todaySales: 1250.75,
      bestSeller: "Caramel Macchiato",
      ordersCompleted: 87,
      averageOrderValue: 14.38,
      dailySales: [
        { hour: "7AM", sales: 12 },
        { hour: "8AM", sales: 18 },
        { hour: "9AM", sales: 25 },
        { hour: "10AM", sales: 20 },
        { hour: "11AM", sales: 15 },
        { hour: "12PM", sales: 22 },
        { hour: "1PM", sales: 30 },
        { hour: "2PM", sales: 25 },
        { hour: "3PM", sales: 18 },
        { hour: "4PM", sales: 15 },
        { hour: "5PM", sales: 20 },
        { hour: "6PM", sales: 10 },
      ],
    },
    staff: {
      currentShift: [
        { name: "Emma Johnson", position: "Barista", hours: 8 },
        { name: "Michael Chen", position: "Cashier", hours: 6 },
        { name: "Sophia Rodriguez", position: "Manager", hours: 8 },
      ],
      upcomingShifts: [
        { name: "David Kim", position: "Barista", time: "2:00 PM - 10:00 PM" },
        { name: "Olivia Smith", position: "Cashier", time: "2:00 PM - 8:00 PM" },
      ],
      workHours: [
        { name: "Emma Johnson", hours: 38 },
        { name: "Michael Chen", hours: 32 },
        { name: "Sophia Rodriguez", hours: 40 },
        { name: "David Kim", hours: 35 },
        { name: "Olivia Smith", hours: 30 },
      ],
    },
    customers: {
      peakHours: [
        { hour: "8AM-9AM", customers: 25 },
        { hour: "12PM-1PM", customers: 40 },
        { hour: "5PM-6PM", customers: 35 },
      ],
      repeatCustomers: 35,
      totalCustomers: 120,
    },
    recipe: {
      name: "Honey Cinnamon Latte",
      ingredients: [
        "2 shots of espresso",
        "8 oz steamed milk",
        "1 tbsp honey",
        "1/4 tsp cinnamon",
        "Whipped cream (optional)",
      ],
      instructions:
        "Pull espresso shots into a mug. Heat honey slightly and stir into espresso. Add cinnamon. Steam milk to 150°F and pour over espresso mixture. Top with a sprinkle of cinnamon and whipped cream if desired.",
      image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1637&auto=format&fit=crop",
    },
  };

  const handleButtonClick = (query, title) => {
    setModalQuery(query);
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalQuery("");
    setModalTitle("");
  };

  return (
    <div className="flex-1 p-5 overflow-y-auto bg-gray-900 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-xl shadow-2xl p-5 overflow-hidden transition-all hover:-translate-y-2 hover:shadow-xl border-t-5 border-red-500">
          <InventoryOverview data={dashboardData.inventory} buttonClick={handleButtonClick} />
        </div>
        <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-xl shadow-2xl p-5 overflow-hidden transition-all hover:-translate-y-2 hover:shadow-xl border-t-5 border-green-500 lg:col-span-2">
          <SalesStatistics data={dashboardData.sales} buttonClick={handleButtonClick} />
        </div>
        <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-xl shadow-2xl p-5 overflow-hidden transition-all hover:-translate-y-2 hover:shadow-xl border-t-5 border-teal-500">
          <StaffManagement data={dashboardData.staff} buttonClick={handleButtonClick} />
        </div>
        <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-xl shadow-2xl p-5 overflow-hidden transition-all hover:-translate-y-2 hover:shadow-xl border-t-5 border-purple-500">
          <CustomerInsights data={dashboardData.customers} buttonClick={handleButtonClick} />
        </div>
        <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-xl shadow-2xl p-5 overflow-hidden transition-all hover:-translate-y-2 hover:shadow-xl border-t-5 border-orange-600">
          <FeaturedRecipe data={dashboardData.recipe} buttonClick={handleButtonClick} />
        </div>
      </div>

      {isModalOpen && (
        <SqlQueryModal onClose={handleCloseModal} query={modalQuery} title={modalTitle} />
      )}
    </div>
  );
};

export default Dashboard;
