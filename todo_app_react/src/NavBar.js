import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';

function NavBar() {
  return (
    <List>
      <ListItem  component={Link} to="/">
        <ListItemText primary="TODO List" />
      </ListItem>
      <ListItem  component={Link} to="/page">
        <ListItemText primary="Extra Page" />
      </ListItem>
    </List>
  );
}

export default NavBar;
