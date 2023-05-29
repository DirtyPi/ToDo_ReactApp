import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import { cloneDeep } from 'lodash'; // Importing cloneDeep method from Lodash

function TodoApp() {
  const [todoList, setTodoList] = useState([]); // GlobalState to store the list of todos
  const [newTodo, setNewTodo] = useState(''); // State to store the value of the new todo input
  const [editIndex, setEditIndex] = useState(-1); // State to store the index of the todo being edited
  const [editValue, setEditValue] = useState(''); // State to store the value of the todo being edited

  const handleAddTodo = () => {
    if (newTodo !== '') {
      const updatedList = [...todoList, { value: newTodo, checked: false }]; // Adding a new todo item with value and checked properties
      setTodoList(updatedList); // Updating the todo list with the new item
      setNewTodo(''); // Resetting the new todo input
    }
  };

  const handleDeleteTodo = (index) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this todo?');
    if (shouldDelete) {
      const updatedList = [...todoList];
      updatedList.splice(index, 1); // Removing the item from the list using splice
      setTodoList(updatedList); // Updating the todo list
    }
  };

  const handleEditTodo = (index) => {
    setEditIndex(index); // Setting the index of the todo being edited
    setEditValue(todoList[index].value); // Setting the value of the todo item being edited
  };

  const handleSaveEdit = () => {
    if (editIndex >= 0 && editValue !== '') {
      const updatedList = cloneDeep(todoList); // Creating a deep copy of the todo list using cloneDeep from Lodash
      updatedList[editIndex].value = editValue; // Updating the value of the edited todo item
      setTodoList(updatedList); // Updating the todo list
      setEditIndex(-1); // Resetting the edit index
      setEditValue(''); // Resetting the edit value
    }
  };

  const handleToggleCheck = (index) => {
    const updatedList = cloneDeep(todoList); // Creating a deep copy of the todo list using cloneDeep from Lodash
    updatedList[index].checked = !updatedList[index].checked; // Toggling the checked state of the todo item
    setTodoList(updatedList); // Updating the todo list
  };

  const handleFilterCompleted = () => {
    const filteredList = todoList.filter((todo) => !todo.checked); // Using Array.filter to filter completed todos
    setTodoList(filteredList); // Updating the todo list with the filtered list
  };

  return (
    <div>
      {/* TextField for adding new todos */}
      <TextField
        label="Add Todo"
        variant="outlined"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      {/* Button to add a new todo */}
      <Button variant="contained" color="primary" onClick={handleAddTodo}>
        Add
      </Button>
      {/* Button to filter completed todos */}
      <Button variant="contained" color="secondary" onClick={handleFilterCompleted}>
        Filter Completed
      </Button>

      <List>
        {todoList.map((todo, index) => (
          <ListItem key={index}>
            {/* Checkbox to toggle the checked state of the todo */}
            <Checkbox
              checked={todo.checked}
              onChange={() => handleToggleCheck(index)}
            />
            {/* Conditional rendering based on whether the todo is being edited */}
            {editIndex === index ? (
              // TextField for editing the todo value
              <TextField
                variant="outlined"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
            ) : (
              // ListItemText to display the todo value
              <ListItemText
                primary={todo.value}
                style={{
                  textDecoration: todo.checked ? 'line-through' : 'none',
                }}
              />
            )}
            {/* Conditional rendering based on whether the todo is being edited */}
            {editIndex === index ? (
              // Button to save the edited todo
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveEdit}
              >
                Save
              </Button>
            ) : (
              <>
                {/* Button to delete the todo */}
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteTodo(index)}
                >
                  Delete
                </Button>
                {/* Button to initiate editing of the todo */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditTodo(index)}
                >
                  Edit
                </Button>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default TodoApp;
