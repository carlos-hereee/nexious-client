declare module "app-calendar" {
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
    date: Date;
    start: string;
    end: string;
    isOpen: boolean;
    attendees: EventAttendees[];
  }
  export interface IEventSchema {
    eventId: string;
    calendarId: string;
    date: Date;
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
    calendar: CalendarSchema;
    selectedDay: IEvent;
  }
}
