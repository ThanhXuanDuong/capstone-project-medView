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
    const [openAlert, setOpenAlert] = React.useState(false);
    const [openSuccess, setOpenSuccess] = React.useState(false);

    const onChange = (event: ChangeEvent<HTMLInputElement>) =>{
        if (event.target.files && event.target.files.length >0) {
            setFiles(Array.from(event.target.files));
        }
    };

    const onUpload = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (files.length>0) {
            const formData = new FormData();
            for (const file of files) {
                formData.append("files", file);
            }
            const res = await axios.post("/api/files", formData);
            setPatient({...patient,imageIds: [...patient.imageIds].concat(res.data)});
            setFiles([]);
            setOpenSuccess(true);
        }else{
            setOpenAlert(true);
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

                <Button type={"submit"} variant={"outlined"}>Upload</Button>
            </form>

            <Collapse in={openAlert}>
                <Alert severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpenAlert(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    No file was chosen!
                </Alert>
            </Collapse>

            <Collapse in={openSuccess}>
                <Alert severity="success"
                       action={
                           <IconButton
                               aria-label="close"
                               color="inherit"
                               size="small"
                               onClick={() => {
                                   setOpenSuccess(false);
                               }}
                           >
                               <CloseIcon fontSize="inherit" />
                           </IconButton>
                       }
                >
                    File uploaded!
                </Alert>
            </Collapse>
        </Box>

    )
}