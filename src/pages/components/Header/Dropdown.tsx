"use client";
import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const Dropdown: React.FC = () => {
    return (
        <Select >
            <SelectTrigger className="!p-0">
                <SelectValue placeholder="Menu" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup className="cursor-pointer"> 
                    <SelectItem value="dashboard">Dashboard</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default Dropdown;