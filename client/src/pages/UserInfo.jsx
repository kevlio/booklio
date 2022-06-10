import React, { useEffect, useState } from "react";
import axios from "axios";
import { userState } from "../users/atom";

import { tokenState } from "../users/atom";

import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Input,
  Button,
  Center,
  Box,
  Text,
  FormControl,
  FormLabel,
  useDisclosure,
} from "@chakra-ui/react";

function UserInfo() {
  const [user, setUser] = useRecoilState(userState);
  const [token, setToken] = useRecoilState(tokenState);

  const [edit, setEdit] = useState(false);

  const [currentUser, setCurrentUser] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  function editMode() {
    setEdit(true);
  }

  function updateUser() {
    const editUser = {
      ...user,
      username: username,
      password: password,
    };
    setUser(editUser);
    setEdit(false);
  }

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios
      .get(`http://localhost:4000/users/${user[0]}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response);
        setCurrentUser(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <Center>
      <Container>
        <Text fontSize="2xl">Hey {currentUser.username}</Text>
        <Button
          colorScheme="purple"
          onClick={() => navigate("/account/books")}
          my={1}
        >
          My books
        </Button>
        <Center>
          <Box
            display="flex"
            flexDirection="column"
            whiteSpace="nowrap"
            textColor="black"
            fontSize="2xl"
            p={2}
            alignItems="flex-start"
          >
            <Box display="flex" flexDirection="row" gap={2}></Box>
            <FormControl isDisabled={!edit} onClick={editMode}>
              <Box
                display="flex"
                flexDirection="row"
                gap={2}
                alignItems="center"
              >
                <Box display="flex" flexDirection="column">
                  <FormLabel>Username</FormLabel>
                  <Input
                    disabled
                    type="text"
                    placeholder="Username"
                    defaultValue={currentUser.username}
                    id={currentUser.username + "user"}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Box>
                <Box display="flex" flexDirection="column">
                  <FormLabel>Activation code</FormLabel>
                  <Input
                    disabled
                    type="text"
                    placeholder="Activation code"
                    defaultValue={currentUser.activation_code}
                    id={currentUser.activation_code + "code"}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                gap={2}
                alignItems="center"
              >
                <Box display="flex" flexDirection="column">
                  <FormLabel>Password</FormLabel>
                  <Input
                    disabled
                    type="password"
                    placeholder="Password"
                    defaultValue={currentUser.password}
                    id={currentUser.password + "password"}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Box>
                <Box display="flex" flexDirection="column">
                  <FormLabel>Password</FormLabel>
                  <Input
                    disabled
                    type="text"
                    placeholder="Email"
                    defaultValue={currentUser.email}
                    id={currentUser.email + "email"}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Box>
              </Box>
            </FormControl>
            <Button
              colorScheme="green"
              alignSelf="center"
              mt={2}
              onClick={updateUser}
            >
              Update User
            </Button>
          </Box>
        </Center>
      </Container>
    </Center>
  );
}

export default UserInfo;
