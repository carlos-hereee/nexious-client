// import { USER_ACTIONS } from "@actions/UserActions";
// import { axiosAuth } from "@axios/axiosAuth";
// import { isDev } from "@config";

// export const addTaskBoard = async ({ values, dispatch }) => {
//   try {
//     console.log("values :>> ", values);
//     const { data } = await axiosAuth.post(`task-board`, values);
//     console.log("values :>> ", data);
//     dispatch({ type: USER_ACTIONS.SET_USER_TASK_BOARD, payload: data.boards });
//   } catch (error) {
//     if (isDev) console.log("error", error);
//   }
// };
