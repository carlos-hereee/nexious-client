import { CardContainerProps } from "app-types";
import { Button, Icon, IconButton } from "nexious-library";

const MediaList = (props: CardContainerProps) => {
  const { data, onRemove, onMediaClick, hint } = props;
  const handleRemove = (uid: string) => onRemove && onRemove(uid);

  // console.log("data :>> ", data);

  if (!data || data.length === 0) return <p>No social media linked</p>;
  return (
    <>
      {hint && <p>{hint}</p>}
      <div className="flex-wrap">
        {data.length > 0 &&
          data.map((d) => (
            <div key={d.uid} className="media-wrapper">
              {onMediaClick ? (
                d.media ? (
                  <IconButton
                    icon={{ icon: d.media, size: "5x", name: d.media }}
                    onClick={() => onMediaClick(d)}
                  />
                ) : (
                  <Button label="?" theme="btn-rect" onClick={() => onMediaClick(d)} />
                )
              ) : (
                <a className="nav-link" href={d.url || d.link || "#"} title={d.media}>
                  {d.media && <Icon icon={d.media} name={d.media} size={onRemove ? "5x" : "3x"} />}
                </a>
              )}
              {onRemove && (
                <Button label="X" theme="btn-remove" onClick={() => handleRemove(d.uid)} />
              )}
            </div>
          ))}
      </div>
    </>
  );
};
export default MediaList;
