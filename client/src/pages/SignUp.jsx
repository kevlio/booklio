import {
  Input,
  Button,
  Center,
  Box,
  Stack,
  Heading,
  Progress,
  Text,
  Collapse,
  useDisclosure,
  FormLabel,
} from "@chakra-ui/react";

import React, { useState, useRef } from "react";
import axios from "axios";

import { userState, tokenState, loginState } from "../users/atom";

import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [logged, setLogged] = useRecoilState(loginState);
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();

  const [user, setUser] = useRecoilState(userState);
  const [token, setToken] = useRecoilState(tokenState);

  const [username, setUsername] = useState("");
  const [activationCode, setActivationCode] = useState("");

  const activationCodeGenerator = () => {
    let r = (Math.random() + 1).toString(36).substring(7).toUpperCase();
    console.log(r);
    setActivationCode(r);
  };

  // POST
  const addUser = (username, password, email, activationCode) => {
    setUser([username, activationCode]);
    axios
      .post("http://localhost:4000/auth/register", {
        username: username,
        password: password,
        email: email,
        activationCode: activationCode,
      })
      .then((response) => {
        console.log(response);
        setToken(response.data);
        setLogged(true);
        navigate("/account/settings");
      })
      .catch((error) => console.log(error));
  };

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const inputRef = useRef();
  // useEffect(() => {
  //   inputRef.current.focus();
  // });

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
            Let's get started <br />
            <Text as={"span"} color={"green.400"}>
              fellow Owl
            </Text>
          </Heading>
        </Box>
        <Box max-width="250px">
          <Stack>
            <FormLabel>User information</FormLabel>
            <Box display="flex" flexDirection="column">
              <Box display="flex">
                <Input
                  isRequired
                  // ref={inputRef}
                  color="black"
                  autoComplete="off"
                  name="username"
                  placeholder="Username"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                ></Input>
                <Input
                  isRequired
                  // ref={inputRef}
                  color="black"
                  autoComplete="off"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></Input>
              </Box>
              <Box display="flex">
                <Input
                  isRequired
                  // ref={inputRef}
                  color="black"
                  autoComplete="off"
                  name="email"
                  placeholder="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                ></Input>
                <Input
                  isRequired
                  // ref={inputRef}
                  color="black"
                  autoComplete="off"
                  name="activation"
                  placeholder="Activation code"
                  type="text"
                  defaultValue={activationCode}
                  onChange={(e) => setActivationCode(e.target.value)}
                ></Input>
              </Box>
            </Box>
            <Button>Don't have a activation code? Click here!</Button>
            <Box display="flex">
              <Input placeholder="Social security number" width="60%"></Input>
              <Button width="40%" onClick={activationCodeGenerator}>
                Get code
              </Button>
            </Box>
            <Text></Text>
            <Button
              colorScheme="green"
              type="submit"
              onClick={function () {
                addUser(username, password, email, activationCode);
              }}
            >
              Sign up
            </Button>
            <Collapse in={isOpen}>
              <Button bg="red" color="white" width="100%">
                User already exist, please choose another one
              </Button>
            </Collapse>
            <Progress value={20} size="xs" colorScheme="pink" />
          </Stack>
        </Box>
      </Box>
    </Center>
  );
}

export default SignUp;
