declare module "services-context" {
  import { UserSchema } from "auth-context";
  import { SERVICE_ACTIONS } from "@actions/ServiceActions";

  export interface MerchProps {
    cost: number;
    inStock: number;
    quantity: number;
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
  export interface ServiceStateProps {
    isLoading: boolean;
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
    submitOrder: (props: SubmitPaymentProps) => void;
  }
  export interface ServicesDispatchProps {
    dispatch: React.Dispatch<ServiceActionProps>;
    merch?: MerchProps;
    user?: UserSchema;
    payment?: { [key: string]: string };
    cart?: MerchProps[];
  }
  export type ServiceActionProps =
    | {
        type: SERVICE_ACTIONS.IS_LOADING;
        payload: boolean;
      }
    | {
        type:
          | SERVICE_ACTIONS.ADD_TO_CART
          | SERVICE_ACTIONS.REMOVE_FROM_CART
          | SERVICE_ACTIONS.UPDATE_CART;
        payload: MerchProps[];
      };
}
