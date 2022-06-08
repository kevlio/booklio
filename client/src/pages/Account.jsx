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

import { userState } from "../users/atom";

import { useRecoilState, useRecoilValue } from "recoil";

function Account() {
  const [user, setUser] = useRecoilState(userState);
  console.log(user);

  const [savedBooks, setSavedBooks] = useState([]);
  const [id, setId] = useState("");

  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  const [editDone, setEditDone] = useState(false);

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");

  // Släp review, fixa
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
          username: user[0],
          activationCode: user[1],
          title: bookToEdit[0].title,
          authors: bookToEdit[0].authors,
          pages: bookToEdit[0].pages,
          published: bookToEdit[0].published,
          review: review,
          rating: rating,
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
      .get(`http://localhost:4000/books/${user[0]}/${user[1]}`)
      .then(function (response) {
        console.log(response.data);
        setSavedBooks(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  // query strings &
  // Korrekt användning av post?
  // /books?amount=20&startsWith=a
  // Byta till get med query
  const filterComplete = (mode) => {
    axios
      .post(`http://localhost:4000/books/filter`, {
        filterMode: mode,
        username: user[0],
        activationCode: user[1],
      })
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
      <Center display="flex" flexDir="column">
        <Text fontSize="2xl">Hey {user[0]}</Text>
        <Box display="flex" gap={2}>
          <Button onClick={() => filterComplete(0)}>Filter not read</Button>
          <Button onClick={() => filterComplete(1)}>Filter read</Button>
          <Button onClick={() => filterComplete("all")}>See all</Button>
          <Button
            color="white"
            backgroundColor="black"
            onClick={() => filterComplete("all")}
          >
            Filter by Author
          </Button>
          <Button
            color="white"
            backgroundColor="black"
            onClick={() => filterComplete("all")}
          >
            Filter by Rating
          </Button>
        </Box>
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

                      <Text
                        fontSize="2xl"
                        fontWeight="normal"
                        // backgroundColor="black"
                        // borderRadius="12px"
                        // p={1}
                      >
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
                        <Input
                          type="number"
                          bgColor="black"
                          onChange={(e) => setRating(e.target.value)}
                          placeholder="Rating 1-5"
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
                      <Text>
                        {book.rating ? `My Rating: ${book.rating}` : ""}
                      </Text>
                      <Text>{book.review && `My Review: ${book.review}`}</Text>
                    </Box>
                  </Box>
                </Box>
                <Link href={!book.completed && "https://youtu.be/xm3YgoEiEDc"}>
                  <Button
                    // bgColor="blackAlpha.800"
                    // variant="outline"
                    borderRadius="12px"
                    colorScheme={book.completed ? "green" : "purple"}
                    onClick={() => book.completed && editBook(book.id)}
                  >
                    {book.completed
                      ? !book.review
                        ? "Leave a Review"
                        : "Thanks for feedback"
                      : "Open book"}
                  </Button>
                </Link>
              </Box>
            ))}
        </SimpleGrid>
      </Center>
    </div>
  );
}

export default Account;
