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

const Reset = () => {
  //*Modal control
  const { isOpen, onOpen, onClose } = useDisclosure();
  //*Show password control
  const [showPassword, setShowPassword] = useState(false);
  //*Form data handeling
  const [data, setData] = useState({ email: "", password: "" });
  const handleLogin = e => {
    e.preventDefault();
    console.log(data);
  };
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
          <ModalHeader
            fontSize={"4xl"}
            color={"brand.sbg"}
            textAlign={"center"}
          >
            Login
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              id="email"
              value={data.email}
              onChange={e => setData({ ...data, email: e.target.value })}
              isRequired
            >
              <FormLabel color={"brand.sbg"}>Email address</FormLabel>
              <Input
                type="email"
                variant={"filled"}
                _focus={{ bg: "brand.ca" }}
                autoFocus
              />
            </FormControl>

            <FormControl
              id="password"
              value={data.password}
              onChange={e => setData({ ...data, password: e.target.value })}
              isRequired
            >
              <FormLabel color={"brand.sbg"}>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  variant={"filled"}
                  _focus={{ bg: "brand.ca" }}
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
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Reset;
