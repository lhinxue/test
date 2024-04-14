import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Select,
    Autocomplete,
    Tabs,
    Tab,
    Textarea,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    ScrollShadow,
    AutocompleteItem,
    SelectItem,
    Chip,
} from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { AppData } from "../../App";
import {
    RiArrowLeftSLine,
    RiArrowRightSLine,
    RiCalendarLine,
    RiGroupLine,
    RiMoneyDollarCircleLine,
    RiPaletteLine,
    RiPriceTagLine,
    RiTranslate2,
} from "@remixicon/react";
import dayjs from "../../lib/dayjs";
import Apptest from "./text";
import { TRANSITION_EASINGS } from "@nextui-org/framer-transitions";
function getCurrentMonth() {
    const currentDate = dayjs();
    return {
        year: currentDate.year(),
        month: currentDate.month() + 1, // Month is zero-based, so add 1
    };
}
// Function to increase the month by one
function monthIncrease({ year, month }) {
    const nextMonthDate = dayjs(`${year}-${month}-01`).add(1, "month");
    return {
        year: nextMonthDate.year(),
        month: nextMonthDate.month() + 1, // Month is zero-based, so add 1
    };
}
// Function to decrease the month by one
function monthDecrease({ year, month }) {
    const prevMonthDate = dayjs(`${year}-${month}-01`).subtract(1, "month");
    return {
        year: prevMonthDate.year(),
        month: prevMonthDate.month() + 1, // Month is zero-based, so add 1
    };
}

function getCalendar({ year, month }) {
    const firstDayOfMonth = dayjs(`${year}-${month}-01`);
    const lastDayOfMonth = firstDayOfMonth.endOf("month");
    const startOfWeek = firstDayOfMonth.startOf("week");
    const endOfWeek = lastDayOfMonth.endOf("week");
    const weeks = [];
    let currentDay = startOfWeek;
    while (currentDay.isBefore(endOfWeek)) {
        const weekDates = [];
        let dayOfWeek = currentDay;
        // Add each date (month and day) to the weekDates array
        while (dayOfWeek.isBefore(currentDay.endOf("week"))) {
            weekDates.push({
                month: dayOfWeek.month() + 1, // Month is zero-based, so add 1
                day: dayOfWeek.date(),
            });
            dayOfWeek = dayOfWeek.add(1, "day");
        }
        weeks.push(weekDates);
        currentDay = currentDay.add(1, "week");
    }
    console.log(weeks);
    return weeks;
}
function newFormData() {
    return {
        name: "",
        color: "",
    };
}
export default function CreateTag({ isOpen, onOpenChange, onSubmit }) {
    const { tags } = useContext(AppData);
    const [formData, setFormData] = useState(newFormData());
    const [formError, _formError] = useState(newFormData());
    const updateForm = (key, value) => {
        setFormData((prevState) => ({ ...prevState, [key]: value }));
    };
    const updateError = (key, value) => {
        _formError((prevState) => ({ ...prevState, [key]: value }));
    };
    const validateForm = () => {
        _formError(newFormData());
        if (formData.name === "") {
            updateError("name", "Tag name cannot be empty!");
        } else if (tags.findIndex((o) => o.Name === formData.name) !== -1) {
            updateError("name", "Tag name already exists!");
        } else {
            return true;
        }
        return false;
    };

    useEffect(() => {
        if (isOpen) {
            setFormData(newFormData());
            _formError(newFormData());
        }
    }, [isOpen]);
    return (
        <Modal
            classNames={{ wrapper: "overflow-hidden", base: "md:max-h-[80vh] h-fit", body: "" }}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            hideCloseButton
            backdrop="blur"
            size={window.innerWidth < 768 ? "full" : "md"}
            motionProps={{
                variants: {
                    enter: {
                        scale: 1,
                        y: "var(--slide-enter)",
                        opacity: 1,
                        transition: {
                            scale: {
                                duration: 0.4,
                                ease: TRANSITION_EASINGS.ease,
                            },
                            opacity: {
                                duration: 0.4,
                                ease: TRANSITION_EASINGS.ease,
                            },
                            y: {
                                type: "spring",
                                bounce: 0,
                                duration: 0.6,
                            },
                        },
                    },
                    exit: {
                        scale: 1,
                        y: "var(--slide-exit)",
                        opacity: 0,
                        transition: {
                            duration: 0.3,
                            ease: TRANSITION_EASINGS.ease,
                        },
                    },
                },
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>Create New Tag</ModalHeader>

                        <ScrollShadow hideScrollBar size={10} className="flex-1">
                            <ModalBody>
                                <Input
                                    aria-label="Name"
                                    label="Name"
                                    value={formData.name}
                                    autoComplete="false"
                                    onValueChange={(value) => updateForm("name", value)}
                                    startContent={
                                        <div className="h-5 flex items-center opacity-70 mr-1">
                                            <RiTranslate2 className="size-4" />
                                        </div>
                                    }
                                    isInvalid={formError.name !== ""}
                                    errorMessage={formError.name}
                                />
                                <Select
                                    aria-label="Tags"
                                    label="Color"
                                    selectedKeys={formData.tags}
                                    onSelectionChange={(keys) => setFormData((fd) => ({ ...fd, tags: keys }))}
                                    startContent={
                                        <div className="h-5 flex items-center opacity-70 mr-1">
                                            <RiPaletteLine className="size-4" />
                                        </div>
                                    }
                                >
                                    {[
                                        { key: "Food", label: "Food" },
                                        { key: "Electronics", label: "Electronics" },
                                        { key: "Game", label: "Game" },
                                    ].map((obj) => (
                                        <SelectItem key={obj.key} textValue={obj.label} data={{ color: "333" }}>
                                            {obj.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </ModalBody>
                        </ScrollShadow>
                        <ModalFooter className="">
                            <Button variant="flat" onPress={onClose}>
                                {"Cancel"}
                            </Button>
                            <Button
                                color="primary"
                                variant="flat"
                                onPress={async () => {
                                    if (validateForm()) onSubmit(formData);
                                }}
                            >
                                {"Submit"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
