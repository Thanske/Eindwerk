import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "mapbox-gl/dist/mapbox-gl.css";
import Layout from "../components/Layout.jsx";
import { AuthProvider } from "../context/AuthContext.js";

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "#142A4E",
      },
    }),
  },
  colors: {
    brand: { mbg: "#516C96", sbg: "#142A4E", ca: "#56BAE3", dc: "#FFFFFF" },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
