
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import EditableDiv from './EditableDiv';
import { SmartToaster, toast } from 'react-smart-toaster';
import html2canvas from 'html2canvas';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, IconButton, TextField } from '@material-ui/core';
import Requester from './Requester';

export default function Admin() {
    const location = useLocation();
    const history = useHistory();
    let res = location.state;
    const [open, setOpen] = React.useState(false);
    const [menuValue, setMenu] = React.useState('');
    const handleInputChange = (event) => {
        setMenu(event.target.value);
***REMOVED***
    const [selectedId, setSelectedId] = React.useState('');
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    if (!res) {
        history.push('/')
***REMOVED***

    // useEffect(() => {
    //     if (res && res.menu) {
    // ***REMOVED*** else {
    //         // dispatch({ type: "RESET" });
    // ***REMOVED***
    // }, [res]);
    const updateMenu = () => {
        Requester.post(`user/menu/update`, { name: 'theMenu', orderMenu: menuValue, payload: 1 }, true).then(resp => {
            toast.success(resp.message);
    ***REMOVED*** error => {
            toast.error(error.responseJSON.message);
    ***REMOVED***)
***REMOVED***

    const sendRequest = () => {
        html2canvas(document.querySelector("#forPrint"), { scrollY: -window.scrollY }).then(canvas => {
            // document.body.appendChild(canvas)
            const img = canvas.toDataURL("image/png");
            var image = new Image();
            image.src = img;
    
            var w = window.open("");
            w.document.write(image.outerHTML);
            // Requester.uploadImage(img).then(res => {
            //     toast.success("Image uploaded succesfuly");
                
            //     // var a = document.createElement("a");
            //     // a.href = res;
            //     // a.download = "order.png";
            //     // a.click();

            //     // window.location = ''
            // }, error => {
            //     toast.error(error.responseJSON.message);
            // })

            // window.FB.ui({
            //     method: 'send',
            //     display: 'popup',
            //     // link: 'https://asd.com'
            //     link: image.outerHTML
            // });

            // document.body.removeChild(link);
            // window.open(img, '_blank');
    ***REMOVED***);
***REMOVED***

    const deleteRecord = () => {
        console.log(selectedId);
        res.menu = null;
        Requester.delete(`user/delete/lunch/request/${selectedId}`, true).then(resp => {
            handleClose();
            setTimeout(() => {
                res.menu = resp.menu.menu;
                forceUpdate();
        ***REMOVED*** 1);
            toast.success(resp.message);

    ***REMOVED*** error => {
            handleClose();
            toast.error(error.responseJSON.message);
    ***REMOVED***)
***REMOVED***


    const handleClickOpen = (id) => {
        setSelectedId(id);
        setOpen(true);
***REMOVED***;

    const handleClose = () => {
        setOpen(false);
***REMOVED***;

    return (
        <Card>
            <SmartToaster
                store={toast}
                lightBackground={true}
                position={"top_left"}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Do you want to remove the record form the DB?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        With this action you will permanently delete the request
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={deleteRecord} color="primary" autoFocus>
                        Delete
          </Button>
                </DialogActions>
            </Dialog>
            <div id="forPrint">
                {(res && res.menu) ? res.menu.map((parent) => (

                    <Card key={parent._id}>
                        <CardHeader key={parent._id + 0}
                            title={parent.user}

                        />
                        <Divider key={parent._id + 1} />
                        <Grid item key={parent._id + 2}
                            sm={12} xs={10} container
                            spacing={1}
                            direction="row">
                            <Grid item xs={11} container direction="column" spacing={0} key={parent._id + 4}>
                                <List dense component="div" role="list" key={parent._id + 5}>
                                    {parent.menu.map((value) => {
                                        return (
                                            <ListItem key={value + 1} role="listitem">
                                                <EditableDiv key={value} menuItem={value}></EditableDiv>
                                            </ListItem>
                                        );
                                ***REMOVED***)}
                                    <ListItem />
                                </List>
                                <div key={parent._id + 8}>Comment: {parent.comment}</div>
                            </Grid>
                            <Grid item xs={1} container direction="column" spacing={0} style={{ marginBottom: '1rem' }} key={parent._id + 6}>
                                <IconButton aria-label="close" onClick={() => { handleClickOpen(parent._id) }}>
                                    <CloseIcon />
                                </IconButton>
                                <Chip style={{ marginTop: '3rem' }} label={parent.price + ' лв.'} variant="outlined" color="primary" key={parent._id + 7} />
                            </Grid>
                        </Grid>
                    </Card>
                )) :
                    <h1>No Records Found</h1>
            ***REMOVED***
            </div>
            <Button variant="contained" color="primary" onClick={sendRequest} style={{ float: 'right', marginTop: '1rem', marginRight: '1rem' }}> Send Request</Button>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="stretch"
                style={{ padding: '5rem' }}>
                <TextField
                    id="outlined-textarea"
                    label="Update order Menu"
                    multiline
                    value={menuValue} onChange={handleInputChange}
                    variant="outlined"
                    style={{ marginTop: '1rem', marginBottom: '1rem' }} />
                <Button variant="contained" color="primary" onClick={updateMenu}> Update</Button>
            </Grid>
        </Card>
    );

}
