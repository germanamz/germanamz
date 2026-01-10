'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaBars, FaXmark } from 'react-icons/fa6';

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Me' },
    { href: '/resume', label: 'Résumé' },
    { href: '/writing', label: 'Writing' },
  ];

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden mb-2 p-2"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <FaXmark className="w-6 h-6" />
        ) : (
          <FaBars className="w-6 h-6" />
        )}
      </button>
      <ul className={`flex flex-col gap-2 ${isOpen ? 'block' : 'hidden'} md:flex`}>
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={isActive ? 'underline' : ''}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
