import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import Container from "@components/app/Container";
import { ServicesContext } from "@context/services/ServicesContext";

const Services = () => {
  const { services } = useContext(AppContext);
  const { filtered, filter, isFiltered, cart } = useContext(ServicesContext);
  return (
    <Container
      data={services}
      filter={filter}
      filtered={filtered}
      isFiltered={isFiltered}
      cart={cart}
    />
  );
};

export default Services;
