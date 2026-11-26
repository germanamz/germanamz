'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaBars, FaXmark } from 'react-icons/fa6';

const MENU_ID = 'primary-navigation-menu';

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Me' },
    { href: '/resume', label: 'Résumé' },
    { href: '/writing', label: 'Writing' },
  ];

  return (
    <nav aria-label="Primary">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden mb-2 p-2"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        aria-controls={MENU_ID}
      >
        {isOpen ? (
          <FaXmark className="w-6 h-6" aria-hidden="true" />
        ) : (
          <FaBars className="w-6 h-6" aria-hidden="true" />
        )}
      </button>
      <ul id={MENU_ID} className={`flex flex-col gap-2 ${isOpen ? 'block' : 'hidden'} md:flex`}>
        {navItems.map((item) => {
          const isCurrent = pathname === item.href;
          // A post under /writing keeps "Writing" highlighted, but it is the
          // section, not the page itself.
          const isActive =
            isCurrent || (item.href !== '/' && pathname.startsWith(`${item.href}/`));

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={isActive ? 'underline' : ''}
                aria-current={isCurrent ? 'page' : isActive ? 'true' : undefined}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
