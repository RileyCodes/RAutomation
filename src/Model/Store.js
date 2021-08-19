import React, { useReducer} from "react";
import Reducer from './Reducer'


const initialState = {
    points: [],
    error: null
};

const Store = ({children}) => {
    const [globalState, dispatch] = useReducer(Reducer, initialState);
    return (


        <Context.Provider value={[globalState, dispatch]}>
            {children}
        </Context.Provider>
    )
};


export const Context = React.createContext(initialState);
export default Store;