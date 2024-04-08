import { createContext, useState } from "react";
import "./App.css";
import React from "react";
import Database from "./providers/Database";
import Authenticator from "./components/dialogs/Authenticator";
import {
    Avatar,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    Divider,
    Link,
    Listbox,
    ListboxItem,
    ListboxSection,
    Menu,
    MenuItem,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Spacer,
    Tooltip,
    User,
} from "@nextui-org/react";
import {
    RiAddLargeLine,
    RiAddLine,
    RiArrowRightSLine,
    RiBillLine,
    RiDashboardLine,
    RiExchangeDollarLine,
    RiFeedbackLine,
    RiMenuFoldLine,
    RiMenuUnfoldLine,
    RiPriceTagLine,
    RiSettings3Line,
} from "@remixicon/react";

export const AppData = createContext();

class Pages {
    static Account = "Account";
    static Dashboard = "Dashboard";
    static Transactions = "Transactions";
    static ExchangeRates = "ExchangeRates";
    static Tags = "Tags";
    static Settings = "Settings";
    static Feedback = "Feedback";
}

const PageTitle = {
    Account: "Account",
    Dashboard: "Dashboard",
    Transactions: "Transactions",
    ExchangeRates: "Exchange Rates",
    Tags: "Tags",
    Settings: "Settings",
    Feedback: "Feedback",
};

export default function App() {
    const [db] = useState(new Database());
    const [hide, _hide] = useState(false);
    const [pageId, _pageId] = useState(new Set([Pages.Dashboard]));

    return (
        <AppData.Provider value={{ db }}>
            <Authenticator />
            <div className="flex flex-col w-screen h-screen">
                <div className="px-3 flex flex-row items-center h-14 border-b-1 gap-3">
                    <Button onPress={() => _hide(!hide)} isIconOnly variant="light">
                        {hide ? <RiMenuUnfoldLine className="size-5" /> : <RiMenuFoldLine className="size-5" />}
                    </Button>

                    <div>{PageTitle[pageId.values().next().value]}</div>
                </div>
                <div className="flex w-screen overflow-hidden flex-1">
                    <div
                        className={`${hide ? "w-0 opacity-0" : "w-full md:w-72 opacity-100"} 
                        flex transition-all ease-in-out border-r-1`}
                    >
                        <div className="w-full overflow-hidden">
                            <Listbox
                                aria-label="Menu"
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={pageId}
                                onSelectionChange={(v) => {
                                    _pageId(v);
                                    if (window.innerWidth < 768) {
                                        _hide(true);
                                    }
                                }}
                                className="Navigator"
                            >
                                <ListboxItem key={Pages.Account} showDivider className="pl-2.5 pr-5">
                                    <div className="flex flex-row gap-5 items-center ">
                                        <User
                                            name="Superman"
                                            description="Visitor"
                                            avatarProps={{
                                                src: "",
                                            }}
                                        />
                                    </div>
                                </ListboxItem>
                                <ListboxItem
                                    key={Pages.Dashboard}
                                    className="px-5"
                                    startContent={<RiDashboardLine className="size-4" />}
                                >
                                    Dashboard
                                </ListboxItem>
                                <ListboxItem
                                    key={Pages.Transactions}
                                    className="px-5"
                                    startContent={<RiBillLine className="size-4" />}
                                >
                                    Transactions
                                </ListboxItem>
                                <ListboxItem
                                    key={Pages.ExchangeRates}
                                    className="px-5"
                                    startContent={<RiExchangeDollarLine className="size-4" />}
                                >
                                    Exchange Rates
                                </ListboxItem>
                                <ListboxItem
                                    key={Pages.Tags}
                                    className="px-5"
                                    startContent={<RiPriceTagLine className="size-4" />}
                                    showDivider
                                >
                                    Tags
                                </ListboxItem>
                                <ListboxItem
                                    key={Pages.Settings}
                                    className="px-5"
                                    startContent={<RiSettings3Line className="size-4" />}
                                >
                                    Settings
                                </ListboxItem>
                                <ListboxItem
                                    key={Pages.Feedback}
                                    className="px-5"
                                    startContent={<RiFeedbackLine className="size-4" />}
                                >
                                    Feedback
                                </ListboxItem>
                            </Listbox>
                        </div>
                    </div>
                    <div className={`flex-1 ${hide ? "" : "w-0"}`}></div>
                </div>
            </div>
            <Popover placement="top">
                <PopoverTrigger>
                    <Button
                        className="fixed right-4 md:right-6 bottom-4 md:bottom-6 shadow-[0_0_8px_0px_rgba(0,0,0,0.1)]"
                        onPress={() => _hide(!hide)}
                        isIconOnly
                        color="primary"
                        radius="full"
                        size="lg"
                    >
                        <RiAddLine />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col px-0 py-0 bg-transparent border-[none] gap-1 [box-shadow:none]">
                    <Button onPress={() => _hide(!hide)} isIconOnly variant="light" color="primary">
                        {hide ? <RiMenuUnfoldLine /> : <RiMenuFoldLine />}
                    </Button>
                    <Button onPress={() => _hide(!hide)} isIconOnly variant="light" color="primary">
                        {hide ? <RiMenuUnfoldLine /> : <RiMenuFoldLine />}
                    </Button>
                    <Button onPress={() => _hide(!hide)} isIconOnly variant="light" color="primary">
                        {hide ? <RiMenuUnfoldLine /> : <RiMenuFoldLine />}
                    </Button>
                </PopoverContent>
            </Popover>
            {/* <Tooltip
                placement="top"
                offset={10}
                className="flex flex-col px-0 py-0 bg-transparent border-[none] gap-2 [box-shadow:none]"
                content={
                    <>
                        <Button radius="full" onPress={() => _hide(!hide)} isIconOnly variant="bordered" color="primary">
                            {hide ? <RiMenuUnfoldLine /> : <RiMenuFoldLine />}
                        </Button>
                        <Button radius="full" onPress={() => _hide(!hide)} isIconOnly variant="bordered" color="primary">
                            {hide ? <RiMenuUnfoldLine /> : <RiMenuFoldLine />}
                        </Button>
                        <Button radius="full" onPress={() => _hide(!hide)} isIconOnly variant="bordered" color="primary">
                            {hide ? <RiMenuUnfoldLine /> : <RiMenuFoldLine />}
                        </Button>
                    </>
                }
            >
                <Button
                    className="fixed right-4 md:right-6 bottom-4 md:bottom-6 shadow-[0_0_8px_0px_rgba(0,0,0,0.1)]"
                    onPress={() => _hide(!hide)}
                    isIconOnly
                    color="primary"
                    radius="full"
                    size="lg"
                >
                    <RiAddLine />
                </Button>
            </Tooltip> */}
        </AppData.Provider>
    );
}
