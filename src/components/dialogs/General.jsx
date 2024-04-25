import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    ScrollShadow,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { modalStyle, scrollShadowProps } from "../style";

function newFormData(entries) {
    return Object.fromEntries(entries.map((value) => [value, undefined]));
}

export default function General({ title, description, entries = [], isOpen, onOpenChange, onValidate, onSubmit, formEntity }) {
    const [formData, _formData] = useState(newFormData(entries));
    const [formError, _formError] = useState({});

    const updateForm = (key, value) => {
        _formData((prevState) => ({ ...prevState, [key]: value }));
    };

    const updateError = (key, value) => {
        _formError((prevState) => ({ ...prevState, [key]: value }));
    };

    const validateForm = () => {
        _formError({});
        return onValidate(formData, updateError) === 0;
    };

    const submitForm = () => {
        if (validateForm()) onSubmit(formData);
    };

    useEffect(() => {
        if (isOpen) {
            _formData(newFormData(entries));
            _formError({});
        }
    }, [isOpen]);

    useEffect(() => {
        if (formEntity) {
            _formData(formEntity);
        }
    }, [formEntity]);

    return (
        <Modal
            classNames={modalStyle.classNames}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            hideCloseButton
            backdrop="blur"
            size={window.innerWidth < 768 ? "full" : "md"}
            motionProps={modalStyle.motionProps}
        >
            <ModalContent className="h-fit">
                {(onClose) => (
                    <>
                        <ModalHeader>{title}</ModalHeader>
                        <ScrollShadow {...scrollShadowProps}>
                            <ModalBody>

                                <p>{description}</p>
                                {entries.map((entry) => (
                                    <Input
                                        aria-label={entry}
                                        label={entry}
                                        value={formData[entry]}
                                        autoComplete="false"
                                        onValueChange={(value) => updateForm(entry, value)}
                                        errorMessage={formError[entry]}
                                    />
                                ))}
                            </ModalBody>
                        </ScrollShadow>
                        <ModalFooter className="">
                            <Button variant="flat" onPress={onClose}>
                                {"Cancel"}
                            </Button>
                            <Button color="primary" variant="flat" onPress={submitForm}>
                                {"Submit"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
