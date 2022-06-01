import React, { useRef, useEffect, useState } from "react";
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
  SimpleGrid,
  Image,
  Link,
} from "@chakra-ui/react";

const key = "AIzaSyAW9L7jgxCZQhN4OM1WmXdG9sBicXDDuDc";
// AIzaSyAW9L7jgxCZQhN4OM1WmXdG9sBicXDDuDc
// https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey
function Books() {
  // Search
  const [volumeSearch, setVolumeSearch] = useState("");
  const [authorSearch, setAuthorSearch] = useState("");

  // Result
  const [books, setBooks] = useState([]);

  // POST
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState(0);
  const [published, setPublished] = useState("");

  // const [post, setPost] = useState({});

  console.log(author);
  // etc etc

  // Fetch by Search

  const search = () => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${volumeSearch}+$inauthor:${authorSearch}&key=${key}`
      )
      .then((res) => {
        setBooks(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  // POST
  const addBook = (title, authors, pages, published, image) => {
    console.log(title, authors, pages, published, image);
    // completed false = 0, completed true = 1
    axios
      .post("http://localhost:4000/books", {
        title: title,
        authors: authors,
        pages: pages,
        published: published,
        image: image,
        review: "",
        completed: 0,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  console.log(books);

  return (
    <Center display="flex" flexDirection="column">
      <Box display="flex" flexDirection="row">
        <Input
          width="50%"
          color="white"
          onChange={(e) => setVolumeSearch(e.target.value)}
          placeholder="Search for books..."
        ></Input>
        <Input
          width="50%"
          onChange={(e) => setAuthorSearch(e.target.value)}
          color="white"
          placeholder="Author..."
        ></Input>
        <Button
          colorScheme="green"
          onClick={search}
          width="max-content"
          px={10}
        >
          Search for books
        </Button>
      </Box>
      <SimpleGrid
        templateColumns={{ sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" }}
        spacing={8}
        my={4}
      >
        {books.items &&
          books.items.map((book) => (
            <Box
              backgroundImage={
                book.volumeInfo.imageLinks &&
                book.volumeInfo.imageLinks.thumbnail
              }
              backgroundSize="cover"
              backgroundRepeat="no-repeat"
              m={2}
              key={book.accessInfo.id}
              border="grey solid 2px"
              borderRadius="14px"
              textColor="white"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              p={2}
              boxShadow="inner"
              mx={2}
            >
              <Box
                borderTopRadius="12px"
                display="flex"
                flexDir="column"
                backgroundColor="rgba(0, 0, 0, 0.8)"
              >
                <Text fontSize="2xl" wordBreak="break-word">
                  {book.volumeInfo.title.split(" ").slice(0, 0)}
                </Text>
                <Text fontSize="2xl" wordBreak="break-word">
                  {book.volumeInfo.title.split(" ").slice(0, 1)}
                </Text>
                <Text fontSize="2xl" wordBreak="break-word">
                  {book.volumeInfo.title.split(" ").slice(1, 2)}
                </Text>
                <Text fontSize="2xl">{book.volumeInfo.averageRating}</Text>

                <Box display="flex" flexDirection="column">
                  {book.volumeInfo.categories &&
                    book.volumeInfo.categories.map((category) => (
                      <Text fontSize="1xl">{category}</Text>
                    ))}
                </Box>
              </Box>
              <Box>
                <Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    gap={1}
                    backgroundColor="rgba(0, 0, 0, 0.8)"
                    py={2}
                    borderBottomRadius="12px"
                  >
                    <Box>
                      <Box
                        mx={2}
                        display="flex"
                        flexDir="column"
                        alignItems="flex-start"
                        minW="220px"
                      >
                        <Text fontWeight="thin"> Authors: </Text>
                        <Box
                          display="flex"
                          flexDir="column"
                          whiteSpace="nowrap"
                          alignItems="flex-start"
                          textDecor="underline"
                        >
                          {book.volumeInfo.authors &&
                            book.volumeInfo.authors.map((author) => (
                              <Text fontSize="1xl" fontWeight="hairline">
                                {author}
                              </Text>
                            ))}
                        </Box>
                        <Text fontSize="md" fontWeight="thin">
                          Pages: {book.volumeInfo.pageCount}
                        </Text>
                        <Text
                          fontSize="md"
                          fontWeight="thin"
                          minW="max-content"
                        >
                          Edition published: {book.volumeInfo.publishedDate}
                        </Text>
                      </Box>
                      <Box
                        display="flex"
                        flexDir="column"
                        gap={1}
                        alignItems="center"
                      >
                        <Link
                          href={book.volumeInfo.infoLink}
                          isExternal
                          width="95%"
                        >
                          <Button colorScheme="blue" width="100%">
                            More info
                          </Button>
                        </Link>
                        <Button
                          width="95%"
                          colorScheme="green"
                          onClick={() =>
                            addBook(
                              book.volumeInfo.title,
                              book.volumeInfo.authors,
                              book.volumeInfo.pageCount,
                              book.volumeInfo.publishedDate,
                              book.volumeInfo.imageLinks.thumbnail
                            )
                          }
                        >
                          Add to My Library
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
      </SimpleGrid>
    </Center>
  );
}

export default Books;
