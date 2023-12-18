declare module "app-types" {
  import { MerchProps } from "services-context";
  import { FormProps, PreviewValueProps, SectionEntryOganizer } from "app-forms";

  export interface ChildProps {
    children: React.ReactNode;
  }
  export interface KeyWithDefinitionProps {
    label?: string;
    value?: string;
    labelLayout?: "bolden";
    children?: React.ReactNode;
  }
  export interface AppDetailsProps {
    locale: string;
    appName: string;
    logo: string;
  }
  export interface AppDetailsFormProps {
    app: AppDetailsProps;
    desiredOrder: string[];
  }
  export type ContainerDataProps = { heading?: string; medias?: MediaItemProp[]; hint?: string };
  export type ThemeColorProps = {
    primary: string;
    secondary: string;
    altPrimary: string;
    altSecondary: string;
  };
  export interface CopyToClipboardProps {
    heading?: string;
    label?: string;
    labelLayout?: string;
    theme?: string;
    data: string;
    isCopy?: boolean;
  }
  export interface AppContainerProps {
    data: ContainerDataProps;
    onAppDetails?: (phase: DialogStatusProps) => void;
  }
  export type ThemeList = {
    name: string;
    value: string;
    label: string;
    uid: string;
    colors: ThemeColorProps;
    backgroundColors: ThemeColorProps;
  };

  export interface StoreProps {
    name: string;
    storeId: string;
    title?: string;
    hero?: string;
    body?: string;
    inventory: MerchProps[];
  }
  export interface AppListProps {
    appName: string;
    appId: string;
    adminIds: AdminIdProps[];
    logo: string;
    owner: UserSchema;
    menu?: MenuProps[];
    media?: MediaProps;
  }
  export interface PageProps {
    title: string;
    tagline: string;
    body: string;
    hasCta: boolean;
    hasSections: boolean;
    hero: string;
    cta: CallToActionProps[];
    sections: SectionProps[];
    name?: string;
    isStore: boolean;
    uid?: string;
    pageId?: string;
  }
  export type ActiveMenuProps = {
    menu?: MenuProps[];
    appName?: string;
    logo?: string;
    appId?: string;
    media?: MediaProps;
  };
  export type IconListItem = {
    uid: string;
    name: string;
    value: string;
    icon: string;
    label: string;
  };
  export interface AppProps {
    appName: string;
    store: StoreProps;
    appId: string;
    adminIds: AdminIdProps[];
    logo: string;
    locale: string;
    languageList: MenuItemProps[];
    pages: PageProps[];
    isLoading: boolean;
    isOnline: boolean;
    appList: AppListProps[];
    welcomeMessage: string;
    appError: string;
    landing: PageProps;
    owner: UserSchema;
    newsletter: NewsletterProps;
    media: MediaProps;
    menu: MenuProps[];
    activeMenu: MenuProps[];
    themeList: ThemeList[];
    iconList: MenuItemProps[];
    calendar: CalendarProps;
  }
  export interface DialogProps {
    header?: { heading?: string; subtitle?: string; data?: string };
    media?: MediaItemProp;
    status?: DialogStatusProps;
    formValues?: unknown;
    onClose: () => void;
    onConfirm?: () => void;
    onCancel?: (key: DialogStatusProps) => void;
    onSubmit?: () => void;
  }
  export interface PagesContainerProps {
    data?: { heading: string; name: string };
    name?: string;
    onRemove?: (page: PageProps) => void;
    onAddPage?: (page: DialogStatusProps) => void;
    pages?: PageProps[];
  }
  export interface CallToActionProps {
    link: string;
    label: string;
    icon: string;
    uid: string;
  }
  export interface PageContainerProps {
    data: { heading?: string; medias?: MediaItemProp[]; hint?: string };
    onRemove?: (key: string) => void;
    onMediaClick?: (key: MediaItemProp) => void;
    onClick?: () => void;
    onAddItem?: (phase: DialogStatusProps) => void;
  }
  export interface MediaCardContainerProps {
    data: ContainerDataProps;
    onRemove?: (key: string) => void;
    onMediaClick?: (key: MediaItemProp) => void;
    onClick?: () => void;
    onAddMedia?: () => void;
  }
  export interface CardContainerProps {
    data?: MediaItemProp[];
    hint?: string;
    onRemove?: (key: string) => void;
    onMediaClick?: (key: MediaItemProp) => void;
  }
  export type DialogStatusProps = "idle" | "confirm-cancel" | "phase-one" | "phase-two";
  export interface SectionProps {
    title: string;
    uid: string;
    subtitle: string;
    details: string;
    body: string;
    theme?: string;
    sharedKey?: string;
    heroId?: string;
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
    url?: string;
    uid: string;
    sharedKey?: string;
  };
  export interface MediaProps {
    title: string;
    subtitle: string;
    details?: string;
    hero?: AssetProps;
    hasMedias?: boolean;
    medias: MediaItemProp[];
  }
  export interface MenuProps {
    uid: string;
    menuId: string;
    category: string;
    isPrivate: boolean;
    isPage: boolean;
    isStore?: boolean;
    isToggle: boolean;
    name: string;
    value: string;
    label: string;
    icon?: string;
    link: string;
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
    name?: string;
    icon?: string;
    media?: string;
    small?: string;
    label?: string;
    link?: string;
    image?: ImageBuffer;
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
    hero?: string;
    heading?: string;
    layout?: string;
    onClick?: () => void;
  }
  export type PreviewSocialMediaProps = {
    preview?: MediaProps;
  };
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
        unique?: { name: string; list: AppListProps[] }[];
      };
      dataList?: { [key: string]: MenuItemProps[] };
      addEntries?: SectionEntryOganizer;
      onViewPreview: (e: PreviewValueProps) => void;
      onSubmit: (e: PreviewValueProps) => void;
      form: FormProps;
    };
  };
}
