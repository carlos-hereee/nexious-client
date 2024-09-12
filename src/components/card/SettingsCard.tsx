import { Button } from "nexious-library";
import { useState } from "react";
import SettingCardHeader from "./SettingsCardHeader";

interface SettingCard {
  title: string;
  list?: { name: string; data: string | number }[];
  onViewClick?: () => void;
  onAddClick?: () => void;
  onRemoveClick?: () => void;
}

const SettingsCard = ({ title, onAddClick, onViewClick, onRemoveClick, list }: SettingCard) => {
  const [active, setActive] = useState<string>("");

  if (!active) return <SettingCardHeader title={title} onClick={setActive} active={active} />;

  const hasButtons: boolean = !!onViewClick || !!onRemoveClick || !!onAddClick;

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
      {hasButtons && (
        <div className="btn-container">
          {onViewClick && <Button label={`View ${title}`} onClick={onViewClick} />}
          {onRemoveClick && <Button label={`Remove ${title}`} onClick={onRemoveClick} />}
          {onAddClick && <Button label={`Create ${title}`} onClick={onAddClick} />}
        </div>
      )}
    </div>
  );
};
export default SettingsCard;
