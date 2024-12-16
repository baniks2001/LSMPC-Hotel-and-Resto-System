import { useState, useMemo } from 'react';
import { OrderFormData } from '../types/order';
import { foods, beverages } from '../data/menuItems';
import MenuSection from '../components/order/MenuSection';
import OrderSummary from '../components/order/OrderSummary';

export default function Order() {
  const [formData, setFormData] = useState<OrderFormData>({
    customer_Name: '',
    orderType: 'Dine In',
    deliveryType: 'Restaurant',
    items: new Map(),
    paymentMethod: '',  
    AccountName: '',
    referenceNumber: '',
    roomNumber: '', 
  });

  const total = useMemo(() => {
    return Array.from(formData.items.entries()).reduce((sum, [name, quantity]) => {
      const item = [...foods, ...beverages].find((item) => item.name === name);
      return sum + (item ? item.price * quantity : 0);
    }, 0);
  }, [formData.items]);

  const handleQuantityChange = (name: string, quantity: number) => {
    const newItems = new Map(formData.items);
    if (quantity > 0) {
      newItems.set(name, quantity);
    } else {
      newItems.delete(name);
    }
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const handleFieldChange = (field: keyof OrderFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderData = {
      customerName: formData.customer_Name,
      orderType: formData.orderType,
      deliveryType: formData.deliveryType,
      items: Array.from(formData.items.entries()).map(([name, quantity]) => ({ name, quantity })),
      total,
      paymentMethod: formData.paymentMethod,
      AccountName: formData.AccountName,
      referenceNumber: formData.referenceNumber,
      roomNumber: formData.roomNumber,
    };

    try {
      // Call the backend API to create the order
      const orderResponse = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const orderResult = await orderResponse.json();

      if (orderResult.message === 'Order created successfully') {
        // Prepare the data for food sales
        const foodSalesData = {
          items: orderData.items,
          total,
          
          sale_date: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        // Call the backend API to record the food sales
        const salesResponse = await fetch('http://localhost:5000/api/food_sales', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(foodSalesData),
        });

        const salesResult = await salesResponse.json();
        if (salesResult.message === 'Food sales recorded successfully') {
          alert('Your order has been successfully submitted and the sales recorded!');
        }
        // Reset the form data
        setFormData({
          customer_Name: '',
          orderType: 'Dine In',
          deliveryType: 'Restaurant',
          items: new Map(),
          paymentMethod: '',
          AccountName: '',
          referenceNumber: '',
          roomNumber: '',
        });
      } else {
        alert('There was an issue submitting your order. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an issue with the submission. Please try again.');
    }
  };

  return (
    <section id="order" className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <MenuSection
            title="Foods"
            items={foods}
            quantities={formData.items}
            onQuantityChange={handleQuantityChange}
          />
          <MenuSection
            title="Beverages"
            items={beverages}
            quantities={formData.items}
            onQuantityChange={handleQuantityChange}
          />
        </div>
        <div>
          <OrderSummary
            formData={formData}
            total={total}
            onSubmit={handleSubmit}
            onChange={handleFieldChange}
          />
        </div>
      </div>
    </section>
  );
}
