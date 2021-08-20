import {Circle, Layer, Line, Stage} from "react-konva";
import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react";
import {Context} from "./Model/Store";


const View = (props) => {
    const container = React.useRef(null);
    const [state, dispatch] = React.useContext(Context);
    function updateSize(isFromUseEffects)
    {
        console.log(isFromUseEffects)
        if(isFromUseEffects === true){
           if(state.dimensions.width != 0){
               return;
           }
        }
        console.log("updateSize");
        if (container === undefined)
            return;
        dispatch({type:'setDimensions',payload:{
                width: container.current.offsetWidth,
                height: container.current.offsetHeight,
            }});
        console.log("update");
    }
    function initSize()
    {
        updateSize(true);
    }

    function onPointClick(evt)
    {
        if (Object.keys(state.connection).length === 0) {
            dispatch({type:'setConnection',payload:{x: evt.target.attrs.x, y: evt.target.attrs.y}})
        } else {

            if(evt.target.attrs.x === state.connection.x && evt.target.attrs.y === state.connection.y)
                return;

            const lineKey = 's_'+ evt.target.attrs.x + '_'+
                evt.target.attrs.y + 'd_' +
                state.connection.x + '_'+
                state.connection.y
            const newLine = {};
            newLine[lineKey] ={src:
                    {x: evt.target.attrs.x, y: evt.target.attrs.y},
                dst: state.connection};
            const lines = {...state.lines,...newLine};

            dispatch({type:'setLine',payload:lines})
            dispatch({type:'clearConnection'});
        }

    }

    React.useEffect(() => {
        initSize();
        window.addEventListener('resize', updateSize);
        return function cleanup() {
            window.removeEventListener('resize', updateSize);
        };
    });
    //25384 134962 -46802 21.29 -2.03
    const points = Object.keys(props.points).map((key,index) =>

        <Circle
            key={"p:" + index}
            x={props.points[key].x}
            y={props.points[key].y}
            radius={4}
            fill="black"
            onClick={onPointClick}
        />
    );
    const lines = Object.keys(state.lines).map((key, index) =>
        <Line
            key={"line:" + index}
            x={state.lines[key].src.x}
            y={state.lines[key].src.y}
            points={[0, 0, state.lines[key].dst.x - state.lines[key].src.x, state.lines[key].dst.y - state.lines[key].src.y]}
            stroke={'red'}
            tension={0.5}
            closed
        />
    );

    const useStyles = makeStyles((theme) => ({
        flex1: {
            "flex-flow": "column",
            "flex-grow": "1",
            "display": "flex",
            "overflow": "hidden",

        },
        flex2: {
            "flex-flow": "column",
            "flex-grow": "1",
            "display": "flex",
            "overflow": "hidden",
            "height":"0px"
        }
    }));
    const classes = useStyles();

    function onDragMove(evt)
    {
        //console.log(evt.currentTarget.x());
        //console.log(evt);
    }

    return (
        <div className={classes.flex1}>
            <div className={classes.flex2} ref={container}>
                <Stage width={state.dimensions.width} height={state.dimensions.height}
                       onDragMove={onDragMove}
                       draggable={true}
                       x={props.points.length > 0 ? -props.points[0].x + 20 : 0}
                       y={props.points.length > 0 ? -props.points[0].y + 20 : 0}
                >
                    <Layer>
                        {points}
                        {lines}
                    </Layer>
                </Stage>
            </div>
        </div>
    );
};

export default observer(View);
