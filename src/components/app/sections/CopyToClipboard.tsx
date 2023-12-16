import { CopyToClipboardProps } from "app-types";
import { IconButton } from "nexious-library";
import { useEffect, useState } from "react";

const CopyToClipboard = (props: CopyToClipboardProps) => {
  const { data, label, theme, labelLayout } = props;

  const [isCopy, setCopy] = useState(false);

  useEffect(() => {
    if (isCopy) setTimeout(() => setCopy(false), 2300);
  }, [isCopy]);

  const copyData = () => {
    navigator.clipboard.writeText(data);
    setCopy(true);
  };
  return (
    <div className={theme || "section-row"}>
      {label &&
        (labelLayout === "bolden" ? (
          <p>
            <strong> {label}</strong>
          </p>
        ) : (
          <p className="section-label">{label}</p>
        ))}
      <IconButton
        icon={{ icon: isCopy ? "check" : "copy", label: data }}
        onClick={copyData}
        theme="btn-main"
      />
    </div>
  );
};
export default CopyToClipboard;
