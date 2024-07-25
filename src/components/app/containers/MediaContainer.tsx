import MediaList from "@components/list/MediaList";
import { MediaItemProp, SettingsContainer } from "app-types";
import { ItemDetail, Button } from "nexious-library";
import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";

const MediaContainer = ({ updatePhase }: SettingsContainer) => {
  // require key variable
  if (!updatePhase) throw Error("onAdd is required");
  const { media, setSocialMedia } = useContext(AppContext);

  const handleRemove = () => updatePhase("confirm-cancel");
  const handleMediaClick = (m: MediaItemProp) => {
    updatePhase("phase-one");
    setSocialMedia(m);
  };
  return (
    <div className="container">
      <h2 className="heading">Social Media:</h2>
      <p className="text-max">**Linking your social media will only redirect users via hyperlink**</p>
      <MediaList onRemove={handleRemove} data={media.medias} onMediaClick={handleMediaClick} />
      <ItemDetail label="Link social media:" labelLayout="bolden">
        <Button label="+ Add Social media" onClick={() => updatePhase("phase-two")} />
      </ItemDetail>
      <ItemDetail label="View posts:" labelLayout="bolden">
        <Button label="View posts" onClick={() => updatePhase("phase-four")} />
      </ItemDetail>
      <ItemDetail label="Create a post:" labelLayout="bolden">
        <Button label="+ Post" onClick={() => updatePhase("phase-three")} />
      </ItemDetail>
    </div>
  );
};
export default MediaContainer;
