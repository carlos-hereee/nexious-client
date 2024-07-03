declare module "app-types" {
  import { OrderSchema, MerchProps } from "store-context";
  import { FormProps, AppValues, SectionEntryOganizer } from "app-forms";

  export interface ChildProps {
    children: React.ReactNode;
  }

  export interface AppDetailsProps {
    locale?: string;
    appName: string;
    logo: string;
  }
  export interface AppDetailsFormProps {
    app: AppDetailsProps;
    desiredOrder: string[];
  }
  export type MenuItemProp = {
    name: string;
    label: string;
    value: string;
    icon: string;
    uid: string;
  };
  export interface Notification {
    message: string;
    link: string;
    category: string;
    name: string;
    notificationId: string;
    updatedAt: Date;
    ping: number;
  }
  export interface NProps {
    appId: string;
    id: string;
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
    storeName?: string;
    storeLink?: string;
    storeId: string;
    accountId: string;
    onBoardingRequired?: string;
    isStripeActive?: string;
    title?: string;
    hero?: string;
    currency?: string;
    email?: string;
    body?: string;
    inventory: MerchProps[];
    pendingOrders?: OrderSchema[];
    completedOrders?: OrderSchema[];
    orders?: OrderSchema[];
    inCompleteOrders?: OrderSchema[];
  }
  export interface AppListProps {
    appName: string;
    appId: string;
    appUrl: string;
    adminIds: AdminIdProps[];
    notifications: string[];
    logo: string;
    owner: UserSchema;
    menu?: MenuProp[];
    media?: MediaProps;
  }
  export interface PageProps {
    uid?: string;
    title?: string;
    body?: string;
    hasCta?: boolean;
    hasSections?: boolean;
    hero?: string;
    cta?: CallToActionProps[];
    sections?: SectionProps[];
    tagline?: string;
    name?: string;
    isStore?: boolean;
    pageId?: string;
  }
  export type ActiveMenuProp = {
    menu?: MenuProp[];
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
    languageList: MenuProp[];
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
    menu: MenuProp[];
    activeMenu: MenuProp[];
    themeList: ThemeList[];
    notifications: Notification[];
    iconList: MenuProp[];
    calendar: CalendarProps;
    dbVersion?: string;
  }
  export interface DialogProps {
    status?: DialogStatusProps;
    merch?: MerchProps;
    order?: OrderSchema;
    onClose: () => void;
    onConfirm?: () => void;
    onCancel?: (key: DialogStatusProps) => void;
    updateStatus?: (key: DialogStatusProps) => void;
    onSubmit?: () => void;
  }

  export interface SettingsContainer {
    data?: { heading: string; name: string };
    name?: string;
    onRemove?: (page: PageProps) => void;
    updatePhase?: (phase: DialogStatusProps) => void;
    pages?: PageProps[];
  }
  export interface CallToActionProps {
    link: string;
    label: string;
    icon: string;
    uid: string;
  }

  export interface CardContainerProps {
    data?: MediaItemProp[];
    hint?: string;
    onRemove?: (key: string) => void;
    onMediaClick?: (key: MediaItemProp) => void;
  }
  export type DialogStatusProps =
    | "idle"
    | "confirm-cancel"
    | "configuration"
    | "phase-one"
    | "phase-two"
    | "phase-three"
    | "phase-view-order"
    | "phase-view-balance"
    | "phase-edit";
  export interface AppDialogProps {
    pages: boolean;
    media: boolean;
    store: boolean;
    calendar: boolean;
    notifications: boolean;
    app: boolean;
    danger: boolean;
  }
  export interface DialogShowProps {
    name: AppSettingDialogOptions;
    stat: DialogStatusProps;
  }
  export type AppSettingDialogOptions = "pages" | "media" | "store" | "app" | "calendar";
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
  export interface Subcription {
    name: string;
    description: string;
    hero: string;
    cost: string;
  }
  export interface SubcriptionProp {
    appId: string;
    subscription: Subcription;
    id?: string;
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
  export interface MenuProp {
    uid: string;
    menuId: string;
    category: "page" | "calendar" | "store" | "home";
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
    hero?: string;
    schedule: StringObjProp[];
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
    values: AppValues;
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
  export type StringObjProp = { [key: string]: string };
  export type StringBooleanObjProp = { [key: string]: string | boolean };
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
      dataList?: { [key: string]: MenuProp[] };
      addEntries?: SectionEntryOganizer;
      onViewPreview: (e: AppValues) => void;
      onSubmit: (e: AppValues) => void;
      form: FormProps;
    };
  };
}
