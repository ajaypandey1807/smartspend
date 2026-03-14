import { Link,useNavigate } from "react-router-dom"
import { useState } from "react"
import "../css/sidebar.css"

function Sidebar(){

  const navigate = useNavigate()
  const [dark,setDark] = useState(true)

  const logout = () => {

    localStorage.removeItem("token")
    navigate("/")

  }

  const toggleTheme = () => {

    const body = document.body

    if(dark){

      body.style.background="#ffffff"
      body.style.color="#000"

    }else{

      body.style.background="#1f1c2c"
      body.style.color="#fff"

    }

    setDark(!dark)

  }

  return(

    <div className="sidebar">

      <h2 className="sidebar-logo">SmartSpend</h2>

      <nav className="sidebar-menu">

        <Link to="/dashboard">
          <i className="fas fa-home"></i>
          Dashboard
        </Link>

        <Link to="/analytics">
          <i className="fas fa-chart-pie"></i>
          Analytics
        </Link>

        <Link to="/profile">
          <i className="fas fa-user-circle"></i>
          Profile
        </Link>

        <Link to="/about">
          <i className="fas fa-user"></i>
          About
        </Link>

      </nav>

      <div className="sidebar-actions">

        <button className="theme-btn" onClick={toggleTheme}>

          <i className="fas fa-adjust"></i>

          {dark ? " Light Mode" : " Dark Mode"}

        </button>

        <button className="logout-btn" onClick={logout}>

          <i className="fas fa-sign-out-alt"></i>

          Logout

        </button>

      </div>

    </div>

  )

}

export default Sidebar