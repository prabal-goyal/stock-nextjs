import React from "react";

const sideBar = [
    {
        id: 1,
        title: "Dashboard",
        icon: "/icons/dashboard.svg",
        link: "/dashboard"
    },
    {
        id: 2,
        title: "Whishlist",
        icon: "/icons/whishlist.svg",
        link: "/whishlist"
    },
    {
        id: 3,
        title: "Help",
        icon: "/icons/help.svg",
        link: "/help"
    },
]

const Sidebar: React.FC = () => {
    return (
        <div className="w-64 bg-gray-300 min-h-screen p-8 md:block hidden">
            <div className="flex flex-col gap-4">
                {sideBar.map((item) => (
                    <a href={item?.link} key={item?.id} className="flex items-center gap-4 rounded-sm hover:underline">
                        {/* <img src={item?.icon} alt={item?.title} className="w-6 h-6" /> */}
                        <p className="text-black text-[20px] font-semibold  p-2">{item?.title}</p>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default Sidebar;