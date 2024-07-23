declare module "app-calendar" {
  import { CalendarProps } from "app-types";
  import { CAL_ACTIONS } from "@actions/CalendarAction";

  export interface EventAttendees {
    uid: string;
    userId: string;
    username: string;
    email: string;
    phone: number;
  }
  export interface IEvent {
    uid: string;
    eventId: string;
    date: string;
    start: string;
    end: string;
    isOpen: boolean;
    attendees: EventAttendees[];
  }
  export interface IEventSchema {
    eventId: string;
    calendarId: string;
    date: string;
    hero: string;
    events: IEvent[];
  }
  export interface CalendarSchema {
    calendarId: string;
    appId: string;
    hero: string;
    title: string;
    theme: string;
    schedule: { eventId: string }[];
    adminIds: { userId: string; role: string }[];
  }
  export interface ICalendarSchema {
    isLoading: boolean;
    errorMessage: string;
    selectedDay: IEvent;
  }
  export interface CalendarContainerProps {
    // data: { heading?: string; medias?: MediaItemProp[]; hint?: string };
    onRemove?: (key: string) => void;
    onClick?: () => void;
    onPhaseClick: (phase: DialogStatusProps) => void;
    // onAddItem?: (phase: DialogStatusProps) => void;
    // onEditDetails?: (phase: DialogStatusProps) => void;
  }
  export interface CalendarDispatchProps {
    dispatch: React.Dispatch<CalendarActionProps>;
    calendar: CalendarProps;
  }
  export type CalendarActionProps =
    | { type: CAL_ACTIONS.IS_LOADING; payload: boolean }
    | { type: CAL_ACTIONS.SET_ERROR; payload: string };
}
