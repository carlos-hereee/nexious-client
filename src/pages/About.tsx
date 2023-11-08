import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { HeroCard, UserCard } from "nexious-library";

const About = () => {
  const { about } = useContext(AppContext);

  return (
    <div className="container">
      <div className="flex-d-column">
        <HeroCard data={about} />
        <p className="text-max">{about.body}</p>
      </div>
      <h2 className="heading">Meet our team</h2>
      <div className="flex-w flex-center">
        {about.team &&
          about.team.map((a) => (
            <div className="team-roster" key={a.uid}>
              <UserCard user={a.user} />
              <p>{a.body}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default About;
