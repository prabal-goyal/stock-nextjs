import React from "react";
import Container from "../components/Container";
import { stockMarketData } from "@/src/data/stocks";

const Dashboard: React.FC = () => {
    return (
        <div>
            <Container newClassNames="md:py-8 md:px-12">
                <p className="text-[32px] font-bold">Dashboard</p>
                {/* Stocks */}
                <div className="grid grid-cols-3 gap-4">
                    {stockMarketData?.stocks?.map((stock) => (
                        <div key={stock?.id} className="flex justify-between items-center mt-4 p-4 bg-white rounded-lg shadow-md">
                            <div className="flex flex-col gap-4">
                                <p className="text-[18px] font-semibold pr-3">{stock?.name}</p>
                                <p className="text-[14px] text-gray-500">{stock?.exists_in?.join(", ")}</p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <p className="text-[18px] font-semibold">{stock?.price}</p>
                                <p className={stock?.profit_loss.split('')?.[0] === '-' ? 'text-[16px] text-red-400' : `text-[16px] text-green-500`}>{stock?.profit_loss}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </Container>
        </div>
    )
}

export default Dashboard;