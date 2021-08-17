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

const drawerWidth = 50;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
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
    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
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
    const [points,setPoints] = React.useState(false);

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
        console.log(pointDatas);
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
        <div className={classes.root}>
            <nav className={classes.drawer} aria-label="folders">
                {drawer}
            </nav>
            <AddPointsDialog isShow={isAddPointsDialogShow}
                             OnAddPointsCanceled={OnHideAddPointsDialogClicked}
                             OnAddPointsFinished={OnAddPointsFinished}
            />
            <main className={classes.content}>
                <Stage width="200" height="200">
                    <Layer>
                        <Circle
                            x={20}
                            y={20}
                            draggable
                            radius={3}
                            fill="red"
                        />
                    </Layer>
                </Stage>
            </main>
        </div>
    );
}

NavPlannerToolbox.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default NavPlannerToolbox;
