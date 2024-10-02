// src/components/Notification.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from "firebase/firestore";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "notifications"), (snapshot) => {
      const notificationData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotifications(notificationData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="notification-container">
      <h2>Notifications</h2>
      {notifications.map(notification => (
        <div key={notification.id} className="notification">
          <p>{notification.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Notification;
