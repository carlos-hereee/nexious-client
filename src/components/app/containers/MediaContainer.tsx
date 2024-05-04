import MediaList from "@components/list/MediaList";
import { SettingsContainer } from "app-types";
import { Button } from "nexious-library";
import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import KeyWithDefinition from "../sections/KeyWithDefinition";

const MediaContainer = ({ updatePhase }: SettingsContainer) => {
  // require key variable
  if (!updatePhase) throw Error("onAdd is required");
  const { media } = useContext(AppContext);
  const handleRemove = () => {
    updatePhase("confirm-cancel");
  };
  const handleMediaClick = () => {
    updatePhase("phase-one");
  };
  return (
    <div className="container">
      <h2 className="heading">Social Media:</h2>
      <p className="text-max">**Linking your social media will only redirect users via hyperlink**</p>
      <MediaList onRemove={handleRemove} data={media.medias} onMediaClick={handleMediaClick} />
      <KeyWithDefinition label="More options:" labelLayout="bolden">
        <Button label="+ Add Social media" onClick={() => updatePhase("phase-two")} />
      </KeyWithDefinition>
    </div>
  );
};
export default MediaContainer;
