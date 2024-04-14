import {
    Button,
    Card,
    ScrollShadow,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    getKeyValue,
} from "@nextui-org/react";
import { RiEdit2Line, RiRefreshLine } from "@remixicon/react";
import { getExchangeRates } from "../../providers/ExchangeRate";
import { AppData } from "../../App";
import { useContext } from "react";

export default function ExchangeRates({ source }) {
    const { db } = useContext(AppData);
    return (
        <div className="flex w-full h-full flex-col">
            <Card shadow="sm" className="mx-3 mt-3 px-3 py-1 flex flex-row items-center gap-2" radius="sm">
                <div className="text-tiny opacity-80">Your default currency is:</div>
                <div className="text-tiny">NZD</div>
                <Button size="sm" variant="light" radius="full" isIconOnly>
                    <RiEdit2Line className="size-4 opacity-80" />
                </Button>
                <div className="flex-1" />
                <div className="text-tiny opacity-80">Last Updated at</div>
                <div className="text-tiny">20242</div>
                <Button
                    size="sm"
                    onPress={async () => {
                        let [rates, data] = await Promise.all([getExchangeRates(), db.find("ExchangeRates")]);
                        for (let i = 0; i < data.length; i++) {
                            if (rates.data[data[i].CurrencyCode])
                                data[i]["CurrencyRate"] = rates.data[data[i].CurrencyCode];
                        }
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
                    <TableBody items={source}>
                        {(item) => (
                            <TableRow key={item.key}>
                                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </ScrollShadow>
        </div>
    );
}
