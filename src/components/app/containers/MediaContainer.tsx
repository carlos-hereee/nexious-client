import MediaList from "@components/list/MediaList";
import { MediaItemProp, SettingsContainer } from "app-types";
import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import SettingsCard from "@components/card/SettingsCard";
import { MediaContext } from "@context/media/MediaContext";
import ViewPosts from "../ViewPosts";

const MediaContainer = ({ updatePhase }: SettingsContainer) => {
  // require key variable
  if (!updatePhase) throw Error("onAdd is required");
  const { media, setSocialMedia, posts, appId } = useContext(AppContext);
  const { deletePost } = useContext(MediaContext);

  const handleRemove = () => updatePhase("confirm-cancel");
  const handleMediaClick = (m: MediaItemProp) => {
    updatePhase("phase-one");
    setSocialMedia(m);
  };
  return (
    <div className="container">
      <SettingsCard
        title="Post"
        active="Post"
        onAddClick={() => updatePhase("phase-three")}
        labels={{ onAddClick: "Create post" }}
      >
        <ViewPosts posts={posts} allowRemoval onRemovalClick={(postId) => deletePost(appId, postId)} />
      </SettingsCard>
      <SettingsCard title="Social Media" onAddClick={() => updatePhase("phase-two")} labels={{ onAddClick: "Link social media" }}>
        <p className="text-max">**Linking your social media will only redirect users via hyperlink**</p>
        <MediaList onRemove={handleRemove} data={media.medias} onMediaClick={handleMediaClick} />
      </SettingsCard>
    </div>
  );
};
export default MediaContainer;
