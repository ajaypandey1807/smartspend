import { useState } from "react"
import axios from "axios"
import { useNavigate,Link } from "react-router-dom"
import "../css/register.css"

function Register(){

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate()

  const handleRegister = async () => {

    try{

      setLoading(true)

      await axios.post(
        "http://localhost:5000/api/auth/register",
        { name,email,password }
      )

      navigate("/")

    }catch(err){

      alert("Register Failed")

    }

    setLoading(false)

  }

  return(

    <div className="register-page">

      <div className="register-card">

        <h1 className="register-logo">SmartSpend</h1>

        <p className="register-sub">Create your account</p>

        <div className="input-box">
          <input
          type="text"
          required
          value={name}
          onChange={(e)=>setName(e.target.value)}
          />
          <label>Name</label>
        </div>

        <div className="input-box">
          <input
          type="email"
          required
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />
          <label>Email</label>
        </div>

        <div className="input-box">
          <input
          type="password"
          required
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
          <label>Password</label>
        </div>

        <button className="signup-btn" onClick={handleRegister}>
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p className="login-link">
          Already have account?
          <Link to="/"> Login</Link>
        </p>

      </div>

    </div>

  )

}

export default Register