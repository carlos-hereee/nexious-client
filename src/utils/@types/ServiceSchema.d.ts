declare module "services-context" {
  import { SERVICE_ACTIONS } from "@actions/ServiceActions";

  export interface MerchProps {
    name: string;
    cost: number;
    hero: string;
    uid: string;
  }
  export interface ServiceStateProps {
    isLoading: boolean;
    cart: MerchProps[] | [];
  }
  export interface ServiceSchema extends ServiceStateProps {
    addToCart: (cart: MerchProps[], key: MerchProps) => void;
    removeFromCart: (cart: MerchProps[], key: MerchProps) => void;
  }
  export interface ServicesDispatchProps {
    dispatch: React.Dispatch<ServiceActionProps>;
    merch?: MerchProps;
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
