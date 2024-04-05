import { createContext, useState } from "react";
import "./App.css";
import Database from "./providers/Database";
import Authenticator from "./components/dialogs/Authenticator";
import { Button, ButtonGroup, Listbox, ListboxItem } from "@nextui-org/react";

export const AppData = createContext();

export default function App() {
    const [db] = useState(new Database());
    const [hide, _hide] = useState(true);
    return (
        <AppData.Provider value={{ db }}>
            <Authenticator />
            <div className="flex w-screen h-screen overflow-hidden">
                <div className={`flex ${hide ? "w-0" : "w-full md:w-72"} transition-all ease-in-out shadow-md`}>
                    <div className="w-full  overflow-hidden">
                        <Button className="static">Add</Button>
                        <Button className="static">New</Button>
                        <Button className="static">Create</Button>
                        <Button className="static">Create</Button>
                    </div>
                    <Listbox>
                        <ListboxItem>wocao</ListboxItem>
                    </Listbox>
                </div>
                <div className={`flex-1 ${hide ? "" : "w-0"}`}>
                    <Button onPress={() => _hide(!hide)}>click</Button>
                </div>
            </div>
        </AppData.Provider>
    );
}
