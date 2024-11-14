import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    // Fade-in effect after the component mounts
    setTimeout(() => {
      setFadeIn(true);
    }, 500); // Delay of 0.5 seconds before the fade-in effect

    // Bounce animation for header
    setTimeout(() => {
      setBounce(true);
    }, 1000); // Delay to trigger bounce effect
  }, []);

  const navigateToCategoryPage = () => {
    navigate("/category"); // Navigate to category page
  };

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.content,
          opacity: fadeIn ? 1 : 0, // Fade-in effect for content
          transform: fadeIn ? "translateY(0)" : "translateY(30px)", // Slide-up effect for content
          transition: "opacity 1s ease, transform 1s ease", // Smooth fade and slide animation
        }}
      >
        <h1
          style={{
            ...styles.header,
            opacity: fadeIn ? 1 : 0, // Fade-in effect for header
            transform: bounce
              ? "translateY(0) scale(1.1)" // Bounce and scale effect after delay
              : "translateY(-50px)", // Slide effect for header
            transition: "opacity 1s ease, transform 0.6s ease", // Header animation timing
          }}
        >
          Welcome to Sree Murugan Enterpriser
        </h1>
        <button
          style={styles.button}
          onClick={navigateToCategoryPage}
          onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"} // Hover effect (scale up)
          onMouseLeave={(e) => e.target.style.transform = "scale(1)"} // Reset to original size
        >
          Explore
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to bottom right, #1E1E1E, #D4AF37)", // Black to gold gradient
    color: "#fff",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    borderRadius: "20px", // Adding curved edges to the container
    overflow: "hidden",
    padding: "0 50px", // Horizontal padding for large screen sizes
  },
  content: {
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent black background
    padding: "60px", // Increased padding for larger screens
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
    maxWidth: "1200px", // Increased max width for larger screens
    width: "100%", // Ensures content takes full width
    backdropFilter: "blur(10px)", // Adding a blurred background effect
  },
  header: {
    fontSize: "4.5em", // Larger font size for high-resolution screens
    marginBottom: "40px", // Increased margin for better spacing
    color: "#D4AF37", // Gold color for header text
    fontWeight: "bold",
    animation: "bounce 2s ease infinite", // Bounce animation for the header
  },
  button: {
    backgroundColor: "#D4AF37", // Gold button
    color: "#1E1E1E", // Dark text on the button for contrast
    fontSize: "2em", // Larger font size for buttons on larger screens
    padding: "22px 50px", // Increased padding for better button size
    border: "none",
    borderRadius: "50px", // Rounded button
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.3s ease", // Button transition
    fontWeight: "bold",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    marginTop: "30px", // Added margin to separate the button from the text
  },
  buttonHover: {
    backgroundColor: "#FFD700", // Lighter gold when hovered
  },
};

export default WelcomePage;
