import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";

const BuyNotes = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [upi, setUpi] = useState("");
  const [method, setMethod] = useState("");
  const [price, setPrice] = useState("");
  const [paid, setPaid] = useState(false);

  // GET NOTE PRICE
  useEffect(() => {
    fetch(`http://localhost/notes-backend/notes/getSingleNote.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => setPrice(data.price));
  }, [id]);

  // PAY BUTTON
  const handlePay = () => {
    if (method === "Other" && !upi) {
      alert("कृपया Other payment साठी UPI ID टाका");
      return;
    }

    const upiReceiver = method === "Other" ? upi : "notes@upi";
    const upiLink = `upi://pay?pa=${upiReceiver}&pn=Notes&am=${price}&cu=INR`;

    setPaid(true);

    if (/Mobi|Android/i.test(navigator.userAgent)) {
      // Mobile → UPI app auto open
      window.location.href = upiLink;
    } else {
      // Desktop → Show alert
      alert(`Please scan the QR code or pay ₹${price} to UPI ID: ${upiReceiver}`);
    }
  };

  // BUY + DOWNLOAD
  const handleBuy = async () => {
    if (!paid) {
      alert("Please complete payment first");
      return;
    }

    const fd = new FormData();
    fd.append("note_id", id);
    fd.append("name", name);
    fd.append("email", email);
    fd.append("mobile", mobile);
    fd.append("upi", method === "Other" ? upi : "notes@upi");
    fd.append("method", method);

    await fetch("http://localhost/notes-backend/notes/buyNotes.php", {
      method: "POST",
      body: fd,
    });

    window.location.href = `http://localhost/notes-backend/notes/download.php?id=${id}`;
  };

  const upiId = method === "Other" ? upi : "notes@upi";
  const upiLink = `upi://pay?pa=${upiId}&pn=Notes&am=${price}&cu=INR`;

  return (
    <div className="p-8 max-w-md mx-auto bg-white shadow-lg rounded-lg space-y-4">
      <h2 className="text-2xl font-bold text-center">Buy Notes</h2>

      <input
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Mobile"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />

      <select
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
      >
        <option value="">Select Payment</option>
        <option value="Google Pay">Google Pay</option>
        <option value="PhonePe">PhonePe</option>
        <option value="Other">Other UPI</option>
      </select>

      {method === "Other" && (
        <input
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your UPI ID"
          value={upi}
          onChange={(e) => setUpi(e.target.value)}
        />
      )}

      <p className="text-lg font-semibold">Price: ₹{price}</p>

      
        {!/Mobi|Android/i.test(navigator.userAgent) && method && (
  <div className="text-center">
    <p className="mb-2">Scan this QR code with your UPI app:</p>
    <QRCode value={upiLink} size={200} />
  </div>
)}
    

      <button
        onClick={handlePay}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
      >
        Pay Now
      </button>

      <button
        onClick={handleBuy}
        disabled={!paid}
        className={`w-full p-2 rounded text-white transition ${
          paid ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        I Have Paid – Download
      </button>
    </div>
  );
};

export default BuyNotes;