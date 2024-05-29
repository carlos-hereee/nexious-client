declare module "store-context" {
  import { StoreProps } from "app-types";
  import { UserSchema } from "auth-context";
  import { SERVICE_ACTIONS } from "@actions/ServiceActions";

  export interface MerchProps {
    cost: number;
    inStock: number;
    quantity: number;
    storeId: string;
    merchId: string;
    priceId: string;
    name: string;
    body: string;
    hero: string;
    catalog: string[];
    uid: string;
  }
  export interface OrderShema {
    storeId: string;
    status: "pending" | "completed" | "accepted" | "declined";
    client: ClientSchema;
    merch: OrderMerchSchema[];
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
  export interface ServiceStateProps {
    isLoading: boolean;
    stripeSecret: string;
    error: string;
    stripeConfirmation: StripeConfirmationProps;
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
  export interface ServiceSchema extends ServiceStateProps {
    addToCart: (cart: CartProps[], store: StoreProps, key: MerchProps) => void;
    updateCart: (cart: CartProps[]) => void;
    submitOrder: (cart: CartProps[]) => void;
    onCheckOutSession: (cart: CartProps) => void;
    onStoreCheckout: (cart: CartProps) => void;
    confirmIntent: (sessionId: string) => void;
  }
  export interface ServicesDispatchProps {
    dispatch: React.Dispatch<ServiceActionProps>;
    merch?: MerchProps;
    user?: UserSchema;
    sessionId?: string;
    store?: StoreProps;
    payment?: { [key: string]: string };
    cart?: CartProps[];
    sessionCart?: CartProps;
  }
  export type ServiceActionProps =
    | { type: SERVICE_ACTIONS.IS_LOADING; payload: boolean }
    | { type: SERVICE_ACTIONS.SET_STRIPE_CONFIRMATION; payload: StripeConfirmationProps }
    | { type: SERVICE_ACTIONS.SET_STRIPE_SECRET | SERVICE_ACTIONS.SET_ERROR; payload: string }
    | {
        type: SERVICE_ACTIONS.ADD_TO_CART | SERVICE_ACTIONS.REMOVE_FROM_CART | SERVICE_ACTIONS.UPDATE_CART;
        payload: CartProps[];
      };
}
