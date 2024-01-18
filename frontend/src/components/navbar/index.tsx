import {
  Box,
  Image,
  Icon,
  Flex,
  Stack,
  Button,
  Link,
  Heading,
} from "@chakra-ui/react";
import { List, X } from "@phosphor-icons/react";
import { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      py={4}
      px={8}
      bg={["secondary", "secondary", "transparent", "transparent"]}
      color={["secondary", "secondary", "primary.900", "primary.900"]}
    >
      <Image
        display={{ base: "block", md: "none" }}
        h={10}
        src="logo.svg"
        alt="BirdyTask logo"
      />
      <Heading
        display={{ base: "none", md: "block" }}
        fontSize={30}
        fontWeight={600}
        color="primary.900"
      >
        Birdy Task
      </Heading>
      <Box display={{ base: "block", md: "none" }} onClick={toggle}>
        {isOpen ? (
          <Icon color="primary.900" fontSize={32} weight="bold" as={X} />
        ) : (
          <Icon color="primary.900" fontSize={32} weight="bold" as={List} />
        )}
      </Box>
      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Stack
          spacing={8}
          align="center"
          justify="center"
          direction={["column", "column", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <Link fontSize={22} href={"/"} color="primary.900">
            Home
          </Link>
          <Image
            display={{ base: "none", md: "block" }}
            h={12}
            src="logo.svg"
            alt="BirdyTask logo"
          />
          <Link fontSize={22} href={"/tasks"} color="primary.900">
            Tasks
          </Link>
          <Button
            display={{ base: "block", md: "none" }}
            size="md"
            rounded="md"
            color="secondary"
            bg="primary.900"
            _hover={{
              bg: "primary.600",
            }}
          >
            Login
          </Button>
        </Stack>
      </Box>
      <Button
        display={{ base: "none", md: "block" }}
        size="md"
        rounded="md"
        color="secondary"
        bg="primary.900"
        _hover={{
          bg: "primary.600",
        }}
      >
        Login
      </Button>
    </Flex>
  );
};

export default NavBar;
