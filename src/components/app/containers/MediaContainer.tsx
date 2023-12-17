import MediaList from "@components/list/MediaList";
import { MediaCardContainerProps } from "app-types";
import { Button } from "nexious-library";
import KeyWithDefinition from "../sections/KeyWithDefinition";

const MediaContainer = (props: MediaCardContainerProps) => {
  const { data, onRemove, onMediaClick, onAddMedia } = props;

  return (
    <div className="container">
      {data.heading && <h2 className="heading">{data.heading}</h2>}
      <MediaList
        onRemove={onRemove}
        data={data.medias}
        onMediaClick={onMediaClick}
        hint={data.hint}
      />
      {onAddMedia && (
        <KeyWithDefinition label="More options:" labelLayout="bolden">
          <Button label="+ Add Social media" onClick={onAddMedia} />
        </KeyWithDefinition>
      )}
    </div>
  );
};
export default MediaContainer;
