import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";


const EditTaskPopup = ({ task, onClose, onUpdate }) => {
  const [taskName, setTaskName] = useState(task.taskName || "");
  const [description, setDescription] = useState(task.description || "");
  const [date, setDate] = useState(task.dueDate ? task.dueDate.slice(0, 10) : "");
  const [message, setMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/task/${task._id || task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({
          taskName,
          description,
          dueDate: date
        })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Task updated successfully!");
        onUpdate(data);
        onClose();
      } else {
        setMessage(data.message || "Failed to update task");
      }
    } catch (error) {
      setMessage("Network error");
    }
  };

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    }}>
      <form
        onSubmit={handleUpdate}
        style={{
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          padding: "60px 40px",
          minWidth: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h2 style={{ marginBottom: 40, fontWeight: 600, fontSize: 32 }}>Edit Task</h2>
        <input
          type="text"
          placeholder="Enter Task Name"
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
          style={{
            width: 320,
            padding: "16px",
            borderRadius: "8px",
            border: "none",
            background: "#ededed",
            marginBottom: 24,
            fontSize: 18
          }}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{
            width: 320,
            padding: "16px",
            borderRadius: "8px",
            border: "none",
            background: "#ededed",
            marginBottom: 24,
            fontSize: 18
          }}
          required
        />
        <input
          type="date"
          placeholder="Date Picker"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={{
            width: 320,
            padding: "16px",
            borderRadius: "8px",
            border: "none",
            background: "#ededed",
            marginBottom: 36,
            fontSize: 18
          }}
          required
        />
        <button
          type="submit"
          style={{
            width: 120,
            padding: "14px 0",
            borderRadius: "30px",
            border: "none",
            background: "#2239a7",
            color: "#fff",
            fontSize: 20,
            fontWeight: 500,
            marginBottom: 18,
            cursor: "pointer"
          }}
        >
          Update
        </button>
        <button
          type="button"
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#111",
            fontSize: 18,
            cursor: "pointer"
          }}
        >
          Cancel
        </button>
        {message && (
          <div style={{
            marginTop: 20,
            color: "#2239a7",
            fontWeight: 500,
            textAlign: "center"
          }}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};


const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuTaskId, setMenuTaskId] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const menuRef = useRef();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3000/task", {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        });
        const data = await response.json();
        if (response.ok) {
          setTasks(data);
        }
      } catch (error) {
        setTasks([]);
      }
      setLoading(false);
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuTaskId(null);
      }
    };
    if (menuTaskId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuTaskId]);

  const handleMenuClick = (taskId) => {
    setMenuTaskId(taskId === menuTaskId ? null : taskId);
  };

  const handleEdit = (task) => {
    setMenuTaskId(null);
    setEditTask(task); 
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(prev =>
      prev.map(t =>
        (t._id || t.id) === (updatedTask._id || updatedTask.id) ? updatedTask : t
      )
    );
  };

 const handleDelete = async (task) => {
  setMenuTaskId(null);
  if (window.confirm(`Are you sure you want to delete "${task.taskName}"?`)) {
    try {
      const response = await fetch(`http://localhost:3000/task/${task._id || task.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      });
      const data = await response.json();
      if (response.ok) {
        setTasks(prev => prev.filter(t => (t._id || t.id) !== (task._id || task.id)));
        alert("Task deleted successfully!");
      } else {
        alert(data.message || "Failed to delete task");
      }
    } catch (error) {
      alert("Network error");
    }
  }
};

  return (
    <div style={{
      minHeight: "100vh",
      background: "#fff",
      padding: "40px 0",
      display: "flex",
      justifyContent: "center"
    }}>
      {editTask && (
        <EditTaskPopup
          task={editTask}
          onClose={() => setEditTask(null)}
          onUpdate={handleUpdateTask}
        />
      )}
      <div style={{
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        width: "90vw",
        maxWidth: "1400px",
        padding: "40px 30px"
      }}>
        
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
          <h2 style={{ color: "#3559c7", fontWeight: 500, fontSize: 32, letterSpacing: 1 }}>Tasks&nbsp;&nbsp;Management</h2>
          <Link to="/AddTask">
            <button style={{
              background: "#264ec5",
              color: "#fff",
              border: "none",
              borderRadius: "40px",
              padding: "18px 40px",
              fontSize: 20,
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center"
            }}>
              <span style={{ fontSize: 28, marginRight: 10 }}>+</span> Add Task
            </button>
          </Link>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ color: "#3559c7", fontWeight: 500, fontSize: 16 }}>
              <th style={{ textAlign: "left", padding: "12px 10px" }}>No</th>
              <th style={{ textAlign: "left", padding: "12px 10px" }}>Date & Time</th>
              <th style={{ textAlign: "left", padding: "12px 10px" }}>Task</th>
              <th style={{ textAlign: "left", padding: "12px 10px" }}>Description</th>
              <th style={{ textAlign: "left", padding: "12px 10px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: 30 }}>Loading...</td>
              </tr>
            ) : tasks.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: 30 }}>No tasks found.</td>
              </tr>
            ) : (
              tasks.map((t, idx) => (
                <tr key={t._id || t.id} style={{
                  background: "#fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  borderBottom: "2px solid #f3f4f6"
                }}>
                  <td style={{ padding: "18px 10px" }}>{idx + 1}</td>
                  <td style={{ padding: "18px 10px" }}>
                    {t.dueDate
                      ? new Date(t.dueDate).toLocaleString()
                      : t.date}
                  </td>
                  <td style={{ padding: "18px 10px" }}>{t.taskName || t.task}</td>
                  <td style={{ padding: "18px 10px" }}>{t.description}</td>
                  <td style={{ padding: "18px 10px", textAlign: "center", position: "relative" }}>
                    <span
                      style={{ fontSize: 22, cursor: "pointer" }}
                      title="Actions"
                      onClick={() => handleMenuClick(t._id || t.id)}
                    >
                      &#8942;
                    </span>
                    {menuTaskId === (t._id || t.id) && (
                      <div
                        ref={menuRef}
                        style={{
                          position: "absolute",
                          top: 35,
                          right: 10,
                          background: "#444",
                          color: "#22223b",
                          borderRadius: 8,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                          minWidth: 100,
                          zIndex: 10,
                          padding: "8px 0"
                        }}
                      >
                        <div
                          style={{
                            padding: "8px 18px",
                            cursor: "pointer",
                            color: "#22223b",
                            background: "#fff",
                            fontWeight: 500
                          }}
                          onClick={() => handleEdit(t)}
                        >
                          &#10003; Edit
                        </div>
                        <div
                          style={{
                            padding: "8px 18px",
                            cursor: "pointer",
                            color: "#22223b",
                            background: "#fff"
                          }}
                          onClick={() => handleDelete(t)}
                        >
                          Delete
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 40
        }}>
          <button style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px 0 0 8px",
            padding: "8px 18px",
            marginRight: 2,
            cursor: "pointer"
          }}>&#60;</button>
          {[1, 2, 3, 4, 5, 6].map(num => (
            <button
              key={num}
              style={{
                background: num === 1 ? "#fff" : "transparent",
                border: "1px solid #e5e7eb",
                fontWeight: num === 1 ? 600 : 400,
                color: "#222",
                padding: "8px 12px",
                marginRight: 2,
                cursor: "pointer"
              }}
            >
              {num}
            </button>
          ))}
          <button style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "0 8px 8px 0",
            padding: "8px 18px",
            marginLeft: 2,
            cursor: "pointer"
          }}>&#62;</button>
        </div>
      </div>
    </div>
  );
};

export default Tasks;