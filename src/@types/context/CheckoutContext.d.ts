declare module "checkout-context" {
  import { CartProps, MerchProps, OrderSchema } from "store-context";
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
    order?: OrderSchema;
    error: string;
  }
  export interface CheckoutSchema extends CheckoutStateProps {
    addToCart: (data: CheckoutValues) => void;
    updateCart: (data: CartProps[]) => void;
    setLoading: (data: boolean) => void;
    setMerch: (data: MerchProps) => void;
    setOrder: (data?: OrderSchema) => void;
  }
  export interface CheckoutDispatchProps {
    dispatch: React.Dispatch<CheckoutActionProps>;
    cart?: CartProps[];
    store?: StoreProps;
    merch?: MerchProps;
  }
  export type CheckoutActionProps =
    | { type: CHECKOUT_ACTIONS.IS_LOADING; payload: boolean }
    | { type: CHECKOUT_ACTIONS.SET_ERROR; payload: string }
    | { type: CHECKOUT_ACTIONS.SET_REQUEST_STATUS; payload: FORM_STATUS }
    | { type: CHECKOUT_ACTIONS.SET_MERCH; payload: MerchProps }
    | { type: CHECKOUT_ACTIONS.SET_ORDER; payload: OrderSchema | undefined }
    | { type: CHECKOUT_ACTIONS.UPDATE_CART; payload: CartProps[] };
}
