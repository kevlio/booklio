import React, { useRef, useEffect, useState } from "react";
import axios from "axios";

import {
  Input,
  Container,
  StatGroup,
  Stat,
  StatLabel,
  StatHelpText,
  StatArrow,
  Icon,
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
  createIcon,
  Collapse,
} from "@chakra-ui/react";

import { userState, loginState, tokenState } from "../users/atom";

import { useRecoilState } from "recoil";

import { useNavigate } from "react-router-dom";

function Books() {
  const [logged, setLogged] = useRecoilState(loginState);
  const [user, setUser] = useRecoilState(userState);
  const [token, setToken] = useRecoilState(tokenState);
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

  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(true);

  const [addedBook, setAddedBook] = useState([]);
  console.log(addedBook);

  const search = () => {
    setShowInfo(false);

    axios
      .get(
        `http://localhost:4000/books/global?volumeSearch=${volumeSearch}&authorSearch=${authorSearch}`
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
    if (!logged) {
      onOpen();
      return;
    }

    axios
      .post(
        "http://localhost:4000/users/lend",
        {
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
      })
      .catch((error) => console.log(error));
  };

  const Arrow = createIcon({
    displayName: "Arrow",
    viewBox: "0 0 72 24",
    path: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
        fill="currentColor"
      />
    ),
  });

  return (
    <Center display="flex" flexDirection="column">
      <Box display="flex" flexDirection="row">
        <Input
          width="50%"
          onChange={(e) => setVolumeSearch(e.target.value)}
          placeholder="Search for books..."
        ></Input>
        <Input
          width="50%"
          onChange={(e) => setAuthorSearch(e.target.value)}
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
      <Collapse in={!logged && isOpen}>
        <Box display="flex" flexDir="column" gap={1} mt={2}>
          <Button fontSize="1sxl">To lend books</Button>
          <Box display="flex" flexDir="row" gap={1}>
            <Button variant="link" onClick={() => navigate("/login")}>
              Log in
            </Button>
            <Text>or</Text>
            <Button variant="link" onClick={() => navigate("/signup")}>
              Sign up
            </Button>
          </Box>
        </Box>
      </Collapse>
      <Collapse in={showInfo}>
        <Container maxW={"3xl"} mt={2}>
          <Stack as={Box} textAlign={"center"} spacing={{ base: 4, md: 6 }}>
            <Heading
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
              lineHeight={"110%"}
              color={"var(--chakra-colors-black-300)"}
            >
              Booklio <br />
              <Text as={"span"} color={"green.400"}>
                e-book movement
              </Text>
            </Heading>
            <Box color={"black"}>
              <Text
                fontSize={{ base: "2xl", sm: "3xl", md: "3xl" }}
                fontWeight={600}
                as={"span"}
                color={"green.400"}
              >
                The Booklio project
                <br />
              </Text>
              We want to give our community education a digital human being
              deserves. Booklio project deliver the world of digital e-books in
              open source format both product and finances. We are extremely
              slim organization, build by programmers and licensing experts . We
              always look for serious contributers from our community. Since we
              don't work for monetary expansion, we work for expansions of
              ideas. {""} <br />
              <Text
                fontWeight={600}
                as={"span"}
                color={"green.400"}
                fontSize="2xl"
              >
                Gradually, then suddenly
              </Text>
              <Text fontSize="2xl" color={"var(--chakra-colors-gray-300)"}>
                Steal the culture.{" "}
              </Text>
            </Box>
            <Box display="flex" flexDirection="column">
              <Text
                as={"span"}
                color={"green.400"}
                fontSize={{ base: "2xl", sm: "3xl", md: "3xl" }}
              >
                Welcome to education in the 21th century
              </Text>
            </Box>
            <Stack
              direction={"column"}
              spacing={3}
              align={"center"}
              alignSelf={"center"}
              position={"relative"}
            >
              {" "}
              <Link href="/signup">
                <Button
                  colorScheme={"green"}
                  bg={"green.400"}
                  rounded={"full"}
                  px={6}
                  _hover={{
                    bg: "green.500",
                  }}
                >
                  Get Started
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant={"link"} colorScheme={"blue"} size={"sm"}>
                  Learn more
                </Button>
              </Link>
              <Box>
                <Icon
                  as={Arrow}
                  w={71}
                  position={"absolute"}
                  right={-71}
                  top={"10px"}
                />
                <Text
                  fontSize={"lg"}
                  fontFamily={"Caveat"}
                  position={"absolute"}
                  right={"-125px"}
                  top={"-15px"}
                  transform={"rotate(10deg)"}
                  color={"var(--chakra-colors-gray-300)"}
                >
                  Become an Owl
                </Text>
              </Box>
            </Stack>
          </Stack>
        </Container>
      </Collapse>
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
              bgImage={`linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url(${
                book.volumeInfo.imageLinks &&
                book.volumeInfo.imageLinks.thumbnail
              })`}
              backgroundSize="cover"
              backgroundRepeat="no-repeat"
              m={2}
              key={book.id}
              border="grey solid 2px"
              borderRadius="14px"
              textColor="white"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              p={2}
              boxShadow="inner"
              mx={2}
              maxWidth="250px"
              // height="350px"
            >
              <Box
                borderTopRadius="12px"
                display="flex"
                flexDir="column"
                // backgroundColor="rgba(0, 0, 0, 0.8)"
              >
                <Text fontSize="2xl" wordBreak="break-word">
                  {book.volumeInfo.title}
                </Text>
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
                        <Text>
                          {book.volumeInfo.averageRating &&
                            `Rating: ${book.volumeInfo.averageRating}`}
                        </Text>
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
                          colorScheme={
                            addedBook.includes(book.id) ? "purple" : "green"
                          }
                          onClick={() => {
                            addBook(
                              book.volumeInfo.title,
                              book.volumeInfo.authors,
                              book.volumeInfo.pageCount,
                              book.volumeInfo.publishedDate,
                              book.volumeInfo.imageLinks
                                ? book.volumeInfo.imageLinks.thumbnail
                                : ""
                            );
                            // setAddedBook([]);
                            setAddedBook((prevBooks) => {
                              return [...prevBooks, book.id];
                            });
                          }}
                        >
                          {addedBook.includes(book.id)
                            ? "Added to My Library"
                            : "Add to My Library"}
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
