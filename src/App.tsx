
import Front from "./Front"
import Login from './pages/Login'
import AdminPage from './pages/AdminPage'
import NotAuthorized from './pages/NotAuthorized';
import {Routes, Route} from "react-router-dom"
import NewDetails from "./pages/NewDetails";
import AboutUs from './AboutUs';

function App() {

  return (
    <>
    <Routes>
      {/*Añadir tus rutas aquí*/}
      <Route path="/" element={<Front />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/not-authorized" element={<NotAuthorized />} />
      <Route path="/news/:id" element={<NewDetails />} />
      <Route path="/about" element={<AboutUs />} />

      {/* Puedes agregar más rutas aquí */}
    </Routes>
    
    </>
  )
}

export default App;
