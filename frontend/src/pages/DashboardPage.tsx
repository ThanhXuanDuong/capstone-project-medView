import {Box, Button, Container, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import Patient from "../types/Patient";
import axios from "axios";
import PatientGallery from "../components/PatientGallery";
import SaveForm from "../components/SaveForm";

export default function DashboardPage(){
    const [patients, setPatients] = useState<Patient[]>([]);

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

    return(

        <Container >
            <Box sx={{display:'flex',mt: 10, mb: 5, gap:2, flexDirection:'row-reverse'}}>
                <TextField
                    hiddenLabel
                    id="Search"
                    placeholder="Search..."
                    size="small"
                />

                <Button variant="contained">Sort</Button>

                <Button variant="contained" onClick={handleClickOpen}>Add</Button>
            </Box>

            <PatientGallery patients={patients}/>

            <SaveForm open={open} handleClose={handleClose}/>
        </Container>


    );
}