import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {TextareaAutosize} from "@material-ui/core";

export default function AddPointsDialog(props) {

    const [textContent, setTextContent] = React.useState(false);

    function onTextEditChanged(event)
    {
        setTextContent(event.target.value)
    }

    function onFinish()
    {
        props.OnAddPointsFinished(textContent);
    }

    return (
        <Dialog open={props.isShow} onClose={props.OnAddPointsCanceled} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Key Points</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter the list of the points you would like to add.
                </DialogContentText>
                <TextField
                    multiline
                    minRows={5}
                    maxRows={10}
                    aria-label="maximum height"
                    placeholder="Add your points here."
                    defaultValue=""
                    fullWidth={true}
                    onChange={onTextEditChanged}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.OnAddPointsCanceled} color="primary">
                    Cancel
                </Button>
                <Button onClick={onFinish} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}