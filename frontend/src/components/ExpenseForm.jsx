import { useState } from "react"
import axios from "axios"
import "../css/form.css"

function ExpenseForm(){

  const [title,setTitle] = useState("")
  const [amount,setAmount] = useState("")
  const [category,setCategory] = useState("")

  const addExpense = async () => {

    try{

      const token = localStorage.getItem("token")

      await axios.post(
        "http://localhost:5000/api/expenses",
        { title,amount,category },
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )

      alert("Expense Added")

      window.location.reload()

    }catch(err){

      alert("Error adding expense")

    }

  }

  return(

    <div className="form">

      <h3>Add Expense</h3>

      <input
      type="text"
      placeholder="Title"
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      />

      <input
      type="number"
      placeholder="Amount"
      value={amount}
      onChange={(e)=>setAmount(e.target.value)}
      />

      <input
      type="text"
      placeholder="Category"
      value={category}
      onChange={(e)=>setCategory(e.target.value)}
      />

      <button onClick={addExpense}>Add Expense</button>

    </div>

  )

}

export default ExpenseForm