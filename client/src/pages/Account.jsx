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
import { ImCross } from "react-icons/im";
import { GiReturnArrow } from "react-icons/gi";
import { MdOutlineFileDownloadDone } from "react-icons/md";

function Account() {
  const [savedBooks, setSavedBooks] = useState([]);
  const [id, setId] = useState("");

  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  const [editDone, setEditDone] = useState(false);

  const [review, setReview] = useState("");
  const [title, setTitle] = useState("");

  const editBook = (editByID) => {
    console.log(editByID);
    setId(editByID === id ? "" : editByID);
    setEditDone(true);

    const bookToEdit = savedBooks.filter((book) => {
      return book.id === editByID;
    });

    console.log(bookToEdit);
    console.log(bookToEdit.image);

    if (editDone) {
      axios
        .put(`http://localhost:4000/books/${editByID}`, {
          title: title,
          pages: bookToEdit[0].pages,
          published: bookToEdit[0].published,
          review: review,
          image: bookToEdit[0].image,
          completed: bookToEdit[0].completed,
        })
        .then((response) => {
          console.log(response);
          getBooks();
          setEditDone(false);
          setTitle("");
          setReview("");
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

  const filterComplete = (mode) => {
    axios
      .post(`http://localhost:4000/books/filter`, { filterMode: mode })
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
      <Center>
        <Button onClick={() => filterComplete(0)}>Filter not read</Button>
        <Button onClick={() => filterComplete(1)}>Filter read</Button>
        <Button onClick={() => filterComplete("all")}>See all</Button>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" }}
          spacing={8}
          my={4}
        >
          {savedBooks &&
            savedBooks.map((book) => (
              <Box
                key={book.id}
                backgroundImage={book.image}
                bgImage={`linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url(${book.image})`}
                backgroundColor={book.completed === 1 ? "green.800" : "black"}
                // border="#48BB78 solid 1px"
                border={
                  book.completed === 1 ? "green solid 5px" : "white solid 1px"
                }
                boxShadow="inner"
                borderRadius="14px"
                textColor="white"
                // whiteSpace="nowrap"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                // textAlign="left"
                p={4}
                maxW="220px"
              >
                <Box display="flex" flexDirection="column">
                  <Box alignSelf="flex-end" display="flex" gap={1}>
                    <Box
                      onClick={() => completedBook(book.id, book.completed)}
                      // borderRadius="full"
                      borderRadius="2xl"
                      bgColor="rgba(0, 255, 0, 0.2)"
                      border="black 5px solid"
                    >
                      <MdOutlineFileDownloadDone size={30} color="white" />{" "}
                    </Box>
                    <Box alignSelf="flex-end">
                      <Box
                        onClick={() => removeBook(book.id)}
                        // borderRadius="full"
                        borderRadius="2xl"
                        bgColor="rgba(0, 0, 255, 0.2)"
                        border="black 5px solid"
                      >
                        <GiReturnArrow size={30} color="white" />
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    flexDir="column"
                    justifyContent="space-between"
                  >
                    <Box
                      display="flex"
                      flexDir="column"
                      justifyContent="space-between"
                    >
                      <Text>{book.id}</Text>

                      <Text fontSize="2xl" fontWeight="normal">
                        {book.title}
                      </Text>
                      {/* <Collapse in={id === book.id}>
                    <Input
                      bgColor="black"
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Update title [PREV.VALUE PREWRITTEN]"
                    ></Input>
                  </Collapse> */}
                      <Collapse in={id === book.id}>
                        <Input
                          bgColor="black"
                          onChange={(e) => setReview(e.target.value)}
                          placeholder="Write a review"
                        ></Input>
                      </Collapse>
                    </Box>
                    <Box
                      display="flex"
                      flexDir="column"
                      justifyContent="flex-end"
                    >
                      <Text>{book.authors}</Text>
                      <Text>{book.pages === 0 ? "" : book.pages}</Text>
                      <Text>{book.published}</Text>
                      <Text>{book.review}</Text>
                    </Box>
                  </Box>
                </Box>
                <Button
                  // bgColor="blackAlpha.800"
                  // variant="outline"
                  borderRadius="12px"
                  colorScheme="pink"
                  onClick={() => editBook(book.id)}
                >
                  Leave a Review...
                </Button>
              </Box>
            ))}
        </SimpleGrid>
      </Center>
    </div>
  );
}

export default Account;
