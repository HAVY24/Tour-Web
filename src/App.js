import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./components/Navigation/navigation";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { UserProvider } from "./UserContext";
import { TimerProvider } from "./TimerContext";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <TimerProvider>
          <Router>
            <Header />
            <Navbar />
            <Navigation />
            <Footer />
          </Router>
        </TimerProvider>
      </UserProvider>
    </div>
  );
}

export default App;
