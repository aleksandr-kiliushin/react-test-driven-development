const express = require("express")
const { appointmentsResponseData } = require("./appointmentsResponseData")
const { timeSlots } = require("./timeSlots")

const app = express()
app.use(express.json())

const port = 3600

app.get("/api/appointments/*", (req, res) => {
  res.json(appointmentsResponseData)
})
app.get("/api/availableTimeSlots", (req, res) => {
  res.json(timeSlots)
})
app.post("/api/customers", (req, res) => {
  res.json({
    ...req.body,
    id: Math.floor(Math.random() * 10000),
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
