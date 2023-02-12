import * as React from 'react';
import Button from '@mui/material/Button';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Avatar, Box, FormControl} from "@mui/material";
import {IMAGES_PATH} from "../../application";
import GenderRadioButtonsGroup from "./GenderRadioGroup";
import UploadFile from "../image/UploadFile";
import Patient from "../../types/Patient";
import {ChangeEvent} from "react";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";

export default function PatientForm({
                                        patient,
                                        setPatient,
                                        editing,
                                        setEditing,
                                        open,
                                        handleClose,
                                        onSave
                                    }: {
    patient: Patient,
    setPatient: (patient: Patient) => void,
    editing: boolean,
    setEditing: (edit: boolean) => void
    open: boolean,
    handleClose: () => void,
    onSave: (patient: Patient) => void
}) {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPatient({
            ...patient,
            [event.target.name]: event.target.value
        });
    };

    const onCancel = () => {
        handleClose();
        setEditing(false);
        setPatient({
            firstname: "",
            lastname: "",
            gender: "FEMALE",
            address: "",
            birthday: "",
            telephone: "",
            imageIds: [],
            timeStamp: ""
        })
    }

    const [value, setValue] = React.useState<Dayjs>(dayjs('2002-02-18'));

    const handleChangeDatePicker = (newValue: Dayjs) => {
        setValue(newValue);
        setPatient({
            ...patient,
            birthday: newValue?.toISOString()
        });
    };


    return (
        <Dialog maxWidth={"md"} open={open} onClose={handleClose}>
            <DialogTitle>Formula</DialogTitle>

            <DialogContent>

                <FormControl>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <Avatar
                            alt="Avatar"
                            src={IMAGES_PATH + "profile-placeholder.png"}
                            sx={{width: 120, height: 120, mb: 2}}
                            variant="square"
                        />
                        <UploadFile patient={patient} setPatient={setPatient}/>
                    </Box>

                    <TextField
                        required
                        sx={{width: 500,my: 2}}
                        id="lastname"
                        label={"Last Name"}
                        name="lastname"
                        value={patient.lastname}
                        variant="outlined"
                        size="medium"
                        onChange={handleChange}
                    />

                    <TextField
                        required
                        sx={{width: 500, mb: 2}}
                        id="firstname"
                        label={"First Name"}
                        name="firstname"
                        value={patient.firstname}
                        variant="outlined"
                        size="medium"
                        onChange={handleChange}
                    />

                    {editing &&
                        <TextField
                            sx={{width: 500, mb: 2}}
                            id="id"
                            label={"Patient-ID"}
                            name="id"
                            value={patient.id}
                            variant="outlined"
                            size="medium"
                            onChange={handleChange}
                        />
                    }
                    <GenderRadioButtonsGroup patient={patient}
                                             onChange={handleChange}/>
                    <Box sx={{my:2}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                                <DesktopDatePicker
                                    label="Date desktop"
                                    inputFormat="MM/DD/YYYY"
                                    value={value}
                                    onChange={handleChangeDatePicker}
                                    renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </Box>


                    <TextField
                        sx={{ width: 500, mb: 2 }}
                        id="address"
                        label={"Address"}
                        name="address"
                        value={patient.address}
                        variant="outlined"
                        size="medium"
                        onChange={handleChange}
                    />

                    <TextField
                        sx={{ width: 500, mb: 2 }}
                        id="telephone"
                        label={"Telephone"}
                        name="telephone"
                        value={patient.telephone}
                        variant="outlined"
                        size="medium"
                        onChange={handleChange}
                    />

                </FormControl>

            </DialogContent>

            <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={() => onSave(patient)}>Save</Button>
            </DialogActions>
        </Dialog>

    );
}