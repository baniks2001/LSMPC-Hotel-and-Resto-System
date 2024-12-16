const db = require('../services/db');
const { Reservation } = require('../models/reservationModel');

// Create a new reservation
exports.createReservation = (req, res) => {
  try {
    // Destructure the request body to include new fields
    const { 
      client_name, 
      contact_number, 
      address, 
      check_in_date, 
      check_out_date, 
      selected_rooms, 
      selected_hall, 
      total_amount, 
      payment_method, 
      account_name, 
      reference_number, 
      created_at  
    } = req.body;

    // Check if any required fields are missing in the request body
    if (!client_name || !contact_number || !address || !check_in_date || !check_out_date || !selected_rooms || !total_amount || !payment_method || !account_name || !reference_number || !created_at) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new Reservation instance
    const reservation = new Reservation({ 
      client_name, 
      contact_number, 
      address, 
      check_in_date, 
      check_out_date, 
      selected_rooms, 
      selected_hall, 
      total_amount, 
      payment_method, 
      account_name, 
      reference_number, 
      created_at  
    });

    // Validate the reservation data using the model
    reservation.validate();

    // SQL query to insert the new reservation into the database
    const query = `
      INSERT INTO reservations 
      (client_name, contact_number, address, check_in_date, check_out_date, selected_rooms, selected_hall, total_amount, payment_method, account_name, reference_number, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Insert reservation into the database
    db.query(
      query,
      [
        client_name,
        contact_number,
        address,
        check_in_date,
        check_out_date,
        JSON.stringify(selected_rooms),  // Convert selectedRooms to a JSON string
        selected_hall || null,            // Use null if selectedHall is not provided
        total_amount,
        payment_method,
        account_name,
        reference_number,
        created_at  
      ],
      (err, result) => {
        if (err) {
          console.error('Error creating reservation:', err);
          return res.status(500).json({ message: 'Error creating reservation' });
        }
        res.status(201).json({ message: 'Reservation created successfully', reservationId: result.insertId });
      }
    );
  } catch (error) {
    console.error('Validation error:', error);
    res.status(400).json({ message: error.message });
  }
};
