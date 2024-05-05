// import { ItemDetailProps } from "app-types";
// import HintButton from "../buttons/HintButton";

// const ItemDetail = ({ label, value, labelLayout, children, hint }: ItemDetailProps) => {
//   if (hint) {
//     return (
//       <div className="key-with-definition">
//         <div className="key-with-hint">
//           {labelLayout === "bolden" ? (
//             <p className="w-fit">
//               <strong>{label}</strong>
//             </p>
//           ) : (
//             <p>{label}</p>
//           )}
//           <HintButton data={hint} />
//         </div>
//         {children || <p>{value}</p>}
//       </div>
//     );
//   }
//   return (
//     <div className="key-with-definition">
//       {labelLayout === "bolden" ? (
//         <p>
//           <strong>{label}</strong>
//         </p>
//       ) : (
//         <p>{label}</p>
//       )}
//       {children || <p>{value}</p>}
//     </div>
//   );
// };
// export default ItemDetail;
