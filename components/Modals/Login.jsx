import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Checkbox,
  Link,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { MdLogin } from "react-icons/md";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const LoginModal = () => {
  //*Modal control
  const { isOpen, onOpen, onClose } = useDisclosure();
  //*Show password control
  const [showPassword, setShowPassword] = useState(false);
  //*Form data handeling
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [isLogginIn, setIsLogginIn] = useState(true);
  const { login, signup, currentUser } = useAuth();
  console.log(currentUser);

  async function handleLogin() {
    if (!data.email || !data.password) {
      setError(alert("Please enter email and password"));
      return;
    }
    if (isLogginIn) {
      try {
        await login(data.email, data.password);
      } catch (err) {
        setError("Incorrect email and password");
      }
      return;
    }
    await signup(data.email, data.password);
  }

  return (
    <div>
      <IconButton
        color="brand.sbg"
        aria-label="login"
        icon={<MdLogin size="1.5em" />}
        _hover={{ color: "#56BAE3" }}
        _active={{ color: "#56BAE3" }}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"brand.mbg"}>
          <form onSubmit={handleLogin}>
            <ModalHeader
              fontSize={"4xl"}
              color={"brand.sbg"}
              textAlign={"center"}
            >
              Login
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel htmlFor="email" color={"brand.sbg"}>
                  Email address
                </FormLabel>
                <Input
                  id="email"
                  type="email"
                  variant={"filled"}
                  value={data.email}
                  onChange={e => setData({ ...data, email: e.target.value })}
                  _focus={{ bg: "brand.dc", borderColor: "brand.ca" }}
                  autoFocus
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel color={"brand.sbg"}>Password</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    value={data.password}
                    onChange={e =>
                      setData({ ...data, password: e.target.value })
                    }
                    type={showPassword ? "text" : "password"}
                    variant={"filled"}
                    _focus={{ bg: "brand.dc", borderColor: "brand.ca" }}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword(showPassword => !showPassword)
                      }
                      _focus={{ bg: "brand.ca" }}
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Stack
                pt={5}
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox colorScheme={"blackAlpha"} color={"brand.sbg"}>
                  Remember me
                </Checkbox>
                <Link onClick={onClose} color={"brand.ca"}>
                  Forgot password?
                </Link>
              </Stack>
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Button
                type="submit"
                bg={"brand.sbg"}
                color={"brand.ca"}
                _hover={{
                  bg: "brand.ca",
                  color: "brand.sbg",
                }}
              >
                Login
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LoginModal;
