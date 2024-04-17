import { createContext, useContext, useEffect, useState } from "react";
import "./App.css";
import React from "react";
import Database from "./providers/Database";

import Authenticator from "./components/dialogs/Authenticator";
import { Button, useDisclosure } from "@nextui-org/react";
import { RiAddLine, RiMenuFoldLine, RiMenuUnfoldLine } from "@remixicon/react";
import Menu from "./components/Menu";
import ExchangeRates from "./components/pages/ExchangeRates";
import Tags from "./components/pages/Tags";
import Transactions from "./components/pages/Transactions";
import Form from "./components/dialogs/index.js";

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
    const [hideSidebar, _hideSidebar] = useState(window.innerWidth < 768);
    const [pageId, _pageId] = useState(PageIndex.Dashboard);

    const [authenticated, _authenticated] = useState(false);

    const [counterparties, _counterparties] = useState([]);
    const [exchangeRates, _exchangeRates] = useState([]);
    const [tags, _tags] = useState([]);
    const [transactions, _transactions] = useState([]);

    const [transactionFormEntity, _transactionFormEntity] = useState({});

    const [generalFormConfig, _generalFormConfig] = useState({ title: "", entries: [] });
    const {
        isOpen: isGeneralFormOpen,
        onOpen: onGeneralFormOpen,
        onOpenChange: onGeneralFormOpenChange,
    } = useDisclosure();
    const [generalFormEntity, _generalFormEntity] = useState();
    const [onGeneralFormValidate, _onGeneralFormValidate] = useState(() => {});
    const [onGeneralFormSubmit, _onGeneralFormSubmit] = useState(() => {});

    const {
        isOpen: isTransactionFormOpen,
        onOpen: onTransactionFormOpen,
        onOpenChange: onTransactionFormOpenChange,
    } = useDisclosure();

    const getAppData = async () => {
        let [respCounterparties, respExchangeRates, respTags] = await Promise.all([
            db.find("Counterparties", { condition: { UID: user.UID } }),
            db.find("ExchangeRates"),
            db.find("Tags", { condition: { UID: user.UID } }),
        ]);
        console.log(respExchangeRates);
        _counterparties(respCounterparties.map((value) => ({ ...value, key: value.Name })));
        _exchangeRates(respExchangeRates.map((value) => ({ ...value, key: value.CurrencyCode })));
        _tags(respTags.map((value) => ({ ...value, key: value.Name })));
    };

    useEffect(() => {
        if (authenticated) {
            getAppData();
        }
    }, [authenticated]);

    return (
        <AppData.Provider
            value={{
                db,
                user,
                _user,
                counterparties,
                _counterparties,
                exchangeRates,
                _exchangeRates,
                tags,
                _tags,
                transactions,
                _transactions,
                transactionFormEntity,
                _transactionFormEntity,
                isTransactionFormOpen,
                onTransactionFormOpen,
                onTransactionFormOpenChange,

                generalFormConfig,
                _generalFormConfig,
                isGeneralFormOpen,
                onGeneralFormOpen,
                onGeneralFormOpenChange,
                generalFormEntity,
                _generalFormEntity,
                onGeneralFormValidate,
                _onGeneralFormValidate,
                onGeneralFormSubmit,
                _onGeneralFormSubmit,
            }}
        >
            <Authenticator _isAuthenticated={_authenticated} />
            <div className="flex flex-col w-screen h-screen">
                <div className="px-3 flex flex-row items-center h-14 border-b-1 gap-3">
                    <Button onPress={() => _hideSidebar(!hideSidebar)} isIconOnly variant="light">
                        {hideSidebar ? <RiMenuUnfoldLine className="size-5" /> : <RiMenuFoldLine className="size-5" />}
                    </Button>
                    <div>{PageTitle[pageId]}</div>
                </div>
                <div className="flex w-screen overflow-hidden flex-1">
                    <div
                        className={`${hideSidebar ? "w-0 opacity-0" : "w-full md:w-72 opacity-100"} 
                        flex transition-all ease-in-out border-r-1`}
                    >
                        <div className="w-full overflow-hidden">
                            <Menu
                                onChange={(v) => {
                                    _pageId(v);
                                    if (window.innerWidth < 768) {
                                        _hideSidebar(true);
                                    }
                                }}
                                defaultSelected={PageIndex.Dashboard}
                            />
                        </div>
                    </div>
                    <div className={`flex-1 ${hideSidebar ? "w-full" : "w-0"}`}>
                        {pageId === PageIndex.Transactions && <Transactions source={exchangeRates} />}
                        {pageId === PageIndex.ExchangeRates && <ExchangeRates source={exchangeRates} />}
                        {pageId === PageIndex.Tags && <Tags source={exchangeRates} />}
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
            <Form.Transaction isOpen={isTransactionFormOpen} onOpenChange={onTransactionFormOpenChange} />
            <Form.General
                title={generalFormConfig.title}
                entries={generalFormConfig.entries}
                isOpen={isGeneralFormOpen}
                onOpenChange={onGeneralFormOpenChange}
                onValidate={onGeneralFormValidate}
                onSubmit={onGeneralFormSubmit}
                formEntity={generalFormEntity}
            />
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
