import React, { useState } from "react";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    alert(`Signed up as ${form.name} (${form.email})`);
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: 8, marginTop: 4 }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: 8, marginTop: 4 }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: 8, marginTop: 4 }}
            />
          </label>
        </div>
        <button type="submit" style={{ padding: "8px 16px" }}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
