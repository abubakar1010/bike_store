import { ReactNode } from "react";
import { TSource } from "../routes/route.types";



type TRoute = {
	path: string;
	element: ReactNode;
};

export const routesGenerator = (source: TSource[]) => {
    return source.reduce((acc: TRoute[], curr) => {
        if (curr.children) {
            curr.children.forEach((item) => {
                acc.push({
                    path: item.path!,
                    element: item.element,
                });
            });
        } else {
            acc.push({
                path: curr.path!,
                element: curr.element,
            });
        }
        return acc;
    }, []);
}