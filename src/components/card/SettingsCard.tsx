import { Button } from "nexious-library";
import { useState } from "react";
import SettingCardHeader from "./SettingsCardHeader";

interface SettingCard {
  title: string;
  list?: { name: string; data: string | number }[];
  children?: React.ReactNode;
  labels?: { [key: string]: string };
  onViewClick?: () => void;
  onAddClick?: () => void;
  onEditClick?: () => void;
  onEditClick2?: () => void;
  onRemoveClick?: () => void;
}

const SettingsCard = (props: SettingCard) => {
  const { title, onAddClick, onViewClick, onRemoveClick, onEditClick, onEditClick2, list, children, labels } = props;
  const [active, setActive] = useState<string>("");

  if (!active) return <SettingCardHeader title={title} onClick={setActive} active={active} />;

  const hasButtons: boolean = !!onViewClick || !!onRemoveClick || !!onAddClick || !!onEditClick || !!onEditClick2;

  return (
    <div className="settings-card">
      <SettingCardHeader title={title} onClick={setActive} active={active} />
      {list && (
        <div className="settings-card-list">
          {list.map((l) => (
            <div key={l.name}>
              <p>
                <strong>{l.name}: </strong>
                {l.data}
              </p>
            </div>
          ))}
        </div>
      )}
      {children}
      {hasButtons && (
        <div className="btn-container">
          {onViewClick && <Button label={labels ? labels.onViewClick : `View ${title}`} onClick={onViewClick} />}
          {onAddClick && <Button label={labels ? labels.onAddClick : `Create${title}`} onClick={onAddClick} />}
          {onEditClick && <Button label={labels ? labels.onEditClick : `Edit ${title}`} onClick={onEditClick} />}
          {onEditClick2 && <Button label={labels ? labels.onEditClick2 : `Edit ${title}`} onClick={onEditClick2} />}
          {onRemoveClick && <Button label={labels ? labels.onRemoveClick : `Remove ${title}`} onClick={onRemoveClick} />}
        </div>
      )}
    </div>
  );
};
export default SettingsCard;
