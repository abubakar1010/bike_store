/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArrowRight } from "lucide-react";
import React from "react";
import { cn } from "../../../utils/tailwindUtility";

interface ButtonProps {
	type?: "submit" | "reset" | "button";
	text: string;
	isRounded?: boolean;
	arrow?: boolean;
	isFullWidth?: boolean;
	isReversed?: boolean;
	handleClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
	type,
	text,
	arrow,
	isFullWidth,
	handleClick,
}: ButtonProps) {
	return (
		<button
			type={type}
			onClick={handleClick}
			className={cn(
				"mt-6 bg-gradient-to-r from-[#6dc234] to-[#6dc234ad] px-4 cursor-pointer py-3 rounded-lg font-bold text-white text-xl",
				{
					"w-full": isFullWidth,
				}
			)}
		>
			{text}
			{arrow && <ArrowRight className="ml-2 h-4 w-4" />}
		</button>
	);
}

