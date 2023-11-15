// import { useContext } from "react";
// import { ServicesContext } from "@context/services/ServicesContext";
// import { AppContext } from "@context/app/AppContext";
// import { useNavigate } from "react-router-dom";
// import { CartRow } from "nexious-library/@nxs-molecules";

// const FeatureItems = () => {
//   // const {  } = useContext(AppContext);
//   const { setActive, services } = useContext(ServicesContext);
//   const navigate = useNavigate();

//   const handleClick = (data) => {
//     setActive(data);
//     navigate("/booking");
//   };

//   return (
//     <div className="container feature-items">
//       <h2 className="heading">Book a package now!</h2>
//       {services &&
//         services.map((service) => (
//           <CartRow data={service} key={service.uid} click={() => handleClick(service)} />
//         ))}
//     </div>
//   );
// };
// export default FeatureItems;
