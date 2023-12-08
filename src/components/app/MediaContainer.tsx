import { CardContainerProps } from "app-types";
import { Icon } from "nexious-library";

const MediaContainer = (props: CardContainerProps) => {
  const { data, canRemove, onRemove } = props;
  const handleRemove = (uid: string) => onRemove && onRemove(uid);
  return (
    <div className="flex-wrap">
      {data.length > 0 &&
        data.map((d) => (
          <div key={d.uid} className="media-wrapper">
            <a className="nav-link" href={d.url || d.link || "#"} title={d.media}>
              {d.media && <Icon icon={d.media} name={d.media} size={canRemove ? "5x" : "3x"} />}
            </a>
            {canRemove && (
              <button
                className="btn-remove btn-media-remove"
                type="button"
                onClick={() => handleRemove(d.uid)}
              >
                X
              </button>
            )}
          </div>
        ))}
    </div>
  );
};
export default MediaContainer;
