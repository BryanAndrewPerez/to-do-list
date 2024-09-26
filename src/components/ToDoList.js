import React, {useState} from "react";
import './ToDoList.css';
import {useEffect} from "react";

function ToDoList(){

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const[value,setValue] = useState(1);

    useEffect(() => {
      if(value % 2 == 0)
      playSound()
    },[value]);

    function handleInputChange(event){
        setNewTask(event.target.value);

    }

    function addTask(){
        if (newTask.trim() !== "") {
            setTasks([...tasks, { text: newTask, isComplete: false, isEditing: false }]);
            setNewTask("");
          }

    }

    function playSound(){
      
    }
    
    function toggleCompleteTask(index) {
        const updatedTasks = tasks.map((task, i) => 
          i === index ? { ...task, isComplete: !task.isComplete } : task
        );
        setTasks(updatedTasks);
      }

      function editTask(index) {
        const updatedTasks = tasks.map((task, i) => 
          i === index ? { ...task, isEditing: true } : task
        );
        setTasks(updatedTasks);
      }

      function saveTask(index, newText) {
        const updatedTasks = tasks.map((task, i) => 
          i === index ? { ...task, text: newText, isEditing: false } : task
        );
        setTasks(updatedTasks);
      }

    function deleteTask(index){
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);

    }

    function handleEditChange(event, index) {
        const updatedTasks = tasks.map((task, i) =>
          i === index ? { ...task, text: event.target.value } : task
        );
        setTasks(updatedTasks);
      }

      function reopenTask(index) {
        const updatedTasks = tasks.map((task, i) =>
          i === index ? { ...task, isComplete: false } : task
        );
        setTasks(updatedTasks);
      }

      return (
        <div className="to-do-list">
          <h1>To-Do List</h1>
    
          <div>
            <input
              type="text"
              placeholder="Enter a task..."
              value={newTask}
              onChange={handleInputChange}
            />
            <button className="add-button" onClick={() => { addTask(); setValue(value + 1); }}>
              Add
            </button>
          </div>
    
          {tasks.length === 0 ? (
            <p>No todos available. Add a todo to get started!</p>
          ) : (
            <ol>
              {tasks.map((task, index) => (
                <li key={index}>
                  {task.isEditing ? (
                    <>
                      <input
                        type="text"
                        value={task.text}
                        onChange={(event) => handleEditChange(event, index)}
                      />
                      <button onClick={() => saveTask(index, task.text)}>Save</button>
                    </>
                  ) : (
                    <>
                      <span
                        className="text"
                        style={{
                          textDecoration: task.isComplete ? "line-through" : "none"
                        }}
                      >
                        {task.text}
                      </span>
                      <button
                        className="complete-button"
                        onClick={() => toggleCompleteTask(index)}
                        disabled={task.isEditing || task.isComplete}
                      >
                        Complete
                      </button>
                      <button
                        className="edit-button"
                        onClick={() => editTask(index)}
                        disabled={task.isComplete}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => deleteTask(index)}
                        disabled={task.isEditing || task.isComplete}
                      >
                        Remove
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ol>
          )}
        </div>
      );
    }

export default ToDoList