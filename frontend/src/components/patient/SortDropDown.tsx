import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Patient from "../../types/Patient";

export default function SortDropDown({
    patients,
    setPatients
}:{
    patients: Patient[]
    setPatients: (sortList :Patient[]) => void
}) {

    const handleChange = (event: SelectChangeEvent) => {
        const sortType = event.target.value;
        const copyPatients = [...patients];

        copyPatients.sort((a, b) => {
            return sortType === "Oldest"
                ? (new Date(a.timeStamp).valueOf()- new Date(b.timeStamp).valueOf())
                : (new Date(b.timeStamp).valueOf()- new Date(a.timeStamp).valueOf());
        });
        setPatients(copyPatients);
    };

    return (
        <Box sx={{ minWidth: 80}}>
            <FormControl variant="outlined" fullWidth size={"small"}>
                <InputLabel id="sort" >Sort</InputLabel>
                <Select
                    labelId="sort-type"
                    id="sort-type"
                    label="Sort"
                    defaultValue={"Newest"}
                    onChange={handleChange}
                >
                    <MenuItem value={"Newest"}>Newest</MenuItem>
                    <MenuItem value={"Oldest"}>Oldest</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}