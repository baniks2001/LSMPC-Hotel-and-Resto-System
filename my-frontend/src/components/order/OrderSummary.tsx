import { OrderFormData } from '../../types/order';
import Card from '../shared/Card';
import Button from '../shared/Button';
import PaymentQRCode from '../PaymentQRcode';

interface OrderSummaryProps {
  formData: OrderFormData;
  total: number;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: keyof OrderFormData, value: string) => void;
}

export default function OrderSummary({ formData, total, onSubmit, onChange }: OrderSummaryProps) {
  return (
    <Card className="shadow-xl p-6 bg-white rounded-lg">
      <h2 className="text-3xl font-semibold text-green-600 mb-6 tracking-wide">Order Summary</h2>
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Customer Name</label>
          <input
            id="customerName"
            type="text"
            value={formData.customer_Name}
            onChange={(e) => onChange('customer_Name', e.target.value)}
            className="mt-2 w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            required
            aria-label="Enter your name"
          />
        </div>

        <div>
          <label htmlFor="orderType" className="block text-sm font-medium text-gray-700">Order Type</label>
          <select
            id="orderType"
            value={formData.orderType}
            onChange={(e) => onChange('orderType', e.target.value as 'Dine In' | 'Take Out')}
            className="mt-2 w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
          >
            <option value="Dine In">Dine In</option>
            <option value="Take Out">Take Out</option>
          </select>
        </div>

        {formData.orderType === 'Dine In' && (
          <div>
            <label htmlFor="deliveryType" className="block text-sm font-medium text-gray-700">Delivery Type</label>
            <select
              id="deliveryType"
              value={formData.deliveryType}
              onChange={(e) => onChange('deliveryType', e.target.value as 'Restaurant' | 'Room Delivery')}
              className="mt-2 w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            >
              <option value="Restaurant">In the Restaurant</option>
              <option value="Room Delivery">Room Delivery</option>
            </select>
          </div>
        )}

        {formData.deliveryType === 'Room Delivery' && (
          <div>
            <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700">Room Number</label>
            <input
              id="roomNumber"
              type="text"
              value={formData.roomNumber || ''}
              onChange={(e) => onChange('roomNumber', e.target.value)}
              className="mt-2 w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              required
              aria-label="Enter your room number"
            />
          </div>
        )}

        <div className="border-t pt-4">
          <h3 className="font-medium text-gray-900">Selected Items:</h3>
          <ul className="mt-2 space-y-2">
            {Array.from(formData.items.entries()).length > 0 ? (
              Array.from(formData.items.entries()).map(([name, quantity]) => (
                quantity > 0 && (
                  <li key={name} className="text-sm text-gray-600">
                    {quantity} x {name}
                  </li>
                )
              ))
            ) : (
              <p className="text-sm text-gray-500">No items selected.</p>
            )}
          </ul>
        </div>

        <div className="border-t pt-4">
          <p className="text-xl font-medium text-gray-900">
            Total: ₱{total.toFixed(2)}
          </p>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Payment Method</label>
          <select
            className="mt-2 block w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            value={formData.paymentMethod}
            onChange={(e) => onChange('paymentMethod', e.target.value)}
          >
            <option value="">Select Payment Method</option>
            <option value="GCASH">GCASH</option>
            <option value="PayMaya">PayMaya</option>
            <option value="Cash">Cash</option>
          </select>
        </div>

        {(formData.paymentMethod === 'GCASH' || formData.paymentMethod === 'PayMaya') && (
          <>
            <div>
              <label htmlFor="AccountName" className="block text-sm font-medium text-gray-700">Account Name</label>
              <input
                id="AccountName"
                type="text"
                value={formData.AccountName}
                onChange={(e) => onChange('AccountName', e.target.value)}
                className="mt-2 w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                required
                aria-label="Enter your account name"
              />
            </div>

            <div>
              <label htmlFor="referenceNumber" className="block text-sm font-medium text-gray-700">Reference Number</label>
              <input
                id="referenceNumber"
                type="text"
                value={formData.referenceNumber}
                onChange={(e) => onChange('referenceNumber', e.target.value)}
                className="mt-2 w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                required
                aria-label="Enter reference number"
              />
            </div>
          </>
        )}

        <PaymentQRCode paymentMethod={formData.paymentMethod} />

        <div className="mt-6 flex justify-center">
          <Button type="submit" variant="primary" className="px-6 py-3 text-white bg-green-600 hover:bg-green-700 transition-all rounded-lg shadow-md">
            Submit Order
          </Button>
        </div>
      </form>
    </Card>
  );
}
