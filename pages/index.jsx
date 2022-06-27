import { Flex } from "@chakra-ui/react";
import Mapbox from "../components/Mapbox";
import Sidebar from "../components/Sidebar";
import Eventlist from "../components/Eventlist";
import { useState } from "react";

const IndexPage = () => {
  //*State for custom alert message
  // const [open, setOpen] = useState(false);
  // const [alertMessage, setAlertMessage] = useState("");
  // const [alertType, setAlertType] = useState("succes");
  // const showAlert = (type, msg) => {
  //   setAlertType(type);
  //   setAlertMessage(msg);
  //   setOpen();
  // };

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
        background="brand.sbg"
        borderRadius="10px"
        h={733}
        w="30%"
      />
    </Flex>
  );
};
export default IndexPage;
