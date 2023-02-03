import {Alert, Box, Button, Collapse, IconButton} from "@mui/material";
import * as React from "react";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import Patient from "../../types/Patient";
import CloseIcon from '@mui/icons-material/Close';

export default function UploadFile({
    patient,
    setPatient
}:{
    patient: Patient,
    setPatient: (patient:Patient) =>void
}){

    const [file, setFile] = useState<File|null>(null);
    const [open, setOpen] = React.useState(false);

    const onChange = (event: ChangeEvent<HTMLInputElement>) =>{
        if (event.target.files && event.target.files.length >0) {
            setFile(event.target.files[0]);
        }
    };

    const onUpload = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("name","muslim");
            const res = await axios.post("/api/files", formData);
            setPatient({...patient,imageIds: [...patient.imageIds,res.data]});
        }else{
            setOpen(true);
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 250,
                height: 120,
                backgroundColor: 'white',
                border: '1px solid lightgrey',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <form onSubmit={onUpload}>
                <IconButton color="primary" aria-label="upload picture" component="label">
                    <input  hidden accept="image/*" type="file" onChange={onChange}/>
                    <DriveFolderUploadIcon/>
                </IconButton>

                <Button type={"submit"}>Upload</Button>
            </form>

            <Collapse in={open}>
                <Alert severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    No file was chosen!
                </Alert>
            </Collapse>
        </Box>

    )
}