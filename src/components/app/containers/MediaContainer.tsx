import MediaList from "@components/list/MediaList";
import { MediaCardContainerProps } from "app-types";
import { Button } from "nexious-library";
import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import KeyWithDefinition from "../sections/KeyWithDefinition";

const MediaContainer = ({ onRemove, onMediaClick, onAdd }: MediaCardContainerProps) => {
  const { media } = useContext(AppContext);

  return (
    <div className="container">
      <h2 className="heading">Social Media:</h2>
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
