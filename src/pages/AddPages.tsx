// import { useContext } from "react";
// import { AppContext } from "@context/app/AppContext";
// import { Form } from "nexious-library";

// const AddPage = () => {
//   const { pageValues, pageLabels, pagePlaceholders } = useContext(AppContext);
//   const { pageValuesTypes, addPage } = useContext(AppContext);
//   return (
//     <div className="flex-d-column">
//       <h1>Add page content</h1>
//       <Form
//         initialValues={pageValues}
//         labels={pageLabels}
//         placeholders={pagePlaceholders}
//         types={pageValuesTypes}
//         submit={addPage}
//         submitLabel="Save and continue"
//         useMedia
//         schema={{ required: ["title", "name"] }}
//       />
//     </div>
//   );
// };
// export default AddPage;
