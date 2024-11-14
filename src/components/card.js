import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

function CategoryCards() {
  const navigate = useNavigate();
  const CategoryData = JSON.parse(localStorage.getItem("excelData")) || {};

  const handleNavigate = (Category) => {
    navigate(`/types/${Category}`);
  };

  return (
    <div style={styles.container}>
      <Typography variant="h3" style={styles.title}>
        CATEGORY LIST
      </Typography>
      <Grid container spacing={0} justifyContent="center" alignItems="stretch">
        {Object.keys(CategoryData).map((Category) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            key={Category}
            style={styles.gridItem}
          >
            <Card style={styles.card}>
              <CardContent style={styles.cardContent}>
                <Typography variant="h5" style={styles.categoryName}>
                  {Category}
                </Typography>
              </CardContent>
              <CardActions style={styles.cardActions}>
                <Button
                  onClick={() => handleNavigate(Category)}
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  style={styles.button}
                >
                  View Details
                </Button>
                {/* <IconButton
                  onClick={() => handleNavigate(Category)}
                  style={styles.arrowButton}
                >
                  <ArrowForwardIcon />
                </IconButton> */}
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
    padding: "40px 50px",
    backgroundColor: "#121212",
    color: "#FFD700",
    minHeight: "100vh",
  },
  title: {
    marginBottom: "30px",
    fontWeight: "bold",
    color: "#FFD700",
    fontSize: "3.5rem",
    textAlign: "center",
  },
  gridItem: {
    marginBottom: "50px",
    padding: "80px 60px",
  },
  card: {
    padding: "50px 20px",
    boxShadow: "0px 8px 20px rgba(255, 215, 0, 0.3)",
    borderRadius: "15px",
    backgroundColor: "#1E1E1E",
    transition: "transform 0.3s",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  cardContent: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  categoryName: {
    fontWeight: "600",
    fontSize: "1.4rem",
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
    padding: "8px 20px",
    "&:hover": {
      backgroundColor: "#FFC107",
    },
  },
  arrowButton: {
    color: "#FFD700",
  },
};

export default CategoryCards;
