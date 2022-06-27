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
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Link,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MdCreate } from "react-icons/md";

const Register = () => {
  //*Modal control
  const { isOpen, onOpen, onClose } = useDisclosure();
  //*Show password control
  const [showPassword, setShowPassword] = useState(false);
  //*useForm validation
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({});
  //*Email and password compare
  const password = useRef({});
  password.current = watch("pass", "");
  const email = useRef({});
  email.current = watch("email", "");

  const onSubmit = values => {
    return new Promise(resolve => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  };

  return (
    <div>
      <IconButton
        color="brand.sbg"
        aria-label="register"
        icon={<MdCreate size="1.5em" />}
        _hover={{ color: "#56BAE3" }}
        _active={{ color: "#56BAE3" }}
        onClick={onOpen}
      />

      <Modal returnFocusOnClose={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"brand.mbg"}>
          <ModalHeader
            fontSize={"4xl"}
            color={"brand.sbg"}
            textAlign={"center"}
          >
            Register
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              <FormControl isInvalid={errors.email}>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  id="email"
                  type="email"
                  variant={"filled"}
                  {...register("email", {
                    required: "Email is required",
                    pattern: /^\S+@\S+$/i,
                  })}
                  _focus={{ bg: "brand.dc", borderColor: "brand.ca" }}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.confemail}>
                <FormLabel htmlFor="confemail">Confirm email address</FormLabel>
                <Input
                  id="confemail"
                  type="email"
                  variant={"filled"}
                  {...register("confemail", {
                    validate: value =>
                      value === email.current || "The emails do not match",
                    required: "Confirm email is required",
                    pattern: /^\S+@\S+$/i,
                  })}
                  _focus={{ bg: "brand.dc", borderColor: "brand.ca" }}
                />
                <FormErrorMessage>
                  {errors.confemail && errors.confemail.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.pass}>
                <FormLabel htmlFor="pass">Password</FormLabel>
                <InputGroup>
                  <Input
                    id="pass"
                    type={showPassword ? "text" : "password"}
                    variant={"filled"}
                    {...register("pass", {
                      required: "Password is required",
                      minLength: { value: 8, message: "Minimum length is 8" },
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm,
                        message:
                          "Password must contain 1 uppercase & 1 lowercase character, 1 number & 1 non-alpha numeric character ",
                      },
                    })}
                    _focus={{ bg: "brand.dc", borderColor: "brand.ca" }}
                  />

                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword(showPassword => !showPassword)
                      }
                      _focus={{ bg: "brand.dc", borderColor: "brand.ca" }}
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.pass && errors.pass.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.confpass}>
                <FormLabel>Confirm password</FormLabel>
                <InputGroup>
                  <Input
                    id="confpass"
                    type={showPassword ? "text" : "password"}
                    variant={"filled"}
                    {...register("confpass", {
                      validate: value =>
                        value === password.current ||
                        "The passwords do not match",
                      required: "Confirm password is required",
                      minLength: { value: 8, message: "Minimum length is 8" },
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm,
                        message:
                          "Password must contain 1 uppercase & 1 lowercase character, 1 number & 1 non-alpha numeric character ",
                      },
                    })}
                    _focus={{ bg: "brand.dc", borderColor: "brand.ca" }}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.confpass && errors.confpass.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter flexDirection={"column"} justifyContent={"center"}>
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                size="lg"
                bg={"brand.sbg"}
                color={"brand.ca"}
                _hover={{
                  bg: "brand.ca",
                  color: "brand.sbg",
                }}
                _focus={{ bg: "brand.ca", color: "brand.sbg" }}
              >
                Register
              </Button>
              <Text my={5} align={"center"} color={"brand.sbg"}>
                Already a user?{" "}
                <Link onClick={onClose} color={"brand.ca"}>
                  Login
                </Link>
              </Text>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Register;
