import {Box, Button, Container, TextField} from "@mui/material";
import React, { useEffect, useState} from "react";
import Patient from "../types/Patient";
import axios from "axios";
import PatientGallery from "../components/PatientGallery";
import SaveForm from "../components/SaveForm";

export default function DashboardPage(){
    const [patients, setPatients] = useState<Patient[]>([]);
    const [searchName, setSearchName] = useState<string>("");

    useEffect(() => {
        (async () =>{
            const response = await axios.get("api/patients");
            setPatients(response.data);
        })();
    },[]);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const searchPatients = patients.filter(patient =>
        patient.firstname.toLowerCase().includes(searchName)
        || patient.lastname.toLowerCase().includes(searchName));

    const onSave = (patient:Patient) => {
        (async () => {
            const response = await axios.post("/api/patients",patient);
            setPatients([...patients, response.data]);
        })();
        setOpen(false);
    };

    return(

        <Container >
            <Box sx={{display:'flex',mt: 10, mb: 5, gap:2, flexDirection:'row-reverse'}}>
                <TextField
                    hiddenLabel
                    id="Search"
                    placeholder="Search..."
                    size="small"
                    onChange={(e)=> setSearchName(e.target.value)}
                />

                <Button variant="contained">Sort</Button>

                <Button variant="contained" onClick={handleClickOpen}>Add</Button>
            </Box>

            <PatientGallery patients={searchPatients}/>

            <SaveForm open={open} handleClose={handleClose} onSave={onSave}/>
        </Container>


    );
}