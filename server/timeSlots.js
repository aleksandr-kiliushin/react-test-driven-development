const timeSlots = [
  {
    startsAt: "2022-06-20T06:00:00.000Z",
    stylist: {
      name: "Rebecca",
      sertifiedServicesNames: ["Cut & beard trim", "Cut", "Beard trim"],
    },
  },
  {
    startsAt: "2022-06-23T07:00:00.000Z",
    stylist: {
      name: "Suzan",
      sertifiedServicesNames: ["Beard trim", "Extensions", "Cut & color"],
    },
  },
  {
    startsAt: "2022-06-23T05:00:00.000Z",
    stylist: {
      name: "Rebecca",
      sertifiedServicesNames: ["Cut & beard trim", "Extensions", "Cut"],
    },
  },
  {
    startsAt: "2022-06-26T10:00:00.000Z",
    stylist: {
      name: "Hanna",
      sertifiedServicesNames: ["Extensions", "Beard trim", "Cut & beard trim"],
    },
  },
  {
    startsAt: "2022-06-20T11:00:00.000Z",
    stylist: {
      name: "Hanna",
      sertifiedServicesNames: ["Cut", "Cut & color", "Blow-dry"],
    },
  },
  {
    startsAt: "2022-06-20T07:00:00.000Z",
    stylist: {
      name: "Suzan",
      sertifiedServicesNames: ["Blow-dry", "Cut", "Cut & beard trim"],
    },
  },
  {
    startsAt: "2022-06-25T10:30:00.000Z",
    stylist: {
      name: "John",
      sertifiedServicesNames: ["Extensions", "Cut & color", "Cut"],
    },
  },
  {
    startsAt: "2022-06-23T10:30:00.000Z",
    stylist: {
      name: "Suzan",
      sertifiedServicesNames: ["Extensions", "Cut & beard trim", "Cut & color"],
    },
  },
  {
    startsAt: "2022-06-23T08:00:00.000Z",
    stylist: {
      name: "George",
      sertifiedServicesNames: ["Extensions", "Cut & color", "Cut & beard trim"],
    },
  },
  {
    startsAt: "2022-06-24T06:00:00.000Z",
    stylist: {
      name: "John",
      sertifiedServicesNames: ["Beard trim", "Cut & color", "Cut & beard trim"],
    },
  },
  {
    startsAt: "2022-06-26T14:00:00.000Z",
    stylist: {
      name: "John",
      sertifiedServicesNames: ["Cut & beard trim", "Cut & color", "Cut"],
    },
  },
  {
    startsAt: "2022-06-23T13:00:00.000Z",
    stylist: {
      name: "Hanna",
      sertifiedServicesNames: ["Cut & color", "Cut & beard trim", "Extensions"],
    },
  },
  {
    startsAt: "2022-06-26T13:30:00.000Z",
    stylist: {
      name: "John",
      sertifiedServicesNames: ["Cut", "Cut & beard trim", "Cut & color"],
    },
  },
  {
    startsAt: "2022-06-25T09:30:00.000Z",
    stylist: {
      name: "George",
      sertifiedServicesNames: ["Cut & color", "Beard trim", "Extensions"],
    },
  },
  {
    startsAt: "2022-06-23T05:00:00.000Z",
    stylist: {
      name: "John",
      sertifiedServicesNames: ["Extensions", "Cut & beard trim", "Cut & color"],
    },
  },
  {
    startsAt: "2022-06-24T09:00:00.000Z",
    stylist: {
      name: "George",
      sertifiedServicesNames: ["Beard trim", "Cut", "Extensions"],
    },
  },
  {
    startsAt: "2022-06-21T06:30:00.000Z",
    stylist: {
      name: "Suzan",
      sertifiedServicesNames: ["Beard trim", "Cut & color", "Cut & beard trim"],
    },
  },
  {
    startsAt: "2022-06-26T06:30:00.000Z",
    stylist: {
      name: "Rebecca",
      sertifiedServicesNames: ["Blow-dry", "Cut & beard trim", "Extensions"],
    },
  },
  {
    startsAt: "2022-06-20T07:30:00.000Z",
    stylist: {
      name: "Hanna",
      sertifiedServicesNames: ["Beard trim", "Cut & beard trim", "Cut & color"],
    },
  },
  {
    startsAt: "2022-06-21T09:30:00.000Z",
    stylist: {
      name: "Suzan",
      sertifiedServicesNames: ["Cut & beard trim", "Blow-dry", "Cut"],
    },
  },
  {
    startsAt: "2022-06-24T08:30:00.000Z",
    stylist: {
      name: "Rebecca",
      sertifiedServicesNames: ["Cut & color", "Extensions", "Beard trim"],
    },
  },
  {
    startsAt: "2022-06-22T12:30:00.000Z",
    stylist: {
      name: "Suzan",
      sertifiedServicesNames: ["Cut & beard trim", "Cut", "Extensions"],
    },
  },
  {
    startsAt: "2022-06-21T05:30:00.000Z",
    stylist: {
      name: "Hanna",
      sertifiedServicesNames: ["Extensions", "Beard trim", "Cut & color"],
    },
  },
  {
    startsAt: "2022-06-24T09:00:00.000Z",
    stylist: {
      name: "Suzan",
      sertifiedServicesNames: ["Cut & color", "Cut & beard trim", "Extensions"],
    },
  },
  {
    startsAt: "2022-06-20T13:30:00.000Z",
    stylist: {
      name: "Rebecca",
      sertifiedServicesNames: ["Extensions", "Cut & beard trim", "Blow-dry"],
    },
  },
  {
    startsAt: "2022-06-21T11:30:00.000Z",
    stylist: {
      name: "George",
      sertifiedServicesNames: ["Blow-dry", "Cut & color", "Beard trim"],
    },
  },
  {
    startsAt: "2022-06-23T06:00:00.000Z",
    stylist: {
      name: "Rebecca",
      sertifiedServicesNames: ["Extensions", "Cut & color", "Blow-dry"],
    },
  },
  {
    startsAt: "2022-06-26T09:30:00.000Z",
    stylist: {
      name: "Hanna",
      sertifiedServicesNames: ["Cut & color", "Extensions", "Cut"],
    },
  },
  {
    startsAt: "2022-06-25T12:30:00.000Z",
    stylist: {
      name: "Suzan",
      sertifiedServicesNames: ["Beard trim", "Extensions", "Cut & beard trim"],
    },
  },
  {
    startsAt: "2022-06-22T11:30:00.000Z",
    stylist: {
      name: "Rebecca",
      sertifiedServicesNames: ["Cut & beard trim", "Cut & color", "Cut"],
    },
  },
  {
    startsAt: "2022-06-23T12:00:00.000Z",
    stylist: {
      name: "Hanna",
      sertifiedServicesNames: ["Beard trim", "Blow-dry", "Cut"],
    },
  },
  {
    startsAt: "2022-06-26T07:30:00.000Z",
    stylist: {
      name: "George",
      sertifiedServicesNames: ["Cut", "Cut & color", "Blow-dry"],
    },
  },
  {
    startsAt: "2022-06-20T11:00:00.000Z",
    stylist: {
      name: "George",
      sertifiedServicesNames: ["Blow-dry", "Extensions", "Beard trim"],
    },
  },
  {
    startsAt: "2022-06-22T08:00:00.000Z",
    stylist: {
      name: "Hanna",
      sertifiedServicesNames: ["Beard trim", "Blow-dry", "Cut"],
    },
  },
  {
    startsAt: "2022-06-21T08:30:00.000Z",
    stylist: {
      name: "Suzan",
      sertifiedServicesNames: ["Cut & beard trim", "Cut", "Blow-dry"],
    },
  },
  {
    startsAt: "2022-06-25T07:00:00.000Z",
    stylist: {
      name: "John",
      sertifiedServicesNames: ["Cut", "Blow-dry", "Extensions"],
    },
  },
  {
    startsAt: "2022-06-20T12:00:00.000Z",
    stylist: {
      name: "Hanna",
      sertifiedServicesNames: ["Beard trim", "Extensions", "Cut & color"],
    },
  },
  {
    startsAt: "2022-06-26T11:00:00.000Z",
    stylist: {
      name: "Suzan",
      sertifiedServicesNames: ["Cut & beard trim", "Cut", "Beard trim"],
    },
  },
  {
    startsAt: "2022-06-25T07:30:00.000Z",
    stylist: {
      name: "Hanna",
      sertifiedServicesNames: ["Cut & beard trim", "Blow-dry", "Beard trim"],
    },
  },
  {
    startsAt: "2022-06-23T13:30:00.000Z",
    stylist: {
      name: "Rebecca",
      sertifiedServicesNames: ["Cut & beard trim", "Cut", "Cut & color"],
    },
  },
  {
    startsAt: "2022-06-22T14:00:00.000Z",
    stylist: {
      name: "Hanna",
      sertifiedServicesNames: ["Blow-dry", "Cut & beard trim", "Beard trim"],
    },
  },
  {
    startsAt: "2022-06-24T05:30:00.000Z",
    stylist: {
      name: "George",
      sertifiedServicesNames: ["Beard trim", "Blow-dry", "Cut & color"],
    },
  },
  {
    startsAt: "2022-06-22T05:30:00.000Z",
    stylist: {
      name: "Hanna",
      sertifiedServicesNames: ["Cut", "Cut & color", "Blow-dry"],
    },
  },
  {
    startsAt: "2022-06-22T14:30:00.000Z",
    stylist: {
      name: "John",
      sertifiedServicesNames: ["Beard trim", "Cut", "Cut & color"],
    },
  },
  {
    startsAt: "2022-06-25T05:00:00.000Z",
    stylist: {
      name: "Hanna",
      sertifiedServicesNames: ["Cut", "Cut & color", "Blow-dry"],
    },
  },
  {
    startsAt: "2022-06-20T07:00:00.000Z",
    stylist: {
      name: "Hanna",
      sertifiedServicesNames: ["Cut", "Cut & beard trim", "Beard trim"],
    },
  },
  {
    startsAt: "2022-06-25T09:00:00.000Z",
    stylist: {
      name: "George",
      sertifiedServicesNames: ["Cut", "Cut & color", "Blow-dry"],
    },
  },
  {
    startsAt: "2022-06-20T07:00:00.000Z",
    stylist: {
      name: "John",
      sertifiedServicesNames: ["Blow-dry", "Beard trim", "Cut & color"],
    },
  },
  {
    startsAt: "2022-06-25T07:00:00.000Z",
    stylist: {
      name: "Suzan",
      sertifiedServicesNames: ["Extensions", "Beard trim", "Cut & beard trim"],
    },
  },
  {
    startsAt: "2022-06-26T12:00:00.000Z",
    stylist: {
      name: "Suzan",
      sertifiedServicesNames: ["Blow-dry", "Extensions", "Cut & color"],
    },
  },
  {
    startsAt: "2022-06-26T12:00:00.000Z",
    stylist: {
      name: "Hanna",
      sertifiedServicesNames: ["Cut", "Extensions", "Beard trim"],
    },
  },
  {
    startsAt: "2022-06-26T07:30:00.000Z",
    stylist: {
      name: "Hanna",
      sertifiedServicesNames: ["Beard trim", "Cut", "Blow-dry"],
    },
  },
  {
    startsAt: "2022-06-25T10:30:00.000Z",
    stylist: {
      name: "George",
      sertifiedServicesNames: ["Blow-dry", "Cut & beard trim", "Cut"],
    },
  },
  {
    startsAt: "2022-06-22T14:30:00.000Z",
    stylist: {
      name: "George",
      sertifiedServicesNames: ["Cut", "Extensions", "Beard trim"],
    },
  },
  {
    startsAt: "2022-06-22T14:30:00.000Z",
    stylist: {
      name: "Hanna",
      sertifiedServicesNames: ["Blow-dry", "Cut & beard trim", "Beard trim"],
    },
  },
  {
    startsAt: "2022-06-23T10:30:00.000Z",
    stylist: {
      name: "Hanna",
      sertifiedServicesNames: ["Cut & color", "Beard trim", "Cut"],
    },
  },
  {
    startsAt: "2022-06-25T05:00:00.000Z",
    stylist: {
      name: "Rebecca",
      sertifiedServicesNames: ["Beard trim", "Cut", "Cut & beard trim"],
    },
  },
  {
    startsAt: "2022-06-25T13:30:00.000Z",
    stylist: {
      name: "Suzan",
      sertifiedServicesNames: ["Beard trim", "Extensions", "Cut & beard trim"],
    },
  },
  {
    startsAt: "2022-06-23T07:00:00.000Z",
    stylist: {
      name: "John",
      sertifiedServicesNames: ["Extensions", "Cut", "Cut & beard trim"],
    },
  },
  {
    startsAt: "2022-06-26T13:30:00.000Z",
    stylist: {
      name: "Suzan",
      sertifiedServicesNames: ["Cut & color", "Beard trim", "Blow-dry"],
    },
  },
  {
    startsAt: "2022-06-20T08:00:00.000Z",
    stylist: {
      name: "Suzan",
      sertifiedServicesNames: ["Cut & beard trim", "Beard trim", "Cut & color"],
    },
  },
  {
    startsAt: "2022-06-25T12:00:00.000Z",
    stylist: {
      name: "John",
      sertifiedServicesNames: ["Cut & color", "Beard trim", "Cut"],
    },
  },
  {
    startsAt: "2022-06-24T13:30:00.000Z",
    stylist: {
      name: "Hanna",
      sertifiedServicesNames: ["Cut", "Cut & beard trim", "Blow-dry"],
    },
  },
  {
    startsAt: "2022-06-23T06:30:00.000Z",
    stylist: {
      name: "Suzan",
      sertifiedServicesNames: ["Beard trim", "Cut & beard trim", "Extensions"],
    },
  },
  {
    startsAt: "2022-06-21T08:00:00.000Z",
    stylist: {
      name: "Hanna",
      sertifiedServicesNames: ["Blow-dry", "Cut & beard trim", "Cut & color"],
    },
  },
  {
    startsAt: "2022-06-20T08:00:00.000Z",
    stylist: {
      name: "Hanna",
      sertifiedServicesNames: ["Cut & beard trim", "Beard trim", "Blow-dry"],
    },
  },
  {
    startsAt: "2022-06-24T13:30:00.000Z",
    stylist: {
      name: "George",
      sertifiedServicesNames: ["Cut & color", "Cut & beard trim", "Blow-dry"],
    },
  },
  {
    startsAt: "2022-06-24T11:30:00.000Z",
    stylist: {
      name: "George",
      sertifiedServicesNames: ["Blow-dry", "Cut & color", "Cut & beard trim"],
    },
  },
  {
    startsAt: "2022-06-26T06:00:00.000Z",
    stylist: {
      name: "Hanna",
      sertifiedServicesNames: ["Blow-dry", "Beard trim", "Cut & beard trim"],
    },
  },
  {
    startsAt: "2022-06-25T06:00:00.000Z",
    stylist: {
      name: "George",
      sertifiedServicesNames: ["Extensions", "Cut & beard trim", "Cut & color"],
    },
  },
  {
    startsAt: "2022-06-25T14:30:00.000Z",
    stylist: {
      name: "Rebecca",
      sertifiedServicesNames: ["Extensions", "Cut & beard trim", "Beard trim"],
    },
  },
  {
    startsAt: "2022-06-24T11:00:00.000Z",
    stylist: {
      name: "Rebecca",
      sertifiedServicesNames: ["Cut & beard trim", "Extensions", "Blow-dry"],
    },
  },
  {
    startsAt: "2022-06-21T14:00:00.000Z",
    stylist: {
      name: "Hanna",
      sertifiedServicesNames: ["Blow-dry", "Cut & beard trim", "Extensions"],
    },
  },
  {
    startsAt: "2022-06-20T09:30:00.000Z",
    stylist: {
      name: "George",
      sertifiedServicesNames: ["Cut & beard trim", "Extensions", "Cut"],
    },
  },
  {
    startsAt: "2022-06-23T13:30:00.000Z",
    stylist: {
      name: "Suzan",
      sertifiedServicesNames: ["Cut & beard trim", "Cut & color", "Cut"],
    },
  },
  {
    startsAt: "2022-06-24T11:00:00.000Z",
    stylist: {
      name: "George",
      sertifiedServicesNames: ["Blow-dry", "Cut", "Extensions"],
    },
  },
  {
    startsAt: "2022-06-26T10:00:00.000Z",
    stylist: {
      name: "John",
      sertifiedServicesNames: ["Beard trim", "Cut & color", "Cut"],
    },
  },
  {
    startsAt: "2022-06-25T11:30:00.000Z",
    stylist: {
      name: "George",
      sertifiedServicesNames: ["Beard trim", "Cut & beard trim", "Cut"],
    },
  },
  {
    startsAt: "2022-06-21T06:30:00.000Z",
    stylist: {
      name: "John",
      sertifiedServicesNames: ["Cut & beard trim", "Beard trim", "Blow-dry"],
    },
  },
  {
    startsAt: "2022-06-21T11:00:00.000Z",
    stylist: {
      name: "Suzan",
      sertifiedServicesNames: ["Cut & beard trim", "Cut & color", "Extensions"],
    },
  },
  {
    startsAt: "2022-06-26T07:30:00.000Z",
    stylist: {
      name: "Rebecca",
      sertifiedServicesNames: ["Beard trim", "Blow-dry", "Cut & beard trim"],
    },
  },
  {
    startsAt: "2022-06-23T13:30:00.000Z",
    stylist: {
      name: "George",
      sertifiedServicesNames: ["Cut & color", "Blow-dry", "Cut & beard trim"],
    },
  },
  {
    startsAt: "2022-06-24T14:30:00.000Z",
    stylist: {
      name: "John",
      sertifiedServicesNames: ["Cut & beard trim", "Cut", "Cut & color"],
    },
  },
  {
    startsAt: "2022-06-25T14:30:00.000Z",
    stylist: {
      name: "George",
      sertifiedServicesNames: ["Blow-dry", "Beard trim", "Cut & color"],
    },
  },
  {
    startsAt: "2022-06-23T14:30:00.000Z",
    stylist: {
      name: "John",
      sertifiedServicesNames: ["Cut & beard trim", "Cut", "Cut & color"],
    },
  },
  {
    startsAt: "2022-06-24T12:30:00.000Z",
    stylist: {
      name: "George",
      sertifiedServicesNames: ["Cut & beard trim", "Beard trim", "Cut & color"],
    },
  },
  {
    startsAt: "2022-06-26T05:00:00.000Z",
    stylist: {
      name: "Hanna",
      sertifiedServicesNames: ["Cut & beard trim", "Blow-dry", "Cut & color"],
    },
  },
  {
    startsAt: "2022-06-22T14:00:00.000Z",
    stylist: {
      name: "George",
      sertifiedServicesNames: ["Cut & beard trim", "Cut & color", "Cut"],
    },
  },
  {
    startsAt: "2022-06-25T08:30:00.000Z",
    stylist: {
      name: "George",
      sertifiedServicesNames: ["Blow-dry", "Cut", "Extensions"],
    },
  },
  {
    startsAt: "2022-06-23T09:00:00.000Z",
    stylist: {
      name: "Rebecca",
      sertifiedServicesNames: ["Extensions", "Cut", "Cut & color"],
    },
  },
  {
    startsAt: "2022-06-22T07:00:00.000Z",
    stylist: {
      name: "George",
      sertifiedServicesNames: ["Cut & color", "Extensions", "Beard trim"],
    },
  },
  {
    startsAt: "2022-06-25T06:30:00.000Z",
    stylist: {
      name: "Rebecca",
      sertifiedServicesNames: ["Blow-dry", "Cut", "Cut & beard trim"],
    },
  },
  {
    startsAt: "2022-06-25T08:30:00.000Z",
    stylist: {
      name: "Hanna",
      sertifiedServicesNames: ["Cut & beard trim", "Cut", "Blow-dry"],
    },
  },
]

module.exports = { timeSlots }
