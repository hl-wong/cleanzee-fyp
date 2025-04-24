import * as Yup from "yup";

export const availabiltySchema = Yup.object().shape({
  availability: Yup.array().of(
    Yup.object().shape({
      off: Yup.boolean(),
      startTime: Yup.string().nullable(),
      endTime: Yup.string().nullable(),
    })
  ),
});

export const pricingAndTimeSlotSchema = Yup.object().shape({
  timeslots: Yup.object()
    .test("has-at-least-one", "At least one time slot is required", (value) => {
      return Object.values(value || {}).some(
        (timeslot) => Array.isArray(timeslot) && timeslot.length > 0
      );
    })
    .required("Timeslots are required"),
});
