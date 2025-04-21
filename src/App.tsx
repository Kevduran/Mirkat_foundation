import Front from "./Front"
import {Routes, Route} from "react-router-dom"

function App() {


  return (
    <>
    <Routes>
      {/*Añadir tus rutas aquí*/}
      <Route path="/" element={<Front />} />
    </Routes>
    </>
  )
}

export default App;
