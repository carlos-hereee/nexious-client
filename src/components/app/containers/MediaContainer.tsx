import MediaList from "@components/list/MediaList";
import { MediaCardContainerProps } from "app-types";
import { Button } from "nexious-library";

const MediaContainer = (props: MediaCardContainerProps) => {
  const { data, onRemove, onClick } = props;

  if (!data.medias || data.medias.length === 0) return <p>No social media linked</p>;
  return (
    <div className="container">
      {data.heading && <h2 className="heading">{data.heading}</h2>}
      <MediaList onRemove={onRemove} data={data.medias} />;
      {onRemove && (
        <div className="flex-center">
          <Button label="+ Add Social media" onClick={onClick} />
        </div>
      )}
    </div>
  );
};
export default MediaContainer;
