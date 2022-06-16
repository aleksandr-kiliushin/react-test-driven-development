import { noop } from "lodash"

import {
  aTimeSlotIn6DaysAt_13_00,
  aTimeSlotInTwoDaysAt_12_00,
  aTimeSlotTodayAt_12_00,
  aTimeSlotTodayAt_13_30,
} from "#sampleData/someTimeSlots"

import { IAppointmentFormProps } from "./index"

export const appointmentFormDefaultProps: IAppointmentFormProps = {
  availableServiceNames: ["Cut", "Blow-dry"],
  availableStylists: [
    { name: "Hanna", sertifiedServicesNames: ["Cut"] },
    { name: "Suzan", sertifiedServicesNames: ["Cut", "Blow-dry"] },
  ],
  availableTimeSlots: [
    aTimeSlotTodayAt_12_00,
    aTimeSlotTodayAt_13_30,
    aTimeSlotInTwoDaysAt_12_00,
    aTimeSlotIn6DaysAt_13_00,
  ],
  defaultServiceName: "Blow-dry",
  onSubmit: noop,
  salonClosesAt: 14,
  salonOpensAt: 12,
  today: new Date(),
}
