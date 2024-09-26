import React, { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [buttonState, setButtonState] = useState("add");  // State to track button action (add or edit)
  const [user, setUser] = useState([]);                   // State to hold the list of users
  const [userInfo, setUserInfo] = useState({              // State for the currently active user form data
    id: uuidv4(),
    name: "",
    age: "",
    email: "",
    phone: "",
  });

  function handleChange(e) {                               // Handle input change                 
    const { name, value } = e.target;
    setUserInfo(function (currInfo) {
      return {
        ...currInfo,
        [name]: value,
      };
    });
  }

  function addDate() {                                      // Add new user
    setUser(function (currUsers) {
      return [...currUsers, userInfo];
    });
    setUserInfo({
      id: uuidv4(),
      name: "",
      age: "",
      email: "",
      phone: "",
    });
  }

  function updateData() {                                    // Update user details
    setUser(function (currUsers) {
      return currUsers.map(function (user) {
        if (user.id === userInfo.id) {
          return userInfo;
        }
        return user;
      });
    });
    cancelEditing();
  }

  function deleteData(id) {                                    // Delete user details
    setUser(function (currUsers) {
      return currUsers.filter(function (user) {
        return user.id !== id;
      });
    });
  }

  function startEditing(user) {                      // Populate user info for editing
    setUserInfo(user);
    setButtonState("edit");
  }

  function cancelEditing() {                        // Reset form and switch back to 'add' mode
    setUserInfo({
      id: uuidv4(),
      name: "",
      age: "",
      email: "",
      phone: "",
    });
    setButtonState("add");
  }

  return (
    <div className="container">
      <div className="form">
        <input type="text" placeholder="Enter Name" value={userInfo.name} name="name" onChange={handleChange} />
        <br />
        <input type="number" placeholder="Enter age" value={userInfo.age} name="age" onChange={handleChange} />
        <br />
        <input type="text" placeholder="Enter email" value={userInfo.email} name="email" onChange={handleChange} />
        <br />
        <input type="number" placeholder="Enter phone" value={userInfo.phone} name="phone" onChange={handleChange} />
        <br />

        {buttonState === "add" ? (
          <button onClick={addDate}>Add</button>
        ) : (
          <div>
            <button onClick={updateData}>Update</button>
            <button onClick={cancelEditing}>Cancel</button>
          </div>
        )}
      </div>

      <div className="dataTable">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {user.map(function (user, index) {
              return (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button onClick={function () { startEditing(user); }}>Edit</button>{" "}
                    <button onClick={function () { deleteData(user.id); }}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
