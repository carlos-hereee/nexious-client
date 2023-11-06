declare module "app-types" {
  import { FormValueProps } from "app-forms";
  export interface ChildProps {
    children: React.ReactNode;
  }
  export interface SectionProps {
    title?: string;
    subtitle?: string;
    details?: string;
    data?: string;
    theme?: string;
    uid?: string;
    sections?: { [key: string]: string }[];
  }
  export interface MenuProps {
    menuId: string;
    isToggle: boolean;
    isPrivate: boolean;
    // TODO: include actual keys, and values
    active: { [key: string]: string | undefined };
    alternatives: { [key: string]: string | undefined }[];
  }
  export interface CalendarProps {
    name: string;
    theme?: string;
    calendarId: string;
    events: { [key: string]: string }[];
  }
  export interface HeroProps {
    url: string;
    link: string;
    icon: string;
    name: string;
    small?: string;
    theme?: string;
    ping?: number;
    credit?: {
      artistName: string;
      artistUrl: string;
      assetUrl: string;
    };
  }
  export interface FilterDesiredProps {
    values: FormValueProps;
    desiredData: string[];
  }
  export interface HeaderProps {
    language: string;
    locale: string;
    theme: string;
  }
}
