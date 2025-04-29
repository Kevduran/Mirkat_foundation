
import Front from "./Front"
import Login from './pages/Login'
import AdminPage from './pages/AdminPage'
import NotAuthorized from './pages/NotAuthorized';
import LoadingPage from './utils/loadingPage';
import {Routes, Route} from "react-router-dom"

function App() {

  return (
    <>
    <Routes>
      {/*Añadir tus rutas aquí*/}
      <Route path="/" element={<Front />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/not-authorized" element={<NotAuthorized />} />
      <Route path="/loading" element={<LoadingPage />} />

      {/* Puedes agregar más rutas aquí */}
    </Routes>
    
    </>
  )
}

export default App;
