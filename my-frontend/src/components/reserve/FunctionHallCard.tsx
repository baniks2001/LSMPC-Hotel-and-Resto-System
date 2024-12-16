import { motion } from 'framer-motion';
import { FunctionHall } from '../../types';

interface FunctionHallCardProps {
  hall: FunctionHall;
  isSelected: boolean;
  onSelect: () => void;
}

export default function FunctionHallCard({
  hall,
  isSelected,
  onSelect
}: FunctionHallCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)' }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-tl from-gray-100 via-white to-gray-50 rounded-3xl shadow-xl overflow-hidden transform transition-all"
    >
      <img
        src={hall.img}
        alt={hall.name}
        className="w-full h-48 object-cover rounded-t-3xl transform transition-all"
      />
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900">{hall.name}</h3>
          <input
            type="radio"
            checked={isSelected}
            onChange={onSelect}
            className="mt-1 transform transition-all"
          />
        </div>
        <p className="text-green-600 font-semibold text-lg">₱{hall.price}</p>
        <p className="text-gray-700 text-sm">Capacity: {hall.capacity}</p>
      </div>
    </motion.div>
  );
}
