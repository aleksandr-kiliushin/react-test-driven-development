const express = require("express")
const { appointmentsResponseData } = require("./appointmentsResponseData")
const { getRandomTimeSlots } = require("./getRandomTimeSlots")
const { customersResponseData } = require("./customersResponseData")

const app = express()
app.use(express.json())

const port = 3600

app.get("/api/appointments/*", (req, res) => {
  res.json(appointmentsResponseData)
})
app.post("/api/appointments", (req, res) => {
  res.json(req.body)
})
app.get("/api/availableTimeSlots", (req, res) => {
  res.json(getRandomTimeSlots())
})
app.get("/api/customers", (req, res) => {
  const { page, searchTerm } = req.query
  const indexToStartFrom = (page - 1) * 10
  if (searchTerm === undefined) {
    res.json(customersResponseData.slice(indexToStartFrom, indexToStartFrom + 10))
    return
  }
  const filteredCustomers = customersResponseData.filter((aCustomer) => {
    if (aCustomer.firstName.indexOf(searchTerm) !== -1) return true
    if (aCustomer.lastName.indexOf(searchTerm) !== -1) return true
    if (aCustomer.phoneNumber.indexOf(searchTerm) !== -1) return true
    return false
  })
  res.json(filteredCustomers.slice(indexToStartFrom, indexToStartFrom + 10))
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
