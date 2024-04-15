import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Select,
    Autocomplete,
    Tabs,
    Tab,
    Textarea,
    ScrollShadow,
    AutocompleteItem,
    SelectItem,
} from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { AppData } from "../../App";
import {
    RiArrowLeftSLine,
    RiArrowRightSLine,
    RiCalendarLine,
    RiGroupLine,
    RiMoneyDollarCircleLine,
    RiPriceTagLine,
} from "@remixicon/react";
import dayjs from "../../lib/dayjs";
import { TRANSITION_EASINGS } from "@nextui-org/framer-transitions";
import { useTransactions } from "../../hooks/useTransactions";
import { getCurrentMonth, monthIncrease, monthDecrease, getCalendar } from "../../lib/dayjs";

function newFormData() {
    return {
        date: dayjs(),
        src: "",
        tag: new Set(),
        amount: undefined,
        type: 0,
        exr: "NZD",
        desc: "",
        IsExpense: true,
    };
}
export default function TransactionCreator({ isOpen, onOpenChange, formEntity }) {
    const _ = useTransactions();
    const [formData, _formData] = useState(_.new());
    const [currentMonth, _currentMonth] = useState(getCurrentMonth());
    const [calendar, _calendar] = useState();
    const [isCalendarOpen, _isCalendarOpen] = useState(false);
    const updateForm = (key, value) => {
        _formData((prevState) => ({ ...prevState, [key]: value }));
    };

    useEffect(() => {
        _calendar(getCalendar(currentMonth));
    }, [currentMonth]);

    useEffect(() => {
        // if (formEntity)
    }, [formEntity]);
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
                                            value={formData.Date.format("LL")}
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
                                                                formData.Date.date() === date.day ? "flat" : "light"
                                                            }
                                                            color={
                                                                formData.Date.date() === date.day
                                                                    ? "primary"
                                                                    : "default"
                                                            }
                                                            onPress={() => {
                                                                updateForm(
                                                                    "Date",
                                                                    dayjs(currentMonth.year, date.month, date.day)
                                                                );
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
                                    inputValue={formData.Source}
                                    onInputChange={(v) => updateForm("Source", v)}
                                >
                                    {[{ key: "Countdown", label: "Countdown" }].map((obj) => (
                                        <AutocompleteItem key={obj.key}>{obj.label}</AutocompleteItem>
                                    ))}
                                </Autocomplete>
                                <Select
                                    aria-label="Tag"
                                    label="Tag"
                                    selectedKeys={formData.Tag}
                                    onSelectionChange={(v) => updateForm("Tag", v)}
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
                                    type="number"
                                    value={formData.Amount}
                                    autoComplete="false"
                                    onValueChange={(value) => updateForm("Amount", value)}
                                    startContent={
                                        <div className="h-5 flex items-center opacity-70 mr-1">
                                            <RiMoneyDollarCircleLine className="size-4" />
                                        </div>
                                    }
                                />
                                <div className="flex flex-row gap-3">
                                    <Tabs
                                        aria-label="Options"
                                        selectedKey={formData.IsExpense ? "e" : "i"}
                                        onSelectionChange={(v) => updateForm("IsExpense", v === "e")}
                                    >
                                        <Tab key={"e"} title="expense"></Tab>
                                        <Tab key={"i"} title="income"></Tab>
                                    </Tabs>
                                    <Select aria-label="ExchangeRates" autoComplete="false" />
                                </div>
                                <Textarea label={"Description"} placeholder=" " />
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
                                    await parent.insert({
                                        Date: formData.Date.format("YYYYMMDD"),
                                        Source: formData.Source,
                                        Tag: formData.Tag.values().next().value,
                                        Amount: formData.Amount,
                                        IsExpense: formData.IsExpense,
                                        Currency: "NZD",
                                        Description: "",
                                    });
                                    onClose();
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
