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
import { useEffect, useState } from "react";

export default function Authenticator() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [mode, setMode] = useState(0);

    useEffect(() => {
        onOpen();
    }, []);
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            motionProps={{
                variants: {
                    enter: {
                        scale: 1,
                        opacity: 1,
                        transition: {
                            duration: 0.3,
                            ease: "easeOut",
                        },
                    },
                    exit: {
                        scale: 0.9,
                        opacity: 0,
                        transition: {
                            duration: 0.3,
                            ease: "easeIn",
                        },
                    },
                },
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader></ModalHeader>
                        <ModalBody>
                            <Input label="Username" />
                            <Input label="Password" type="password" />
                        </ModalBody>
                        <ModalFooter>
                            {/* <Button
                                color="default"
                                variant="light"
                                onPress={() => {
                                    if (mode === 0) {
                                        setMode(1);
                                    } else {
                                    }
                                }}
                            >
                                {mode === 0 ? "Register" : "Try HOTARU"}
                            </Button>

                            <Button color="primary" onPress={onClose}>
                                {"Login"}
                            </Button>
                            {mode === 0 ? null : (
                                <Button color="primary" onPress={onClose}>
                                    {"Register"}
                                </Button>
                            )} */}
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
