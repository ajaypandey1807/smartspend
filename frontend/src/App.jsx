import { BrowserRouter as Router,Routes,Route,Navigate } from "react-router-dom"

import Header from "./components/Header"
import Footer from "./components/Footer"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Analytics from "./pages/Analytics"
import About from "./pages/About"
import Profile from "./pages/Profile"

function ProtectedRoute({children}){

  const token = localStorage.getItem("token")

  if(!token){
    return <Navigate to="/" />
  }

  return children

}

function App(){

  return(

    <Router>

      <Header />

      <main className="page">

        <Routes>

          <Route path="/" element={<Login/>} />

          <Route path="/register" element={<Register/>} />

          <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          }
          />

          <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics/>
            </ProtectedRoute>
          }
          />

          <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          }
          />

          <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About/>
            </ProtectedRoute>
          }
          />

        </Routes>

      </main>

      <Footer />

    </Router>

  )

}

export default App