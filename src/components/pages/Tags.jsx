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
    useDisclosure,
} from "@nextui-org/react";
import {
    RiAddLargeLine,
    RiAddLine,
    RiDeleteBinLine,
    RiEdit2Line,
    RiEditLine,
    RiGitMergeLine,
    RiPriceTag2Line,
    RiRefreshLine,
} from "@remixicon/react";
import { getExchangeRates } from "../../providers/ExchangeRate";
import { AppData } from "../../App";
import { useCallback, useContext, useEffect } from "react";
import CreateTag from "../dialogs/General";
import useGeneralForm from "../../hooks/useGeneralForm";
import { useTags } from "../../hooks/useTags";

export default function Tags({ source }) {
    const tags = useTags();

    const form = useGeneralForm();

    const createTag = () => {
        form.open("Create new Tag", ["Name"]);
    };

    const renderCell = useCallback((item, columnKey) => {
        switch (columnKey) {
            case "Action":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Button
                            isIconOnly
                            className="size-5"
                            size="sm"
                            variant="light"
                            onPress={() =>
                                form.open(
                                    "Modify Tag",
                                    ["Name"],
                                    () => {},
                                    () => {},
                                    item
                                )
                            }
                        >
                            <RiEditLine className="size-4" />
                        </Button>
                    </div>
                );
            default:
                break;
        }
        return item[columnKey];
    });
    return (
        <div className="flex w-full h-full flex-col">
            <Card shadow="sm" className="mx-3 mt-3 px-3 py-1 flex flex-row items-center" radius="sm">
                <div className="flex-1" />
                <Button size="sm" variant="light">
                    <RiGitMergeLine className="size-4 opacity-80" />
                    <span>{"Merge"}</span>
                </Button>
                <Button size="sm" variant="light">
                    <RiDeleteBinLine className="size-4 opacity-80" />
                    <span>{"Delete"}</span>
                </Button>
            </Card>
            <ScrollShadow className="h-full p-3 w-full" hideScrollBar size={10}>
                <Table removeWrapper classNames={{ base: "h-full w-full" }} isHeaderSticky>
                    <TableHeader
                        columns={[
                            { key: "Name", label: "Tag Name" },
                            { key: "Percentage", label: "Percentage" },
                            { key: "Count", label: "Count" },
                            { key: "Action", label: " " },
                        ]}
                    >
                        {(column) => (
                            <TableColumn key={column.key} allowsSorting>
                                {column.label}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={tags.items}>
                        {(item) => (
                            <TableRow key={item.key}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </ScrollShadow>
        </div>
    );
}
