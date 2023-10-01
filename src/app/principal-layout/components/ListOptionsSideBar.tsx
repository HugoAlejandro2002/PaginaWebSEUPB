"use client";
import React from "react";
import { OptionSideBar } from "./OptionSideBar";
import { SIDE_BAR_OPTIONS } from "../data/sideBarOptions";

export const ListOptionsSideBar = () => {
  return (
    <div className="flex flex-col py-4 overflow-y-auto w-full">
      <ul className="space-y-2 font-medium">
        {SIDE_BAR_OPTIONS.map((item) => (
          <OptionSideBar
            key={item.name}
            textOption={item.name}
            navigationOption={item.path}
          />
        ))}
      </ul>
    </div>
  );
};
