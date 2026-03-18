import React from "react";
import { cn } from "@/src/lib/utils";

interface DeviceProps {
  children?: React.ReactNode;
  className?: string;
}

export const IPhoneMockup = ({ children, className }: DeviceProps) => (
  <div className={cn("relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl", className)}>
    <div className="w-[148px] h-[18px] bg-gray-800 top-0 left-1/2 -translate-x-1/2 absolute rounded-b-[1rem]"></div>
    <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
    <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
    <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
    <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white dark:bg-gray-900">
      {children}
    </div>
  </div>
);

export const AndroidMockup = ({ children, className }: DeviceProps) => (
  <div className={cn("relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl", className)}>
    <div className="w-[10px] h-[10px] bg-gray-800 top-2 left-1/2 -translate-x-1/2 absolute rounded-full"></div>
    <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white dark:bg-gray-900">
      {children}
    </div>
  </div>
);

export const TabletMockup = ({ children, className }: DeviceProps) => (
  <div className={cn("relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[454px] w-[341px] shadow-xl", className)}>
    <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
    <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
    <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
    <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
    <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white dark:bg-gray-900">
      {children}
    </div>
  </div>
);

export const LaptopMockup = ({ children, className }: DeviceProps) => (
  <div className={cn("relative mx-auto", className)}>
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
      <div className="rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-white dark:bg-gray-800">
        {children}
      </div>
    </div>
    <div className="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"></div>
    </div>
  </div>
);

export const DesktopMockup = ({ children, className }: DeviceProps) => (
  <div className={cn("relative mx-auto", className)}>
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[16px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
      <div className="rounded-xl overflow-hidden h-[140px] md:h-[262px] bg-white dark:bg-gray-800">
        {children}
      </div>
    </div>
    <div className="relative mx-auto bg-gray-900 dark:bg-gray-700 h-[24px] w-[1px] md:h-[48px] md:w-[2px]"></div>
    <div className="relative mx-auto bg-gray-800 dark:bg-gray-700 h-[12px] w-[48px] md:h-[24px] md:w-[96px] rounded-t-xl"></div>
  </div>
);
