import React, { useState, useEffect } from 'react';
import EditComponent from './EditComponent';
import DeleteComponent from './DeleteComponent';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
  
    // Fetch user data from the API
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
          const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchUsers();
    }, []);
  
    // Update filtered users when search query changes
    useEffect(() => {
      const filtered = users.filter((user) =>
        Object.values(user).some((value) => value.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredUsers(filtered);
    }, [users, searchQuery]);
  
    // Pagination
    const pageSize = 10;
    const totalPages = Math.ceil(filteredUsers.length / pageSize);
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
    const handleFirstPage = () => {
      setCurrentPage(1);
    };
  
    const handlePreviousPage = () => {
      setCurrentPage((prevPage) => prevPage - 1);
    };
  
    const handleNextPage = () => {
      setCurrentPage((prevPage) => prevPage + 1);
    };
  
    const handleLastPage = () => {
      setCurrentPage(totalPages);
    };
  
    // Select/Deselect all displayed rows
    const handleSelectAllRows = (event) => {
      if (event.target.checked) {
        const displayedRows = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);
        setSelectedRows(displayedRows);
      } else {
        const displayedRows = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);
        setSelectedRows(displayedRows);
      }
    };
  
    // Select/Deselect a row
    const handleSelectRow = (user) => {
      if (selectedRows.includes(user)) {
        setSelectedRows((prevSelectedRows) => prevSelectedRows.filter((row) => row !== user));
      } else {
        setSelectedRows((prevSelectedRows) => [...prevSelectedRows, user]);
      }
    };
  
    // Delete selected rows
    const handleDeleteSelectedRows = () => {
      const updatedUsers = users.filter((user) => !selectedRows.includes(user));
      setUsers(updatedUsers);
      setSelectedRows([]);
    };
  
    // Edit a user
    const handleEditUser = (userId, updatedUserData) => {
      const updatedUsers = users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            ...updatedUserData,
          };
        }
        return user;
      });
      setUsers(updatedUsers);
    };
  
    // Delete a user
    const handleDeleteUser = (userId) => {
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
    };
  
    return (
      <div>
        <h1>User Admin Interface</h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
  
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" onChange={handleSelectAllRows} />
              </th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((user) => (
                  <EditComponent key={user.id} user={user} onSave={handleEditUser} onCancel={() => handleSelectRow(user)} deleteUser={handleDeleteUser} />
              )
            )}
          </tbody>
        </table>
  
        <div>
          <button onClick={handleFirstPage} disabled={currentPage === 1}>
            First
          </button>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button key={page} onClick={() => handlePageChange(page)} disabled={page === currentPage}>
              {page}
            </button>
          ))}
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
          <button onClick={handleLastPage} disabled={currentPage === totalPages}>
            Last
          </button>
        </div>
  
        {selectedRows.length > 0 && (
          <button onClick={handleDeleteSelectedRows}>Delete Selected</button>
        )}
      </div>
    );
  };
  
  export default Home;