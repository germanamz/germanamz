'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Me' },
    { href: '/resume', label: 'Résumé' },
    { href: '/writing', label: 'Writing' },
  ];

  return (
    <ul className="flex flex-col gap-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href ||
          (item.href !== '/' && pathname.startsWith(item.href));

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={isActive ? 'underline' : ''}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
