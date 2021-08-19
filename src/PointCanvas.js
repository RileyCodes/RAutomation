import {Circle, Layer, Line, Stage} from "react-konva";
import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react";


const View = (props) => {

    const container = React.useRef(null);
    function updateSize()
    {
        props.viewModel.updateSize({container: container});
    }
    function initSize()
    {
        props.viewModel.updateSize({container: container,isFirst:true});
    }

    function onPointClick(evt)
    {
        props.viewModel.onPointClick({evt:evt});
    }

    React.useEffect(() => {
        initSize();
        window.addEventListener('resize', updateSize);
        return function cleanup() {
            window.removeEventListener('resize', updateSize);
        };
    });
    //25384 134962 -46802 21.29 -2.03
    const points = props.points.map((point) =>

        <Circle
            key={"p:" + point.x.toString() + point.y.toString()}
            x={point.x}
            y={point.y}
            radius={4}
            fill="red"
            onClick={onPointClick}
        />
    );
    const lines = props.viewModel.getLine.map((line, index) =>
        <Line
            key={"line:" + index}
            x={line.src.x}
            y={line.src.y}
            points={[0, 0, line.dst.x - line.src.x, line.dst.y - line.src.y]}
            stroke={'red'}
            tension={0.5}
            closed
            stroke="black"
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

    return (
        <div className={classes.flex1}>
            <div className={classes.flex2} ref={container}>
                <Stage width={props.viewModel.getSize.width} height={props.viewModel.getSize.height}
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
