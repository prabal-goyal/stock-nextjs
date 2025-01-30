import React from "react";
import Container from "../Container";
import Button from "../Button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Link from "next/link";

const Header: React.FC = () => {
    return (
        <div className="bg-[#002B5B] text-white">
            <Container newClassNames="py-6 flex justify-between items-center">
                <Link href='/' className="text-3xl font-semibold hover:text=[#00FFFF] cursor-pointer">FalseStreet</Link>
                <div className="flex gap-8">
                    <Button href="/" newclassNames="hover:underline">Home</Button>
                    <HoverCard>
                        <HoverCardTrigger className="cursor-pointer">Stocks</HoverCardTrigger>
                        <HoverCardContent className="bg-white text-black p-4 rounded-md shadow-md flex flex-col gap-4">
                            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
                            <Link href="/" className="hover:underline">Whishlist</Link>
                            <Link href="/" className="hover:underline">Profile</Link>
                            <Link href="/" className="hover:underline">Help</Link>
                        </HoverCardContent>
                    </HoverCard>
                </div>
            </Container>
        </div>
    )
};

export default Header;