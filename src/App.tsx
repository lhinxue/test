import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Authenticator from "./components/dialogs/Authenticator";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Authenticator />
        </>
    );
}

export default App;
