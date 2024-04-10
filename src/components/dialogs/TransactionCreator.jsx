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
import { RiArrowLeftSLine, RiArrowRightSLine, RiCalendarLine, RiGroupLine, RiMoneyDollarCircleLine, RiPriceTagLine } from "@remixicon/react";
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
        date: dayjs(),
        src: "",
        tags: new Set(),
        amount: undefined,
        type: 0,
        exr: "NZD",
        desc: "",
    };
}
export default function TransactionCreator({ isOpen, onOpenChange }) {
    const { db } = useContext(AppData);
    const [formData, setFormData] = useState(newFormData());
    const [currentMonth, _currentMonth] = useState(getCurrentMonth());
    const [calendar, _calendar] = useState();
    const [isCalendarOpen, _isCalendarOpen] = useState(false);

    useEffect(() => {
        _calendar(getCalendar(currentMonth));
    }, [currentMonth]);
    let tabs = [
        {
            id: "photos",
            label: "Photos",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
            id: "music",
            label: "Music",
            content:
                "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        },
        {
            id: "videos",
            label: "Videos",
            content:
                "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
    ];

    return (
        <Modal
            classNames={{ wrapper: "overflow-hidden", base: "md:max-h-[80vh]", body: "" }}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            hideCloseButton
            isDismissable={false}
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
                        <ModalHeader>Create New Transaction</ModalHeader>

                        <ScrollShadow hideScrollBar size={10} className="flex-1">
                            <ModalBody>
                                <Popover
                                    placement="bottom"
                                    isOpen={isCalendarOpen}
                                    onOpenChange={(open) => _isCalendarOpen(open)}
                                >
                                    <PopoverTrigger>
                                        <Input
                                            autoComplete="false"
                                            classNames={{ input: "text-left" }}
                                            isReadOnly
                                            label="Date"
                                            value={formData.date.format("LL")}
                                            startContent={
                                                <div className="h-5 flex items-center opacity-70 mr-1">
                                                    <RiCalendarLine className="size-4" />
                                                </div>
                                            }
                                        />
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className="flex flex-row w-full items-center">
                                            <div className="flex-1 font-bold">{`${currentMonth.year} ${currentMonth.month}`}</div>
                                            <Button
                                                isIconOnly
                                                variant="light"
                                                onPress={() => _currentMonth(monthDecrease)}
                                            >
                                                <RiArrowLeftSLine className="size-5" />
                                            </Button>
                                            <Button
                                                isIconOnly
                                                variant="light"
                                                onPress={() => _currentMonth(monthIncrease)}
                                            >
                                                <RiArrowRightSLine className="size-5" />
                                            </Button>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex flex-row w-full  justify-around">
                                                {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((w) => (
                                                    <div className="text-[.8em] w-unit-10 text-center">{w}</div>
                                                ))}
                                            </div>
                                            {calendar?.map((week) => (
                                                <div className="flex flex-row">
                                                    {week?.map((date) => (
                                                        <Button
                                                            isIconOnly
                                                            variant={
                                                                formData.date.date() === date.day ? "flat" : "light"
                                                            }
                                                            color={
                                                                formData.date.date() === date.day
                                                                    ? "primary"
                                                                    : "default"
                                                            }
                                                            onPress={() => {
                                                                _isCalendarOpen(false);
                                                            }}
                                                        >
                                                            <div
                                                                className={`${
                                                                    date.month !== currentMonth.month
                                                                        ? "opacity-50"
                                                                        : ""
                                                                }`}
                                                            >
                                                                {date.day}
                                                            </div>
                                                        </Button>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                                <Autocomplete
                                    label="Source"
                                    autoComplete="false"
                                    allowsCustomValue
                                    startContent={
                                        <div className="h-5 flex items-center opacity-70 mr-1">
                                            <RiGroupLine className="size-4" />
                                        </div>
                                    }
                                >
                                    {[{ key: "Countdown", label: "Countdown" }].map((obj) => (
                                        <AutocompleteItem key={obj.key}>{obj.label}</AutocompleteItem>
                                    ))}
                                </Autocomplete>
                                <Select
                                    aria-label="Tags"
                                    label="Tags"
                                    selectedKeys={formData.tags}
                                    onSelectionChange={(keys) => setFormData((fd) => ({ ...fd, tags: keys }))}
                                    startContent={
                                        <div className="h-5 flex items-center opacity-70 mr-1">
                                            <RiPriceTagLine className="size-4" />
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

                                <Input
                                    label="Amount"
                                    value={formData.username}
                                    autoComplete="false"
                                    onValueChange={(value) =>
                                        setFormData((prevState) => ({ ...prevState, username: value }))
                                    }
                                    startContent={
                                        <div className="h-5 flex items-center opacity-70 mr-1">
                                            <RiMoneyDollarCircleLine className="size-4" />
                                        </div>
                                    }
                                />
                                <div className="flex flex-row gap-3">
                                    <Tabs aria-label="Options">
                                        <Tab key={"expense"} title="expense"></Tab>
                                        <Tab key={"income"} title="income"></Tab>
                                    </Tabs>
                                    <Select aria-label="ExchangeRates" autoComplete="false" />
                                </div>
                                <Textarea label={"Description"} placeholder=" "/>
                            </ModalBody>
                        </ScrollShadow>
                        <ModalFooter className="">
                            <Button variant="flat" onPress={onClose}>
                                {"Cancel"}
                            </Button>
                            <Button color="primary" variant="flat" onPress={async () => {}}>
                                {"Submit"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
