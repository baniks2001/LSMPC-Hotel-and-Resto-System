class Reservation {
  constructor({ 
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
  }) {
    this.client_name = client_name;
    this.contact_number = contact_number;
    this.address = address;
    this.check_in_date = check_in_date;
    this.check_out_date = check_out_date;
    this.selected_rooms = selected_rooms;
    this.selected_hall = selected_hall;
    this.total_amount = total_amount;
    this.payment_method = payment_method;
    this.account_name = account_name;
    this.reference_number = reference_number;
    this.created_at = created_at;
  }

  // Method to validate reservation data
  validate() {
    if (!this.client_name || !this.contact_number || !this.address || !this.check_in_date || !this.check_out_date || !this.selected_rooms || !this.total_amount || !this.payment_method || !this.account_name || !this.reference_number || !this.created_at) {
      throw new Error('All fields are required');
    }

    if (typeof this.total_amount !== 'number' || this.total_amount <= 0) {
      throw new Error('Total amount must be a positive number');
    }

    // Validate selected_rooms is an array
    if (!Array.isArray(this.selected_rooms)) {
      throw new Error('Selected rooms must be an array');
    }

    // Additional validation for selectedRooms and check-in/check-out dates can be added
  }
}

// Export both Order and Sales classes
module.exports = { Reservation};
