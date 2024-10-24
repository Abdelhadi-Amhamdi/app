'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation'
import clsx from 'clsx';

const links = [
    { name: 'Home', href: '/dashboard' },
    {
      name: 'my offers',
      href: '/dashboard/offers',
    },
    { 
      name: 'find job', 
      href: '/dashboard/jobs'
    },
  ];

export default function NavLinks() {
    const pathname = usePathname()
    return (
      <>
        {links.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                `flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-400 md:flex-none md:justify-start md:p-2 md:px-3`,
                {
                  'bg-gray-600 text-white' : pathname === link.href,
                },
              )}
            >
              <p className="capitalize">{link.name}</p>
            </Link>
          );
        })}
      </>
    );
  }