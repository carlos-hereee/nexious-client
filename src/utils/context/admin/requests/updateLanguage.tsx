// import { axiosAuth } from "@app/utils/axios/axiosAuth";
// import { isDev } from "@app/config";
// import { UpdateLanguageProps } from "app-forms";

// export const updateLanguage = async (props: UpdateLanguageProps) => {
//   const { dispatch, locale, appName, handleAppAssets } = props;
//   try {
//     dispatch({ type: "IS_LOADING", payload: true });
//     const { data } = await axiosAuth.get(`/app/${appName}/locale/${locale}`);
//     console.log("data :>> ", data);
//     data && handleAppAssets(data);
//     dispatch({ type: "IS_LOADING", payload: false });
//   } catch (error) {
//     isDev && console.log("error building app ", error);
//   }
// };
