const Reducer = (state, action) => {
    console.log('Reducer called:' + action.type)
    console.log('payload:' + action.payload)
    switch (action.type) {
        case 'setPoints':
            console.log('setPoints');
            return{
                ...state,
                points: action.payload
            };
        case 'setConnection':
            return {
                connection: action.payload
            };
        case 'addLine':
            return {
                ...state,
                posts: state.line.concat([action.payload])
            };
        case 'clearConnection':
            return {};
        default:
            return state;
    }
};

export default Reducer;