import * as React from 'react';
export interface DateTimePickerProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    minDate?: Date;
    ariaLabel?: string;
    maxWidth?: number;
    dateOnly?: boolean;
}
export declare function DateTimePicker({ value, onChange, placeholder, minDate, ariaLabel, maxWidth, dateOnly, }: DateTimePickerProps): React.JSX.Element;
export default DateTimePicker;
