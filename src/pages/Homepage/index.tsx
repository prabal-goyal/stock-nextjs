import React from "react";

interface HomepageProps {
    data: string;
}

const Homepage: React.FC<HomepageProps> = ({ data }) => {
    return <div className="text-3xl">{data}</div>;
};

export default Homepage;
