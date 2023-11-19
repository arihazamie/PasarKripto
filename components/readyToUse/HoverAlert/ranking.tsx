import React from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { IoAlertCircleOutline } from "react-icons/io5";

interface HoversProps {
    header: React.ReactNode;
    body: React.ReactNode;
}

const Hovers: React.FC<HoversProps> = ({ header, body }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <IoAlertCircleOutline />
                </TooltipTrigger>
                <TooltipContent>
                    <div className="text-xs w-[16.5rem]">
                        <div>{body}</div>
                        <div className="pt-1">{header}</div>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export default Hovers;
