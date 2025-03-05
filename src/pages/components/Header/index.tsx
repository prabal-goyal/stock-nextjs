import React from "react";
import Button from "../Button";
import Link from "next/link";
import Dropdown from "./Dropdown";

const Header: React.FC = () => {
    return (
        <div className="bg-[#002B5B] text-white py-6 flex justify-between items-center md:px-24 px-12">
            <Link href='/' className="text-3xl font-semibold hover:text=[#00FFFF] cursor-pointer">FalseStreet</Link>
            <div className="flex gap-8">
                <Button href="/" newclassNames="hover:underline">Home</Button>
                <Dropdown />
            </div>
        </div>
    )
};

export default Header;