import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Input,
  Button,
  Center,
  Box,
  Text,
  useDisclosure,
  Collapse,
  SimpleGrid,
  Link,
} from "@chakra-ui/react";
import { GiReturnArrow } from "react-icons/gi";
import { MdOutlineFileDownloadDone } from "react-icons/md";

import { userState, tokenState } from "../users/atom";

import { useRecoilValue } from "recoil";

import { useNavigate } from "react-router-dom";

function Account() {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const token = useRecoilValue(tokenState);

  const [savedBooks, setSavedBooks] = useState([]);
  const [id, setId] = useState("");

  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  const [editDone, setEditDone] = useState(false);

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");

  const [ratingOrder, setRatingOrder] = useState("");
  const [completionMode, setCompletionMode] = useState("");

  const [responseMessage, setResponseMessage] = useState();

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = () => {
    setCompletionMode("");
    setRatingOrder("");

    axios
      .get(`http://localhost:4000/${user[0]}/books`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setSavedBooks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (ratingOrder || typeof completionMode === "boolean") {
      console.log("filter");
      axios
        .get(
          `http://localhost:4000/${user[0]}/books?completed=${completionMode}&rating=${ratingOrder}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          console.log(response.data);
          setSavedBooks(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [ratingOrder, completionMode]);

  const returnBook = (id) => {
    console.log(id);
    axios
      .post(
        `http://localhost:4000/users/return`,
        { id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        getBooks();
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const editBook = (editByID) => {
    console.log(editByID);
    setId(editByID === id ? "" : editByID);
    setEditDone(true);

    const bookToEdit = savedBooks.filter((book) => {
      return book.id === editByID;
    });

    if (editDone) {
      axios
        .put(
          `http://localhost:4000/books/${editByID}`,
          {
            title: bookToEdit[0].title,
            authors: bookToEdit[0].authors,
            pages: bookToEdit[0].pages,
            published: bookToEdit[0].published,
            completed: bookToEdit[0].completed,
            review: review,
            rating: Number(rating),
            username: user[0],
            activationCode: user[1],
            image: bookToEdit[0].image,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
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

  const completedBook = (id, completed) => {
    const toggle = (completed) => {
      if (completed === 0) return 1;
      if (completed === 1) return 0;
    };
    const toggleComplete = toggle(completed);

    axios
      .patch(
        `http://localhost:4000/books/${id}`,
        { completed: toggleComplete },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        getBooks();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Center display="flex" flexDir="column">
        <Text fontSize="2xl">Hey {user[0]}</Text>

        <Box display="flex" flexDirection="column" gap={2}>
          <Button
            variant="outline"
            colorScheme="purple"
            onClick={() => navigate("/account/settings")}
          >
            Settings Panel
          </Button>
          <Button
            variant="outline"
            colorScheme="purple"
            onClick={() => onToggle()}
          >
            Open Filter Panel
          </Button>
          <Collapse in={isOpen}>
            <Box display="flex" flexDirection="column" gap={1}>
              <Box
                display="flex"
                flexDirection="row"
                gap={1}
                justifyContent="center"
              >
                <Button bg="green.300" onClick={() => setCompletionMode(false)}>
                  Filter not read
                </Button>
                <Button bg="green.300" onClick={() => setCompletionMode(true)}>
                  Filter read
                </Button>
                <Button bg="green.300" onClick={() => getBooks()}>
                  See all
                </Button>
              </Box>
              <Box display="flex" flexDirection="row" gap={1}>
                <Button
                  color="white"
                  backgroundColor="black"
                  onClick={() => setRatingOrder("ASC")}
                >
                  Filter by Rating ASC
                </Button>
                <Button
                  color="white"
                  backgroundColor="black"
                  onClick={() => setRatingOrder("DESC")}
                >
                  by Rating DESC
                </Button>
              </Box>
            </Box>
          </Collapse>
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
                border={
                  book.completed === 1 ? "green solid 5px" : "white solid 1px"
                }
                boxShadow="inner"
                borderRadius="14px"
                textColor="white"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                p={4}
                maxW="250px"
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Box alignSelf="flex-end" display="flex" gap={1}>
                    <Box
                      onClick={() => completedBook(book.id, book.completed)}
                      borderRadius="2xl"
                      bgColor="rgba(0, 255, 0, 0.2)"
                      border="black 5px solid"
                    >
                      <MdOutlineFileDownloadDone size={30} color="white" />{" "}
                    </Box>
                    <Box alignSelf="flex-end">
                      <Box
                        onClick={() => returnBook(book.id)}
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
                    <Text>{book.id}</Text>
                    <Text fontSize="2xl" fontWeight="normal">
                      {book.title}
                    </Text>

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
                </Box>
                <Box display="flex" flexDir="column">
                  <Text fontSize="1xl">{book.authors}</Text>
                  <Text>{book.pages > 0 ? `Pages: ${book.pages}` : ""}</Text>
                  <Text>
                    {book.published !== "0" ? `${book.published}` : ""}
                  </Text>
                  <Text>{book.review && `My Review: ${book.review}`}</Text>
                  <Text>
                    {book.rating !== 0 ? `My Rating: ${book.rating}` : ""}
                  </Text>
                </Box>
                <Link href={!book.completed && "https://youtu.be/xm3YgoEiEDc"}>
                  <Button
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
