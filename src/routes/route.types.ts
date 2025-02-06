import { ReactNode } from "react"

export type TSource = {
    name?: string,
    path?: string,
    element?: ReactNode,
    children?: TSource[]
}