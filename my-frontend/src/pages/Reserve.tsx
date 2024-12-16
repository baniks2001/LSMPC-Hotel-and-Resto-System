import { useState } from "react";
import { rooms, roomNumbers } from "../data/rooms";
import { functionHalls } from "../data/functionHalls";
import RoomCard from "../components/reserve/RoomCard";
import FunctionHallCard from "../components/reserve/FunctionHallCard";
import Card from "../components/shared/Card";
import Button from "../components/shared/Button";

export default function Reserve() {
  const [selectedRooms, setSelectedRooms] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedRoomNumbers, setSelectedRoomNumbers] = useState<{
    [key: string]: string;
  }>({});
  const [selectedHall, setSelectedHall] = useState<string | null>(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [clientName, setClientName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<string>("gcash");
  const [accountName, setAccountName] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");

  const handleRoomSelect = (roomName: string) => {
    setSelectedRooms((prev) => {
      const newState = { ...prev, [roomName]: !prev[roomName] };
      if (!newState[roomName]) {
        setSelectedRoomNumbers((prevNumbers) => {
          const newNumbers = { ...prevNumbers };
          delete newNumbers[roomName];
          return newNumbers;
        });
      }
      return newState;
    });
  };

  const handleRoomNumberSelect = (roomName: string, number: string) => {
    setSelectedRoomNumbers((prevNumbers) => ({
      ...prevNumbers,
      [roomName]: number,
    }));
  };

  const getNumberOfDays = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    return Math.max(
      1,
      Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24))
    );
  };

  const calculateTotal = () => {
    const roomTotal = Object.entries(selectedRooms)
      .filter(([, isSelected]) => isSelected)
      .reduce((total, [roomName]) => {
        const room = rooms.find((r) => r.name === roomName);
        return total + (room ? room.price * getNumberOfDays() : 0);
      }, 0);
  
    const hallPrice = selectedHall
      ? (functionHalls.find((hall) => hall.name === selectedHall)?.price || 0) * getNumberOfDays()
      : 0;
  
    return roomTotal + hallPrice;
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const reservationData = {
      client_name: clientName,
      contact_number: contactNumber,
      address: address,
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
      selected_rooms: Object.keys(selectedRooms).filter(
        (roomName) => selectedRooms[roomName]
      ),
      selected_hall: selectedHall || null,
      total_amount: calculateTotal(),
      payment_method: paymentMethod,
      account_name: accountName,
      reference_number: referenceNumber,
      created_at: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      const data = await response.json();

      if (response.ok && data.message === "Reservation created successfully") {
        alert("Your reservation has been successfully submitted!");

        setSelectedRooms({});
        setSelectedRoomNumbers({});
        setSelectedHall(null);
        setCheckInDate("");
        setCheckOutDate("");
        setClientName("");
        setContactNumber("");
        setAddress("");
        setPaymentMethod("gcash");
        setAccountName("");
        setReferenceNumber("");
      } else {
        throw new Error(data.message || "Unknown error occurred");
      }
    } catch (error) {
      console.error("Error submitting reservation:", error);
      alert("There was an issue with the submission. Please try again.");
    }
  };

  return (
    <section id="reserve" className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <h2 className="text-xl sm:text-2xl font-bold text-green-600 mb-6">
              Available Rooms
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {rooms.map((room) => (
                <RoomCard
                  key={room.name}
                  room={room}
                  isSelected={selectedRooms[room.name] || false}
                  roomNumber={selectedRoomNumbers[room.name] || ""}
                  availableRoomNumbers={roomNumbers[room.name]}
                  onSelect={() => handleRoomSelect(room.name)}
                  onRoomNumberSelect={(number) =>
                    handleRoomNumberSelect(room.name, number)
                  }
                />
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl sm:text-2xl font-bold text-green-600 mb-6">
              Function Halls
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {functionHalls.map((hall) => (
                <FunctionHallCard
                  key={hall.name}
                  hall={hall}
                  isSelected={selectedHall === hall.name}
                  onSelect={() => setSelectedHall(hall.name)}
                />
              ))}
            </div>
          </Card>
        </div>

        <div>
          <Card>
            <h2 className="text-xl sm:text-2xl font-bold text-green-600 mb-6">
              Reservation Summary
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Client Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Client Name
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>

              {/* Contact Number Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <input
                  type="tel"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>

              {/* Address Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>

              {/* Date Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              {/* Reservation Summary */}
              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-900">Selected Rooms:</h3>
                <ul className="mt-2 space-y-1">
                  {Object.entries(selectedRooms)
                    .filter(([, isSelected]) => isSelected)
                    .map(([roomName]) => (
                      <li
                        key={roomName}
                        className="text-sm text-gray-600 flex justify-between items-center"
                      >
                        {roomName} -{" "}
                        {selectedRoomNumbers[roomName] ||
                          "No Room Number Selected"}
                        <button
                          onClick={() => handleRoomSelect(roomName)}
                          className="text-red-600 hover:text-red-800 transition-colors text-sm"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="pt-4">
                <h3 className="font-medium text-gray-900">
                  Total Price: ₱{calculateTotal()}
                </h3>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
                  <option value="gcash">GCash</option>
                  <option value="maya">Maya</option>
                </select>
              </div>

              {/* Conditional fields based on payment method */}
              

              {paymentMethod !== "cash" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Account Name
                    </label>
                    <input
                      type="text"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Reference Number
                    </label>
                    <input
                      type="text"
                      value={referenceNumber}
                      onChange={(e) => setReferenceNumber(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>
                </>
              )}

              {/* QR Code Display for GCash or Maya */}
              {(paymentMethod === "gcash" || paymentMethod === "maya") && (
                <div className="pt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    QR Code
                  </label>
                  <img
                    src={`/gcash.jpg`}
                    alt="GCash QR Code"
                    className="mt-2 rounded-md border-gray-300"
                  />
                </div>
              )}

              <Button
                type="submit"
                className="w-full py-2 bg-green-600 text-white rounded-md"
              >
                Submit Reservation
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
