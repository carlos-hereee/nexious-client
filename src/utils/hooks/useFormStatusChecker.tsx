// import { AdminContext } from "@context/admin/AdminContext";
// import { useContext, useEffect } from "react";

// export const useFormStatusChecker = (cb: () => void) => {
//   const { formStatus, setFormStatus } = useContext(AdminContext);

//   useEffect(() => {
//     // if (formStatus) console.log("formStatus :>> ", formStatus);
//     if (formStatus === "SUCCESS") {
//       // // render callback when status is  success
//       cb();
//       setFormStatus("IDLE");
//     }
//   }, [formStatus]);
//   return { status: formStatus };
// };
