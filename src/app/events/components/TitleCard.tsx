import React from "react";

interface TitleCardProps {
  title: string;
}

const TitleCard: React.FC<TitleCardProps> = ({ title }) => {
  return (
    <div className="flex bg-[#39AA96] px-3 items-center h-[25%]">
      <h1 className="text-white font-bold text-2xl">{title}</h1>
    </div>
  );
};

export default TitleCard;
