import { useState,useEffect } from "react"
import Sidebar from "../components/Sidebar"
import axios from "axios"
import "../css/profile.css"

function Profile(){

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [image,setImage] = useState("")

  const [total,setTotal] = useState(0)
  const [categories,setCategories] = useState(0)
  const [month,setMonth] = useState(0)

  const [github,setGithub] = useState(null)

  /* SOCIAL LINKS */

  const socialLinks = {
    github:"https://github.com/ajaypandey1807",
    linkedin:"https://www.linkedin.com/in/ajay-pandey-4141462a4/",
    instagram:"https://www.instagram.com/pandey.ji__800/",
    facebook:"https://www.facebook.com/ajaypandey4976",
    twitter:"https://x.com/AjayPan04531465"
  }

  useEffect(()=>{

    const storedName = localStorage.getItem("profileName")
    const storedEmail = localStorage.getItem("profileEmail")
    const storedImage = localStorage.getItem("profileImage")

    if(storedName) setName(storedName)
    if(storedEmail) setEmail(storedEmail)
    if(storedImage) setImage(storedImage)

  },[])

  /* FETCH EXPENSE STATS */

  useEffect(()=>{

    const fetchStats = async()=>{

      try{

        const token = localStorage.getItem("token")

        const res = await axios.get(
          "http://localhost:5000/api/expenses",
          { headers:{ Authorization:`Bearer ${token}` } }
        )

        const expenses = res.data

        let totalSum = 0
        const cat = new Set()
        let monthSum = 0
        const now = new Date()

        expenses.forEach(e=>{

          totalSum += e.amount
          cat.add(e.category)

          const date = new Date(e.createdAt)

          if(date.getMonth()===now.getMonth()){
            monthSum += e.amount
          }

        })

        setTotal(totalSum)
        setCategories(cat.size)
        setMonth(monthSum)

      }catch(err){

        console.log(err)

      }

    }

    fetchStats()

  },[])

  /* GITHUB API */

  useEffect(()=>{

    fetch("https://api.github.com/users/ajaypandey1807")
    .then(res=>res.json())
    .then(data=>setGithub(data))

  },[])

  const saveProfile = () => {

    localStorage.setItem("profileName",name)
    localStorage.setItem("profileEmail",email)

    alert("Profile Updated")

  }

  const uploadImage = (e) => {

    const file = e.target.files[0]

    const reader = new FileReader()

    reader.onloadend = () => {

      setImage(reader.result)

      localStorage.setItem("profileImage",reader.result)

    }

    reader.readAsDataURL(file)

  }

  return(

    <div className="profile-layout">

      <Sidebar/>

      <div className="profile-container">

        <div className="cover-banner"></div>

        <div className="profile-card">

          <div className="avatar-section">

            <img
            src={image || "https://i.imgur.com/6VBx3io.png"}
            className="avatar"
            />

            <label className="upload-icon">
              📷
              <input type="file" onChange={uploadImage}/>
            </label>

          </div>

          <h2>{name || "Ajay Pandey"}</h2>
          <p>{email || "abc@email.com"}</p>

          <button onClick={saveProfile}>
            Update Profile
          </button>

          {/* STATS */}

          <div className="profile-stats">

            <div>
              <h3>₹{total}</h3>
              <p>Total</p>
            </div>

            <div>
              <h3>{categories}</h3>
              <p>Categories</p>
            </div>

            <div>
              <h3>₹{month}</h3>
              <p>This Month</p>
            </div>

          </div>

          {/* GITHUB */}

          {github && (

            <div className="github-box">

              <img src={github.avatar_url} alt="github"/>

              <p>{github.login}</p>

              <p>Repos: {github.public_repos}</p>

              <p>Followers: {github.followers}</p>

            </div>

          )}

          {/* SOCIAL LINKS */}

          <div className="social-links">

            <a href={socialLinks.github} target="_blank">GitHub</a>

            <a href={socialLinks.linkedin} target="_blank">LinkedIn</a>

            <a href={socialLinks.instagram} target="_blank">Instagram</a>

            <a href={socialLinks.facebook} target="_blank">Facebook</a>

            <a href={socialLinks.twitter} target="_blank">X</a>

          </div>

        </div>

      </div>

    </div>

  )

}

export default Profile