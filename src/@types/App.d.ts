declare module "app-types" {
  import { AppListProps, PageProps } from "app-context";
  import { PreviewValueProps } from "app-forms";

  export interface ChildProps {
    children: React.ReactNode;
  }
  export interface CallToActionProps {
    link: string;
    label: string;
    icon: string;
    uid: string;
  }
  export interface SectionProps {
    title: string;
    uid: string;
    subtitle: string;
    details: string;
    body: string;
    theme?: string;
    sharedKey?: string;
    sectionHero?: AssetProps;
    hero?: AssetProps;
  }
  export interface NewsletterProps {
    title: string;
    subtitle: string;
    details: string;
    email: string;
    hero: AssetProps;
  }
  export type MediaItemProp = {
    media: string;
    link: string;
    uid: string;
  };
  export interface MediaProps {
    title: string;
    subtitle: string;
    details: string;
    hero: AssetProps;
    medias: MediaItemProp[];
  }
  export interface MenuItemProps {
    name: string;
    value: string;
    uid: string;
    label?: string;
    icon?: string;
    link?: string;
    themeId?: string;
    locale?: string;
    menuItemId?: string;
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
    creditTo?: {
      artistName: string;
      artistUrl: string;
      assetUrl: string;
    };
  }
  export type AdminIdProps = {
    userId: string;
    role: string;
  };
  export type AssetProps = {
    url: string;
    alt: string;
    hero: string;
    name?: string;
    icon?: string;
    media?: string;
    small?: string;
    label?: string;
    link?: string;
    creditTo?: {
      artistName: string;
      artistUrl: string;
      assetUrl: string;
    };
    theme?: string;
    // variable id
    uid: string;
    heroId: string;
    sharedKey?: string;
    title?: string;
    assetId?: string;
    logoId?: string;
  };
  export interface FilterDesiredProps {
    values: PreviewValueProps;
    desiredData: string[];
  }
  export interface HeaderProps {
    language?: string;
    locale?: string;
    theme: string;
  }
  export interface PreviewPageProps {
    preview?: PageProps;
    theme?: string;
    hero?: string | File;
    onClick?: (key: CallToActionProps) => void;
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
    appList?: AppListProps[];
    target?: string;
  };
  export type OrganizeFormProps = {
    [key: string]: {
      schema?: {
        required?: string[];
        unique?: {
          name: string;
          list: AppListProps[];
        }[];
      };
      dataList?: { [key: string]: MenuItemProps[] };
      onViewPreview: (e: PreviewValueProps) => void;
    };
  };
}
