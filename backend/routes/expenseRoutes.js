const express = require("express")
const router = express.Router()

const Expense = require("../models/Expense")
const auth = require("../middleware/authMiddleware")

// ADD EXPENSE
router.post("/", auth, async (req, res) => {
  try {

    const { title, amount, category } = req.body

    const expense = new Expense({
      title,
      amount,
      category,
      userId: req.user.id
    })

    await expense.save()

    res.json(expense)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


// GET EXPENSES
router.get("/", auth, async (req, res) => {
  try {

    const expenses = await Expense.find({ userId: req.user.id })

    res.json(expenses)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


// DELETE EXPENSE
router.delete("/:id", auth, async (req, res) => {
  try {

    const expense = await Expense.findByIdAndDelete(req.params.id)

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" })
    }

    res.json({ message: "Expense deleted successfully" })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


// UPDATE EXPENSE
router.put("/:id", auth, async (req, res) => {
  try {

    const { title, amount, category } = req.body

    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { title, amount, category },
      { new: true }
    )

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" })
    }

    res.json(expense)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router