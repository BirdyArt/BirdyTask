import {
  Box,
  Image,
  Icon,
  Flex,
  Stack,
  Link,
  Heading,
  useBreakpointValue,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { List, X } from "@phosphor-icons/react";
import { useState } from "react";
import Auth from "../auth";
import ColorModeSwitch from "../color-mode-switch";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const color = useColorModeValue("primary.900", "secondary");

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
    >
      <Flex
        align="center"
        justify="center"
        w={20}
        h={20}
        rounded={50}
        display={{ base: "flex", md: "none" }}
        bg="secondary"
      >
        <Image
          display={{ base: "block", md: "none" }}
          h={10}
          src="logo.svg"
          alt="BirdyTask logo"
        />
      </Flex>
      <Heading
        display={{ base: "none", md: "block" }}
        fontSize={52}
        lineHeight={"40px"}
        fontWeight={600}
        pt={1}
        pb={2}
      >
        Birdy Task
      </Heading>
      <Flex
        align="center"
        justify="center"
        display={{ base: "flex", md: "none" }}
      >
        {isMobile ? <ColorModeSwitch /> : null}
        <IconButton
          variant="icon"
          aria-label="Color mode switch"
          color="secondary"
          mb={2}
          onClick={toggle}
          icon={
            isOpen ? (
              <Icon fontSize={32} weight="bold" color={color} as={X} />
            ) : (
              <Icon fontSize={32} weight="bold" color={color} as={List} />
            )
          }
        />
      </Flex>
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
          {isMobile ? <Auth setIsOpen={setIsOpen} /> : null}
          <Link fontSize={22} href={"/"}>
            Backlog
          </Link>
          <Flex
            align="center"
            justify="center"
            w={20}
            h={20}
            rounded={50}
            display={{ base: "none", md: "flex" }}
            bg="secondary"
          >
            <Image
              display={{ base: "none", md: "block" }}
              h={10}
              src="logo.svg"
              alt="BirdyTask logo"
            />
          </Flex>
          <Link fontSize={22} href={"/tasks"}>
            Taskboard
          </Link>
        </Stack>
      </Box>
      {isMobile ? null : (
        <Flex>
          <ColorModeSwitch />
          <Auth />
        </Flex>
      )}
    </Flex>
  );
};

export default NavBar;
