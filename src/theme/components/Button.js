export default {
    baseStyle: {
        transition: "box-shadow .3s ease-out",
    },
    variants: {  
        inverted: {
            bg: "brand.200",
            color: "brand.100",
            boxShadow: "0 0 0 0 #007aff26",
            _hover: {
                boxShadow: "0 0 0 .25rem #007aff26",
                bg: "brand.200"
            }
        },
        solid: {
            bg: "brand.100",
            color: "light.100",
            boxShadow: "0 0 0 0 #007aff",
            _hover: {
                boxShadow: "0 0 0 .25rem #007aff",
                bg: "brand.100"
            },
            _active: {
                bg: "brand.100"
            }
        },
        icon: {
            color: "brand.100",
            bg: "light.200"
        }
    }
}