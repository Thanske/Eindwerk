import { useState } from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
const SearchBar = props => {
  const { data } = props;
  const [searchInput, setSearchInput] = useState("");
  const events = [...data];
  const handleChange = e => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  if (searchInput.length > 0) {
    events.filter(event => {
      return event.name.match(searchInput);
    });
  }
  return (
    <>
      <pre color="white">{JSON.stringify(events)}</pre>
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
    </>
  );
};

export default SearchBar;
