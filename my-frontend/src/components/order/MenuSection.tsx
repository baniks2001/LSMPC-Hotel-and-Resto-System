import { motion } from 'framer-motion';
import { MenuItem } from '../../types/order';
import AnimatedCard from '../shared/AnimatedCard';

interface MenuSectionProps {
  title: string;
  items: MenuItem[];
  quantities: Map<string, number>;
  onQuantityChange: (name: string, quantity: number) => void;
}

export default function MenuSection({ title, items, quantities, onQuantityChange }: MenuSectionProps) {
  const handleIncrease = (itemName: string) => {
    const currentQuantity = quantities.get(itemName) || 0;
    onQuantityChange(itemName, currentQuantity + 1);
  };

  const handleDecrease = (itemName: string) => {
    const currentQuantity = quantities.get(itemName) || 0;
    if (currentQuantity > 0) {
      onQuantityChange(itemName, currentQuantity - 1);
    }
  };

  return (
    <AnimatedCard className="mb-8">
      <h2 className="text-2xl font-bold text-green-600 mb-6">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center p-4 border rounded-lg"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg mb-2"
            />
            <h3 className="font-medium text-gray-800">{item.name}</h3>
            <p className="text-green-600">₱{item.price}</p>

            {/* Quantity Controls */}
            <div className="mt-2 flex items-center space-x-2">
              <button
                onClick={() => handleDecrease(item.name)}
                className="px-3 py-1 bg-gray-200 rounded-full text-xl"
              >
                −
              </button>
              <span className="text-lg">{quantities.get(item.name) || 0}</span>
              <button
                onClick={() => handleIncrease(item.name)}
                className="px-3 py-1 bg-gray-200 rounded-full text-xl"
              >
                +
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedCard>
  );
}
