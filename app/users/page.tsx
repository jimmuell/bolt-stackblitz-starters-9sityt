'use client';

import { useState, useEffect } from 'react';
import UserTable from '@/components/UserTable';
import UserModal from '@/components/UserModal';
import { User } from '@/types/User';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('/api/users');
    const data = await response.json();
    setUsers(data);
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleCreateUser = async (newUser: User) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });
    const createdUser = await response.json();
    setUsers([...users, createdUser]);
    handleCloseModal();
  };

  const handleUpdateUser = async (updatedUser: User) => {
    const response = await fetch(`/api/users/${updatedUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser),
    });
    const updated = await response.json();
    setUsers(users.map(user => user.id === updated.id ? updated : user));
    handleCloseModal();
  };

  const handleDeleteUser = async (userId: number) => {
    await fetch(`/api/users/${userId}`, { method: 'DELETE' });
    setUsers(users.filter(user => user.id !== userId));
    handleCloseModal();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Add New User
      </button>
      <UserTable users={users} onUserClick={handleUserClick} />
      {isModalOpen && (
        <UserModal
          user={selectedUser}
          onClose={handleCloseModal}
          onCreate={handleCreateUser}
          onUpdate={handleUpdateUser}
          onDelete={handleDeleteUser}
        />
      )}
    </div>
  );
}