import { InitAppProps } from "app-forms";
import { Hero } from "nexious-library";

type PreviewHeaderProps = {
  preview: InitAppProps;
};
const PreviewAppName = (props: PreviewHeaderProps) => {
  const { preview } = props;
  return (
    <div className="flex-row">
      {preview.logo && <Hero hero={{ url: preview.logo }} />}
      {preview.appName && <h2 className="heading">{preview.appName}</h2>}
    </div>
  );
};
export default PreviewAppName;
