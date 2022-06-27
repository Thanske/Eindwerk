import {
  Flex,
  ButtonGroup,
  IconButton,
  Link,
  Spacer,
  Image,
  Box,
} from "@chakra-ui/react";
import {
  MdHome,
  MdCreate,
  MdFavorite,
  MdLogin,
  MdLogout,
  MdAccountCircle,
} from "react-icons/md";
import AddEvent from "./Modals/AddEvent";
import Login from "./Modals/Login";
import Register from "./Modals/Register";

const Navbar = props => {
  return (
    <Flex {...props}>
      <Box width="150px" height="74.2px">
        <Link href="/">
          <Image
            src="LogoBlueGold.png"
            alt="eventify logo"
            borderRadius="10px"
          />
        </Link>
      </Box>
      <Spacer />
      <ButtonGroup colorScheme="brand.mbg" mr={5}>
        <Link href="/">
          <IconButton
            color="brand.sbg"
            aria-label="home"
            icon={<MdHome size="1.5em" />}
            _hover={{ color: "#56BAE3" }}
            _active={{ color: "#56BAE3" }}
          />
        </Link>
        <AddEvent />

        {/* <Link href="/account">
          <IconButton
            color="brand.sbg"
            aria-label="account"
            icon={<MdAccountCircle size="1.5em" />}
            _hover={{ color: "#56BAE3" }}
            _active={{ color: "#56BAE3" }}
          />
        </Link> */}

        <Register />

        {/* <Link href="/favorite">
          <IconButton
            color="brand.sbg"
            aria-label="favorite"
            icon={<MdFavorite size="1.5em" />}
            _hover={{ color: "#56BAE3" }}
            _active={{ color: "#56BAE3" }}
          />
        </Link> */}

        <Login />

        <Link href="/">
          <IconButton
            color="brand.sbg"
            aria-label="logout"
            icon={<MdLogout size="1.5em" />}
            _hover={{ color: "#56BAE3" }}
            _active={{ color: "#56BAE3" }}
          />
        </Link>
      </ButtonGroup>
    </Flex>
  );
};

export default Navbar;
