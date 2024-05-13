import { Icon, IconButton, useColorMode } from "@chakra-ui/react";
import { Sun, MoonStars } from "@phosphor-icons/react";

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      variant="icon"
      aria-label="Color mode switch"
      color="secondary"
      icon={
        colorMode === "light" ? (
          <Icon
            fontSize={32}
            weight="bold"
            color="primary.900"
            as={MoonStars}
          />
        ) : (
          <Icon fontSize={32} weight="bold" as={Sun} />
        )
      }
      onClick={toggleColorMode}
      mr={2}
      mb={2}
    />
  );
};

export default ColorModeSwitch;
