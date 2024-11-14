import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

function ExcelEditor() {
  const [excelData, setExcelData] = useState([]);
  const [fileName, setFileName] = useState("");

  // Load data from local storage if it exists
  useEffect(() => {
    const savedData = localStorage.getItem("excelData");
    const savedFileName = localStorage.getItem("fileName");
    if (savedData) {
      setExcelData(JSON.parse(savedData));
    }
    if (savedFileName) {
      setFileName(savedFileName);
    }
  }, []);
  console.log(excelData, "KK");
  // Handle file upload and parse the Excel file
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    setFileName(file.name);
    localStorage.setItem("fileName", file.name);

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setExcelData(jsonData);
      localStorage.setItem("excelData", JSON.stringify(jsonData));
    };

    reader.readAsArrayBuffer(file);
  };

  // Handle cell data change and update local storage
  const handleCellChange = (rowIndex, colIndex, value) => {
    const updatedData = excelData.map((row, rIdx) =>
      row.map((cell, cIdx) =>
        rIdx === rowIndex && cIdx === colIndex ? value : cell
      )
    );
    setExcelData(updatedData);
    localStorage.setItem("excelData", JSON.stringify(updatedData));
  };

  // Add a new empty row
  const handleAddRow = () => {
    const newRow = Array(excelData[0]?.length || 1).fill(""); // Fill with empty cells
    const updatedData = [...excelData, newRow];
    setExcelData(updatedData);
    localStorage.setItem("excelData", JSON.stringify(updatedData));
  };

  // Save edited data and prompt user to save as the original file name
  const handleSave = () => {
    const worksheet = XLSX.utils.aoa_to_sheet(excelData);
    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, worksheet, "Sheet1");

    XLSX.writeFile(newWorkbook, fileName);
  };

  return (
    <div>
      <h2>Upload and Edit Excel Data</h2>
      <input
        type="file"
        onChange={handleFileUpload}
        accept=".xlsx, .xls, .csv"
      />

      {/* Buttons are now at the top */}
      {excelData.length > 0 && (
        <div style={{ marginBottom: "10px" }}>
          <button onClick={handleAddRow}>Add New Row</button>
          <button onClick={handleSave} style={{ marginLeft: "10px" }}>
            Save Changes
          </button>
        </div>
      )}

      {/* Display table if there's data in excelData */}
      {excelData.length > 0 && (
        <table border="1" cellPadding="5">
          <tbody>
            {excelData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex}>
                    <input
                      type="text"
                      value={cell || ""}
                      onChange={(e) =>
                        handleCellChange(rowIndex, colIndex, e.target.value)
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ExcelEditor;
