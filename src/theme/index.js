import { extendTheme, theme as base } from "@chakra-ui/react";

const inputSelectStyles = {
  variants: {
    outline: {
      field: {
        _focus: {
          borderColor: "brand.200",
          boxShadow: "none",
        },
      },
    },
  },
};

const theme = extendTheme({
  colors: {
    brand: {
      50: "#fff3de",
      100: "#f9ddb7",
      200: "#f2c78d",
      300: "#ebb160",
      400: "#e69a35",
      500: "#cc811b",
      600: "#9f6414",
      700: "#71470c",
      800: "#452b03",
      900: "#1c0d00",
    },
  },
  fonts: {
    heading: `Oswald, ${base.fonts?.heading}`,
    body: `League Spartan, ${base.fonts?.body}`,
  },
  components: {
    Input: { ...inputSelectStyles },
    NumberInput: { ...inputSelectStyles },
    Select: { ...inputSelectStyles },
  },
});

export default theme;
