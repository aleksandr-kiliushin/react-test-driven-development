import { After, Before } from "cucumber"

Before(function () {
  this.startServer()
})

After(function () {
  this.closeServer()
})
