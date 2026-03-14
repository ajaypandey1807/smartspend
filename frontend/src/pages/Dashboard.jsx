import ExpenseForm from "../components/ExpenseForm"
import ExpenseList from "../components/ExpenseList"
import Sidebar from "../components/Sidebar"
import "../css/dashboard.css"
import { useState,useEffect } from "react"
import axios from "axios"

function Dashboard(){

  const [expenses,setExpenses] = useState([])
  const [total,setTotal] = useState(0)
  const [today,setToday] = useState(0)
  const [week,setWeek] = useState(0)
  const [month,setMonth] = useState(0)
  const [filter,setFilter] = useState("all")

  const fetchExpenses = async () => {

    try{

      const token = localStorage.getItem("token")

      const res = await axios.get(
        "http://localhost:5000/api/expenses",
        { headers:{ Authorization:`Bearer ${token}` } }
      )

      setExpenses(res.data)

    }catch(err){

      console.log(err)

    }

  }

  useEffect(()=>{
    fetchExpenses()
  },[])

  /* CALCULATIONS */

  useEffect(()=>{

    let totalSum = 0
    let todaySum = 0
    let weekSum = 0
    let monthSum = 0

    const now = new Date()

    expenses.forEach(e=>{

      const date = new Date(e.createdAt || Date.now())

      totalSum += e.amount

      if(date.toDateString()===now.toDateString()){
        todaySum += e.amount
      }

      const diff = (now-date)/(1000*60*60*24)

      if(diff<=7){
        weekSum += e.amount
      }

      if(date.getMonth()===now.getMonth()){
        monthSum += e.amount
      }

    })

    setTotal(totalSum)
    setToday(todaySum)
    setWeek(weekSum)
    setMonth(monthSum)

  },[expenses])

  return(

    <div className="dashboard-layout">

      <Sidebar/>

      <div className="dashboard">

        <h2 className="dash-title">SmartSpend Dashboard</h2>

        {/* STATS CARDS */}

        <div className="stats-grid">

          <div className="stat-card">
            <h4>Total</h4>
            <p>₹ {total}</p>
          </div>

          <div className="stat-card">
            <h4>Today</h4>
            <p>₹ {today}</p>
          </div>

          <div className="stat-card">
            <h4>Week</h4>
            <p>₹ {week}</p>
          </div>

          <div className="stat-card">
            <h4>Month</h4>
            <p>₹ {month}</p>
          </div>

        </div>

        {/* FILTER BAR */}

        <div className="filter-bar">

          <button onClick={()=>setFilter("all")}>All</button>

          <button onClick={()=>setFilter("today")}>Today</button>

          <button onClick={()=>setFilter("week")}>Week</button>

          <button onClick={()=>setFilter("month")}>Month</button>

        </div>

        <ExpenseForm/>

        <ExpenseList filter={filter}/>

      </div>

    </div>

  )

}

export default Dashboard