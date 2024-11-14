import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";

function ItemDetail() {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const list = searchParams.get("list");
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const listData = JSON.parse(localStorage.getItem("excelData")) || {};
  const data = Object.values(listData).flat(); // Flatten the data into a single array
  const selectedItem = data.find(
    (row) =>
      row.ITEM === list && row.BRAND === brand && row.CATEGORY === category
  );

  if (!selectedItem) {
    return (
      <Typography variant="h4" style={styles.noData}>
        No data available for {list} - {brand}
      </Typography>
    );
  }

  return (
    <div style={styles.container}>
      <Button
        onClick={() => navigate(-1)}
        variant="contained"
        style={styles.backButton}
      >
        Back
      </Button>
      <div style={styles.center}>
        <Typography variant="h3" style={styles.title}>
          ITEM - {selectedItem.ITEM}
        </Typography>

        <Typography variant="h3" style={styles.title}>
          CATEGORY - {selectedItem.CATEGORY}
        </Typography>
        <Typography variant="h3" style={styles.title}>
          SELECTED - {selectedItem.BRAND}
        </Typography>
      </div>
      <div>
        {" "}
        <Grid item xs={12} sm={8} md={6}>
          <Card style={styles.card}>
            <CardMedia
              component="img"
              height="500"
              image={selectedItem.IMAGE}
              alt="item Image"
            />
            <Divider
              sx={{ backgroundColor: "#FFD700", marginBottom: "20px" }}
            />
            <CardContent style={styles.cardContent}>
              <div style={styles.detailRow}>
                <Typography variant="subtitle1" style={styles.label}>
                  ITEM:
                </Typography>
                <Typography variant="body1" style={styles.value}>
                  {selectedItem.ITEM}
                </Typography>
              </div>
              <div style={styles.detailRow}>
                <Typography variant="subtitle1" style={styles.label}>
                  CATEGORY:
                </Typography>
                <Typography variant="body1" style={styles.value}>
                  {selectedItem.CATEGORY}
                </Typography>
              </div>

              <Divider
                sx={{ backgroundColor: "#FFD700", marginBottom: "20px" }}
              />
              {Object.keys(selectedItem).map((key) => {
                if (
                  key !== "ITEM" &&
                  key !== "BRAND" &&
                  key !== "CATEGORY" &&
                  key !== "IMAGE"
                ) {
                  return (
                    <div style={styles.detailRow} key={key}>
                      <Typography variant="subtitle1" style={styles.label}>
                        {key} ml
                      </Typography>
                      <Typography variant="body1" style={styles.value}>
                        ₹{selectedItem[key]}
                      </Typography>
                    </div>
                  );
                }
                return null;
              })}
            </CardContent>
          </Card>
        </Grid>
      </div>

      {/* </Grid> */}
    </div>
  );
}

const styles = {
  container: {
    padding: "70px",
    backgroundColor: "#121212",
    minHeight: "100vh",
    // margin: "0 auto",
    // width: "100%",
  },
  title: {
    marginBottom: "80px", // Increased space below title for better visual separation
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
    fontSize: "3.5rem", // Larger font size for better visibility on large screens
  },
  card: {
    // padding: "10px 100px",
    maxWidth: "800px", // Larger max width for cards
    backgroundColor: "#1E1E1E",
    color: "#FFD700",
    boxShadow: "0px 10px 20px rgba(255, 215, 0, 0.3)",
    borderRadius: "15px",
    margin: "0 auto", // Center card horizontally
  },
  cardContent: {
    padding: "20px", // Increased padding for larger screens
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-evenly",
    marginBottom: "15px", // Reduced space between rows for compactness
  },
  label: {
    fontWeight: "bold",
    color: "#FFD700",
    fontSize: "1.5rem", // Larger font size for labels
    minWidth: "200px", // Ensuring labels are aligned nicely
  },
  value: {
    color: "#E0E0E0",
    fontSize: "1.5rem", // Larger font size for values
  },
  noData: {
    color: "#FFD700",
    textAlign: "center",
    padding: "50px",
    fontSize: "3rem", // Larger font size for "No data" message
  },
  backButton: {
    float: "right",
    marginBottom: "40px",
    backgroundColor: "#FFD700",
    color: "#000",
    fontWeight: "bold",
    fontSize: "1.2rem",
    "&:hover": {
      backgroundColor: "#FFC107",
    },
  },
  center: {
    marginBottom: "20rem",
  },
};

export default ItemDetail;
