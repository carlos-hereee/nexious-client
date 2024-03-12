import { APP_ACTIONS } from "@actions/AppActions";
import { axiosAuth } from "@axios/axiosAuth";
import { AppDispatchProps } from "app-context";
import { AxiosError } from "axios";
import { combineArraysWithOutDups } from "nexious-library";
import { nexiousAppMenu } from "@data/nexious.json";
import { toggleMenuValues } from "@app/toggleMenu";
import { MenuProps } from "app-types";

export const getAppStoreWithName = async (props: AppDispatchProps) => {
  const { appName, dispatch, updateAppData, updateActiveAppData, subscriptions } = props;
  try {
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.get(`/store/app/${appName}`);
    if (data && updateAppData) {
      updateAppData(data);
      if (updateActiveAppData && subscriptions) {
        const noDups = combineArraysWithOutDups(nexiousAppMenu, data.app.menu);
        const oldValues = noDups as MenuProps[];
        // find auth menu
        const authIdx = oldValues.findIndex((val) => val.category === "subscribe");
        if (authIdx >= 0) {
          // check user subscriptions
          const subIdx = subscriptions.findIndex((subs) => subs.appName === data.app.appName);
          // if user is subscribe to app toggle options
          if (subIdx >= 0) oldValues[authIdx] = toggleMenuValues(oldValues[authIdx], "unsubscribe");
          // updateActiveAppData({ menu: oldValues });
          updateActiveAppData({ ...data.app, menu: oldValues });
        }
      }
    }
  } catch (error) {
    const err = error as AxiosError;
    dispatch({ type: APP_ACTIONS.SET_APP_ERROR, payload: `${err.response?.data}` });
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
  }
};
