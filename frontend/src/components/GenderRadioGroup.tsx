import * as React from 'react';
import {ChangeEvent} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Patient from "../types/Patient";

export default function GenderRadioButtonsGroup({
    patient,
    onChange
}:{
    patient: Patient
    onChange: (event: ChangeEvent<HTMLInputElement>)=>void
}) {
    return (
        <FormControl>
            <FormLabel id="gender">Gender</FormLabel>
            <RadioGroup
                row
                defaultValue={patient.gender? patient.gender: null}
                aria-labelledby="gender"
                name="gender"
                onChange={onChange}
            >
                <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
                <FormControlLabel value="MALE" control={<Radio />} label="Male" />
                <FormControlLabel value="OTHER" control={<Radio />} label="Other" />
            </RadioGroup>
        </FormControl>
    );
}
