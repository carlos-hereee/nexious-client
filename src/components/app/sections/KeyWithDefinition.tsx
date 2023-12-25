import { KeyWithDefinitionProps } from "app-types";
import HintButton from "../buttons/HintButton";

const KeyWithDefinition = (props: KeyWithDefinitionProps) => {
  const { label, value, labelLayout, children, hint } = props;

  if (hint) {
    return (
      <div className="key-with-definition">
        <div className="key-with-hint">
          {labelLayout === "bolden" ? (
            <p className="w-fit">
              <strong>{label}</strong>
            </p>
          ) : (
            <p>{label}</p>
          )}
          <HintButton data={hint} />
        </div>
        {children || <p>{value}</p>}
      </div>
    );
  }
  return (
    <div className="key-with-definition">
      {labelLayout === "bolden" ? (
        <p>
          <strong>{label}</strong>
        </p>
      ) : (
        <p>{label}</p>
      )}
      {children || <p>{value}</p>}
    </div>
  );
};
export default KeyWithDefinition;
