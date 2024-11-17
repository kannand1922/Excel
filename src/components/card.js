import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function CategoryCards() {
  const navigate = useNavigate();
  const CategoryData = JSON.parse(localStorage.getItem("excelData")) || {};
  const { pathname } = useLocation();

  const handleNavigate = (Category) => {
    navigate(`/types/${Category}`);
  };
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);
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
        WHAT WOULD YOU LIKE
      </Typography>
      <Typography variant="h3" style={styles.title}>
        TO EXPLORE
      </Typography>
      <Grid
        container
        spacing={6}
        justifyContent="center"
        alignItems="stretch"
        marginTop="100px"
      >
        {Object.keys(CategoryData).map((Category) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={Category}
            style={styles.gridItem}
          >
            <Card style={styles.card} onClick={() => handleNavigate(Category)}>
              <CardContent style={styles.cardContent}>
                {/* Image */}
                <img
                  src={`/${Category.toLowerCase()}.png`}
                  alt={Category}
                  style={styles.image}
                />

                {/* Category Name */}
                {/* <Typography variant="h5" style={styles.categoryName}>
                  {Category}
                </Typography> */}
              </CardContent>
              <CardActions style={styles.cardActions}>
                <Button
                  variant="contained"
                  // endIcon={<ArrowForwardIcon />}
                  style={styles.button}
                >
                  {Category}
                </Button>
              </CardActions>
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
  title: {
    marginBottom: "50px",
    fontWeight: "bold",
    color: "#FFD700",
    fontSize: "5rem", // Larger font size for readability
    textAlign: "center",
    // padding: "50px",
  },
  gridItem: {
    marginBottom: "80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  },
  cardActions: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  backButton: {
    position: "fixed", // Fixed to the top-right
    top: "70px",
    right: "50px", // Adjusted for vertical layout
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
};

export default CategoryCards;
