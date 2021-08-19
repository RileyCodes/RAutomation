import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MinimizeIcon from "@material-ui/icons/Minimize";
import CloseIcon from "@material-ui/icons/Close";
import MyMenu from "./Menu";
import {makeStyles} from "@material-ui/core/styles";
import NewWindow from "react-new-window";


export default function Window(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            height:"100vh",
            width:"100vw",
            "flex-flow":"column",
            "display":"flex",
        },
        menuButton: {
            marginRight: theme.spacing(0),
        },
        title: {
            flexGrow: 1,
        },
        flex:{
            "flex-flow":"column",
            "flex":"1 1",
            "display":"flex",
        }
    }));

    const classes = useStyles();
    function min(){
        window.electron.min();
    }
    function close(){
        window.close();
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar  style={{ paddingRight: 0}} variant="dense">
                    <Typography  style={{ WebkitAppRegion :"drag" }} variant="h6" color="inherit" className={classes.title} >
                        {props.name}
                    </Typography>
                    <IconButton onClick={min} edge="start" className={classes.menuButton} color="inherit" aria-label="min">
                        <MinimizeIcon />
                    </IconButton>
                    <IconButton onClick={close} edge="start" className={classes.menuButton} color="inherit" aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {props.content}
        </div>
    );
}