import {Box, Button, Container, TextField} from "@mui/material";
import React, {useState} from "react";
import Patient from "../types/Patient";
import axios from "axios";
import PatientGallery from "../components/PatientGallery";
import SaveForm from "../components/SaveForm";
import usePatients from "../hooks/usePatients";
import useFormActions from "../hooks/useFormActions";

export default function DashboardPage(){

    const {patients,setPatients} = usePatients();
    const {open,setOpen, handleClickOpen, handleClose} = useFormActions();
    const [searchName, setSearchName] = useState<string>("");

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

    const onDelete = (id:string|undefined) => {
        (async () => {
            await axios.delete("/api/patients/" +id);
            setPatients(patients.filter(patient => patient.id !==id));
        })();
    }

    const onEdit = (patient:Patient|undefined) =>{
        setOpen(true);
    };

    return(
        <Container >
            <Box sx={{display:'flex',
                    mt: 10,
                    mb: 5,
                    gap:2,
                    flexDirection:'row-reverse'
            }}>
                <TextField
                    hiddenLabel
                    id="Search"
                    placeholder="Search..."
                    size="small"
                    onChange={(e)=> setSearchName(e.target.value)}
                />

                <Button variant="contained">Sort</Button>

                <Button variant="contained"
                        onClick={handleClickOpen}
                >Add</Button>

            </Box>

            <PatientGallery patients={searchPatients}
                            onDelete={onDelete}
                            onEdit={onEdit}/>

            <SaveForm open={open}
                      handleClose={handleClose}
                      onSave={onSave}/>
        </Container>


    );
}