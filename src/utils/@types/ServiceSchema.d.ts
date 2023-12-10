declare module "services-context" {
  export interface ServiceStateProps {
    isLoading: boolean;
  }
  export interface ServiceSchema {
    isLoading: boolean;
  }
  export type ServiceActionProps = {
    type: SERVICE_ACTIONS.IS_LOADING;
    payload: boolean;
  };
}
