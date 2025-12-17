// components/NoData.tsx
"use client";

import React from "react";
import { FileText } from "lucide-react";
import { NoDataProps } from "@/interface/noDataProps.interface";

const NoData: React.FC<NoDataProps> = ({
  title = "No Data Available",
  description = "There is currently no data to display.",
  icon: Icon = FileText,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <Icon className="h-12 w-12 text-gray-400 mb-4" name="icon" />
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

export default NoData;
