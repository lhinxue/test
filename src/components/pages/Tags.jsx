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
    RiGitMergeLine,
    RiPriceTag2Line,
    RiRefreshLine,
} from "@remixicon/react";
import { getExchangeRates } from "../../providers/ExchangeRate";
import { AppData } from "../../App";
import { useContext, useEffect } from "react";
import CreateTag from "../dialogs/CreateTag";

export default function Tags({ source }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { db, user, tags, _tags } = useContext(AppData);
    useEffect(() => {
        console.log(user);
    }, [user]);

    const createTag = () => {
        onOpen();
    };
    return (
        <div className="flex w-full h-full flex-col">
            <Card shadow="sm" className="mx-3 mt-3 px-3 py-1 flex flex-row items-center" radius="sm">
                <div className="flex-1" />
                <Button size="sm" variant="light" onPress={createTag}>
                    <RiPriceTag2Line className="size-4 opacity-80" />
                    <span>{"Create"}</span>
                </Button>
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
                <Table
                    removeWrapper
                    classNames={{ base: "h-full w-full" }}
                    isHeaderSticky
                    selectionMode="single"
                    onRowAction={(key) => console.log(key)}
                >
                    <TableHeader columns={[{ key: "Name", label: "Tag Name" }]}>
                        {(column) => (
                            <TableColumn key={column.key} allowsSorting>
                                {column.label}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={tags}>
                        {(item) => (
                            <TableRow key={item.key}>
                                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </ScrollShadow>
            <CreateTag isOpen={isOpen} onOpenChange={onOpenChange} onSubmit={() => {}} />
        </div>
    );
}
