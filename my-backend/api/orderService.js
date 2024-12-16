import axios from 'axios';

// Define separate API URLs
const ORDER_API_URL = 'http://localhost:5000/api/orders';
const FOOD_SALES_API_URL = 'http://localhost:5000/api/food_sales';

// Function to create an order
export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(ORDER_API_URL, orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;  // Optionally, handle the error more specifically
  }
};

// Function to create food sales entry
export const createSales = async (orderData) => {
  try {
    const response = await axios.post(FOOD_SALES_API_URL, orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating food sales entry:', error);
    throw error;  // Optionally, handle the error more specifically
  }
};

const RESERVATION_API_URL = 'http://localhost:5000/api/reservations';

// Function to create a reservation
export const createReservation = async (reservationData) => {
  try {
    const response = await axios.post(RESERVATION_API_URL, reservationData);
    return response.data;
  } catch (error) {
    console.error('Error creating reservation:', error);
    throw error;
  }
};