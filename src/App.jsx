import { BrowserRouter, Route, Routes } from "react-router-dom"
import Alert from "./components/Alert"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Home from './routes/Home'
import Menu from "./routes/Menu"
import NotFound from "./routes/NotFound"
function App() {

  return (
    <BrowserRouter >
      <Alert/>
      <Header/>
      <main className="container">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/menu' element={<Menu/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
