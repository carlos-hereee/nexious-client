// import { axiosAuth } from "@app/utils/axios/axiosAuth";
// import { isDev } from "@app/config";

// export const changePassword = async (dispatch, credentials) => {
//   try {
//     dispatch({ type: "IS_LOADING", payload: true });
//     const { data } = await axiosAuth.post("/auth/change-password", credentials);
//     dispatch({ type: "SET_ACCESS_TOKEN", payload: data });
//     dispatch({ type: "IS_LOADING", payload: false });
//   } catch (error) {
//     if (isDev) console.log("error", error.response);
//     const { status, data } = error.response;
//     if (status === 403) {
//       dispatch({ type: "CHANGE_PASSWORD_ERROR", payload: data });
//     }
//     dispatch({ type: "IS_LOADING", payload: false });
//   }
// };
