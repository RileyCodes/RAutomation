import React, { useReducer} from "react";
import Reducer from './Reducer'


const initialState = {
    points: {},
    error: null,
    dimensions:{
        width:0, height:0
    },
    lines:{},
    connection:{},
    canvasPos:{x:0,y:0}
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};


export const Context = React.createContext(initialState);
export default Store;