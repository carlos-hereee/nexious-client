// import { useContext, useState } from "react";
// import { AppContext } from "@context/app/AppContext";
// import { Rating } from "nexious-library/@nxs-molecules";
// import { UserCard, Form, CardTextBubble } from "nexious-library";
// import { AuthContext } from "@context/auth/AuthContext";

// const Testimonials = () => {
//   const { testimonials } = useContext(AppContext);
//   const { user } = useContext(AuthContext);
//   const [inputRating, setInputRating] = useState(0);
//   const handleSubmit = (e) => {
//     // console.log("handleSubmit", e);
//   };
//   // console.log("user", user);
//   return (
//     <div className="container">
//       <h1 className="heading">{testimonials.title}</h1>
//       <p className="text-max">{testimonials.body}</p>
//       <div className="m-tb flex-w w-100 p-1">
//         {user && user.hero && <UserCard user={user} hideLabels />}
//         <div className="flex-center flex-w w-100">
//           <Rating star={inputRating} click={(e) => setInputRating(e)} />
//           <Form
//             values={{ message: "" }}
//             submit={handleSubmit}
//             name="testimonial-form"
//             hideLabels
//             stretchInput
//           />
//         </div>
//       </div>
//       {testimonials.reviews.length > 0 &&
//         testimonials.reviews.map((t) => (
//           <CardTextBubble data={t} hero={t.user.hero} key={t.uid} theme="p-1" />
//         ))}
//     </div>
//   );
// };
// export default Testimonials;
