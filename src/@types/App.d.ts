declare module "app-types" {
  import { FormValueProps } from "app-forms";

  export interface ChildProps {
    children: React.ReactNode;
  }
  export interface CallToActionProps {
    link?: string;
    label?: string;
    icon?: string;
    uid?: string;
  }
  export interface SectionProps {
    title: string;
    subtitle: string;
    details: string;
    data?: string;
    body: string;
    theme?: string;
    hero?: AssetProps;
    sections?: KeyStringProp[];
  }
  export interface NewsletterProps {
    title: string;
    subtitle: string;
    details: string;
    email: string;
    hero: AssetProps;
  }
  export interface MenuItemProps {
    name: string;
    value: string;
    label: string;
    icon: string;
    link: string;
    uid: string;
    themeId: string;
    menuItemId: string;
  }
  export interface MenuProps {
    uid: string;
    menuId: string;
    isToggle: boolean;
    isPrivate: boolean;
    // TODO: include actual keys, and values
    active: MenuItemProps;
    alternatives: MenuItemProps[];
  }
  export interface CalendarProps {
    name: string;
    theme?: string;
    calendarId: string;
    events: KeyStringProp[];
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
  // export type ThemeListProps = {};
  export type AdminIdProps = {
    userId: string;
    role: string;
  };
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
