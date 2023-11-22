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
    body?: string;
    theme?: string;
    uid?: string;
    heroId?: string;
    _id?: string;
    hero?: AssetProps;
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
    link?: string;
    icon?: string;
    name?: string;
    small?: string;
    theme?: string;
    ping?: number;
    credit?: {
      artistName: string;
      artistUrl: string;
      assetUrl: string;
    };
  }
  export type AssetProps = {
    url?: string;
    alt?: string;
    name?: string;
    icon?: string;
    media?: string;
    small?: string;
    label?: string;
    link?: string;
    credit?: {
      artistName: string;
      artistUrl: string;
      assetUrl: string;
    };
    theme?: string;
    // variable id
    uid?: string;
    sharedKey?: string;
    title?: string;
    assetId?: string;
    logoId?: string;
  };
  export interface FilterDesiredProps {
    values: FormValueProps;
    desiredData: string[];
  }
  export interface HeaderProps {
    language?: string;
    locale?: string;
    theme: string;
  }
  export interface PreviewPageProps {
    preview: FormValueProps;
    theme?: string;
    hero: HeroProps;
    onClick?: (key: unknown) => void;
  }
  export interface KeyStringProp {
    [key: string]: string;
  }
  export interface SectionDataProps {
    uid: string;
    hero?: string;
    body?: string;
  }
  export type SchemaProps = {
    formId: string;
    appList?: KeyStringProp[];
    target?: string;
  };
}
