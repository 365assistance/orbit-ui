import * as React from "react";
export interface NativeSelectProps extends React.ComponentProps<"select"> {
}
export declare const NativeSelect: React.ForwardRefExoticComponent<Omit<NativeSelectProps, "ref"> & React.RefAttributes<HTMLSelectElement>>;
