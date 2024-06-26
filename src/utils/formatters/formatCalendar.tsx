import { FormProps } from "app-forms";
import { CalendarProps } from "app-types";

type FormatCalendarProps = {
  calendar: CalendarProps;
  form: FormProps;
};
export const formatCalendar = ({ calendar, form }: FormatCalendarProps) => {
  const { desiredOrder } = form;
  if (desiredOrder) {
    return Object.assign(
      {},
      ...desiredOrder.map((key) => {
        if (!calendar) return { [key]: "" };
        const value = calendar[key as keyof CalendarProps];

        return { [key]: value || "" };
      })
    );
  }
  return form.initialValues;
};
