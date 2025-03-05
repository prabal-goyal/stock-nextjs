import Link from "next/link";
import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Button from "../Button";


const Dropdown: React.FC = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer"><Button href="#">Stocks</Button></DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white text-black p-4 rounded-md shadow-md flex flex-col gap-4">
                <Link href="/dashboard" className="hover:underline">Dashboard</Link>
                <Link href="/" className="hover:underline">Whishlist</Link>
                <Link href="/" className="hover:underline">Profile</Link>
                <Link href="/" className="hover:underline">Help</Link>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Dropdown;