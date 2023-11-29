import { CardContainerProps } from "app-types";
import { Icon } from "nexious-library";

const MediaContainer = (props: CardContainerProps) => {
  const { data } = props;
  return (
    <div className="media-container">
      {data.length > 0 &&
        data.map((d) => (
          <a key={d.uid} className="nav-link" href={d.link || "#"}>
            {d.media && <Icon icon={d.media} name={d.media} size="3x" />}
          </a>
        ))}
    </div>
  );
};
export default MediaContainer;
