import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

function ExcelReader() {
  const [excelData1, setExcelData1] = useState({});
  const [excelData2, setExcelData2] = useState({});
  const [mergedData, setMergedData] = useState({});
  console.log(excelData1, "EXCEL1");
  console.log(excelData2, "EXCEL2");
  const nav = useNavigate();

  const parseExcelFile = (file, setDataCallback) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const header = rows[0];
      const dataObj = {};

      rows.slice(1).forEach((row) => {
        const brand = row[header.indexOf("ITEM")];
        const rowData = {};

        header.forEach((key, index) => {
          rowData[key] = row[index];
        });

        if (!dataObj[brand]) {
          dataObj[brand] = [];
        }
        dataObj[brand].push(rowData);
      });

      setDataCallback(dataObj);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleFileUpload1 = (event) => {
    parseExcelFile(event.target.files[0], setExcelData1);
  };

  const handleFileUpload2 = (event) => {
    parseExcelFile(event.target.files[0], setExcelData2);
  };

  const handleMergeData = () => {
    const merged = {};

    // Helper function to merge two rows

    // Merge rows for a specific BRAND
    const mergeRows = (row1, row2) => {
      // Merge the properties of row2 into row1
      return {
        ...row1,
        ...row2,
        // If a price property exists in row2 (like 50, 60, etc.), merge them
        ...Object.keys(row2).reduce((acc, key) => {
          if (key !== "ITEM" && key !== "BRAND" && !row1.hasOwnProperty(key)) {
            acc[key] = row2[key];
          }
          return acc;
        }, {}),
      };
    };

    // Function to combine rows from two datasets based on ITEM and BRAND
    const combineBrandRows = (rows1, rows2) => {
      const combinedRows = [...rows1]; // Start with rows from the first dataset

      rows2.forEach((row2) => {
        // Find the matching row in the first dataset by ITEM and BRAND
        const matchIndex = combinedRows.findIndex(
          (row1) =>
            row1["ITEM"] === row2["ITEM"] && row1["BRAND"] === row2["BRAND"]
        );

        if (matchIndex >= 0) {
          // If a match is found, merge the rows
          combinedRows[matchIndex] = mergeRows(combinedRows[matchIndex], row2);
        } else {
          // If no match is found, add the row2 to the combinedRows
          combinedRows.push(row2);
        }
      });

      return combinedRows;
    };

    // Merge both datasets by BRAND
    const allBrands = new Set([
      ...Object.keys(excelData1),
      ...Object.keys(excelData2),
    ]);

    allBrands.forEach((brand) => {
      const rows1 = excelData1[brand] || [];
      const rows2 = excelData2[brand] || [];
      merged[brand] = combineBrandRows(rows1, rows2);
    });

    setMergedData(merged);
    console.log("Merged Data:", merged);
    localStorage.setItem("excelData", JSON.stringify(merged));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Upload and Merge Excel Data</h2>

      {/* File inputs */}
      <div style={styles.fileInputContainer}>
        <input
          type="file"
          onChange={handleFileUpload1}
          accept=".xlsx, .xls, .csv"
          style={styles.fileInput}
        />
        <input
          type="file"
          onChange={handleFileUpload2}
          accept=".xlsx, .xls, .csv"
          style={styles.fileInput}
        />
      </div>

      {/* Button to merge data */}
      <button onClick={handleMergeData} style={styles.mergeButton}>
        Merge Sheets
      </button>

      {/* Button to navigate to /category */}
      <button onClick={() => nav("/category")} style={styles.navButton}>
        Go to Category
      </button>

      {/* Display merged data */}
      <div style={styles.dataContainer}>
        {Object.keys(mergedData).map((brand) => (
          <div key={brand} style={styles.countrySection}>
            <h3 style={styles.countryTitle}>{brand}</h3>
            <table style={styles.table}>
              <thead>
                <tr>
                  {Object.keys(mergedData[brand][0]).map((header) => (
                    <th key={header} style={styles.tableHeader}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mergedData[brand].map((row, rowIndex) => (
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
  fileInputContainer: {
    marginBottom: "20px",
  },
  fileInput: {
    padding: "10px",
    fontSize: "16px",
    margin: "10px",
    cursor: "pointer",
  },
  mergeButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    marginBottom: "30px",
    borderRadius: "4px",
    transition: "background-color 0.3s",
  },
  navButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    marginBottom: "30px",
    borderRadius: "4px",
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
