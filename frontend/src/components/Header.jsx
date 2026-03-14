import { Link, useNavigate } from "react-router-dom"
import "../css/header.css"

function Header(){

  const navigate = useNavigate()

  const handleLogout = () => {

    localStorage.removeItem("token")
    navigate("/")

  }

  return(

    <header className="header">

      <h2 className="logo">SmartSpend</h2>

      <nav className="nav-links">

        <Link to="/">Login</Link>

        <Link to="/register">Signup</Link>

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/profile">Profile</Link>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

      </nav>

    </header>

  )

}

export default Header