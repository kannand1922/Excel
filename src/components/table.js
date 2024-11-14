import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  // MenuItem,
  // Select,
  // FormControl,
  // InputLabel,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function ListTable() {
  const navigate = useNavigate();
  const location = useLocation();

  // Parse the query parameters from the URL
  const searchParams = new URLSearchParams(location.search);
  const list = searchParams.get("list");
  const category = searchParams.get("category");

  const listData = JSON.parse(localStorage.getItem("excelData")) || {};
  const data = listData[list];

  const [selectedBrand, setSelectedBrand] = useState("");

  if (!data) {
    return (
      <Typography variant="h4" style={styles.noData}>
        No data available for {list}
      </Typography>
    );
  }

  // const uniqueBrands = [...new Set(data.map((row) => row.BRAND))];
  const categoryFilteredData =
    category && list
      ? data.filter((row) => row.ITEM === list && row.CATEGORY === category)
      : data;

  const handleMoreDetails = (brand) => {
    navigate(`/itemDetails?list=${list}&category=${category}&brand=${brand}`);
  };

  return (
    <div style={styles.container}>
      <Button
        onClick={() => navigate(-1)}
        variant="contained"
        style={styles.backButton}
      >
        Back
      </Button>

      <Typography variant="h3" style={styles.title}>
        {list} ITEMS
      </Typography>

      {/* <FormControl variant="outlined" style={styles.dropdown}>
        <InputLabel style={styles.inputLabel} htmlFor="select-brand">
          Select Brand
        </InputLabel>
        <Select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          label="Select Brand"
          id="select-brand"
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#FFD700",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#FFC107",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#FFD700",
            },
            "& .MuiSelect-icon": {
              color: "#FFD700",
            },
            "& .MuiInputBase-input": {
              color: "#FFD700",
            },
          }}
        >
          <MenuItem value="">
            <em>All Brands</em>
          </MenuItem>
          {uniqueBrands.map((brand) => (
            <MenuItem key={brand} value={brand}>
              {brand}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}

      <Grid container spacing={6}>
        {categoryFilteredData.map((row, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={index}
            style={styles.gridItem}
          >
            <Card style={styles.card}>
              <CardMedia
                component="img"
                height="500"
                image={row.IMAGE}
                alt="item Image"
              />
              <CardContent style={styles.cardContent}>
                <div style={styles.detailRow}>
                  <Typography variant="subtitle1" style={styles.label}>
                    ITEM:
                  </Typography>
                  <Typography variant="body1" style={styles.value}>
                    {row.ITEM}
                  </Typography>
                </div>
                <div style={styles.detailRow}>
                  <Typography variant="subtitle1" style={styles.label}>
                    CATEGORY:
                  </Typography>
                  <Typography variant="body1" style={styles.value}>
                    {row.CATEGORY}
                  </Typography>
                </div>
                <div style={styles.detailRow}>
                  <Typography variant="subtitle1" style={styles.label}>
                    BRAND:
                  </Typography>
                  <Typography variant="body1" style={styles.value}>
                    {row.BRAND}
                  </Typography>
                </div>
                <Divider style={styles.divider} />
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => handleMoreDetails(row.BRAND)}
                  style={styles.moreDetailsButton}
                >
                  More Details
                </Button>
                <IconButton
                  onClick={() => handleMoreDetails(row.BRAND)}
                  style={styles.arrowButton}
                ></IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

const styles = {
  container: {
    padding: "70px",
    backgroundColor: "#121212",
    minHeight: "100vh",
  },
  title: {
    marginBottom: "40px",
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
    fontSize: "3.5rem",
  },
  dropdown: {
    marginBottom: "40px",
    minWidth: 400,
  },
  inputLabel: {
    color: "#FFD700",
  },
  card: {
    maxWidth: 500,
    backgroundColor: "#1E1E1E",
    color: "#FFD700",
    boxShadow: "0px 6px 15px rgba(255, 215, 0, 0.3)",
    borderRadius: "10px",
    transition: "transform 0.3s",
    marginBottom: "20px",
  },
  cardContent: {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "16px",
  },
  label: {
    fontWeight: "bold",
    color: "#FFD700",
  },
  value: {
    color: "#E0E0E0",
  },
  noData: {
    color: "#FFD700",
    textAlign: "center",
    padding: "40px",
    fontSize: "2rem",
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
  divider: {
    width: "100%",
    margin: "16px 0",
    backgroundColor: "#FFD700",
  },
  moreDetailsButton: {
    backgroundColor: "#FFD700",
    color: "#000",
    fontWeight: "bold",
    marginTop: "16px",
    "&:hover": {
      backgroundColor: "#FFC107",
    },
  },
};

export default ListTable;
