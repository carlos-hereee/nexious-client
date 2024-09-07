import { Button } from "nexious-library";

interface SettingCard {
  title?: string;
  onViewClick?: () => void;
  onAddClick?: () => void;
  onRemoveClick?: () => void;
}

const SettingsCard = ({ title, onAddClick, onViewClick, onRemoveClick }: SettingCard) => {
  return (
    <div className="settings-card">
      {title && <h3 className="heading">{title}</h3>}
      <div className="btn-container">
        {onViewClick && <Button label={`View ${title}`} onClick={onViewClick} />}
        {onRemoveClick && <Button label={`Remove ${title}`} onClick={onRemoveClick} />}
        {onAddClick && <Button label={`Create ${title}`} onClick={onAddClick} />}
      </div>
    </div>
  );
};
export default SettingsCard;
