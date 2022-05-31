import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Input,
  Button,
  Center,
  Box,
  Stack,
  Heading,
  Text,
  FormControl,
  Fade,
  useDisclosure,
  Collapse,
  SimpleGrid,
  Image,
  Link,
} from "@chakra-ui/react";

function Account() {
  const [savedBooks, setSavedBooks] = useState([]);
  const [id, setId] = useState("");

  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  const [editDone, setEditDone] = useState(false);

  const editBook = (editByID) => {
    console.log(editByID);
    setId(editByID === id ? "" : editByID);
    setEditDone(true);

    if (editDone) {
      axios
        .put(`http://localhost:4000/books/${editByID}`, {
          title: "putputput",
          // pages: pages,
          // published: published,
          review: "yayayaya",
          completed: 1,
        })
        .then((response) => {
          console.log(response);
          setEditDone(false);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = () => {
    axios
      .get("http://localhost:4000/books")
      .then(function (response) {
        console.log(response.data);
        setSavedBooks(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const removeBook = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:4000/books/${id}`)
      .then(function (response) {
        console.log(response.data);
        getBooks();
        // setSavedBooks(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const completedBook = (id, completed) => {
    console.log(id);
    console.log(completed);
    // const toggleComplete = { completed: 0 ? 1 : 0 };
    const toggle = (completed) => {
      if (completed === 0) return 1;
      if (completed === 1) return 0;
    };

    const toggleComplete = toggle(completed);
    console.log(toggleComplete);
    axios
      .patch(`http://localhost:4000/books/${id}`, { completed: toggleComplete })
      .then((response) => {
        console.log(response.data);
        getBooks();
      })
      .catch((error) => console.log(error));
  };

  console.log(savedBooks);

  return (
    <div>
      <SimpleGrid
        templateColumns={{ sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" }}
        spacing={8}
        my={4}
      >
        {savedBooks &&
          savedBooks.map((book) => (
            <Box
              backgroundColor={book.completed === 1 ? "green.800" : "black"}
              key={book.id}
              border="#48BB78 solid 1px"
              borderRadius="14px"
              textColor="white"
              // whiteSpace="nowrap"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              maxWidth="300px"
              // textAlign="left"
              p={4}
            >
              <p>{book.id}</p>

              <p>{book.title}</p>
              <Collapse in={id === book.id}>
                <Input placeholder="Update title"></Input>
              </Collapse>
              <p>{book.pages}</p>
              <p>{book.published}</p>
              <p>{book.review}</p>
              <Collapse in={id === book.id}>
                <Input placeholder="Write a review"></Input>
              </Collapse>
              <Button
                colorScheme="blue"
                onClick={() => completedBook(book.id, book.completed)}
              >
                Completed
              </Button>
              <Button colorScheme="purple" onClick={() => removeBook(book.id)}>
                Remove book
              </Button>
              <Button colorScheme="pink" onClick={() => editBook(book.id)}>
                Edit symbol, review
              </Button>
            </Box>
          ))}
      </SimpleGrid>
    </div>
  );
}

export default Account;
