declare module "services-context" {
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
    uid: string;
  }
  export interface PaymentMethod {
    uid: string;
    type: string;
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
    stripeConfirmation: StripeConfirmationProps;
    cart: MerchProps[] | [];
    paymentMethods: PaymentMethod[] | [];
  }
  export interface SubmitPaymentProps {
    user?: UserSchema;
    payment?: { [key: string]: string };
    cart?: MerchProps[];
  }
  export interface ServiceSchema extends ServiceStateProps {
    addToCart: (cart: MerchProps[], key: MerchProps) => void;
    removeFromCart: (cart: MerchProps[], key: MerchProps) => void;
    updateCart: (cart: MerchProps[]) => void;
    submitOrder: (cart: MerchProps[]) => void;
    onCheckOutSession: (cart: MerchProps[]) => void;
    confirmIntent: (sessionId: string) => void;
  }
  export interface ServicesDispatchProps {
    dispatch: React.Dispatch<ServiceActionProps>;
    merch?: MerchProps;
    user?: UserSchema;
    sessionId?: string;
    payment?: { [key: string]: string };
    cart?: MerchProps[];
  }
  export type ServiceActionProps =
    | { type: SERVICE_ACTIONS.IS_LOADING; payload: boolean }
    | { type: SERVICE_ACTIONS.SET_STRIPE_CONFIRMATION; payload: StripeConfirmationProps }
    | { type: SERVICE_ACTIONS.SET_STRIPE_SECRET; payload: string }
    | {
        type:
          | SERVICE_ACTIONS.ADD_TO_CART
          | SERVICE_ACTIONS.REMOVE_FROM_CART
          | SERVICE_ACTIONS.UPDATE_CART;
        payload: MerchProps[];
      };
}
