import './App.css';
import Window from "./Window";
import MainView from "./MainView";
import React from 'react'
import Store from "./Model/Store";



function App() {


    const libPath = 'C:\\project\\OpenCVHelper\x64\\Debug\\ArkBot.dll';
        const add = window.electron.getNativeFunction(libPath, 'func', 'int', ['void', 'void']);

    const result = add(23, 34);


    return (
        <Window name="RAutomation">
            <Store>
                <MainView/>
            </Store>
        </Window>
    );
}

export default App;
