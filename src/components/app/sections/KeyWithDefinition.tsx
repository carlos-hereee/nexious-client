import { KeyWithDefinitionProps } from "app-types";

const KeyWithDefinition = (props: KeyWithDefinitionProps) => {
  const { label, value, labelLayout, children } = props;
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
