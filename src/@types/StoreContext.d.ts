declare module "store-context" {
  import { StoreProps } from "app-types";
  import { UserSchema } from "auth-context";
  import { STORE_ACTIONS } from "@actions/ServiceActions";

  export interface MerchProps {
    cost: number;
    inStock: number;
    quantity: number;
    storeId: string;
    merchId: string;
    priceId: string;
    productId: string;
    name: string;
    body: string;
    hero: string;
    catalog: string[];
    uid: string;
    thumbnail?: string;
  }
  export interface OrderStoreInfo {
    storeId: string;
    email: string;
    location: string;
    location2?: string;
  }
  export interface OrderSchema {
    store: OrderStoreInfo;
    status: "pending" | "completed" | "accepted" | "declined";
    client: ClientSchema;
    paymentMethod: "in-store" | "stripe";
    orderId: string;
    merch: OrderMerchSchema[];
  }
  export type OrderOptions = "decline" | "complete" | "accepted";
  export interface OrderDetailsProps {
    order: OrderSchema;
    labels?: { accepted: string; decline: string };
    onClick?: (option: OrderOptions) => void;
  }

  export interface PaymentMethod {
    uid: string;
    type: "visa/credit" | "store" | "paypal";
    name: string;
    icon: string;
    hero?: { url: string; small: string; name: string; alt: string };
  }
  export interface StripeConfirmationProps {
    status: string;
    paymentStatus: string;
    customer: null | unknown;
    // intent: string;
  }
  export interface StoreStateProps {
    isLoading: boolean;
    stripeSecret: string;
    error: string;
    stripeConfirmation: StripeConfirmationProps;
    order?: OrderSchema;
    cart: CartProps[];
  }
  export interface CartProps extends StoreProps {
    merch: MerchProps[];
  }
  export interface SubmitPaymentProps {
    user?: UserSchema;
    payment?: { [key: string]: string };
    cart?: CartProps[];
  }
  export interface StoreCheckout {
    sessionCart: CartProps;
    user: UserSchema;
  }
  export interface StoreOrderUpdate {
    order: OrderSchema;
    option: OrderOptions;
    appId: string;
  }
  export interface StoreSchema extends StoreStateProps {
    addToCart: (cart: CartProps[], store: StoreProps, key: MerchProps) => void;
    updateCart: (cart: CartProps[]) => void;
    submitOrder: (cart: CartProps[]) => void;
    onCheckOutSession: (cart: CartProps) => void;
    onStoreCheckout: (data: StoreCheckout) => void;
    confirmIntent: (sessionId: string) => void;
    setLoading: (state: boolean) => void;
    setOrder: (state?: OrderSchema) => void;
  }
  export interface StoreDispatchProps {
    dispatch: React.Dispatch<ServiceActionProps>;
    merch?: MerchProps;
    user?: UserSchema;
    sessionId?: string;
    appId?: string;
    option?: OrderOptions;
    order?: OrderSchema;
    store?: StoreProps;
    payment?: { [key: string]: string };
    cart?: CartProps[];
    sessionCart?: CartProps;
  }
  export type ServiceActionProps =
    | { type: STORE_ACTIONS.IS_LOADING; payload: boolean }
    | { type: STORE_ACTIONS.SET_STRIPE_CONFIRMATION; payload: StripeConfirmationProps }
    | { type: STORE_ACTIONS.SET_STRIPE_SECRET | STORE_ACTIONS.SET_ERROR; payload: string }
    | { type: STORE_ACTIONS.SET_STORE_ORDER; payload: OrderSchema | undefined }
    | {
        type: STORE_ACTIONS.ADD_TO_CART | STORE_ACTIONS.REMOVE_FROM_CART | STORE_ACTIONS.UPDATE_CART;
        payload: CartProps[];
      };
}
