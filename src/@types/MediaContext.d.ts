declare module "media-context" {
  import { MEDIA_ACTIONS } from "@actions/MediaActions";

  export interface MediaState {
    isLoading: boolean;
    error: string;
  }
  export interface IMediaState extends MediaState {}
  export interface MediaDispatchProps {
    dispatch: React.Dispatch<MediaActionProps>;
    // app?: AppProps;
    // page?: PageProps;
    // store?: StoreProps;
    // calendar?: CalendarProps;
    // appList?: AppListProps[];
    // platformTiers?: ISubscription[];
    // logo?: string;
    // event?: IEvent;
    // id?: string;
    // media?: MediaProps;
    // appName?: string;
    // pageId?: string;
    // config?: StripeUpdateConfigProps;
    // subscription?: Subcription;
    // storeId?: string;
    // isLoading?: boolean;
    // setAsActive?: boolean;
    // appId?: string;
    // menu?: MenuProp[];
    // updateAppData?: (a: AppProps) => void;
    // updateUser?: (a: UserSchema) => void;
    // updateActiveAppData?: (a: ActiveMenuProp) => void;
  }
  export type MediaActionProps = { type: MEDIA_ACTIONS.IS_LOADING; payload: boolean };
}
