import { Button, Icon } from "nexious-library";

interface ICardHeader {
  title: string;
  active: string;
  onClick?: (data: string) => void;
}
const SettingCardHeader = ({ title, onClick, active }: ICardHeader) => {
  return (
    <Button theme="settings-card-header highlight" onClick={() => onClick && onClick(title === active ? "" : title)}>
      <h3 className="heading">{title}</h3> <Icon icon={title === active ? "arrowUp" : "arrowDown"} />
    </Button>
  );
};
export default SettingCardHeader;
