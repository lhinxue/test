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
    const [exr, _exr] = useState([]);
    const [authenticated, _authenticated] = useState(false);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        if (authenticated) {
            db.find("ExchangeRates").then((data) =>
                _exr(
                    data.map((c) => ({
                        ...c,
                        key: c.CurrencyCode,
                    }))
                )
            );
        }
    }, [authenticated]);
    const tableColumns = [
        { key: "CurrencyName", label: "Currency Name" },
        { key: "CurrencyCode", label: "Currency Code" },
        { key: "CurrencyRate", label: "Exchange Rate" },
    ];
    return (
        <AppData.Provider value={{ db }}>
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
                                defaultSelected={Pages.Dashboard}
                            />
                        </div>
                    </div>
                    <div className={`flex-1 ${hide ? "w-full" : "w-0"}`}>
                        <Card shadow="sm" className="mx-3 mt-3 px-3 py-1 flex flex-row items-center gap-2" radius="sm">
                            <div className="text-tiny opacity-80">Your default currency is:</div>
                            <div className="text-tiny">NZD</div>
                            <Button
                                size="sm"
                                onPress={async () => {
                                    let [rates, data] = await Promise.all([
                                        getExchangeRates(),
                                        db.find("ExchangeRates"),
                                    ]);
                                    for (let i = 0; i < data.length; i++) {
                                        if (rates.data[data[i].CurrencyCode])
                                            data[i]["CurrencyRate"] = rates.data[data[i].CurrencyCode];
                                    }
                                    console.log(data);
                                    await db.import("ExchangeRates", data);
                                }}
                                variant="light"
                                radius="full"
                                isIconOnly
                            >
                                <RiEdit2Line className="size-4 opacity-80" />
                            </Button>
                            <div className="flex-1" />
                            <div className="text-tiny opacity-80">Last Updated at</div>
                            <div className="text-tiny">20242</div>
                            <Button
                                size="sm"
                                onPress={async () => {
                                    let [rates, data] = await Promise.all([
                                        getExchangeRates(),
                                        db.find("ExchangeRates"),
                                    ]);
                                    for (let i = 0; i < data.length; i++) {
                                        if (rates.data[data[i].CurrencyCode])
                                            data[i]["CurrencyRate"] = rates.data[data[i].CurrencyCode];
                                    }
                                    console.log(data);
                                    await db.import("ExchangeRates", data);
                                }}
                                variant="light"
                                radius="full"
                                isIconOnly
                            >
                                <RiRefreshLine className="size-4 opacity-80" />
                            </Button>
                        </Card>
                        <ScrollShadow className="h-full p-3 w-full" hideScrollBar size={10}>
                            <Table
                                removeWrapper
                                classNames={{ base: "h-full w-full" }}
                                isHeaderSticky
                                // bottomContent={

                                // }
                            >
                                <TableHeader
                                    columns={
                                        window.innerWidth < 768
                                            ? [
                                                  { key: "CurrencyCode", label: "Currency Code" },
                                                  { key: "CurrencyRate", label: "Exchange Rate" },
                                              ]
                                            : [
                                                  { key: "CurrencyName", label: "Currency Name" },
                                                  { key: "CurrencyCode", label: "Currency Code" },
                                                  { key: "CurrencyRate", label: "Exchange Rate" },
                                              ]
                                    }
                                >
                                    {(column) => (
                                        <TableColumn key={column.key} allowsSorting>
                                            {column.label}
                                        </TableColumn>
                                    )}
                                </TableHeader>
                                <TableBody items={exr}>
                                    {(item) => (
                                        <TableRow key={item.key}>
                                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </ScrollShadow>
                    </div>
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
