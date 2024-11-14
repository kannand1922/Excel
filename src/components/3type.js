import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Button, Card, CardContent, Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function CategoryDetailPage() {
  const { category } = useParams(); // Get the category from the URL
  const navigate = useNavigate();

  // Static data for each category type
  const types = ["premium", "luxury", "regular"];

  const handleNavigate = (type) => {
    navigate(`/list?list=${category}&category=${type}`);
  };

  return (
    <div style={styles.container}>
      <Button
        onClick={() => navigate(-1)} // Navigates to the previous page
        variant="contained"
        style={styles.backButton}
      >
        Back
      </Button>

      <Typography variant="h3" style={styles.title}>
        {category} Category
      </Typography>
      <div style={styles.center}>
        <Grid
          container
          direction="column"
          alignItems="center"
          spacing={5}
          style={styles.gridContainer}
        >
          {types.map((type, index) => (
            <Grid item xs={12} key={index} style={styles.gridItem}>
              <Card style={styles.card}>
                <CardContent style={styles.cardContent}>
                  <Typography variant="h5" style={styles.cardTitle}>
                    {type}
                  </Typography>
                  <Button
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    style={styles.arrowButton}
                    onClick={() => handleNavigate(type)}
                  >
                    View {type}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

const styles = {
  center: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "15rem",
  },
  container: {
    padding: "70px",
    backgroundColor: "#121212",
    minHeight: "100vh",
  },
  backButton: {
    float: "right",
    marginBottom: "40px",
    backgroundColor: "#FFD700",
    color: "#000",
    fontWeight: "bold",
    fontSize: "1.2rem",
    padding: "10px 20px",
    "&:hover": {
      backgroundColor: "#FFC107",
    },
  },
  title: {
    marginBottom: "50px",
    fontWeight: "bold",
    color: "#FFD700",
    fontSize: "3.5rem",
    textAlign: "center",
  },
  gridContainer: {
    width: "100%",
    maxWidth: "1000px",
  },
  gridItem: {
    width: "100%",
    margin: "50px 0px",
  },
  card: {
    backgroundColor: "#1E1E1E",
    color: "#FFD700",
    boxShadow: "0px 12px 30px rgba(255, 215, 0, 0.3)",
    borderRadius: "20px",
    padding: "60px 40px", // Adjusted padding for consistent card spacing
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  cardTitle: {
    fontWeight: "600",
    fontSize: "1.8rem",
  },
  arrowButton: {
    backgroundColor: "#FFD700",
    color: "#000",
    fontWeight: "bold",
    padding: "12px 24px",
    fontSize: "1rem",
    "&:hover": {
      backgroundColor: "#FFC107",
    },
  },
};

export default CategoryDetailPage;
