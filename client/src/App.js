import './App.css';
import {Routes, Route} from "react-router-dom";
import Landing from "./components/Landing/Landing.js";
import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";
import Detail from "./components/Detail/Detail.js";
import Form from "./components/Form/Form.js";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />}/>
          <Route path="/*" element={<Navbar />} >
            <Route path="home" element={ <Home/>}/>
            <Route path="recipes/:id" element={<Detail />}/>
            <Route path="form" element={<Form />}/>
          </Route>
      </Routes>
    </div>
  );
}

export default App;
