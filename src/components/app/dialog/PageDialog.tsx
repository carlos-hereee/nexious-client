// import { useContext } from "react";
// import { AuthContext } from "@context/auth/AuthContext";
// import { DialogProps } from "app-types";
// import { Dialog } from "nexious-library";
// // import { AdminContext } from "@context/admin/AdminContext";
// // import { AppContext } from "@context/app/AppContext";
// // import AddPage from "../forms/app/AddPage";
// import EditLanding from "../forms/app/EditLanding";
// import EditPage from "../forms/app/EditPage";

// const PageDialog = ({ onClose, status }: DialogProps) => {
//   const { theme } = useContext(AuthContext);
//   // const { deletePage } = useContext(AdminContext);
//   // const { appId, activePage } = useContext(AppContext);

//   // const handleConfirm = () => {
//   //   if (activePage?.pageId) deletePage({ appId, pageId: activePage.pageId });
//   // };
//   return (
//     <Dialog theme={`alt-${theme}`} onDialogClose={onClose}>
//       {status === "phase-two" && <EditLanding />}
//       {status === "phase-edit" && <EditPage />}
//       {/* {status === "confirm-cancel" && <ConfirmDeleteForm onSubmit={handleConfirm} />} */}
//     </Dialog>
//   );
// };
// export default PageDialog;
