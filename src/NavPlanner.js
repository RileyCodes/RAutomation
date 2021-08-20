import React, {useContext} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AddPointsDialog from './AddPoints'
import AddIcon from '@material-ui/icons/Add';
import PointCanvas from "./PointCanvas";
import SaveIcon from '@material-ui/icons/Save';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import PointCanvasModel from "./Model/PointCanvasModel.ts";
import {Context} from "./Model/Store";

const drawerWidth = 50;

const useStyles = makeStyles((theme) => ({
    flex:{
        "flex-flow":"row",
        "flex":"1 1",
        "display":"flex",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
}));

function NavPlannerToolbox(props) {
    const classes = useStyles();
    useTheme();
    const [isAddPointsDialogShow,setIsAddPointsDialogShow] = React.useState(false);
    //const [points,setPoints] = React.useState([]);
    const [state, dispatch] = React.useContext(Context);


    function OnShowAddPointsDialogClicked()
    {
        setIsAddPointsDialogShow(true);
    }
    function OnHideAddPointsDialogClicked()
    {
        setIsAddPointsDialogShow(false);
    }
    function OnAddPointsFinished(pointDatas)
    {
        OnHideAddPointsDialogClicked();
        const newPoints = pointDatas.split('\n');
        let pointObj = {};
        for (let i = 0; i < newPoints.length; i++) {
            var pointArr = newPoints[i].split(' ');
            if(pointArr.length < 5)
                continue;

            let coords = pointArr[0]+'-'+pointArr[1]+'-'+pointArr[2];

            pointObj[coords] = {};
            pointObj[coords].x = parseInt(pointArr[0]);
            pointObj[coords].y = parseInt(pointArr[1]);
            pointObj[coords].z = parseInt(pointArr[2]);

        }

        pointObj = {...state.points,...pointObj};
        dispatch({type:'setPoints',payload:pointObj})
    }

    function download(data, filename, type) {
        var file = new Blob([data], {type: type});
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }

    function OnSaveClicked(){
        const output = {points:state.points,lines:state.lines};

        console.log(JSON.stringify(output));
        download(JSON.stringify(output),'export.txt','.txt');
    }

    const drawer = (
        <div>
            <List>
                <ListItem button key="AddPoint" onClick={OnShowAddPointsDialogClicked}>
                    <ListItemIcon><AddIcon /> </ListItemIcon>
                </ListItem>
                <ListItem button key="Save" onClick={OnSaveClicked}>
                    <ListItemIcon><SaveIcon /> </ListItemIcon>
                </ListItem>
                <ListItem button key="Open" onClick={OnShowAddPointsDialogClicked}>
                    <ListItemIcon><FolderOpenIcon /> </ListItemIcon>
                </ListItem>
            </List>
        </div>
    );

    return (
        <div className={classes.flex}>
            <nav className={classes.drawer} aria-label="folders">
                {drawer}
            </nav>
            <AddPointsDialog isShow={isAddPointsDialogShow}
                             OnAddPointsCanceled={OnHideAddPointsDialogClicked}
                             OnAddPointsFinished={OnAddPointsFinished}
            />
            <PointCanvas points={state.points} />;

        </div>
    );
}


export default NavPlannerToolbox;
