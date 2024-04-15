import React, { useEffect, useState } from "react";
import { useAppData, useDB } from "../App";
import dayjs from "../lib/dayjs";

export function useTransactions() {
    const app = useAppData();
    const db = useDB();

    useEffect(() => {
        db.find("Transactions").then((data) => app._transactions(data.map((o) => ({ ...o, key: o._id.toString() }))));
    }, []);

    const openForm = (obj) => {
        app._transactionFormEntity(obj);
        app.onTransactionFormOpen(true);
    };

    const newFormData = () => {
        return {
            Amount: undefined,
            Currency: "NZD",
            Date: dayjs(),
            Description: "",
            IsExpense: true,
            Source: "",
            Tag: new Set(),
        };
    };

    const insert = async (obj) => {
        const resp = await db.insert("Transactions", [obj]);
        if (resp.insertedIds.length === 1) {
            app._transactions((prev) => {
                prev.push({ ...obj, key: resp.insertedIds[0].toString() });
                return [...prev];
            });
            return true;
        }
    };

    return {
        items: app.transactions,
        open: openForm,
        new: newFormData,
        insert: insert,
    };
}
