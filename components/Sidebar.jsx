import { Box, Checkbox, Stack } from "@chakra-ui/react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../config/firebase_next";
import { useState, useEffect } from "react";

const Sidebar = props => {
  const [events, setEvents] = useState([]);
  //*State for checkbox groups
  const [checkedCategory, setCheckedCategory] = useState([false, false]);
  const [checkedGenre, setCheckedGenre] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  //*Checkbox control
  const allCheckedCategory = checkedCategory.every(Boolean);
  const isIndeterminateCategory =
    checkedCategory.some(Boolean) && !allCheckedCategory;

  const allCheckedGenre = checkedGenre.every(Boolean);
  const isIndeterminateGenre = checkedGenre.some(Boolean) && !allCheckedGenre;

  useEffect(() => {
    const colRef = collection(db, "events");
    const q = query(colRef, orderBy("created", "desc"));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      setEvents(
        querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          created: doc.data().created?.toDate().getTime(),
          // start: doc.data().start?.toDate().getTime(),
          end: doc.data().end?.toDate().getTime(),
        }))
      );
    });
    return unsubscribe;
  }, []);

  return (
    <Box {...props}>
      <>
        <Checkbox
          borderColor={"black"}
          colorScheme={"blackAlpha"}
          isChecked={allCheckedCategory}
          isIndeterminate={isIndeterminateCategory}
          onChange={e =>
            setCheckedCategory([e.target.checked, e.target.checked])
          }
        >
          Category
        </Checkbox>
        <Stack pl={6} mt={1} spacing={1}>
          <Checkbox
            borderColor={"black"}
            colorScheme={"blackAlpha"}
            isChecked={checkedCategory[0]}
            onChange={e =>
              setCheckedCategory([e.target.checked, checkedCategory[1]])
            }
          >
            Festival
          </Checkbox>
          <Checkbox
            borderColor={"black"}
            colorScheme={"blackAlpha"}
            isChecked={checkedCategory[1]}
            onChange={e =>
              setCheckedCategory([checkedCategory[0], e.target.checked])
            }
          >
            Concert
          </Checkbox>
        </Stack>
        <Checkbox
          mt={"20px"}
          borderColor={"black"}
          colorScheme={"blackAlpha"}
          isChecked={allCheckedGenre}
          isIndeterminate={isIndeterminateGenre}
          onChange={e =>
            setCheckedGenre([
              e.target.checked,
              e.target.checked,
              e.target.checked,
              e.target.checked,
              e.target.checked,
            ])
          }
        >
          Genre
        </Checkbox>
        <Stack pl={6} mt={1} spacing={1}>
          <Checkbox
            borderColor={"black"}
            colorScheme={"blackAlpha"}
            isChecked={checkedGenre[0]}
            onChange={e =>
              setCheckedGenre([
                e.target.checked,
                checkedGenre[1],
                checkedGenre[2],
                checkedGenre[3],
              ])
            }
          >
            Pop
          </Checkbox>
          <Checkbox
            borderColor={"black"}
            colorScheme={"blackAlpha"}
            isChecked={checkedGenre[1]}
            onChange={e =>
              setCheckedGenre([
                checkedGenre[0],
                e.target.checked,
                checkedGenre[2],
                checkedGenre[3],
              ])
            }
          >
            Rock
          </Checkbox>

          <Checkbox
            borderColor={"black"}
            colorScheme={"blackAlpha"}
            isChecked={checkedGenre[2]}
            onChange={e =>
              setCheckedGenre([
                checkedGenre[0],
                checkedGenre[1],
                e.target.checked,
                checkedGenre[3],
              ])
            }
          >
            Punk
          </Checkbox>

          <Checkbox
            borderColor={"black"}
            colorScheme={"blackAlpha"}
            isChecked={checkedGenre[3]}
            onChange={e =>
              setCheckedGenre([
                checkedGenre[0],
                checkedGenre[1],
                checkedGenre[2],
                e.target.checked,
              ])
            }
          >
            Jazz
          </Checkbox>
          <Checkbox
            borderColor={"black"}
            colorScheme={"blackAlpha"}
            isChecked={checkedGenre[4]}
            onChange={e =>
              setCheckedGenre([
                checkedGenre[0],
                checkedGenre[1],
                checkedGenre[2],
                checkedGenre[3],
                e.target.checked,
              ])
            }
          >
            Dance
          </Checkbox>
        </Stack>
      </>
    </Box>
  );
};

export default Sidebar;
