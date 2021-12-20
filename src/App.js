import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
	ChakraProvider,
	VStack,
	Spacer,
	Grid,
	Spinner,
	HStack,
	useDisclosure,
} from "@chakra-ui/react";
import theme from "./theme";
import "@fontsource/inter/700.css";
import "@fontsource/inter/400.css";
import ProfilePage from "./pages/ProfilePage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useContext } from "react";
import { Web3Context } from "./context/Web3Context";
import OnboardingModal from "./components/OnboardingModal";
import Feed from "./pages/Feed";
import { CreatorsContext } from "./context/CreatorsContext";

function App() {
	const { _, __, onClose } = useDisclosure();

	const web3Context = useContext(Web3Context);
	const creatorsContext = useContext(CreatorsContext);
	const { userRegistered } = creatorsContext;
	const { accountId, evmAddress } = web3Context;

	return (
		<ChakraProvider theme={theme}>
			<Grid
				height="100vh"
				width="100vw"
				templateColumns={["1fr", "1fr 1fr 1fr"]}
			>
				<Spacer display={["none", "block"]} />
				<VStack justifyContent="space-between" spacing={0}>
					<Header />
					<HStack
						width="100%"
						height="100%"
						alignItems="flex-start"
						justifyContent="center"
					>
						{accountId !== null ? (
							// isCheckingUser == true ?
							// <Spinner />
							// :
							userRegistered != null ? (
								userRegistered === true ? (
									<Switch>
										<Route exact path="/">
											<ProfilePage />
										</Route>
										<Route
											exact
											path="/nft/:creator/:address/:id"
										>
											<PostPage />
										</Route>
										<Route
											exact
											path="/nft/marketplace/:creator/:address/:itemId"
										>
											<PostPage />
										</Route>
										<Route exact path="/feed">
											<Feed />
										</Route>
									</Switch>
								) : (
									<OnboardingModal
										accountAddress={evmAddress}
										isOpen={userRegistered === false}
										onClose={onClose}
									/>
								)
							) : null
						) : (
							<>
								<Spinner />
							</>
						)}
					</HStack>
					<Spacer />
					<Footer />
				</VStack>
			</Grid>
		</ChakraProvider>
	);
}

export default App;
