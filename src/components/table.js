import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stack,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FilterListIcon from "@mui/icons-material/FilterList"; // Filter Icon

function ListTable() {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const list = searchParams.get("list");
  const category = searchParams.get("category");

  const listData = JSON.parse(localStorage.getItem("excelData")) || {};
  const data = listData[list] || [];

  const [filters, setFilters] = useState({
    item: "",
    category: "",
    brand: "",
    cost: "",
    age: "",
    type: "",
  });

  const [openFilterModal, setOpenFilterModal] = useState(false); // Modal state

  const uniqueValues = (key) => {
    const values = [...new Set(data.map((row) => row[key]))];
    return values.length > 0 ? values : null;
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const filteredData = data.filter((row) => {
    return (
      (!filters.item || row.ITEM === list) &&
      (filters.category || row.CATEGORY === category) &&
      (!filters.brand || row.BRAND === filters.brand) &&
      (!filters.cost || row.COST === filters.cost) &&
      (!filters.age || row.AGE === filters.age) &&
      (!filters.type || row.TYPE === filters.type)
    );
  });

  const handleMoreDetails = (brand) => {
    navigate(`/itemDetails?list=${list}&category=${category}&brand=${brand}`);
  };

  const openFilterDialog = () => {
    setOpenFilterModal(true); // Open modal
  };

  const closeFilterDialog = () => {
    setOpenFilterModal(false); // Close modal
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
        {list} ITEMS
      </Typography>

      {/* Filter Button */}
      <Stack direction="row" spacing={3}>
        <Typography variant="h6" color="primary" style={styles.filterTExt}>
          Filter
        </Typography>
        <IconButton
          color="primary"
          style={styles.filterButton}
          onClick={openFilterDialog}
        >
          <FilterListIcon fontSize="large" />
        </IconButton>
      </Stack>

      {/* Filter Modal */}
      <Dialog open={openFilterModal} onClose={closeFilterDialog}>
        <DialogTitle style={styles.dialogTitle}>FILTER ITEMS</DialogTitle>
        <DialogContent style={styles.dialogContent}>
          <Stack direction="row" flexWrap="wrap" spacing={4}>
            {uniqueValues("BRAND") && (
              <FormControl variant="outlined" style={styles.dropdown}>
                <InputLabel style={styles.inputLabel}>
                  Filter By Brand
                </InputLabel>
                <Select
                  value={filters.brand}
                  onChange={(e) => handleFilterChange("brand", e.target.value)}
                  label="Filter By Brand"
                  style={styles.select}
                >
                  <MenuItem value="">All</MenuItem>
                  {uniqueValues("BRAND").map((value, index) => (
                    <MenuItem key={index} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {uniqueValues("COST")[0] && (
              <FormControl
                variant="outlined"
                style={styles.dropdown}
                sx={{ margin: "20px" }}
              >
                <InputLabel style={styles.inputLabel}>
                  Filter By Cost
                </InputLabel>
                <Select
                  value={filters.cost}
                  onChange={(e) => handleFilterChange("cost", e.target.value)}
                  label="Filter By Cost"
                  style={styles.select}
                >
                  <MenuItem value="">All</MenuItem>
                  {uniqueValues("COST").map((value, index) => (
                    <MenuItem key={index} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {uniqueValues("AGE")[0] && (
              <FormControl variant="outlined" style={styles.dropdown}>
                <InputLabel style={styles.inputLabel}>Filter By Age</InputLabel>
                <Select
                  value={filters.age}
                  onChange={(e) => handleFilterChange("age", e.target.value)}
                  label="Filter By Age"
                  style={styles.select}
                >
                  <MenuItem value="">All</MenuItem>
                  {uniqueValues("AGE").map((value, index) => (
                    <MenuItem key={index} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {uniqueValues("TYPE")[0] && (
              <FormControl variant="outlined" style={styles.dropdown}>
                <InputLabel style={styles.inputLabel}>
                  Filter By Type
                </InputLabel>
                <Select
                  value={filters.type}
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                  label="Filter By Type"
                  style={styles.select}
                >
                  <MenuItem value="">All</MenuItem>
                  {uniqueValues("TYPE").map((value, index) => (
                    <MenuItem key={index} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Stack>
        </DialogContent>
        <DialogActions style={styles.dialogActions}>
          <Button onClick={closeFilterDialog} style={styles.closeButton}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Display Filtered Data */}
      <Grid container spacing={6}>
        {filteredData.map((row, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card style={styles.card}>
              <CardMedia
                component="img"
                height="500"
                image={row.IMAGE}
                alt="item Image"
              />
              <CardContent>
                <Typography variant="subtitle1">ITEM: {row.ITEM}</Typography>
                <Typography variant="subtitle1">
                  CATEGORY: {row.CATEGORY}
                </Typography>
                <Typography variant="subtitle1">NAME: {row.DisplayName}</Typography>
                <Divider />
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => handleMoreDetails(row.BRAND)}
                >
                  More Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

const styles = {
  filterTExt: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: "2rem",
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
  container: {
    padding: "70px", // More padding for high resolution
    backgroundColor: "#121212",
    color: "#FFD700",
    minHeight: "97vh",
  },
  title: {
    marginBottom: "50px",
    fontWeight: "bold",
    color: "#FFD700",
    fontSize: "5rem", // Larger font size for readability
    textAlign: "center",
  },
  filterButton: {
    marginBottom: "20px",
    backgroundColor: "#FFD700",
    color: "#000",
    "&:hover": {
      backgroundColor: "#FFC107",
    },
  },
  dropdown: {
    minWidth: "250px",
    margin: "0 20px",
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
  dialogTitle: {
    backgroundColor: "#000",
    color: "#FFD700", // gold color
    padding: "20px 40px",
    fontSize: "1.5rem",
  },
  dialogContent: {
    backgroundColor: "#000",
    color: "#FFD700", // gold color
    padding: "20px 70px",
    minWidth: "300px",
  },
  dropdown: {
    margin: "8px",
    minWidth: "200px",
    backgroundColor: "#000",
    color: "#FFD700", // gold color
  },
  inputLabel: {
    color: "#FFD700", // gold color
  },
  select: {
    color: "#FFD700", // gold color
    backgroundColor: "#333", // dark background for the select
  },
  dialogActions: {
    backgroundColor: "#000",
    padding: "10px",
  },
  closeButton: {
    color: "#FFD700", // gold color
    margin: "8px",
  },
};

export default ListTable;
