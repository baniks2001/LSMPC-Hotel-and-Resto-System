class Order {
  constructor({ customerName, orderType, deliveryType, items, paymentMethod, AccountName, referenceNumber, total, roomNumber }) {
    this.customerName = customerName;
    this.orderType = orderType;
    this.deliveryType = deliveryType;
    this.items = items;
    this.paymentMethod = paymentMethod;
    this.AccountName = AccountName;
    this.referenceNumber = referenceNumber;
    this.total = total;
    this.roomNumber = roomNumber;  // Include roomNumber
  }

  // Method to validate order data
  validate() {
    if (!this.customerName || !this.orderType || !this.deliveryType || !this.items || !this.total || !this.paymentMethod) {
      throw new Error('All fields are required');
    }

    if (typeof this.total !== 'number' || this.total <= 0) {
      throw new Error('Total must be a positive number');
    }

    // Validate paymentMethod if it's not 'Cash' (i.e., requires AccountName and referenceNumber)
    if (this.paymentMethod !== 'Cash') {
      if (!this.AccountName || !this.referenceNumber) {
        throw new Error('AccountName and ReferenceNumber are required for this payment method');
      }
    }
  }
}

class Sales {
  constructor({ items, quantity, total, sale_date, created_at, updated_at }) {
    this.items = items;
    this.total = total;
    this.quantity = quantity;
    this.sale_date = sale_date;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  // Method to validate sales data
  validate() {
    if (!this.items || !this.total || !this.quantity || !this.sale_date || !this.created_at || !this.updated_at) {
      throw new Error('All fields are required');
    }

    if (typeof this.total !== 'number' || this.total <= 0) {
      throw new Error('Total must be a positive number');
    }
  }
}

// Export both Order and Sales classes
module.exports = { Order, Sales };
