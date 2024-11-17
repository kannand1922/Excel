import React from "react";
import { Typography, Button, Card, CardContent, Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

function CategoryDetailPage() {
  const navigate = useNavigate();
  const { category } = useParams();
  // Categories and their corresponding images
  const categories = [
    { name: "Domestic", image: "/images/domestic.png" },
    { name: "International", image: "/images/international.png" },
  ];

  const handleNavigate = (value) => {
    navigate(`/list?list=${category}&category=${value}`);
  };

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <Button
        onClick={() => navigate(-1)} // Navigates to the previous page
        variant="contained"
        style={styles.backButton}
      >
        Back
      </Button>

      <Typography variant="h3" style={styles.title}>
        CHOOSE CATEGORY
      </Typography>

      {/* Categories Grid */}
      <Grid container spacing={6} justifyContent="center" alignItems="center">
        {categories.map((row, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            style={styles.gridItem}
            onClick={() => handleNavigate(row.name)}
          >
            <Card style={styles.card}>
              <Typography variant="h5" style={styles.rowName}>
                {category}
              </Typography>
              <CardContent style={styles.cardContent}>
                <img src={row.image} alt={row.name} style={styles.image} />
              </CardContent>
              <Button variant="contained" style={styles.button}>
                {row.name}
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

const styles = {
  container: {
    padding: "70px", // More padding for high resolution
    backgroundColor: "#121212",
    color: "#FFD700",
    minHeight: "97vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  backButton: {
    position: "fixed", // Fixed to the top-left
    top: "70px",
    left: "50px", // Adjusted for horizontal layout
    backgroundColor: "#FFD700",
    color: "#000",
    fontWeight: "bold",
    fontSize: "1.8rem", // Larger font size for back button
    padding: "20px 50px", // Larger button padding
    zIndex: 1000,
    "&:hover": {
      backgroundColor: "#FFC107",
    },
  },
  title: {
    marginBottom: "50px",
    fontWeight: "bold",
    color: "#FFD700",
    fontSize: "5rem", // Larger font size for readability
    textAlign: "center",
  },
  gridItem: {
    margin: "80px 40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  card: {
    width: "450px", // Increased width for large displays
    height: "500px", // Taller cards for high-resolution display
    boxShadow: "0px 15px 30px rgba(255, 215, 0, 0.5)",
    borderRadius: "25px",
    backgroundColor: "#1E1E1E",
    padding: "50px",
    transition: "transform 0.3s",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  cardContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  image: {
    width: "180px", // Larger image size
    height: "180px",
    borderRadius: "12px",
    objectFit: "cover",
    marginBottom: "25px",
  },
  categoryName: {
    fontWeight: "800",
    fontSize: "2rem", // Larger font for category names
    color: "#FFD700",
    marginBottom: "20px", // Space between the image and name
  },
  button: {
    color: "#000",
    backgroundColor: "#FFD700",
    fontWeight: "bold",
    padding: "15px 40px", // Larger button size
    fontSize: "1.5rem",
    "&:hover": {
      backgroundColor: "#FFC107",
    },
  },
  rowName: {
    color: "#FFD700",
  },
};

export default CategoryDetailPage;
