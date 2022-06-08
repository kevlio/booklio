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
} from "@chakra-ui/react";
import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { isOpen, onToggle } = useDisclosure();

  const navigate = useNavigate();

  // POST
  const login = (username, password) => {
    setUser([username, password]);
    axios
      .post("http://localhost:4000/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const loginb = () => {
    navigate("/myaccount");

    if (true) {
      onToggle();
    }
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
              color="white"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              type="text"
            ></Input>
            <Input
              color="white"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
            ></Input>
            <Button type="submit" onClick={login} colorScheme="green">
              Login
            </Button>
            <Fade in={isOpen}>
              <Button
                width="100%"
                color="white"
                bg="red.600"
                rounded="md"
                shadow="md"
              >
                Incorrect username or password
              </Button>
            </Fade>
          </Stack>
        </Box>
      </Box>
    </Center>
  );
}

export default Login;
