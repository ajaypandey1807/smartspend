import { useState } from "react"
import axios from "axios"
import { useNavigate,Link } from "react-router-dom"
import "../css/login.css"

function Login(){

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async () => {

    try{

      setLoading(true)

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email,password }
      )

      localStorage.setItem("token",res.data.token)

      navigate("/dashboard")

    }catch(err){

      alert("Invalid email or password")

    }

    setLoading(false)

  }

  return(

    <div className="auth-page">

      <div className="login-container">

        <h1 className="brand">SmartSpend</h1>

        <p className="tagline">Track your expenses smarter</p>

        <div className="input-group">

          <input
          type="email"
          required
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />

          <label>Email</label>

        </div>

        <div className="input-group">

          <input
          type="password"
          required
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />

          <label>Password</label>

        </div>

        <button onClick={handleLogin}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="switch">
          Don't have account?
          <Link to="/register"> Signup</Link>
        </p>

      </div>

    </div>

  )

}

export default Login