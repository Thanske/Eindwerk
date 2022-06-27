import { Flex, Text, Spacer, Image, Box, Link } from "@chakra-ui/react";

const Footer = props => {
  return (
    <Flex {...props}>
      <Text>&copy;2022 Eventify. All rights reserved</Text>
      <Spacer />
      <Box w="100px" h="25px">
        <Link href="https://github.com/Thanske/Prive_JS.git" isExternal>
          <Image src="signature_LN.png" alt="signature" alignSelf="center" />
        </Link>
      </Box>
    </Flex>
  );
};

export default Footer;
