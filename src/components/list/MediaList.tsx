import { CardContainerProps } from "app-types";
import { Icon } from "nexious-library";

const MediaList = (props: CardContainerProps) => {
  const { data, onRemove } = props;
  const handleRemove = (uid: string) => onRemove && onRemove(uid);

  if (!data || data.length === 0) return <p>No social media linked</p>;
  return (
    <div className="flex-wrap">
      {data.length > 0 &&
        data.map((d) => (
          <div key={d.uid} className="media-wrapper">
            <a className="nav-link" href={d.url || d.link || "#"} title={d.media}>
              {d.media && <Icon icon={d.media} name={d.media} size={onRemove ? "5x" : "3x"} />}
            </a>
            {onRemove && (
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
export default MediaList;
