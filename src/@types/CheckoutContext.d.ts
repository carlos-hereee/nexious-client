declare module "checkout-context" {
  import { CartProps, MerchProps } from "store-context";
  import { FORM_STATUS } from "app-admin";
  import { CHECKOUT_ACTIONS } from "@actions/CheckoutActions";

  export interface CheckoutValues {
    cart: CartProps[];
    store: StoreProps;
    merch: MerchProps;
  }
  export interface CheckoutStateProps {
    isLoading: boolean;
    cart: CartProps[];
    merch: MerchProps;
    stripeSecret: string;
    error: string;
  }
  export interface CheckoutSchema extends CheckoutStateProps {
    addToCart: (data: CheckoutValues) => void;
  }
  export interface CheckoutDispatchProps {
    dispatch: React.Dispatch<CheckoutActionProps>;
    cart?: CartProps[];
    store?: StoreProps;
    merch?: MerchProps;
  }
  export type CheckoutActionProps =
    | { type: CHECKOUT_ACTIONS.IS_LOADING; payload: boolean }
    | { type: CHECKOUT_ACTIONS.SET_ERROR | CHECKOUT_ACTIONS.SET_STRIPE_SECRET; payload: string }
    | { type: CHECKOUT_ACTIONS.SET_REQUEST_STATUS; payload: FORM_STATUS }
    | { type: CHECKOUT_ACTIONS.SET_MERCH; payload: MerchProps }
    | { type: CHECKOUT_ACTIONS.UPDATE_CART; payload: CartProps[] };
}
