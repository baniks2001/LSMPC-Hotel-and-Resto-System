import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [foodSales, setFoodSales] = useState<any[]>([]); // Replace with actual type if necessary
  const [currentDate, setCurrentDate] = useState<string>('');




  useEffect(() => {
    const fetchFoodSales = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/food_sales');
        if (response.ok) {
          const data = await response.json();
          setFoodSales(data);
        } else {
          console.error('Failed to fetch food sales data');
        }
      } catch (error) {
        console.error('Error fetching food sales data:', error);
      }
    };

    fetchFoodSales();
  }, []);


  const totalSales = foodSales.reduce((total, sale) => total + sale.total_amount, 0);


  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date().toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true, 
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      setCurrentDate(currentDate);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 min-h-screen rounded-lg shadow-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">Dashboard</h1>
      </div>

      {/* Sales As of Today Section */}
      <div className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 bg-gradient-to-r from-orange-400 to-yellow-500 text-transparent bg-clip-text">
          Sales As Of: {currentDate}
        </h2>
        <div className="bg-white p-8 rounded-3xl shadow-xl transform transition-transform hover:scale-105">
          <p className="text-lg font-semibold text-gray-800">
            As of Today Food Sales is: ₱{totalSales.toLocaleString()}
          </p>
        </div>
      </div>

     
    </div>
  );
}
