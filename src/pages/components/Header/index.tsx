'use client';
import React from "react";
import Link from "next/link";
import { Bell } from "lucide-react";

const Header: React.FC = () => {
    return (
        <header className="bg-[#1E2A38] text-white py-4 px-6 md:px-24 flex justify-between items-center shadow-sm">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold hover:text-[#E2ECF6] transition-colors">
                FalseStreet
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-6">
                <Link href="/" className="text-sm hover:text-[#E2ECF6] transition-colors">Home</Link>
                <Link href="/dashboard" className="text-sm hover:text-[#E2ECF6] transition-colors">Dashboard</Link>
                <Link href="/watchlist" className="text-sm hover:text-[#E2ECF6] transition-colors">Watchlist</Link>
                <Link href="/news" className="text-sm hover:text-[#E2ECF6] transition-colors">News</Link>

                {/* Notification (optional) */}
                <button className="hover:text-[#E2ECF6]">
                    <Bell className="w-5 h-5" />
                </button>
            </nav>
        </header>
    );
};

export default Header;
