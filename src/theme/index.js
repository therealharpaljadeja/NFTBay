import { extendTheme } from "@chakra-ui/react";
import Heading from "./components/Heading";
import Button from "./components/Button";
import Tag from "./components/Tag";
import Input from "./components/Input";
import Spinner from "./components/Spinner";


const overrides = {
    styles: {
        global: {
            body: {
                fontFamily: "Inter !important"
            }
        }
    },
    colors: {
        brand: {
            100: "#aa00ff",
            200: "#aa00ff26"
        },
        light: {
            100: "#ffffffe6",
            200: "#ffffff"
        },
        black: {
            100: "#000000",
            150: "#00000004",
            200: "#00000005",
            300: "#00000012",
            400: "#00000066",
            500: "#00000099",
            600: "#000000cc",
            700: "#000000e6"
        }
    },
    components: {
        Heading,
        Button,
        Tag,
        Input,
        Spinner
    }
} 

export default extendTheme(overrides);