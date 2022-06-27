import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const handleLogin = e => {
    e.preventDefault();
    console.log(data);
  };
  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box rounded={"lg"} bg={"brand.mbg"} boxShadow={"lg"} p={8}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} color={"brand.sbg"}>
              Login
            </Heading>
          </Stack>
          <form onSubmit={handleLogin}>
            <Stack spacing={4} mt={4}>
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
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox colorScheme={"blackAlpha"} color={"brand.sbg"}>
                    Remember me
                  </Checkbox>
                  <Link color={"brand.ca"}>Forgot password?</Link>
                </Stack>
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
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
