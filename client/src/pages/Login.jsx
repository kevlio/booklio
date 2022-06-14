import {
  Input,
  Button,
  Center,
  Box,
  Stack,
  Heading,
  Text,
  Fade,
  useDisclosure,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { userState, tokenState, loginState } from "../users/atom";

import axios from "axios";

function Login() {
  const [user, setUser] = useRecoilState(userState);
  const [token, setToken] = useRecoilState(tokenState);
  const [logged, setLogged] = useRecoilState(loginState);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const { isOpen, onToggle } = useDisclosure();

  const navigate = useNavigate();

  // POST
  const login = (username, password) => {
    setUser([username, password]);
    axios
      .post("http://localhost:4000/auth/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response);
        setToken(response.data);
        setLogged(true);
        navigate("/account/books");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.message);
        onToggle();
      });
  };

  return (
    <Center height="100vh" alignItems="flex-start">
      <Box flex-direction="column">
        <Box>
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "2xl", md: "4xl" }}
            lineHeight={"110%"}
            color={"var(--chakra-colors-gray-300)"}
            padding="3"
          >
            Welcome back <br />
            <Text as={"span"} color={"green.400"}>
              fellow Owl
            </Text>
          </Heading>
        </Box>
        <Box max-width="250px">
          <Stack>
            <Input
              isRequired
              color="black"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              type="text"
            ></Input>
            <Input
              isRequired
              color="black"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              onKeyPress={(e) => {
                if (e.key === "Enter") login(username, password);
              }}
            ></Input>
            <Button
              type="submit"
              onClick={() => login(username, password)}
              colorScheme="green"
            >
              Login
            </Button>
            <Fade in={isOpen && errorMessage}>
              <Button
                width="100%"
                color="white"
                bg="red.600"
                rounded="md"
                shadow="md"
              >
                {errorMessage}
              </Button>
            </Fade>
          </Stack>
        </Box>
      </Box>
    </Center>
  );
}

export default Login;
