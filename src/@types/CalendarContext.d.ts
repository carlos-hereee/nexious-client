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
  export interface PostEvent {
    appId: string;
    event: IEvent;
  }
  export interface IEvent {
    uid: string;
    eventId: string;
    date: string;
    start: string;
    createdAt?: string;
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
  export interface CalendarStateProps {
    isLoading: boolean;
    calendarId: string;
    calendarLink: string;
    closeTime: string;
    startTime: string;
    workWeek: string;
    name: string;
    theme: string;
    schedule: IEvent[];
    events: IEvent[];
    errorMessage: string;
    selectedDay: IEvent;
  }
  export interface ICalendarSchema extends CalendarStateProps {
    updateSelectedDay: (day: IEvent) => void;
    addCalendarEvent: (day: PostEvent) => void;
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
    calendar?: CalendarProps;
    day?: IEvent;
    event?: IEvent;
    appId?: string;
  }
  export type CalendarActionProps =
    | { type: CAL_ACTIONS.IS_LOADING; payload: boolean }
    | {
        type:
          | CAL_ACTIONS.SET_ERROR
          | CAL_ACTIONS.SET_CAL_NAME
          | CAL_ACTIONS.SET_CAL_ID
          | CAL_ACTIONS.SET_CAL_LINK
          | CAL_ACTIONS.SET_CAL_CLOSE_TIME
          | CAL_ACTIONS.SET_CAL_START_TIME
          | CAL_ACTIONS.SET_CAL_WORK_WEEK
          | CAL_ACTIONS.SET_THEME;

        payload: string;
      }
    | { type: CAL_ACTIONS.SET_CAL_SCHEDULE | CAL_ACTIONS.SET_CAL_EVENTS; payload: IEvent[] }
    | { type: CAL_ACTIONS.SET_CAL_SELECTED_DAY; payload: IEvent };
}
