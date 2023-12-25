import { OnclickProps } from "app-admin";
import { Button, IconButton } from "nexious-library";
import { useState } from "react";

const HintButton = (props: OnclickProps) => {
  // const { onClick, data } = props;
  const { data } = props;
  const [show, setShow] = useState(false);
  return (
    <div className="button-hint-container">
      <IconButton
        icon={{ icon: "hint" }}
        title="show hint"
        onClick={() => setShow(!show)}
        theme="btn-icon"
      />
      {data && show && (
        <div className="hint-container">
          <h2 className="heading">{data.title}</h2>
          <p>{data.body}</p>
          <Button label="close" onClick={() => setShow(false)} />
        </div>
      )}
      {/* <IconButton icon={{ icon: "hint" }} title="show hint" onClick={onClick} theme="btn-icon" /> */}
    </div>
  );
};
export default HintButton;
