import MediaList from "@components/list/MediaList";
import { MediaCardContainerProps } from "app-types";
import { Button } from "nexious-library";
import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import KeyWithDefinition from "../sections/KeyWithDefinition";

const MediaContainer = (props: MediaCardContainerProps) => {
  const { onRemove, onMediaClick, onAdd } = props;
  const { media } = useContext(AppContext);

  return (
    <div className="container">
      <MediaList onRemove={onRemove} data={media.medias} onMediaClick={onMediaClick} />
      {onAdd && (
        <KeyWithDefinition label="More options:" labelLayout="bolden">
          <Button label="+ Add Social media" onClick={() => onAdd("phase-two")} />
        </KeyWithDefinition>
      )}
    </div>
  );
};
export default MediaContainer;
