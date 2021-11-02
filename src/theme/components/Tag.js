export default {
    parts: ["container", "label"],
    variants: {
        subtle: {
            container: {
                bg: "brand.100",
                color: "light.200"
            }
        }
    },
    defaultProps: {
        variant: "subtle"
    }
}