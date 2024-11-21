import logo from './logo.svg';
import './App.css';
import Login from "./pages/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Dashboard} from "./pages/Dashboard";
import BookManager from "./pages/Books/BookManager";

function App() {
  return (
      <BrowserRouter>

          <Routes>
              <Route path="/" Component={Login}/>
              <Route path="/dashboard" Component={BookManager}/>
          </Routes>

      </BrowserRouter>
  );
}

export default App;
