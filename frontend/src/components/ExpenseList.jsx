import { useEffect,useState } from "react"
import axios from "axios"
import "../css/dashboard.css"

function ExpenseList({filter}){

  const [expenses,setExpenses] = useState([])

  const fetchExpenses = async () => {

    const token = localStorage.getItem("token")

    const res = await axios.get(
      "http://localhost:5000/api/expenses",
      {
        headers:{ Authorization:`Bearer ${token}` }
      }
    )

    setExpenses(res.data)

  }

  const deleteExpense = async (id) => {

    const token = localStorage.getItem("token")

    await axios.delete(
      `http://localhost:5000/api/expenses/${id}`,
      { headers:{ Authorization:`Bearer ${token}` } }
    )

    fetchExpenses()

  }

  useEffect(()=>{
    fetchExpenses()
  },[])

  /* CATEGORY ICON */

  const getIcon = (cat)=>{

    if(cat==="Food") return "🍔"
    if(cat==="Travel") return "🚗"
    if(cat==="Shopping") return "🛒"
    if(cat==="Bills") return "💡"

    return "💰"

  }

  /* FILTER */

  const filteredExpenses = expenses.filter((exp)=>{

    const date = new Date(exp.createdAt || Date.now())
    const now = new Date()

    if(filter==="today"){
      return date.toDateString()===now.toDateString()
    }

    if(filter==="week"){
      const diff = (now-date)/(1000*60*60*24)
      return diff<=7
    }

    if(filter==="month"){
      return date.getMonth()===now.getMonth()
    }

    return true

  })

  return(

    <div className="expense-container">

      <h3 className="expense-title">Your Expenses</h3>

      {filteredExpenses.map((exp)=>(

        <div className="expense-card" key={exp._id}>

          <div className="expense-info">

            <h4>{getIcon(exp.category)} {exp.title}</h4>

            <p>₹ {exp.amount}</p>

            <span>{exp.category}</span>

          </div>

          <button
          className="delete-btn"
          onClick={()=>deleteExpense(exp._id)}
          >
          Delete
          </button>

        </div>

      ))}

    </div>

  )

}

export default ExpenseList