import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


export default function BasicDateTimePicker({ date, setDate }: { date: Dayjs | null, setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>> }) {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Set Task Due Date"
                value={date}
                minDateTime={dayjs(new Date)}
                onChange={(newValue) => {
                    setDate(newValue);
                }}
            />
        </LocalizationProvider>
    );
}