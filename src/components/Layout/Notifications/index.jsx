import React, { useState, useEffect } from "react";
import { guestMode } from "./notificationData";

const Notifications = () => {
  const [notificationIndex, setNotificationIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotificationIndex((prevNotificationIndex) => {
        return (prevNotificationIndex + 1) % guestMode.length;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  let bgColor;
  const handleSetColor = (type) => {
    switch (type) {
      case "warning":
        bgColor = "bg-yellow-300";
        break;
      case "success":
        bgColor = "bg-green-300";
        break;
      case "error":
        bgColor = "bg-red-300";
        break;
      default:
        bgColor = "bg-gray-300";
    }
  };

  return (
    <a href="localhost:3000/login">
      <div className={`w-full`}>
        {guestMode.map((notification, i) => {
          handleSetColor(notification.type);
          return (
            <div
              key={notification.id}
              className={`flex ${
                notificationIndex === i ? "block" : "hidden"
              } items-center justify-center ${bgColor} p-1 my-1 text-sm`}
            >
              {notification.message}
            </div>
          );
        })}
      </div>
    </a>
  );
};

export default Notifications;
