import MediaList from "@components/list/MediaList";
import { MediaCardContainerProps } from "app-types";
import { Button } from "nexious-library";

const MediaContainer = (props: MediaCardContainerProps) => {
  const { data, onRemove, onMediaClick, onAddMedia } = props;

  if (!data.medias || data.medias.length === 0) return <p>No social media linked</p>;
  return (
    <div className="container">
      {data.heading && <h2 className="heading">{data.heading}</h2>}
      <MediaList onRemove={onRemove} data={data.medias} onMediaClick={onMediaClick} />;
      {onAddMedia && (
        <div className="flex-center">
          <Button label="+ Add Social media" onClick={onAddMedia} />
        </div>
      )}
    </div>
  );
};
export default MediaContainer;
