import { PageContainerProps } from "app-types";
import { Button } from "nexious-library";

const StoreContainer = (props: PageContainerProps) => {
  // const { data, onRemove, onMediaClick, onAddItem } = props;
  const { data, onAddItem } = props;

  return (
    <div className="container">
      {data.heading && <h2 className="heading">{data.heading}</h2>}

      {/* <MediaList
        onRemove={onRemove}
        data={data.medias}
        onMediaClick={onMediaClick}
        hint={data.hint}
      /> */}
      {onAddItem && (
        <div className="flex-center">
          <Button label="+ Add merch" onClick={onAddItem} />
        </div>
      )}
    </div>
  );
};
export default StoreContainer;
