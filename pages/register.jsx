import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box rounded={"lg"} bg={"brand.mbg"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack align={"center"}>
                <Heading
                  fontSize={"4xl"}
                  textAlign={"center"}
                  color={"brand.sbg"}
                >
                  Register
                </Heading>
              </Stack>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      variant={"filled"}
                      {...register("First name", {
                        required: true,
                        maxLength: 80,
                      })}
                      _focus={{ bg: "brand.ca" }}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      variant={"filled"}
                      {...register("Last name", {
                        required: true,
                        maxLength: 100,
                      })}
                      _focus={{ bg: "brand.ca" }}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  variant={"filled"}
                  {...register("Email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  _focus={{ bg: "brand.ca" }}
                />
              </FormControl>
              <FormControl id="confemail" isRequired>
                <FormLabel>Confirm email address</FormLabel>
                <Input
                  type="email"
                  variant={"filled"}
                  {...register("Confirm email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  _focus={{ bg: "brand.ca" }}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    variant={"filled"}
                    {...register("Password", {
                      required: true,
                      min: 8,
                      pattern:
                        /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/i,
                    })}
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
              <FormControl id="confpassword" isRequired>
                <FormLabel>Confirm password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    variant={"filled"}
                    {...register("Confirm password", {
                      required: true,
                      min: 8,
                      pattern:
                        /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/i,
                    })}
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
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
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
              </Stack>
              <Stack pt={6}>
                <Text align={"center"} color={"brand.sbg"}>
                  Already a user?{" "}
                  <Link href="/login" color={"brand.ca"}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;
