// import { axiosAuth } from "@app/utils/axios/axiosAuth";

// export const fetchUser = async (dispatch, user) => {
//   try {
//     dispatch({ type: "IS_LOADING", payload: true });
//     const { data } = await axiosAuth.get(`/auth/user/${user.username}`);
//     dispatch({ type: "SET_DUMMY_DATA", payload: data });
//     dispatch({ type: "FORGOT_PASSWORD_ERROR", payload: "" });
//     dispatch({ type: "IS_LOADING", payload: false });
//   } catch (error) {
//     const { data, status } = error.response;
//     dispatch({ type: "FORGOT_PASSWORD_ERROR", payload: data });
//     dispatch({ type: "IS_LOADING", payload: false });
//   }
// };
