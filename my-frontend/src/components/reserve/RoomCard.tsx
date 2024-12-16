import { motion } from 'framer-motion';
import { Room } from '../../types';

interface RoomCardProps {
  room: Room;
  isSelected: boolean;
  roomNumber: string;
  availableRoomNumbers: string[];
  onSelect: () => void;
  onRoomNumberSelect: (roomNumber: string) => void;
}

export default function RoomCard({
  room,
  isSelected,
  roomNumber,
  availableRoomNumbers,
  onSelect,
  onRoomNumberSelect
}: RoomCardProps) {
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
        src={room.img}
        alt={room.name}
        className="w-full h-48 object-cover rounded-t-3xl transform transition-all"
      />
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900">{room.name}</h3>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="mt-1 transform transition-all"
          />
        </div>
        <p className="text-green-600 font-semibold text-lg">₱{room.price}/night</p>
        <p className="text-gray-700 text-sm">Up to {room.capacity} people</p>

        {isSelected && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Room Number:
            </label>
            <select
              value={roomNumber}
              onChange={(e) => onRoomNumberSelect(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            >
              <option value="">-- Select --</option>
              {availableRoomNumbers.map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        )}
        
      </div>
    </motion.div>
    
  );
}
