import {
  Box,
  Heading,
  Text,
  HStack,
  Spacer,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
} from "@chakra-ui/react";
import {
  MdDelete,
  MdModeEdit,
  MdStarOutline,
  MdStar,
  MdSearch,
} from "react-icons/md";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../config/firebase_next";
import { useState, useEffect } from "react";
import EditEvent from "./Modals/EditEvent";

const Eventlist = props => {
  //*Events state
  const [events, setEvents] = useState([]);
  //*Search state
  const [searchInput, setSearchInput] = useState("");
  //*Favorite button state
  const [favorite, setFavorite] = useState(false);
  //*Get events from firestore
  useEffect(() => {
    const colRef = collection(db, "events");
    const q = query(colRef, orderBy("start", "asc"));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      setEvents(
        querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          //*Converting firestore timestamp to epoch
          // created: doc.data().created?.toDate().getTime(),
          // start: doc.data().start?.toDate().getTime(),
          // end: doc.data().end?.toDate().getTime(),
        }))
      );
    });
    return unsubscribe;
  }, []);
  //*Delete event function
  const deleteEvent = async (id, e) => {
    e.stopPropagation();
    const docRef = doc(db, "events", id);
    await deleteDoc(docRef);
    //*Alert message on success
    setTimeout(() => {
      alert(`Event with id: ${docRef.id} has been deleted successfully`);
    }, 3000);
  };
  //*HandleChange for search
  const handleChange = e => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  //*Filter on search
  if (searchInput.length > 0) {
    console.log(searchInput);
    events.filter(event => {
      return event.name.match;
    });
  }

  return (
    <Box {...props} overflow={"hidden"} overflowY={"auto"}>
      <InputGroup mb={"20px"}>
        <InputLeftElement pointerEvents="none">
          <MdSearch size="1.5em" color="gray.300" />
        </InputLeftElement>
        <Input
          className="eventlist-search"
          type={"search"}
          bg={"brand.dc"}
          placeholder={"Search..."}
          onChange={handleChange}
          value={searchInput}
        />
      </InputGroup>
      <>
        {events &&
          events.map(event => (
            <Link
              key={event.id}
              href={`events/${event.id}`}
              _hover={{ textDecoration: "none" }}
            >
              <Box
                position={"relative"}
                bg={"brand.mbg"}
                color={"brand.ca"}
                border={"1px solid black"}
                borderRadius={"10px"}
                px={"20px"}
                py={"10px"}
                mb={"10px"}
                _hover={{
                  color: "brand.sbg",
                  bg: "brand.ca",
                }}
              >
                <HStack>
                  <Heading as={"h3"} size={"md"} minW="33%">
                    {event.name}
                  </Heading>
                  <Spacer />
                  <Text mr={"30px"} minW="33%">
                    {event.adres.postal_code} {event.adres.city}
                  </Text>
                  <Spacer />
                  <Text minW="33%">{event.ticket_status}</Text>
                </HStack>

                <HStack mt={"10px"}>
                  <Text minW="59%">
                    {"Start: " +
                      new Date(event.start).toLocaleString("nl-NL", {
                        dateStyle: "long",
                        timeStyle: "short",
                      })}
                  </Text>
                  <Spacer />
                  <Text minW="41%">{"Genre: " + event.genre}</Text>
                </HStack>
                <IconButton
                  position={"absolute"}
                  top={"0.5"}
                  right={"0.5"}
                  variant={"ghost"}
                  color="brand.sbg"
                  aria-label="delete item"
                  icon={<MdDelete size="1.5em" />}
                  _hover={{ color: "#brand.sbg" }}
                  _active={{ color: "brand.mbg" }}
                  onClick={e => deleteEvent(event.id, e)}
                />
                <EditEvent />
                <IconButton
                  position={"absolute"}
                  bottom={"0.5"}
                  right={"0.5"}
                  variant={"ghost"}
                  color="brand.sbg"
                  aria-label="delete item"
                  icon={
                    favorite ? (
                      <MdStar size="1.5em" />
                    ) : (
                      <MdStarOutline size="1.5em" />
                    )
                  }
                  _hover={{ color: "#brand.sbg" }}
                  _active={{ color: "brand.mbg" }}
                  onClick={() => setFavorite(favorite => !favorite)}
                />
              </Box>
            </Link>
          ))}
      </>
    </Box>
  );
};

export default Eventlist;
