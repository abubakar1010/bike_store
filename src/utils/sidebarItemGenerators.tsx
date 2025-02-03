import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { TSource } from "../routes/route.types";

export type TSidebar = {
	key: string;
	label: ReactNode;
	children?: TSidebar[];
};

export const sidebarItemsGenerator = (source: TSource[], role: string) =>
	source.reduce((acc: TSidebar[], curr) => {
		if (curr.name && curr.path) {
			acc.push({
				key: curr.name,
				label: <NavLink to={`/${role}/${curr.path}`}>{curr.name}</NavLink>,
			});
		}

		if (curr.children && curr.name) {
			acc.push({
				key: curr.name,
				label: curr.name,
				children: curr.children.map((item) => {
					return {
						key: item.name!,
						label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
					};
				}),
			});
		}
		return acc;
	}, []);
