import { Card, Navigation } from "nexious-library";
import { Heading } from "nexious-library/@nxs-atoms";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ServicesContext } from "../../utils/context/services/ServicesContext";

const Container = ({ filter, filtered, isFiltered, data }) => {
  const { setActive } = useContext(ServicesContext);
  const navigate = useNavigate();

  const handleClick = (e) => {
    let content = e.currentTarget.textContent.split(" ").join("").toLowerCase();
    filter(data.services, content);
  };
  const onCardClick = (e) => {
    setActive(e);
    navigate("/booking");
  };
  return (
    <section className="container">
      <Heading data={data.title} click={handleClick} />
      {data.isNav && <Navigation menu={data.nav} click={handleClick} />}
      {data.body && <p className="text-max">{data.body}</p>}

      <div className="card-container">
        {isFiltered
          ? filtered.map((fg) => <Card data={fg} click={onCardClick} key={fg.uid} />)
          : data.services.map((g) => <Card data={g} click={onCardClick} key={g.uid} />)}
      </div>
    </section>
  );
};

export default Container;
