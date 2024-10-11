import { User } from '@/types/User';

interface UserTableProps {
  users: User[];
  onUserClick: (user: User) => void;
}

export default function UserTable({ users, onUserClick }: UserTableProps) {
  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">ID</th>
          <th className="py-2 px-4 border-b">Name</th>
          <th className="py-2 px-4 border-b">Email</th>
          <th className="py-2 px-4 border-b">Role</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} onClick={() => onUserClick(user)} className="cursor-pointer hover:bg-gray-100">
            <td className="py-2 px-4 border-b">{user.id}</td>
            <td className="py-2 px-4 border-b">{user.name}</td>
            <td className="py-2 px-4 border-b">{user.email}</td>
            <td className="py-2 px-4 border-b">{user.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}