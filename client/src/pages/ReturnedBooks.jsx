import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Button,
  Center,
  Box,
  Text,
  useDisclosure,
  Collapse,
  SimpleGrid,
} from "@chakra-ui/react";

import { userState, loginState, tokenState } from "../users/atom";
import { useRecoilValue } from "recoil";

function ReturnedBooks() {
  const logged = useRecoilValue(loginState);
  const user = useRecoilValue(userState);
  const token = useRecoilValue(tokenState);

  const [returnedBooks, setReturnedBooks] = useState([]);
  const [bookAmount, setBookAmount] = useState();

  const [completionMode, setCompletionMode] = useState("");

  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = () => {
    axios
      .get(`http://localhost:4000/returned`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response.data);
        setReturnedBooks(response.data.result);
        setBookAmount(response.data.amount);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const addBook = (id, title, authors, pages, published, image) => {
    console.log(title, authors, pages, published, image);
    if (!logged) {
      onOpen();
      return;
    }
    axios
      .post(
        "http://localhost:4000/users/lend/returned",
        {
          id: id,
          title: title,
          authors: authors,
          pages: pages,
          published: published,
          image: image,
          username: user[0],
          activationCode: user[1],
          rating: 0,
          review: "",
          completed: 0,
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
      })
      .catch((error) => console.log(error));
  };

  const filterByRating = (ratingOrder) => {
    if (ratingOrder || typeof completionMode === "boolean") {
      axios
        .get(`http://localhost:4000/returned/filter?rating=${ratingOrder}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response) {
          console.log(response.data);
          setReturnedBooks(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  return (
    <div>
      <Center display="flex" flexDir="column">
        <Text fontSize="2xl">Hey {user[0]}</Text>
        <Text fontSize="2xl">
          {bookAmount &&
            `There is ${bookAmount} returned books available for free`}
        </Text>
        <Box display="flex" flexDirection="column" gap={2}>
          <Button
            variant="outline"
            colorScheme="purple"
            onClick={() => onToggle()}
          >
            Open Filter Panel
          </Button>
          <Collapse in={isOpen}>
            <Box display="flex" flexDirection="column" gap={1}>
              <Box display="flex" flexDirection="row" gap={1}>
                <Button
                  color="white"
                  backgroundColor="black"
                  onClick={() => filterByRating("ASC")}
                >
                  Filter by Rating ASC
                </Button>
                <Button
                  color="white"
                  backgroundColor="black"
                  onClick={() => filterByRating("DESC")}
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
          {returnedBooks &&
            returnedBooks.map((book) => (
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
                <Box display="flex" flexDirection="column">
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
                        {book.rating !== "0" ? `Rating: ${book.rating}` : ""}
                      </Text>
                      <Text>{book.review && `Review: ${book.review}`}</Text>
                    </Box>
                  </Box>
                </Box>
                <Button
                  borderRadius="12px"
                  colorScheme="green"
                  onClick={() =>
                    addBook(
                      book.id,
                      book.title,
                      book.authors,
                      book.pages,
                      book.published,
                      book.image
                    )
                  }
                >
                  Add Book
                </Button>
              </Box>
            ))}
        </SimpleGrid>
      </Center>
    </div>
  );
}

export default ReturnedBooks;
