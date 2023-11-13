import { ComponentProps } from "react";
import { FormLabel } from "./form";

type Props = ComponentProps<typeof FormLabel>
export default function TextLabel(props: Props) {
    return (
        <FormLabel {...props} />
    )
}