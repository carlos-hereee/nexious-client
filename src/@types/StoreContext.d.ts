declare module "store-context" {
  import { StoreProps } from "app-types";
  import { UserSchema } from "auth-context";
  import { STORE_ACTIONS } from "@actions/ServiceActions";

  export interface ViewOrderStatusKey {
    pending: DialogStatusProps;
    incomplete: DialogStatusProps;
    complete: DialogStatusProps;
    accepted: DialogStatusProps;
  }
  export interface StripeBalance {
    available?: { amount: number; currency: string; source_type: { card: number } }[];
    pending?: { amount: number; currency: string; source_type: { card: number } }[];
  }
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
  export interface OrderMerchSchema {
    merchId: string;
    productId?: string;
    priceId?: string;
    paymentStatus?: "paid" | "unpaid" | "no_payment_required";
    quantity: number;
  }
  export interface ClientSchema {
    email: string;
    name?: string;
    phone: string;
    userId?: string;
    address?: {
      city: string | null;
      country: string | null;
      line1: string | null;
      line2: string | null;
      postal_code: string | null;
      state: string | null;
    };
  }

  export interface OrderSchema {
    store: OrderStoreInfo;
    status: "pending" | "completed" | "accepted" | "declined";
    client: ClientSchema;
    paymentMethod: "in-store" | "stripe";
    orderId: string;
    merch: OrderMerchSchema[];
  }
  export type OrderOptions = "decline" | "completed" | "accepted" | "incomplete" | "pending";
  export interface OrderDetailsProps {
    order: OrderSchema;
    labels?: { accepted?: string; decline?: string; completed?: string };
    onClick?: (option: OrderOptions) => void;
  }

  export interface PaymentMethod {
    uid: string;
    type: "visa/credit" | "store" | "paypal";
    name: string;
    icon: string;
    hero?: { url: string; small: string; name: string; alt: string };
  }
  export interface StripeConfig {
    currency?: string;
    charges_enabled?: string;
    readPrivacyPolicy?: boolean;
    settings: {
      payouts: { schedule: { delay_days: number; interval: string } };
    };
  }
  export interface StripeConfirmationProps {
    status: string;
    paymentStatus: string;
    customer: string;
    mode: string;
    subscription: string;
    metadata?: { [key: string]: string };
    intent: string;
    customerDetails: {
      email: string;
      name: string;
      phone: string;
    };
  }

  export interface StoreStateProps {
    isLoading: boolean;
    stripeSecret: string;
    trackOrder?: OrderSchema;
    stripeConfig?: StripeConfig;
    error: string;
    stripeConfirmation: StripeConfirmationProps;
    stripeBalance?: StripeBalance;
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
  export interface PayoutAmmount {
    data: string;
    appId: string;
    amount: string;
  }
  export interface StoreCheckout {
    sessionCart: CartProps;
    user: UserSchema;

    merchandise?: MerchProps[];
  }
  export interface CheckoutIntent {
    sessionId: string;
  }
  export interface TrackOrder {
    orderId: string;
    accountId: string;
  }
  export interface StoreOrderUpdate {
    order: OrderSchema;
    option: OrderOptions;
    appId: string;
    from?: OrderOptions;
  }
  export interface StoreSchema extends StoreStateProps {
    addToCart: (cart: CartProps[], store: StoreProps, key: MerchProps) => void;
    updateCart: (cart: CartProps[]) => void;
    submitOrder: (cart: CartProps[]) => void;
    onCheckOutSession: (cart: StoreCheckout) => void;
    onStoreCheckout: (data: StoreCheckout) => void;
    confirmIntent: (sessionId: CheckoutIntent) => void;
    manageBilling: (sessionId: string) => void;
    orderTracker: (orderId: TrackOrder) => void;
    setLoading: (state: boolean) => void;
    setOrder: (state?: OrderSchema) => void;
    getBalance: (appId: string) => void;
    handlePayouts: (data: PayoutAmmount) => void;
    getAccount: (appId: string) => void;
  }
  export interface StoreDispatchProps {
    dispatch: React.Dispatch<ServiceActionProps>;
    merch?: MerchProps;
    merchandise?: MerchProps[];
    user?: UserSchema;
    sessionId?: string;
    orderId?: string;
    accountId?: string;
    storeId?: string;
    appId?: string;
    data?: string;
    amount?: string;
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
    | { type: STORE_ACTIONS.SET_STRIPE_BALANCE; payload: StripeBalance }
    | { type: STORE_ACTIONS.SET_TRACK_ORDER; payload: OrderSchema }
    | { type: STORE_ACTIONS.SET_STRIPE_CONFIG; payload: StripeConfig }
    | {
        type: STORE_ACTIONS.ADD_TO_CART | STORE_ACTIONS.REMOVE_FROM_CART | STORE_ACTIONS.UPDATE_CART;
        payload: CartProps[];
      };
}
