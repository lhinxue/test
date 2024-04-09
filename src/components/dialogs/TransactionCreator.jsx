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
} from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { AppData } from "../../App";
import { RiArrowLeftSLine, RiArrowRightSLine, RiCalendarLine } from "@remixicon/react";
import dayjs from "dayjs";

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
export default function TransactionCreator({ isOpen, onOpenChange }) {
    const { db } = useContext(AppData);
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [currentMonth, _currentMonth] = useState(getCurrentMonth());
    const [calendar, _calendar] = useState();
    const [isCalendarOpen, _isCalendarOpen] = useState(false);

    useEffect(() => {
        _calendar(getCalendar(currentMonth));
    }, [currentMonth]);

    return (
        <Modal
            classNames={{ wrapper: "items-center" }}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            hideCloseButton
            isDismissable={false}
            backdrop="blur"
            size={window.innerWidth < 768 ? "full" : "md"}
            // motionProps={{
            //     variants: {
            //         enter: {
            //             scale: 1,
            //             opacity: 1,
            //             transition: {
            //                 duration: 0.3,
            //                 ease: "easeOut",
            //             },
            //         },
            //         exit: {
            //             scale: 0.9,
            //             opacity: 0,
            //             transition: {
            //                 duration: 0.3,
            //                 ease: "easeIn",
            //             },
            //         },
            //     },
            // }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>Create New Transaction</ModalHeader>
                        <ModalBody>
                            <Popover
                                placement="bottom"
                                isOpen={isCalendarOpen}
                                onOpenChange={(open) => _isCalendarOpen(open)}
                            >
                                <PopoverTrigger>
                                    <Input
                                        label="Date"
                                        value={dayjs().format()}
                                        autoComplete="false"
                                        onValueChange={(value) =>
                                            setFormData((prevState) => ({ ...prevState, username: value }))
                                        }
                                        isReadOnly
                                    />
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div className="flex flex-row w-full items-center">
                                        <div className="flex-1 font-bold">{`${currentMonth.year} ${currentMonth.month}`}</div>
                                        <Button isIconOnly variant="light" onPress={() => _currentMonth(monthDecrease)}>
                                            <RiArrowLeftSLine className="size-5" />
                                        </Button>
                                        <Button isIconOnly variant="light" onPress={() => _currentMonth(monthIncrease)}>
                                            <RiArrowRightSLine className="size-5" />
                                        </Button>
                                    </div>
                                    <div className="flex flex-col">
                                        {calendar?.map((week) => (
                                            <div className="flex flex-row">
                                                {week?.map((date) => (
                                                    <Button
                                                        isIconOnly
                                                        variant={"light"}
                                                        onPress={() => {
                                                            _isCalendarOpen(false);
                                                        }}
                                                    >
                                                        <div
                                                            className={`${
                                                                date.month !== currentMonth.month ? "opacity-50" : ""
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
                                value={formData.username}
                                autoComplete="false"
                                onValueChange={(value) =>
                                    setFormData((prevState) => ({ ...prevState, username: value }))
                                }
                            />

                            <Select
                                label="Tag"
                                value={formData.username}
                                autoComplete="false"
                                onValueChange={(value) =>
                                    setFormData((prevState) => ({ ...prevState, username: value }))
                                }
                            />

                            <Input
                                label="Amount"
                                value={formData.username}
                                autoComplete="false"
                                onValueChange={(value) =>
                                    setFormData((prevState) => ({ ...prevState, username: value }))
                                }
                            />
                            <div className="flex flex-row gap-3">
                                <Tabs>
                                    <Tab key={"expense"} title="expense"></Tab>
                                    <Tab key={"income"} title="income"></Tab>
                                </Tabs>
                                <Select
                                    value={formData.username}
                                    autoComplete="false"
                                    onValueChange={(value) =>
                                        setFormData((prevState) => ({ ...prevState, username: value }))
                                    }
                                />
                            </div>
                            <Textarea label={"Description"} />
                        </ModalBody>
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
