import { ArcStatus } from "../../shared/types"

export type TagState = {
    variant: "primary" | "neutral" | "success" | "warning" | "error" | "purple" | "teal" | "orange",
    children: string
}