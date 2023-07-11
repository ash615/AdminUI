import React, { useState, useEffect } from 'react';

const EditComponent = ({ user, onSave, onCancel }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  const handleSave = () => {
    onSave(user.id, {
      name,
      email,
      role,
    });
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <tr>
      <td> <input type="checkbox" onChange={handleCancel}/></td>
      <td>{user.id}</td>
      <td>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </td>
      <td>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </td>
      <td>
        <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
      </td>
      <td>
        <button onClick={handleSave}>Edit</button>
        {/* <button onClick={deleteUser(user)}>Delete</button> */}
      </td>
    </tr>
  );
};

export default EditComponent;