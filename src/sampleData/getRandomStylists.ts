import { sample, sampleSize } from "lodash"

import { IStylist } from "#types/IStylist"

export const getARandomStylist = (): IStylist => {
  return {
    name: sample(["Hanna", "Suzan", "George", "John", "Rebecca"]) as IStylist["name"],
    sertifiedServicesNames: sampleSize(
      ["Cut", "Blow-dry", "Cut & color", "Beard trim", "Cut & beard trim", "Extensions"],
      3
    ),
  }
}
