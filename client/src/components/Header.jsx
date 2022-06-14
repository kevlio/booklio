import React, { useState } from "react";

import { useRecoilState, useResetRecoilState } from "recoil";
import { GiHedgehog } from "react-icons/gi";
import {
  AiOutlineMenu as MenuIcon,
  AiOutlineClose as CloseIcon,
} from "react-icons/ai";
import { Stack, Box, Text, Link, Flex, useDisclosure } from "@chakra-ui/react";
// import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

import { useNavigate } from "react-router-dom";

import { Icon } from "@iconify/react";

import { userState, tokenState, loginState } from "../users/atom";

const Header = () => {
  const [user, setUser] = useRecoilState(userState);
  const [token, setToken] = useRecoilState(tokenState);
  const [logged, setLogged] = useRecoilState(loginState);

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: accIsOpen,
    onOpen: accOnOpen,
    onClose: accOnClose,
  } = useDisclosure();
  const navigate = useNavigate();

  const handleLogged = () => {
    if (logged) {
      setLogged(false);
      setToken("");
      setUser("");
    }
  };

  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  return (
    <Flex
      fontWeight="semibold"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={8}
      bg={["primary.500", "primary.500", "transparent", "transparent"]}
      color={["black", "black", "primary.700", "primary.700"]}
    >
      <Box display="flex" justifyContent="column" alignItems="center">
        <Box>
          <Link href="/">
            <Text fontSize="3xl" fontWeight="bold" pr={2}>
              Booklio
            </Text>
          </Link>
          <Text
            fontSize="smaller"
            fontWeight="bold"
            color="black"
            my="-2"
            mb="1"
          >
            communitas in the digital era
          </Text>
        </Box>
        <Icon color="black" icon="emojione:owl" width="50px" height="50px" />
      </Box>
      <Box
        display={{ base: "block", md: "none" }}
        color="black"
        onClick={() => toggleMenu()}
      >
        {menuIsOpen ? <CloseIcon size={50} /> : <MenuIcon size={40} />}
      </Box>
      <Box
        display={{ base: menuIsOpen ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
        color="black"
      >
        <Stack
          spacing={8}
          align="flex-end"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
          fontSize="2xl"
        >
          <Link href="/books">books</Link>
          <Link href="/returned">community collection</Link>
          <Link href={`${logged ? "/account/books" : "/signup"}`}>{`${
            logged ? "my account" : "sign up"
          }`}</Link>
          <Link
            href={`${logged ? "/account/books" : "/login"}`}
            onClick={handleLogged}
          >{`${logged ? "logout" : "login"}`}</Link>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Header;
