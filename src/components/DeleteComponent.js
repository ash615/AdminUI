import React, { useState, useEffect } from 'react';

const DeleteComponent = ({ user, onDelete }) => {
    const handleDelete = () => {
      onDelete(user.id);
    };
  
    return (
      <tr>
        <td></td>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>
          <button onClick={handleDelete(user.id)}>Delete</button>
        </td>
      </tr>
    );
  };

  export default DeleteComponent;