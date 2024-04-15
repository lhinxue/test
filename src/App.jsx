import { createContext, useContext, useEffect, useRef, useState } from "react";
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
    ScrollShadow,
    Spacer,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip,
    User,
    getKeyValue,
    useDisclosure,
} from "@nextui-org/react";
import {
    RiAddLargeLine,
    RiAddLine,
    RiArrowRightSLine,
    RiBillLine,
    RiDashboardLine,
    RiEdit2Line,
    RiExchangeDollarLine,
    RiFeedbackLine,
    RiHandCoinLine,
    RiMenuFoldLine,
    RiMenuUnfoldLine,
    RiPriceTagLine,
    RiRecycleLine,
    RiRefreshLine,
    RiSettings3Line,
    RiShoppingBag3Line,
    RiShoppingBag4Line,
} from "@remixicon/react";
import Menu from "./components/Menu";
import TransactionCreator from "./components/dialogs/TransactionCreator";
import { getExchangeRates } from "./providers/ExchangeRate";
import ExchangeRates from "./components/pages/ExchangeRates";
import Tags from "./components/pages/Tags";
import Transactions from "./components/pages/Transactions";

export const AppData = createContext();

class PageIndex {
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
    const [user, _user] = useState({});
    const [hide, _hide] = useState(false);
    const [pageId, _pageId] = useState(PageIndex.Dashboard);
    const [exr, _exr] = useState([]);
    const [tags, _tags] = useState([]);
    const [authenticated, _authenticated] = useState(false);

    const [transactions, _transactions] = useState([]);
    const {
        isOpen: isTransactionFormOpen,
        onOpen: onTransactionFormOpen,
        onOpenChange: onTransactionFormOpenChange,
    } = useDisclosure();
    const [transactionFormEntity, _transactionFormEntity] = useState({});

    const getAppData = async () => {
        let [$exchangeRates, $tags] = await Promise.all([
            db.find("ExchangeRates"),
            db.find("Tags", { condition: { UID: user.UID } }),
        ]);
        _exr(
            $exchangeRates.map((c) => ({
                ...c,
                key: c.CurrencyCode,
            }))
        );
        _tags($tags.map((v) => ({ ...v, key: v.Name })));
    };

    useEffect(() => {
        if (authenticated) {
            getAppData();
        }
    }, [authenticated]);

    const tableColumns = [
        { key: "CurrencyName", label: "Currency Name" },
        { key: "CurrencyCode", label: "Currency Code" },
        { key: "CurrencyRate", label: "Exchange Rate" },
    ];
    return (
        <AppData.Provider
            value={{
                db,
                user,
                _user,
                tags,
                _tags,
                isTransactionFormOpen,
                onTransactionFormOpen,
                onTransactionFormOpenChange,
                transactionFormEntity,
                transactions,
                _transactions,
                _transactionFormEntity,
            }}
        >
            <Authenticator _isAuthenticated={_authenticated} />
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
                                defaultSelected={PageIndex.Dashboard}
                            />
                        </div>
                    </div>
                    <div className={`flex-1 ${hide ? "w-full" : "w-0"}`}>
                        {pageId === PageIndex.Transactions && <Transactions source={exr} />}
                        {pageId === PageIndex.ExchangeRates && <ExchangeRates source={exr} />}
                        {pageId === PageIndex.Tags && <Tags source={exr} />}
                    </div>
                </div>
            </div>

            <Button
                className="fixed right-4 md:right-8 bottom-4 md:bottom-8"
                onPress={() => onTransactionFormOpen()}
                isIconOnly
                variant="flat"
                color="primary"
                radius="full"
                size="lg"
            >
                <RiAddLine className="size-5" />
            </Button>
            <TransactionCreator isOpen={isTransactionFormOpen} onOpenChange={onTransactionFormOpenChange} />
        </AppData.Provider>
    );
}

export function useAppData() {
    const app = useContext(AppData);
    return app;
}

export function useDB() {
    const { db } = useContext(AppData);
    return db;
}
