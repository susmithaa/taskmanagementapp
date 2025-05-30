import React, { useState } from "react";
import { Link } from "react-router-dom";

const tasks = [
  {
    id: 1,
    date: "2/02/2024 2:00 pm",
    task: "Design Navaratri poster",
    description: "Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero",
  },
  {
    id: 2,
    date: "2/02/2024 2:00 pm",
    task: "Design Navaratri poster",
    description: "Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero",
  },
  {
    id: 3,
    date: "2/02/2024 2:00 pm",
    task: "Design Navaratri poster",
    description: "Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero",
  },
];

const Tasks = () => {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#fff",
      padding: "40px 0",
      display: "flex",
      justifyContent: "center"
    }}>
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
            {tasks.map((t, idx) => (
              <tr key={t.id} style={{
                background: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                borderRadius: "10px",
                marginBottom: "10px",
                borderBottom: "2px solid #f3f4f6"
              }}>
                <td style={{ padding: "18px 10px" }}>{idx + 1}</td>
                <td style={{ padding: "18px 10px" }}>{t.date}</td>
                <td style={{ padding: "18px 10px" }}>{t.task}</td>
                <td style={{ padding: "18px 10px" }}>{t.description}</td>
                <td style={{ padding: "18px 10px", textAlign: "center" }}>
                  <span style={{ fontSize: 22, cursor: "pointer" }} title="Actions">&#8942;</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
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