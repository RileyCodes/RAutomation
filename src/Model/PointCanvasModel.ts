import { makeAutoObservable } from "mobx"

class PointCanvasModel {
    private dimensions = {width:0,height:0} as any;
    private connection = null as any;
    private lines = [] as any;
    private isReady = false;
    constructor() {
        console.log("1111");
        makeAutoObservable(this);
    }

    onPointClick = ({evt}: { evt: any }) : void => {
        if (this.connection == null) {
            this.connection = {x: evt.target.attrs.x, y: evt.target.attrs.y};
        } else {
            this.lines.push({src: {x: evt.target.attrs.x, y: evt.target.attrs.y}, dst: this.connection});
            this.connection = null;
        }

    }

    updateSize({container,isFirst}: { container: any,isFirst:any }):any {
        if(isFirst === true && this.isReady)
        {
            return;
        }
        this.isReady = true;
        if (container === undefined)
            return;

        this.dimensions ={
            width: container.current.offsetWidth,
            height: container.current.offsetHeight,
        }
        console.log("update");
    }

    get getSize():any{
        return this.dimensions;
    }

    get getLine():any{
        console.log(this.lines.length);
        return this.lines;
    }
}

export default PointCanvasModel;