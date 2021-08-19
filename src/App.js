import './App.css';
import Window from "./Window";
import MainView from "./MainView";





function App() {
    return (

        <Window name="RAutomation" content={
            <MainView/>
        }/>

    );
}

export default App;
