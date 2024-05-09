import { CardContainerProps } from "app-types";
import { Button, Icon, IconButton, ItemDetail } from "nexious-library";
import hint from "@data/data.json";

const MediaList = ({ data, onRemove, onMediaClick }: CardContainerProps) => {
  const handleRemove = (uid: string) => onRemove && onRemove(uid);

  if (!data || data.length === 0) {
    return (
      <ItemDetail label="Social medias:" labelLayout="bolden" hint={hint.noMediaHint}>
        <p>No social media linked</p>
      </ItemDetail>
    );
  }
  return (
    <ItemDetail label="Social medias:" labelLayout="bolden" hint={hint.mediaHint}>
      <div className="flex-wrap">
        {data.map((d) => (
          <div key={d.uid} className="media-wrapper">
            {onMediaClick ? (
              d.media ? (
                <IconButton icon={{ icon: d.media, size: "5x", name: d.media }} onClick={() => onMediaClick(d)} />
              ) : (
                <Button label="?" theme="btn-rect" onClick={() => onMediaClick(d)} />
              )
            ) : (
              <a className="nav-link" href={d.url || d.link || "#"} title={d.media}>
                {d.media && <Icon icon={d.media} name={d.media} size={onRemove ? "5x" : "3x"} />}
              </a>
            )}
            {onRemove && <Button label="X" theme="btn-remove" onClick={() => handleRemove(d.uid)} />}
          </div>
        ))}
      </div>
    </ItemDetail>
  );
};
export default MediaList;
