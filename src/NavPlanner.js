import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { render } from 'react-dom';
import {Stage, Layer, Rect, Text, Circle} from 'react-konva';
import Konva from 'konva';
import AddPointsDialog from './AddPoints'
import AddIcon from '@material-ui/icons/Add';
import PointCanvas from "./PointCanvas";

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

class ColoredRect extends React.Component {
    state = {
        color: "green",
        height:50
    };
    handleClick = () => {
        this.setState((state,props) => ({
            color: Konva.Util.getRandomColor(),
            points:{}
        }));
    };
    render() {
        return (
            <Rect
                x={20}
                y={20}
                width={50}
                height={this.state.height}
                fill={this.state.color}
                onClick={this.handleClick}
            />
        );
    }
}


function NavPlannerToolbox(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [isAddPointsDialogShow,setIsAddPointsDialogShow] = React.useState(false);
    const [points,setPoints] = React.useState([]);

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
        for (let i = 0; i < newPoints.length; i++) {
            var pointArr = newPoints[i].split(' ');
            if(pointArr.length != 5)
                continue;
            let pointObj = {};
            pointObj["x"] = pointArr[0];
            pointObj["y"] = pointArr[1];
            pointObj["z"] = pointArr[2];
            //pointObj["rp"] = pointArr[3];
            //pointObj["ry"] = pointArr[4];

            //25384 134962 -46802 21.29 -2.03
            const combinedPoints = points.concat([pointObj]);
            setPoints(combinedPoints);
            console.log(combinedPoints);
        }
    }

    const drawer = (
        <div>
            <List>
                <ListItem button key="AddPoint" onClick={OnShowAddPointsDialogClicked}>
                    <ListItemIcon><AddIcon /> </ListItemIcon>
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
            <PointCanvas/>
        </div>
    );
}


export default NavPlannerToolbox;
