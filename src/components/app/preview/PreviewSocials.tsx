import { Hero, Form, Socials } from "nexious-library";

type SocialProps = {
  data: any;
};
const PreviewSocials: React.FC<SocialProps> = (props) => {
  const { data } = props;
  return (
    <div className="container">
      <div className="container-split">
        <div className="container">
          {data.title && <h2 className="heading">{data.title}</h2>}
          {data.subtitle && <p className="heading">{data.subtitle}</p>}
        </div>
        {data.hero && <Hero hero={{ url: data.hero }} />}
      </div>
      {data.hasMedias && <Socials medias={data.medias} />}
    </div>
  );
};
export default PreviewSocials;
