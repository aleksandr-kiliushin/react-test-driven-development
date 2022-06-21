const express = require("express")
const { appointmentsResponseData } = require("./appointmentsResponseData")
const { timeSlots } = require("./timeSlots")
const { customersResponseData } = require("./customersResponseData")

const app = express()
app.use(express.json())

const port = 3600

app.get("/api/appointments/*", (req, res) => {
  res.json(appointmentsResponseData)
})
app.get("/api/availableTimeSlots", (req, res) => {
  res.json(timeSlots)
})
app.get("/api/customers", (req, res) => {
  const idToLoadStartingFrom = parseInt(req.query.after) || 0
  const { searchTerm } = req.query
  if (searchTerm === undefined) {
    res.json(customersResponseData.slice(idToLoadStartingFrom, idToLoadStartingFrom + 10))
  }
  const result = customersResponseData.filter((aCustomer) => {
    if (aCustomer.firstName.indexOf(searchTerm) !== -1) return true
    if (aCustomer.lastName.indexOf(searchTerm) !== -1) return true
    if (aCustomer.phoneNumber.indexOf(searchTerm) !== -1) return true
    return false
  })
  res.json(result.slice(idToLoadStartingFrom, idToLoadStartingFrom + 10))
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
