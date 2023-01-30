import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function GenderRadioButtonsGroup() {
    return (
        <FormControl>
            <FormLabel id="radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
                row
                aria-labelledby="radio-buttons-group-label"
                name="radio-buttons-group"
            >
                <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
                <FormControlLabel value="MALE" control={<Radio />} label="Male" />
                <FormControlLabel value="OTHER" control={<Radio />} label="Other" />
            </RadioGroup>
        </FormControl>
    );
}
