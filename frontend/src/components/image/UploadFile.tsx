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

    const [files, setFiles] = useState<File[]>([]);
    const [open, setOpen] = React.useState(false);

    const onChange = (event: ChangeEvent<HTMLInputElement>) =>{
        if (event.target.files && event.target.files.length >0) {
            setFiles(Array.from(event.target.files));
        }
    };

    const onUpload = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (files) {
            const formData = new FormData();
            for (const file of files) {
                formData.append("files", file);
            }
            const res = await axios.post("/api/files", formData);
            setPatient({...patient,imageIds: [...patient.imageIds].concat(res.data)});
            setFiles([]);
        }else{
            setOpen(true);
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 240,
                height: 120,
                border: '1px solid white',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <form onSubmit={onUpload}>
                <IconButton color="primary" aria-label="upload picture" component="label">
                    <input  hidden accept="image/*" type="file"  multiple onChange={onChange}/>
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