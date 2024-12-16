const db = require('../services/db'); // Import the database connection
const { Order, Sales, getSales } = require('../models/orderModel'); // Import the Order model

// Create a new order
exports.createOrder = (req, res) => {
  try {
    const { customerName, orderType, deliveryType, items, paymentMethod, AccountName, referenceNumber, total, roomNumber } = req.body;

    // Create a new Order instance
    const order = new Order({ customerName, orderType, deliveryType, items, paymentMethod, AccountName, referenceNumber, total, roomNumber });
   
    // Validate the order data using the model
    order.validate();

    // SQL query to insert the new order into the database
    const query = `
      INSERT INTO orders (customer_name, order_type, delivery_type, items, payment_method, account_name, reference_number, total, room_number)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Insert order into the database
    db.query(
      query,
      [
        customerName,
        orderType,
        deliveryType,
        JSON.stringify(items), // Convert items to a JSON string
        paymentMethod,
        AccountName || null, // Use null if AccountName is not provided
        referenceNumber || null, // Use null if referenceNumber is not provided
        total,
        roomNumber || null  // Insert roomNumber into the database
      ],
      (err, result) => {
        if (err) {
          console.error('Error creating order:', err);
          return res.status(500).json({ message: 'Error creating order' });
        }
        res.status(201).json({ message: 'Order created successfully', orderId: result.insertId });
      }
    );
  } catch (error) {
    console.error('Validation error:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.createSales = (req, res) => {
  try {
    const { items, total, sale_date, created_at, updated_at } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items array is empty or missing' });
    }

    // Validate each item to ensure it has a name and quantity
    for (const item of items) {
      if (!item.name || !item.quantity) {
        return res.status(400).json({ message: 'Each item must have a valid name and quantity' });
      }
    }

    // Insert the data into the food_sales table
    items.forEach(item => {
      const query = `
        INSERT INTO food_sales (item_name, quantity, total_amount, sale_date, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      
      db.query(
        query,
        [
          item.name,              // item_name
          item.quantity,          // quantity
          total,                  // total_amount (ensure this is passed correctly)
          sale_date,              // sale_date
          created_at,             // created_at
          updated_at             // updated_at
        ],
        (err, result) => {
          if (err) {
            console.error('Error creating food sale:', err);
            return res.status(500).json({ message: 'Error creating food sale' });
          }
        }
      );
    });

    res.status(201).json({ message: 'Food sale entries created successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getSales = (req, res) => {
  const query = 'SELECT * FROM food_sales ORDER BY sale_date DESC';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching food sales:', err);
      return res.status(500).json({ message: 'Failed to fetch food sales' });
    }
    // Ensure total_amount is a number
    const formattedResults = results.map(sale => ({
      ...sale,
      total_amount: Number(sale.total_amount), // Explicitly convert to number
    }));
    res.json(formattedResults);
  });
};


