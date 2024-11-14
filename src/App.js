// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExcelReader from "./components/excel";
import BeverageCards from "./components/card";
import ListTable from "./components/table";
import ExcelEditor from "./components/editor";
import WelcomePage from "./components/welcome";
import CategoryDetailPage from "./components/3type";
import ItemDetail from "./components/moreDetails";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/add" element={<ExcelReader />} />
          <Route path="/edit" element={<ExcelEditor />} />
          <Route path="/" element={<WelcomePage />} />
          <Route path="/category" element={<BeverageCards />} />
          <Route path="/types/:category" element={<CategoryDetailPage />} />

          <Route path="/list" element={<ListTable />} />
          <Route path="/itemDetails" element={<ItemDetail />} />
          <Route path="/type/:category" element={<CategoryDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
