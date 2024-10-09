
import { useState } from 'react';
import './TodoList.css';
const TodoList = () => {
    // item store in state
  const [todos, setTodos] = useState([]);
  // input
  const [inputValue, setInputValue] = useState("");
  // edit item id
  const [editTodoId, setEditTodoId] = useState(null);
    // edit item text
  const [editText, setEditText] = useState("");

  // ITEM ADD
  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: inputValue }]); // ADD ITEM
      setInputValue(""); // VALUE CLEAN
    }
  };

  // DELETE ITEM
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id)); 
  };

  // NPUT BOX EDIT
  const handleEditTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id); 
    setEditTodoId(id); 
    setEditText(todo.text);
  };

  const handleSaveEdit = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editTodoId ? { ...todo, text: editText } : todo 
      )
    );
    setEditTodoId(null); 
    setEditText(""); 
  };
  return (
    <div className="app">
      <h1>Todo List</h1>
      <div className="input-area">
        <input
          type="text"
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <div className="todo-list">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            {editTodoId === todo.id ? ( 
              <div className='edit-section'>
                <input
                  type="text"
                  value={editText} 
                  onChange={(e) => setEditText(e.target.value)} 
                />
                <button onClick={handleSaveEdit}>Save</button> 
              </div>
            ) : (
              <div className='todo-item-content'>
                <span>{todo.text}</span> 
                <button onClick={() => handleEditTodo(todo.id)}>Edit</button> 
                <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button> 
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TodoList
