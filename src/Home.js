
// import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Grid, Button } from '@material-ui/core';
// import FB from 'fb';
import React, { useCallback } from 'react';
import Requester from './Requester';
import { SmartToaster, toast } from 'react-smart-toaster'
import { useHistory } from "react-router-dom";

export default function Home({ name, onNameChange }) {
    const history = useHistory();
    const handleInputChange = useCallback(event => {
        onNameChange(event.target.value)
***REMOVED*** [onNameChange])
    let password;
    const handleChange = evt => {
        password = evt.target.value;
***REMOVED***;

    const checkLogin = () => {
        Requester.post('user/login', { username: name, password: password })
            .then((res) => {
                toast.success(res.message);
                sessionStorage.setItem('Authentication', res.token);

                Requester.get('lunch/admin/requests', true)
                    .then((res) => {
                        toast.success(res.message);
                        // sessionStorage.setItem('Authentication', res.token);
                        history.push('/Admin', res);
                ***REMOVED***
                        err => toast.error(err.responseJSON.message));
        ***REMOVED***
                err => toast.error(err.responseJSON.message));
***REMOVED***
    return (
        <Grid container
            spacing={1}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            <SmartToaster
                store={toast}
                lightBackground={true}
                position={"top_left"}
            />
            <TextField id="outlined-basic" label="Enter Your Name" variant="outlined" onChange={handleInputChange} value={name} style={{ marginTop: '1rem', marginBottom: '1rem' }} />
            {(name === 'Vanesa' || name === 'john') ? <TextField id="outlined-basic" type="password" label="Enter Your special word" variant="outlined" onChange={handleChange} value={password} style={{ marginBottom: '1rem' }} /> : ''}
            {(name === 'Vanesa' || name === 'john') ? <Button variant="contained" color="primary" onClick={checkLogin}> Enter</Button> : ''}
        </Grid>
    );
}

