import {Circle, Layer, Stage} from "react-konva";
import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";



export default class PointCanvas extends Component {
    state = {
        dimensions: {
        },
    };
    updateSize() {
        console.log(this.container);
        if(this.container === undefined)
            return;
        console.log(this.state.dimensions.width)
        this.setState({
            dimensions: {
                width: this.container.offsetWidth,
                height: this.container.offsetHeight,
            },
        });
    }
    componentDidMount() {
        this.updateSize();
        this.updateSize = this.updateSize.bind(this)
        window.addEventListener('resize', this.updateSize);
    }
    componentWillUnmount()
    {
        window.removeEventListener('resize',this.updateSize);
    }


    render() {
        const { dimensions } = this.state;

        const style = {
            "flex-flow":"column",
            "flex-grow":"1",
            "display":"flex",
            "overflow":"hidden",

            }
        const style2 = {
            "flex-flow":"column",
            "flex-grow":"1",
            "display":"flex",
            "overflow":"hidden",
         "height":"0px",
    }
        return (
            <div style={style}>
                <div style={style2}         ref={(node) => {
                    this.container = node }}>
                    <Stage width={this.state.dimensions.width} height={this.state.dimensions.height}>
                        <Layer>
                            <Circle
                                x={20}
                                y={20}
                                draggable
                                radius={300}
                                fill="red"
                            />
                        </Layer>
                    </Stage>
                </div>
            </div>
        );
    }
}

