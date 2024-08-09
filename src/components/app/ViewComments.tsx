// import { AuthContext } from "@context/auth/AuthContext";
// import { Button, IconButton } from "nexious-library";
// import { useContext } from "react";

interface Comments {
  comments: string[];
}
const ViewComments = ({ comments }: Comments) => {
  // const { accessToken } = useContext(AuthContext);
  if (!comments || comments.length === 0)
    return (
      <>
        <p>Be the first to leave a comment </p>
        {/* {accessToken ? <IconButton icon={{ icon: "reply" }} theme="highlight" /> : <Button label="Create an account" />} */}
      </>
    );
  return <div>VIEW COMMENTS</div>;
};
export default ViewComments;
