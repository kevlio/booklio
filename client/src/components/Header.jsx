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

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: accIsOpen,
    onOpen: accOnOpen,
    onClose: accOnClose,
  } = useDisclosure();

  const navigate = useNavigate();

  const handleLogged = () => {
    if (true) {
    }
  };

  const navigateAdmin = () => {
    // handleLogged();
    navigate("/");
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
          <Link to="/" onClick={navigateAdmin}>
            <Text
              onClick={navigateAdmin}
              fontSize="smaller"
              fontWeight="bold"
              color="black"
              my="-2"
              mb="1"
            >
              communitas in the digital era
            </Text>
          </Link>
        </Box>
        <Icon color="black" icon="emojione:owl" width="50px" height="50px" />
        {/* <GiHedgehog
          size={70}
          color="#48BB78"
          value="admin"
          onDoubleClick={navigateAdmin}
        /> */}
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
          <Link href="/">home</Link>
          <Link href="/books">books</Link>
          <Link href={`${true ? "/account" : "/signup"}`}>{`${
            true ? "account" : "sign up"
          }`}</Link>
          <Link
            href={`${true ? "/account" : "/login"}`}
            onClick={handleLogged}
          >{`${true ? "logout" : "login"}`}</Link>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Header;
