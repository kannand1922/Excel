import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom"; // For navigation (React Router)

function ExcelReader() {
  const [excelData, setExcelData] = useState({});
  const nav = useNavigate(); // React Router hook for navigation

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const header = rows[0];
      const countryData = {};

      rows.slice(1).forEach((row) => {
        const country = row[0];
        const rowData = {};

        header.forEach((key, index) => {
          rowData[key] = row[index];
        });

        if (!countryData[country]) {
          countryData[country] = [];
        }
        countryData[country].push(rowData);
      });

      localStorage.setItem("excelData", JSON.stringify(countryData));
      setExcelData(countryData);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleNavigateToCategory = () => {
    nav("/category"); // Navigate to /category page
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Upload and Display Excel Data</h2>

      {/* File input */}
      <input
        type="file"
        onChange={handleFileUpload}
        accept=".xlsx, .xls, .csv"
        style={styles.fileInput}
      />

      {/* Button to navigate to /category */}
      <button onClick={handleNavigateToCategory} style={styles.navButton}>
        Go to Category
      </button>

      {/* Display data */}
      <div style={styles.dataContainer}>
        {Object.keys(excelData).map((country) => (
          <div key={country} style={styles.countrySection}>
            <h3 style={styles.countryTitle}>{country}</h3>
            <table style={styles.table}>
              <thead>
                <tr>
                  {Object.keys(excelData[country][0]).map((header) => (
                    <th key={header} style={styles.tableHeader}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {excelData[country].map((row, rowIndex) => (
                  <tr key={rowIndex} style={styles.tableRow}>
                    {Object.keys(row).map((key) => (
                      <td key={key} style={styles.tableCell}>
                        {row[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  fileInput: {
    padding: "10px",
    fontSize: "16px",
    marginBottom: "30px",
    cursor: "pointer",
  },
  navButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#1976d2", // Blue button color
    color: "#fff",
    border: "none",
    cursor: "pointer",
    marginBottom: "30px",
    borderRadius: "4px",
    transition: "background-color 0.3s",
  },
  navButtonHover: {
    backgroundColor: "#1565c0", // Darker blue on hover
  },
  dataContainer: {
    marginTop: "20px",
  },
  countrySection: {
    marginBottom: "40px",
  },
  countryTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  tableHeader: {
    backgroundColor: "#1976d2",
    color: "#fff",
    fontWeight: "bold",
    padding: "8px",
    textAlign: "left",
  },
  tableRow: {
    backgroundColor: "#f9f9f9",
  },
  tableCell: {
    padding: "8px",
    border: "1px solid #ddd",
    textAlign: "left",
  },
};

export default ExcelReader;
