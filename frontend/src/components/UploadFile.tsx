import {Box, Button, IconButton} from "@mui/material";
import * as React from "react";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import patient from "../types/Patient";
import Patient from "../types/Patient";

export default function UploadFile({
    patient,
    setPatient
}:{
    patient: patient,
    setPatient: (patient:Patient) =>void
}){

    const [file, setFile] = useState<File|null>(null);

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

            const res = await axios.post("/api/files", formData);
            setPatient({...patient,imageIds: [...patient.imageIds,res.data]});

            alert(JSON.stringify(patient, null, 2));
        }else{
            console.log("No file")
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                width: 200,
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

        </Box>

    )
}