import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Avatar, Box, FormControl} from "@mui/material";
import {IMAGES_PATH} from "../application";
import GenderRadioButtonsGroup from "./GenderRadioGroup";
import UploadFile from "./UploadFile";
import Patient from "../types/Patient";
import {ChangeEvent, useState} from "react";

export default function SaveForm({
    open,
    handleClose,
    onSave
}:{
    open: boolean,
    handleClose: () =>void,
    onSave: (patient:Patient) => void
}) {
    const initialPatient ={
        firstname: "",
        lastname: "",
        gender: "",
        address: "",
        birthday: "",
        telephone: "",
        imageIds: []
    };
    const [patient, setPatient] = useState<Patient>(initialPatient);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPatient({
            ...patient,
            [event.target.name]: event.target.value
        });
    }
    console.log(patient)
    console.log(initialPatient)

    return (
        <Dialog sx={{p: 10}} open={open} onClose={handleClose}>
            <DialogTitle>Save Form</DialogTitle>

            <DialogContent >
                <form>
                    <FormControl >
                        <Box sx={{display:'flex',justifyContent:'space-between'}}>
                            <Avatar
                                alt="Avatar"
                                src={IMAGES_PATH + "profile-placeholder.png"}
                                sx={{ width: 120, height: 120, mb: 2 }}
                                variant="square"
                            />
                            <UploadFile/>
                        </Box>

                        <TextField
                            sx={{ width: 500, mb: 2 }}
                            id="lastname"
                            label={"Last Name"}
                            name="lastname"
                            value={patient.lastname}
                            variant="outlined"
                            size="small"
                            onChange={handleChange}
                        />

                        <TextField
                            sx={{ width: 500, mb: 2 }}
                            id="firstname"
                            label={"First Name"}
                            name="firstname"
                            value={patient.firstname}
                            variant="outlined"
                            size="small"
                            onChange={handleChange}
                        />

                        <TextField
                            sx={{ width: 500, mb: 2 }}
                            id="id"
                            label={"Patient-ID"}
                            name="id"
                            value={patient.id}
                            variant="outlined"
                            size="small"
                            onChange={handleChange}
                        />

                        <GenderRadioButtonsGroup onChange={handleChange}/>

                        <TextField
                            sx={{ width: 500, mb: 2 }}
                            id="address"
                            label={"Address"}
                            name="address"
                            value={patient.address}
                            variant="outlined"
                            size="small"
                            onChange={handleChange}
                        />

                        <TextField
                            sx={{ width: 500, mb: 2 }}
                            id="birthday"
                            label={"Birthday"}
                            name="birthday"
                            value={patient.birthday}
                            variant="outlined"
                            size="small"
                            onChange={handleChange}
                        />

                        <TextField
                            sx={{ width: 500, mb: 2 }}
                            id="telephone"
                            label={"Telephone"}
                            name="telephone"
                            value={patient.telephone}
                            variant="outlined"
                            size="small"
                            onChange={handleChange}
                        />

                    </FormControl>
                </form>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => onSave(patient)}>Save</Button>
            </DialogActions>
        </Dialog>

    );
}