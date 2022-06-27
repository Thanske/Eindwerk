import { Flex } from "@chakra-ui/react";
import Mapbox from "../components/Mapbox";
import Sidebar from "../components/Sidebar";
import Eventlist from "../components/Eventlist";

const dashboard = () => {
  return (
    <Flex color="brand.sbg" m={5} alignItems="center">
      <Sidebar
        className="sidebar"
        background="brand.mbg"
        borderRadius="10px"
        h={733}
        w="15%"
        p={25}
        mr={25}
      />
      <Mapbox
        className="mapbox"
        background="brand.mbg"
        borderRadius="10px"
        h={733}
        w="55%"
        mr={25}
      />
      <Eventlist
        className="eventlist"
        background="brand.mbg"
        borderRadius="10px"
        h={733}
        w="30%"
        p={25}
      />
    </Flex>
  );
};

export default dashboard;
