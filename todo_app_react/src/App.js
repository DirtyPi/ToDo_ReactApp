import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import NavBar from '../src/NavBar';
import TodoListPage from '../src/todo';
import ExtraPage from '../src/ExtraPage';

function App() {
  return (
    <Router>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <NavBar />
          </Grid>
          <Grid item xs={9}>
            <Routes>
              <Route path="/" element={<TodoListPage />} />
              <Route path="/page" element={<ExtraPage />} />
            </Routes>
          </Grid>
        </Grid>
      </Container>
    </Router>
  );
}

export default App;
