import { Room, RoomNumbers } from '../types';

export const rooms: Room[] = [
  {
    name: 'Premier Double with Breakfast',
    price: 1199,
    img: '/premiere.jpg',
    capacity: 2
  },
  {
    name: 'Deluxe Triple with Breakfast',
    price: 1699,
    img: 'deluxe.jpg',
    capacity: 3
  },
  {
    name: 'Dormitory Type with Breakfast',
    price: 599,
    img: '/dormitory.jpg',
    capacity: 7
  }
];

export const roomNumbers: RoomNumbers = {
  'Premier Double with Breakfast': ['Room001', 'Room002', 'Room003', 'Room004', 'Room005'],
  'Deluxe Triple with Breakfast': ['Room1001', 'Room1002', 'Room1003', 'Room1004', 'Room1005'],
  'Dormitory Type with Breakfast': ['Room2001', 'Room2002', 'Room2003', 'Room2004', 'Room2005']
};
