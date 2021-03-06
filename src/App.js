import './App.css';
import Window from "./Window";
import MainView from "./MainView";
import React from 'react'
import Store from "./Model/Store";
import Util from "./Util";



function App() {
    return (
        <Window name="RAutomation">
            <Store>
                <MainView/>
            </Store>
        </Window>
    );
}

export default App;
