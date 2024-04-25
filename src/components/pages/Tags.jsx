import {BreadcrumbItem, Breadcrumbs, Button, Card, Chip, ScrollShadow, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow,} from "@nextui-org/react";
import {RiDeleteBinLine, RiEditLine, RiGitMergeLine, RiLogoutCircleLine,} from "@remixicon/react";
import {useCallback, useState} from "react";
import useGeneralForm from "../../hooks/useGeneralForm";
import {useTags} from "../../hooks/useTags";

export default function Tags({source}) {
    const tags = useTags();

    const form = useGeneralForm();

    const [isMerging, _isMerging] = useState(false)
    const [isDeleting, _isDeleting] = useState(false)
    const [selected, _selected] = useState(new Set())

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
                                    () => {
                                    },
                                    () => {
                                    },
                                    item
                                )
                            }
                        >
                            <RiEditLine className="size-4"/>
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
                <div className="flex-1"/>
                {(isMerging || isDeleting) &&
                    <Button size="sm" variant="light" onPress={() => {
                        _isMerging(false)
                        _isDeleting(false)
                        _selected(new Set())

                    }}>
                        <RiLogoutCircleLine className="size-4 opacity-80"/>
                        <span>{"Cancel"}</span>
                    </Button>}
                <Button size="sm" variant="light"
                        isDisabled={isDeleting}

                        color={isMerging ? "primary" : "default"}
                        onPress={() => {
                            if (isMerging) {
                                if (selected.size>1){
                                    form.open(
                                        "Merge Tags",
                                        <span>
                                        <span>
                                        Selected tags
                                    </span>
                                        <span className={"inline-flex gap-1 mx-1"}>
                                             {Array.from(selected).map(value =>
                                                 <Chip variant={"flat"}>{value}</Chip>)}
                                        </span>
                                        <span>
                                        will be merged to a new tag. Please enter a new name.
                                    </span>
                                    </span>,
                                        ["Name"],
                                        () => {
                                        },
                                        () => {
                                        }
                                    )
                                }else{

                                }
                            }else{

                    _isMerging(true)
                }
                    }}>
                <RiGitMergeLine className="size-4 opacity-80"/>
                <span>{"Merge"}</span>
            </Button>
            <Button size="sm" variant="light"
                    color={isDeleting ? "primary" : "default"}
                    isDisabled={isMerging} onPress={() => {
                _isDeleting(true)
            }}>
                <RiDeleteBinLine className="size-4 opacity-80"/>
                <span>{"Delete"}</span>
            </Button>
        </Card>
    <ScrollShadow className="h-full p-3 w-full" hideScrollBar size={10}>
        <Table
            removeWrapper
            className={"HOTARU_TABLE"}
            classNames={{base: "h-full w-full", tbody: "divide-y"}}
            isHeaderSticky
            selectedKeys={selected}
            onSelectionChange={_selected}
            selectionMode={isMerging || isDeleting ? "multiple" : "none"}
        >
            <TableHeader
                columns={window.innerWidth < 768
                    ? [
                        {key: "Name", label: "Tag Name"},
                        {key: "Count", label: "Count"}
                    ]
                    : [
                        {key: "Name", label: "Tag Name"},
                        {key: "Percentage", label: "Percentage"},
                        {key: "Count", label: "Count"},
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
                    <TableRow key={item.key} onClick={() => {
                        if (!(isDeleting || isMerging))
                            form.open(
                                "Modify Tag", "",
                                ["Name"],
                                () => {
                                },
                                () => {
                                },
                                item
                            )
                    }
                    }>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </ScrollShadow>
</div>
)
    ;
}
