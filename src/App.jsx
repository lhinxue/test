import { createContext, useEffect, useRef, useState } from "react";
import "./App.css";
import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
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
    MenuItem,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Spacer,
    Tooltip,
    User,
    useDisclosure,
} from "@nextui-org/react";
import {
    RiAddLargeLine,
    RiAddLine,
    RiArrowRightSLine,
    RiBillLine,
    RiDashboardLine,
    RiExchangeDollarLine,
    RiFeedbackLine,
    RiHandCoinLine,
    RiMenuFoldLine,
    RiMenuUnfoldLine,
    RiPriceTagLine,
    RiSettings3Line,
    RiShoppingBag3Line,
    RiShoppingBag4Line,
} from "@remixicon/react";
import Menu from "./components/Menu";
import TransactionCreator from "./components/dialogs/TransactionCreator";

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
    const [pageId, _pageId] = useState(Pages.Dashboard);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <AppData.Provider value={{ db }}>
            <Authenticator />
            <div className="flex flex-col w-screen h-screen">
                <div className="px-3 flex flex-row items-center h-14 border-b-1 gap-3">
                    <Button onPress={() => _hide(!hide)} isIconOnly variant="light">
                        {hide ? <RiMenuUnfoldLine className="size-5" /> : <RiMenuFoldLine className="size-5" />}
                    </Button>
                    <div>{PageTitle[pageId]}</div>
                </div>
                <div className="flex w-screen overflow-hidden flex-1">
                    <div
                        className={`${hide ? "w-0 opacity-0" : "w-full md:w-72 opacity-100"} 
                        flex transition-all ease-in-out border-r-1`}
                    >
                        <div className="w-full overflow-hidden">
                            <Menu
                                onChange={(v) => {
                                    _pageId(v);
                                    if (window.innerWidth < 768) {
                                        _hide(true);
                                    }
                                }}
                                defaultSelected={Pages.Dashboard}
                            />
                        </div>
                    </div>
                    <div className={`flex-1 ${hide ? "" : "w-0"}`}></div>
                </div>
            </div>
            <Button
                className="fixed right-4 md:right-8 bottom-4 md:bottom-8"
                onPress={() => onOpen()}
                isIconOnly
                variant="flat"
                color="primary"
                radius="full"
                size="lg"
            >
                <RiAddLine className="size-5" />
            </Button>
            <TransactionCreator isOpen={isOpen} onOpenChange={onOpenChange} />
        </AppData.Provider>
    );
}
