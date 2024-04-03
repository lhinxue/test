import logo from "./logo.svg";
import "./App.css";
import { authenticate, authenticateUser, createTestUser, testfetch } from "./providers/production";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
} from "@nextui-org/react";
import { useEffect } from "react";
import Authenticator from "./components/Authenticator";

function App() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    useEffect(() => {
        onOpen();
    }, []);
    return (
        <div className="App">
            <Authenticator />
        </div>
    );
}

export default App;
