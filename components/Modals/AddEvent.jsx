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
  Select,
  HStack,
  Spacer,
  Text,
  Box,
  useToast,
} from "@chakra-ui/react";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { Toasts } from "../../helpers";
import { useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import { db } from "../../config/firebase_next";

const AddEvent = () => {
  //*Modal control
  const { isOpen, onOpen, onClose } = useDisclosure();
  //*useForm validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({});
  //*Update data on firestore
  const onUpdate = async () => {
    const docRef = doc(db, "events", id);
    const eventUpdate = { ...events, created: serverTimestamp() };
    updateDoc(docRef, eventUpdate);
    //*Alert message for successful update to firestore
    setTimeout(() => {
      alert(
        `Event with id: ${docRef.id} has been updated successfully` +
          JSON.stringify(values, null, 2)
      );
    }, 3000);
  };
  //*Write data to firestore
  const onSubmit = async values => {
    const colRef = collection(db, "events");
    const docRef = await addDoc(colRef, {
      ...values,

      created: serverTimestamp(),

      adres: {
        street: values.street,
        nr: values.nr,
        postal_code: values.postal_code,
        city: values.city,
      },
    });
    //*Alert message for successful write to firestore
    setTimeout(() => {
      alert(
        `Event with id: ${docRef.id} has been added successfully` +
          JSON.stringify(values, null, 2)
      );
    }, 3000);
    onClose();
  };

  return (
    <div>
      <IconButton
        color="brand.sbg"
        aria-label="register"
        icon={<MdAdd size="1.5em" />}
        _hover={{ color: "#56BAE3" }}
        _active={{ color: "#56BAE3" }}
        onClick={onOpen}
      />

      <Modal returnFocusOnClose={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"brand.mbg"}>
          <ModalHeader
            pt={"0px"}
            pb={"5px"}
            fontSize={"4xl"}
            color={"brand.sbg"}
            textAlign={"center"}
          >
            Add Event
          </ModalHeader>
          <Text color={"brand.sbg"} align={"center"}>
            All fields are required*
          </Text>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pt={"0px"}>
              <FormControl isInvalid={errors.organiser}>
                <FormLabel htmlFor="organiser">Organisers Name</FormLabel>
                <Input
                  id="organiser"
                  type="text"
                  variant={"filled"}
                  {...register("organiser", {
                    required: "Is required",
                    minLength: {
                      value: 6,
                      message: "Minimum length is 6",
                    },
                  })}
                  _focus={{ bg: "brand.dc", borderColor: "brand.ca" }}
                  autoFocus
                />
                <FormErrorMessage>
                  {errors.organiser && errors.organiser.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.name}>
                <FormLabel htmlFor="name"> Event name</FormLabel>
                <Input
                  id="name"
                  type="text"
                  variant={"filled"}
                  {...register("name", {
                    required: "Is required",
                    minLength: {
                      value: 6,
                      message: "Minimum length is 6",
                    },
                  })}
                  _focus={{ bg: "brand.dc", borderColor: "brand.ca" }}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.description}>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Input
                  id="description"
                  type="text"
                  resize={"none"}
                  variant={"filled"}
                  {...register("description", {
                    required: "Is required",
                  })}
                  _focus={{ bg: "brand.dc", borderColor: "brand.ca" }}
                />
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.lineup}>
                <FormLabel htmlFor="lineup">Line-up</FormLabel>
                <Input
                  id="lineup"
                  type="text "
                  resize={"none"}
                  variant={"filled"}
                  {...register("lineup", {
                    required: "Is required",
                  })}
                  _focus={{ bg: "brand.dc", borderColor: "brand.ca" }}
                />
                <FormErrorMessage>
                  {errors.lineup && errors.lineup.message}
                </FormErrorMessage>
              </FormControl>

              <Box>
                <HStack>
                  <FormControl isInvalid={errors.street}>
                    <FormLabel htmlFor="street">Street</FormLabel>
                    <Input
                      id="street"
                      type="text"
                      minW={"250px"}
                      variant={"filled"}
                      {...register("street", {
                        required: "Is required",
                      })}
                      _focus={{ bg: "brand.dc", borderColor: "brand.ca" }}
                    />

                    <FormErrorMessage>
                      {errors.street && errors.street.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Spacer />
                  <FormControl isInvalid={errors.nr}>
                    <FormLabel htmlFor="nr">Nr</FormLabel>
                    <Input
                      id="nr"
                      type="number"
                      variant={"filled"}
                      minW={"100px"}
                      {...register("nr", {
                        required: "Is required",
                      })}
                      _focus={{ bg: "brand.dc", borderColor: "brand.ca" }}
                    />
                    <FormErrorMessage>
                      {errors.nr && errors.nr.message}
                    </FormErrorMessage>
                  </FormControl>
                </HStack>
              </Box>

              <Box>
                <HStack>
                  <FormControl isInvalid={errors.postal_code}>
                    <FormLabel htmlFor="postal_code">Postal code</FormLabel>
                    <Input
                      id="postal_code"
                      type="text"
                      // value={event.adres.postalcode}
                      // onChange={e =>
                      //   setEvent({ ...event, postalcode: e.target.value })
                      // }
                      variant={"filled"}
                      minW={"75px"}
                      {...register("postal_code", {
                        required: "is required",
                      })}
                      _focus={{ bg: "brand.dc", borderColor: "brand.ca" }}
                    />
                    <FormErrorMessage>
                      {errors.postal_code && errors.postal_code.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Spacer />
                  <FormControl isInvalid={errors.city}>
                    <FormLabel htmlFor="city">City</FormLabel>
                    <Input
                      id="city"
                      type="text"
                      // value={event.adres.city}
                      // onChange={e =>
                      //   setEvent({ ...event, city: e.target.value })
                      // }
                      minW={"250px"}
                      variant={"filled"}
                      {...register("city", {
                        required: "Is required",
                      })}
                      _focus={{ bg: "brand.dc", borderColor: "brand.ca" }}
                    />

                    <FormErrorMessage>
                      {errors.city && errors.city.message}
                    </FormErrorMessage>
                  </FormControl>
                </HStack>
              </Box>

              <Box>
                <HStack>
                  <FormControl isInvalid={errors.lat}>
                    <FormLabel htmlFor="lat">Latitude</FormLabel>
                    <Input
                      id="lat"
                      type="text"
                      variant={"filled"}
                      {...register("lat", {
                        required: "Is required",
                      })}
                      _focus={{ bg: "brand.dc", borderColor: "brand.ca" }}
                    />
                    <FormErrorMessage>
                      {errors.lat && errors.lat.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Spacer />
                  <FormControl isInvalid={errors.long}>
                    <FormLabel htmlFor="long">Longitude</FormLabel>
                    <Input
                      id="long"
                      type="text"
                      variant={"filled"}
                      {...register("long", {
                        required: "Is required",
                      })}
                      _focus={{ bg: "brand.dc", borderColor: "brand.ca" }}
                    />

                    <FormErrorMessage>
                      {errors.long && errors.long.message}
                    </FormErrorMessage>
                  </FormControl>
                </HStack>
              </Box>

              <Box>
                <HStack>
                  <FormControl isInvalid={errors.start}>
                    <FormLabel htmlFor="start">Start date/time</FormLabel>
                    <Input
                      id="start"
                      type="datetime-local"
                      variant={"filled"}
                      size={"sm"}
                      h={"40px"}
                      borderRadius={"0.375rem"}
                      {...register("start", {
                        required: "Is required",
                      })}
                      _focus={{ bg: "brand.dc", borderColor: "brand.ca" }}
                    />
                    <FormErrorMessage>
                      {errors.start && errors.start.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Spacer />
                  <FormControl isInvalid={errors.price}>
                    <FormLabel htmlFor="price">Price</FormLabel>
                    <InputGroup>
                      <Input
                        id="price"
                        type="number"
                        variant={"filled"}
                        {...register("price", {
                          required: "Is required",
                        })}
                        _focus={{ bg: "brand.dc", borderColor: "brand.ca" }}
                      />
                      <InputRightElement
                        pointerEvents="none"
                        color="brand.sbg"
                        fontSize="1.2em"
                      >
                        €
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.price && errors.price.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Spacer />
                  <FormControl isInvalid={errors.presale_price}>
                    <FormLabel htmlFor="presale_price">Presale</FormLabel>
                    <InputGroup>
                      <Input
                        id="presale_price"
                        type="number"
                        variant={"filled"}
                        {...register("presale_price", {
                          required: "Is required",
                        })}
                        _focus={{ bg: "brand.dc", borderColor: "brand.ca" }}
                      />
                      <InputRightElement
                        pointerEvents="none"
                        color="brand.sbg"
                        fontSize="1.2em"
                      >
                        €
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.presale_price && errors.presale_price.message}
                    </FormErrorMessage>
                  </FormControl>
                </HStack>
              </Box>
              <Box>
                <HStack>
                  <FormControl isInvalid={errors.max_capacity}>
                    <FormLabel htmlFor="max_capacity">Max. capacity</FormLabel>
                    <Input
                      id="max_capacity"
                      type="number"
                      variant={"filled"}
                      {...register("max_capacity", {
                        required: "Is required",
                      })}
                      _focus={{ bg: "brand.dc", borderColor: "brand.ca" }}
                    />
                    <FormErrorMessage>
                      {errors.max_capacity && errors.max_capacity.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Spacer />
                  <FormControl isInvalid={errors.ticket_status}>
                    <FormLabel htmlFor="ticket_status">Ticket status</FormLabel>
                    <Select
                      variant={"filled"}
                      placeholder="Select option"
                      {...register("ticket_status", {
                        required: "Is required",
                      })}
                      _focus={{ bg: "brand.dc", borderColor: "brand.ca" }}
                    >
                      <option value="available">Available</option>
                      <option value="Almost sold out">Almost sold out</option>
                      <option value="Sold out">Sold out</option>
                    </Select>
                    <FormErrorMessage>
                      {errors.ticket_status && errors.ticket_status.message}
                    </FormErrorMessage>
                  </FormControl>
                </HStack>
              </Box>
              <Box>
                <HStack>
                  <FormControl isInvalid={errors.Category}>
                    <FormLabel htmlFor="category">Category</FormLabel>
                    <Select
                      variant={"filled"}
                      placeholder="Select option"
                      {...register("Category", {
                        required: "Is required",
                      })}
                      _focus={{ bg: "brand.dc", borderColor: "brand.ca" }}
                    >
                      <option value="festival">Festival</option>
                      <option value="concert">Concert</option>
                    </Select>
                    <FormErrorMessage>
                      {errors.Category && errors.Category.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Spacer />
                  <FormControl isInvalid={errors.genre}>
                    <FormLabel htmlFor="genre">Genre</FormLabel>
                    <Select
                      variant={"filled"}
                      placeholder="Select option"
                      {...register("genre", {
                        required: "Is required",
                      })}
                      _focus={{ bg: "brand.dc", borderColor: "brand.ca" }}
                    >
                      <option value="punk">Punk</option>
                      <option value="rock">Rock</option>
                      <option value="jazz">Jazz</option>
                      <option value="dance">Dance</option>
                      <option value="pop">Pop</option>
                    </Select>
                    <FormErrorMessage>
                      {errors.genre && errors.genre.message}
                    </FormErrorMessage>
                  </FormControl>
                </HStack>
              </Box>
            </ModalBody>
            <ModalFooter
              pt={"0px"}
              pb={"5px"}
              flexDirection={"column"}
              justifyContent={"center"}
            >
              <Button
                my={4}
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
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddEvent;
