import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AssistantPhoto from '@material-ui/icons/AssistantPhoto';
import Assignment from "@material-ui/icons/Assignment";
import NavPlanner from "./NavPlanner";




function TabPanel(props) {
    const classes = useStyles();
    const { children, value, index, ...other } = props;

    return value === index && (
        <div
            className={classes.flex}
            style={{flex:'1 1'}}
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {children}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        flex:'1 1'

    },
    flex:{
        "flex-flow":"column",
        "flex":"1 1",
        "display":"flex",
    },
    tab: {
        '& .MuiBox-root': {
            padding: '0px',
        },
    },
}));

export default function MainView() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div className={classes.flex}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable force tabs example"
                >

                    <Tab label={
                        <div>
                            <Typography variant="caption">
                                Navigate Planner
                            </Typography>
                        </div>
                    } icon={<AssistantPhoto />} {...a11yProps(0)} />

                    <Tab label={
                        <div>
                            <Typography variant="caption">
                                Bots
                            </Typography>
                        </div>
                    } icon={<Assignment />} {...a11yProps(0)} />
                </Tabs>
            </AppBar>
            <TabPanel  value={value} index={0} classes={{ root: classes.tab }}>
                <NavPlanner/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
        </div>
    );
}