import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  deleteItem,
  editItem,
  toggleDone,
  filterByStatus,
} from "../redux/itemsSlice";

const Todo = () => {
  const [newTask, setNewTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const dispatch = useDispatch();

  const { todos, filter } = useSelector((state) => state.items);

  const handleAdd = () => {
    if (newTask.trim() === "") return;
    dispatch(addItem(newTask));
    setNewTask("");
  };

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleSaveEdit = (id) => {
    dispatch(editItem({ id, text: editText }));
    setEditId(null);
  };

  const filteredTodos =
    filter === "done"
      ? todos.filter((t) => t.done)
      : filter === "doing"
      ? todos.filter((t) => !t.done)
      : todos;

  return (
    <div className="todo-container">
      <h2>📝 مدیریت تسک‌ها</h2>

      {/* Add Task */}
      <div className="add-task">
        <input
          type="text"
          placeholder="تسک جدید..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAdd}>افزودن</button>
      </div>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button onClick={() => dispatch(filterByStatus("all"))}>همه</button>
        <button onClick={() => dispatch(filterByStatus("doing"))}>در حال انجام</button>
        <button onClick={() => dispatch(filterByStatus("done"))}>انجام شده</button>
      </div>

      {/* Todo List */}
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {editId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button className="edit" onClick={() => handleSaveEdit(todo.id)}>
                  ذخیره
                </button>
              </>
            ) : (
              <>
                <span className={todo.done ? "done" : ""}>{todo.text}</span>
                <div>
                  <button className="edit" onClick={() => handleEdit(todo.id, todo.text)}>
                    ویرایش
                  </button>
                  <button className="delete" onClick={() => dispatch(deleteItem(todo.id))}>
                    حذف
                  </button>
                  <button className="done" onClick={() => dispatch(toggleDone(todo.id))}>
                    {todo.done ? "بازگردانی" : "انجام شد"}
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
