import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const InactivityRedirect = ({ children }) => {
  const [lastActiveTime, setLastActiveTime] = useState(Date.now());
  const navigate = useNavigate();

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  // Function to reset the inactivity timer on any user interaction
  const resetIdleTimer = () => {
    setLastActiveTime(Date.now());
  };

  useEffect(() => {
    const inactivityTimeout = 5 * 60 * 1000;

    const events = ["mousemove", "keydown", "scroll", "click"]; // Events that reset the timer
    events.forEach((event) => {
      window.addEventListener(event, resetIdleTimer);
    });

    const checkInactivity = setInterval(() => {
      // If inactive for more than 5 minutes, redirect to '/'
      if (Date.now() - lastActiveTime > inactivityTimeout) {
        navigate("/"); // Redirect to home page
      }
    }, 1000); // Check every second

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetIdleTimer);
      });
      clearInterval(checkInactivity); // Clean up on unmount
    };
  }, [lastActiveTime, navigate]);

  return <>{children}</>;
};

export default InactivityRedirect;
