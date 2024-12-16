
interface PaymentQRCodeProps {
  paymentMethod: string;
}

export default function PaymentQRCode({ paymentMethod }: PaymentQRCodeProps) {
  if (!paymentMethod || paymentMethod === 'Cash') {
    return null;
  }

  const qrImage = paymentMethod === 'GCASH' ? '/gcash.jpg' : '/maya.jpg';
  const altText = `${paymentMethod} QR Code`;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium text-gray-900 mb-2">Scan QR Code to Pay</h3>
      <div className="flex justify-center">
        <img
          src={qrImage}
          alt={altText}
          className="w-64 h-64 object-contain border-2 border-gray-200 rounded-lg"
        />
      </div>
      <p className="text-sm text-gray-500 text-center mt-2">
        Please scan this QR code to make your payment
      </p>
    </div>
  );
}