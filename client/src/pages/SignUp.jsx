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
import React, { useState, useRef, useEffect } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

import { GiHedgehog } from "react-icons/gi";

function SignUp() {
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // This feels stupid, redo
  // const [address, setAddress] = useState(["", "", "", ""]);
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState(0);
  const [zipcode, setZipcode] = useState("");

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const inputRef = useRef();
  // useEffect(() => {
  //   inputRef.current.focus();
  // });

  function welcomeFund() {}

  const login = () => {
    const userChecked = users.find((user) => user.username === username);
    if (userChecked) {
      onToggle();
    }
    if (userChecked) return;

    setLogged(true);
    onToggle();

    const newUser = {
      username: username,
      password: password,
      email: email,
      name: {
        firstname: firstname,
        lastname: lastname,
      },
      address: {
        city: city,
        street: street,
        number: number,
        zipcode: zipcode,
      },
      id: Math.floor(Math.random() * 10000),
      role: "user",
      phone: phone,
    };

    navigate("/myaccount");
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
            Let's get started <br />
            <Text as={"span"} color={"green.400"}>
              fellow Owl
            </Text>
          </Heading>
        </Box>
        <Box max-width="250px">
          <Stack>
            <FormLabel color="white">User information</FormLabel>
            <Box display="flex" flexDirection="row">
              <Input
                isRequired
                // ref={inputRef}
                autoComplete="off"
                color="white"
                name="username"
                placeholder="Hogname"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              ></Input>
              <Input
                name="password"
                color="white"
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
            </Box>

            <Box display="flex" flexDirection="row">
              <Input
                name="firstname"
                color="white"
                placeholder="First name"
                type="text"
                onChange={(e) => setFirstname(e.target.value)}
              ></Input>
              <Input
                name="lastname"
                color="white"
                placeholder="Last name"
                type="text"
                onChange={(e) => setLastname(e.target.value)}
              ></Input>
            </Box>

            <Box display="flex" flexDirection="row">
              <Input
                name="email"
                color="white"
                placeholder="Email"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
              <Input
                name="email"
                color="white"
                placeholder="Phone number"
                type="tel"
                onChange={(e) => setPhone(e.target.value)}
              ></Input>
            </Box>

            <FormLabel color="white">User address</FormLabel>
            <Box display="flex" flexDirection="row">
              <Input
                name="street"
                color="white"
                placeholder="Street name"
                type="text"
                onChange={(e) => setStreet(e.target.value)}
              ></Input>
              <Input
                name="street number"
                color="white"
                placeholder="Street number"
                type="number"
                onChange={(e) => setNumber(e.target.value)}
              ></Input>
            </Box>
            <Box display="flex" flexDirection="row">
              <Input
                name="text"
                color="white"
                placeholder="City"
                type="text"
                onChange={(e) => setCity(e.target.value)}
              ></Input>
              <Input
                name="text"
                color="white"
                placeholder="Zipcode"
                type="text"
                onChange={(e) => setZipcode(e.target.value)}
              ></Input>
            </Box>
            <Button
              colorScheme="green"
              type="submit"
              onClick={function () {
                login();
                welcomeFund();
              }}
              rightIcon={<GiHedgehog />}
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