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
  const addBook = (title, pages, published) => {
    console.log(title, pages, published);
    // completed false = 0, completed true = 1
    axios
      .post("http://localhost:4000/books", {
        title: title,
        pages: pages,
        published: published,
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
      <Box display="flex">
        <Input
          color="white"
          onChange={(e) => setVolumeSearch(e.target.value)}
          placeholder="Search for book"
        ></Input>
        <Input
          onChange={(e) => setAuthorSearch(e.target.value)}
          color="white"
          placeholder="Author"
        ></Input>
        <Button onClick={search}>Search icon</Button>
      </Box>
      <SimpleGrid
        templateColumns={{ sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" }}
        spacing={8}
        my={4}
      >
        {books.items &&
          books.items.map((book) => (
            <Box
              key={book.accessInfo.id}
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
              <Text
                fontSize="1xl"
                onClick={() => setTitle(book.volumeInfo.title)}
              >
                {book.volumeInfo.title}
              </Text>
              <Text fontSize="1xl">{book.volumeInfo.averageRating}</Text>
              <Box
                display="flex"
                flexDirection="column"
                onClick={() => setAuthor(book.volumeInfo.authors)}
              >
                {book.volumeInfo.authors &&
                  book.volumeInfo.authors.map((author) => (
                    <Text fontSize="1xl">{author}</Text>
                  ))}
              </Box>
              <Box display="flex" flexDirection="column">
                {book.volumeInfo.categories &&
                  book.volumeInfo.categories.map((category) => (
                    <Text fontSize="1xl">{category}</Text>
                  ))}
              </Box>
              <Text fontSize="1xl">{book.volumeInfo.categories}</Text>
              <Text fontSize="1xl">{book.volumeInfo.pageCount}</Text>
              <Text fontSize="1xl">{book.volumeInfo.publishedDate}</Text>
              <Image
                src={
                  book.volumeInfo.imageLinks &&
                  book.volumeInfo.imageLinks.thumbnail
                }
              ></Image>
              <Link href={book.volumeInfo.infoLink} isExternal>
                <Button colorScheme="blue">More info</Button>
              </Link>
              <Button
                colorScheme="blue"
                onClick={() =>
                  addBook(
                    book.volumeInfo.title,
                    book.volumeInfo.pageCount,
                    book.volumeInfo.publishedDate
                  )
                }
              >
                Add to My Library
              </Button>
              {/* <Text>{book.volumeInfo.subtitle}</Text> */}
              {/* <Text fontSize={12}>{book.volumeInfo.description}</Text> */}
            </Box>
          ))}
      </SimpleGrid>
    </Center>
  );
}

export default Books;
