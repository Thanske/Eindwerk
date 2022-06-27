import Footer from "./Footer";
import Navbar from "./Navbar";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Eventify</title>
        <link rel="icon" href="/LogoBlueGoldRo.svg" />
      </Head>
      <Navbar
        className="navbar"
        background="brand.mbg"
        m={5}
        alignItems="center"
        borderRadius="10px"
      />
      <main>{children}</main>

      <Footer
        className="footer"
        background="brand.mbg"
        color="brand.sbg"
        m={5}
        pl={5}
        alignItems="center"
        borderRadius="10px"
        h="50px"
      />
    </>
  );
};

export default Layout;
