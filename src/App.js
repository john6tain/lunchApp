import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import { SmartToaster, toast } from 'react-smart-toaster';
// import DoneAll from '@material-ui/icons/DoneAll';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import IconButton from '@material-ui/lab/IconButton';
import Home from './Home';
import Requester from './Requester';
// function App() {
//   return (
//     <Button variant="contained" color="primary">
//       Enter
//     </Button>
//   );
// }
const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    backgroundColor: theme.palette.background.paper,
    // overflow: 'auto',
  },
  listBottom: {
    // float: 'right',
    backgroundColor: theme.palette.background.paper,
    // overflow: 'hidden',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function App(props) {
  const [menu, setMenu] = React.useState([]);
  React.useEffect(() => {
    Requester.get('user/menu/get').then(res => {
      setMenu(res.orderMenu.split('\n'));
***REMOVED*** error => toast.error(error.responseJSON.message))
  }, [setMenu]);


  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [comment, setComment] = useState('');


  const handleInputChange = useCallback(event => {
    setComment(event.target.value)
  }, [setComment])

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
***REMOVED*** else {
      newChecked.splice(currentIndex, 1);
***REMOVED***

    setChecked(newChecked);
  ***REMOVED***
  const handleBuy = () => {

    // console.log({ user: name, comment: comment, menu: checked, price: calculatePrice(checked) });

    Requester.post('lunch/request', { user: name, comment: comment, menu: checked, price: calculatePrice(checked) })
      .then((res) => toast.success(res.message), err => toast.error(err.responseJSON.message));
    //   html2canvas(document.querySelector("#root")).then(canvas => {
    //     document.body.appendChild(canvas)
    // });
    // window.FB.ui({
    //   method: 'send',
    //   display: 'popup',
    //   link: `https://test.test`
    // });
  }
  const numberOfChecked = (items) => intersection(checked, items).length;

  const calculatePrice = (items) => { return items.length > 0 ? items.map(el => el.split('./')[1].split(' ')[0]).reduce((a, b) => Number(a) + Number(b), 0).toFixed(2) : ''; }

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
***REMOVED*** else {
      setChecked(union(checked, items));
***REMOVED***
  ***REMOVED***

  const customList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
    ***REMOVED***
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
    ***REMOVED***)}
        <ListItem />
      </List>
    </Card>
  );
  const selectedItems = (title, items) => (
    <Card className={classes.listBottom} >
      <Grid item
        xs={12} container
        spacing={1}
        direction="row"
      >
        <Grid item xs={10} container direction="column" spacing={0}>
          <List className={classes.listBottom} dense component="div" role="list">
            {items.map((value) => {
              const labelId = `transfer-list-all-item-${value}-label`;

              return (
                <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
                  <ListItemText id={labelId} primary={value} />
                </ListItem>
              );
        ***REMOVED***)}
            <ListItem />

          </List>
        </Grid>
        <Grid item xs={2} container direction="column" spacing={0} style={{ marginBottom: '1rem' }}>
          <TextField
            id="outlined-textarea"
            label="Add Comment"
            multiline
            value={comment} onChange={handleInputChange}
            variant="outlined"
            style={{ marginTop: '1rem', marginBottom: '1rem' }} />
          <Chip style={{ float: 'right' }} label={`${calculatePrice(items)} ${items.length > 0 ? items[0].split('./')[1].split(' ')[1] : ''} `} variant="outlined" color="primary" deleteIcon={<ShoppingCartIcon />} onDelete={handleBuy} />
        </Grid>
      </Grid>
    </Card>
  );
  const [name, setName] = useState('John');


  return (
    <div>

      <SmartToaster
        store={toast}
        lightBackground={true}
        position={"top_left"}
      />
      <Home name={name} onNameChange={setName}></Home>
      <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
        <Grid item>{customList('Choices', menu)}</Grid>
        <Grid item>
        </Grid>
      </Grid>
      {/* <Divider /> */}
      <Grid item>{selectedItems('You have selected', checked)}</Grid>
    </div>
  );
}
