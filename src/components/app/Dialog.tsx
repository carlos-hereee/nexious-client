import { Button } from "nexious-library";

type DialogProps = {
  theme?: string;
  onDialogClose?: () => void;
  children: React.ReactNode;
};

const Dialog = (props: DialogProps) => {
  const { theme, onDialogClose, children } = props;
  return (
    <div className={`dialog ${theme ? ` alt-${theme}` : "alt-light-mode"}`}>
      <div className="dialog-navigation">
        <Button label="X" onClick={onDialogClose} theme="btn-dialog btn-cancel" />
      </div>
      {children && <div className="dialog-body">{children}</div>}
    </div>
  );
};
export default Dialog;
