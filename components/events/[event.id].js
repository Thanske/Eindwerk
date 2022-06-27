import { Box, Heading } from "@chakra-ui/react/dist/declarations/src";

const Detail = ({ event: { id } }) => {
  return (
    <Box>
      <Heading>Event detail</Heading>
    </Box>
  );
};
export default Detail;

// export const getStaticPaths = async () => {
//   const {
//     data: { drinks: cocktails },
//   } = await axios(
//     "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic"
//   );
//   return {
//     paths: cocktails.map(({ idDrink }) => ({ params: { idDrink } })),
//     // paths: [
//     //   { params: { idDrink: "12560" } },
//     //   { params: { idDrink: "12562" } },
//     //   { params: { idDrink: "12862" } },
//     // ],
//     //toekomstige data ook mee opnemen
//     fallback: "blocking",
//   };
// };

// export const getStaticProps = async ctx => {
//   const {
//     params: { id },
//   } = ctx;
//   const {
//     data: { events },
//   } = await `${id}`;

//   return {
//     props: {
//       cocktail: events[0],
//       revalidate: 1,
//     },
//   };
// };
