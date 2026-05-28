import { Routes, Route } from "react-router-dom";
import Headbar from "./components/Headbar";
import Home from "./pages/Home";
import ItemPage from "./pages/ItemPage";
import About from "./pages/About";
import Collections from "./pages/Collections";
import Contact from "./pages/Contact";
import CartSidebar from "./components/CartSidebar";
import { useTheme } from "./context/ThemeContext";
import { useState } from "react";
import Signin from "./components/Signin";

function App() {
  const { darkMode, toggleTheme } = useTheme();
  const [ showSignin, setShowSignin ] = useState(false);
  const [name, setName] = useState("");
  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <Headbar setShowSignin={setShowSignin} name={name}/>
      {showSignin && <Signin setShowSignin={setShowSignin} setName={setName}/>}
      <div className="app-layout">
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/item/:id" element={<ItemPage />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <CartSidebar />
      </div>
    </div>
  );
}

export default App;
