import React, { useState } from "react";
import { orderService } from "../Service/orderService";
import styles from "./TrackOrderPage.module.css"; // optional custom styling
import Navbar from "../components/Navbar/Navbar";

const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState("");
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTrackOrder = async () => {
    setError("");
    setTrackingInfo(null);
    setLoading(true);

    try {
      const data = await orderService.getOrderTracking(orderId);
      setTrackingInfo(data);
    } catch (err) {
      setError(err.message || "Unable to track order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className={styles.trackContainer}>
        <h2>Track Your Order</h2>
        <input
          type="text"
          placeholder="Enter your Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleTrackOrder} className={styles.button}>
          Track Order
        </button>

        {loading && <p>Loading...</p>}

        {error && <p className={styles.error}>{error}</p>}

        {trackingInfo && (
          <div className={styles.result}>
            <h3>Status: {trackingInfo.status}</h3>
            <p>
              <strong>Tracking Number:</strong>{" "}
              {trackingInfo.trackingNumber || "Not assigned"}
            </p>
            <p>
              <strong>Courier:</strong> {trackingInfo.courier || "N/A"}
            </p>
            <p>
              <strong>Address:</strong> {trackingInfo.address}
            </p>
            <p>
              <strong>Total Amount:</strong> ${trackingInfo.totalAmount}
            </p>
            <h4>Order History:</h4>
            <ul>
              {trackingInfo.history.map((entry, idx) => (
                <li key={idx}>
                  {entry.status} — {new Date(entry.date).toLocaleString()}
                </li>
              ))}
            </ul>

            <h4>Items:</h4>
            <ul>
              {trackingInfo.items.map((item, idx) => (
                <li key={idx}>
                  {item.product.name} - {item.variantColor} × {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default TrackOrderPage;
