'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { name: 'Overview', path: '/' },
  { name: 'Analytics', path: '/analytics' },
  { name: 'Users', path: '/users' },
  { name: 'Settings', path: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-64 bg-gray-800 h-screen text-white p-4">
      <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
      <ul>
        {menuItems.map((item) => (
          <li key={item.name} className="mb-4">
            <Link href={item.path} className={`block p-2 rounded ${pathname === item.path ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}