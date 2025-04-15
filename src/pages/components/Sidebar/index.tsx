'use client';
import Link from 'next/link';

import { ScrollArea } from '@/components/ui/scroll-area';
import { navItems } from '@/src/config/nav';

export default function Sidebar() {
  return (
    <div className="h-screen w-[14%] bg-[#F4F7FA] border-r border-gray-200 text-[#1E2A38] flex flex-col">
      <ScrollArea className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="flex items-center gap-3 p-4 text-sm rounded-md hover:bg-[#E2ECF6] hover:text-[#004080] transition-colors"
          >
            <item.icon className="w-4 h-4" />
            {item.title}
          </Link>
        ))}
      </ScrollArea>
    </div>
  );
}
