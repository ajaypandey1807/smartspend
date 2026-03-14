const express = require("express")
const cors = require("cors")
require("dotenv").config()

const connectDB = require("./config/db")

const authRoutes = require("./routes/authRoutes")
const expenseRoutes = require("./routes/expenseRoutes") // 👈 ADD THIS

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/expenses", expenseRoutes) // 👈 ADD THIS

app.get("/", (req, res) => {
  res.send("SmartSpend API Running 🚀")
})

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})