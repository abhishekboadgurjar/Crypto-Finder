import React from "react";
import CryptoFinder from "./components/CryptoFinder";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {Route,Routes} from "react-router-dom"
import CryptoDetails from "./components/CryptoDetails";
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<CryptoFinder/>}/>
        <Route path="/details/:id" element={<CryptoDetails/>}/>
      </Routes>
     
      <Footer />
    </div>
  );
};

export default App;
