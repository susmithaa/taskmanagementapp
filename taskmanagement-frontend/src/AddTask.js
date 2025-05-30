import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const AddTask = ({ onSave, onCancel }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:3000/task", {
      method: "POST",
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
      setMessage("Task added successfully!");
      if (onSave) onSave(data);
    } else {
      setMessage(data.message || "Failed to add task");
    }
  } catch (error) {
    setMessage("Network error");
  }
};

const handleCancel = () => {
    navigate("/tasks");
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#fff"
    }}>
      <form
        onSubmit={handleSubmit}
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
        <h2 style={{ marginBottom: 40, fontWeight: 600, fontSize: 32 }}>Add Task</h2>
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
          Save
        </button>
        <button
          type="button"
          onClick={handleCancel}
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

export default AddTask;