import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash } from 'lucide-react';

interface Sale {
  id: number;
  item_name: string;
  quantity: number;
  total_amount: number;
  sale_date: string;
}


export default function Sales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSale, setNewSale] = useState({
    item_name: '',
    quantity: '',
    total_amount: '',
    date: '',
  });

  // Fetch sales data
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/food_sales');
        if (response.ok) {
          const data = await response.json();
          setSales(data);
        } else {
          console.error('Failed to fetch sales data');
        }
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSales();
  }, []);

  // Calculate total sales amount
  const totalSalesAmount = sales.reduce((total, sale) => total + sale.total_amount, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSales([
      ...sales,
      {
        id: sales.length + 1,
        item_name: newSale.item_name,
        quantity: Number(newSale.quantity),
        total_amount: Number(newSale.total_amount),
        sale_date: newSale.date,
      },
    ]);
    setNewSale({ item_name: '', quantity: '', total_amount: '', date: '' });
    setShowAddForm(false);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 min-h-screen rounded-lg shadow-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">Manage Sales</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg hover:bg-green-700"
        >
          <Plus size={20} />
          Add Sale
        </button>
      </div>

      {/* Add Sale Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Item</label>
              <input
                type="text"
                value={newSale.item_name}
                onChange={(e) => setNewSale({ ...newSale, item_name: e.target.value })}
                className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                value={newSale.quantity}
                onChange={(e) => setNewSale({ ...newSale, quantity: e.target.value })}
                className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Total (₱)</label>
              <input
                type="number"
                value={newSale.total_amount}
                onChange={(e) => setNewSale({ ...newSale, total_amount: e.target.value })}
                className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                value={newSale.date}
                onChange={(e) => setNewSale({ ...newSale, date: e.target.value })}
                className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      )}

      {/* Sales Table */}
      <div className="bg-white rounded-lg shadow-lg mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-green-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total (₱)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td className="px-6 py-4">{sale.item_name}</td>
                <td className="px-6 py-4">{sale.quantity}</td>
                <td className="px-6 py-4">₱{sale.total_amount}</td>
                <td className="px-6 py-4">{sale.sale_date}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="text-green-600 hover:text-green-700">
                    <Pencil size={16} />
                  </button>
                  <button className="text-red-600 hover:text-red-700">
                    <Trash size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Sales Table */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <p className="text-lg font-medium text-gray-700">
          Sales As Of: {new Date().toLocaleDateString()}
        </p>
        <div className="mt-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Sales</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount (₱)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-6 py-4">Grand Total</td>
                <td className="px-6 py-4 text-right">₱{totalSalesAmount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
