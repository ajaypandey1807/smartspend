import { useEffect,useState } from "react"
import axios from "axios"
import Sidebar from "../components/Sidebar"

import { Pie,Bar } from "react-chartjs-2"

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js"

import "../css/analytics.css"

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
)

function Analytics(){

  const [expenses,setExpenses] = useState([])

  const fetchExpenses = async () => {

    try{

      const token = localStorage.getItem("token")

      const res = await axios.get(
        "http://localhost:5000/api/expenses",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )

      setExpenses(res.data)

    }catch(err){
      console.log(err)
    }

  }

  useEffect(()=>{
    fetchExpenses()
  },[])

  /* CATEGORY PIE CHART */

  const categoryData = {}

  expenses.forEach((e)=>{

    categoryData[e.category] =
      (categoryData[e.category] || 0) + e.amount

  })

  const pieData = {

    labels:Object.keys(categoryData),

    datasets:[
      {
        label:"Category Expenses",
        data:Object.values(categoryData)
      }
    ]

  }

  /* MONTHLY BAR CHART */

  const monthly = {}

  expenses.forEach(e=>{

    const date = new Date(e.createdAt || Date.now())

    const month =
      date.toLocaleString("default",{month:"short"})

    monthly[month] =
      (monthly[month] || 0) + e.amount

  })

  const barData = {

    labels:Object.keys(monthly),

    datasets:[
      {
        label:"Monthly Expenses",
        data:Object.values(monthly)
      }
    ]

  }

  return(

    <div className="analytics-layout">

      <Sidebar/>

      <div className="analytics">

        <h2>Expense Analytics</h2>

        <div className="chart-box">

          <h3>Category Breakdown</h3>

          <Pie data={pieData}/>

        </div>

        <div className="chart-box">

          <h3>Monthly Expenses</h3>

          <Bar data={barData}/>

        </div>

      </div>

    </div>

  )

}

export default Analytics