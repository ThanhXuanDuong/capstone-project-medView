import {Box, Button, Container, TextField} from "@mui/material";
import React, {useState} from "react";
import Patient from "../types/Patient";
import axios from "axios";
import PatientGallery from "../components/patient/PatientGallery";
import PatientForm from "../components/PatientForm";
import useFormActions from "../hooks/useFormActions";

export default function DashboardPage({
    patients,
    setPatients,
}:{
    patients: Patient[],
    setPatients: (patients:Patient[]) => void
}){
    const initial ={
        firstname: "",
        lastname: "",
        gender: "",
        address: "",
        birthday: "",
        telephone: "",
        imageIds: []
    };
    const [patient, setPatient] = useState<Patient>(initial);
    const {open,setOpen, handleClickOpen, handleClose} = useFormActions();
    const [searchName, setSearchName] = useState<string>("");
    const [editing, setEditing] = useState<boolean>(false);

    const searchPatients = patients.filter(patient =>
        patient.firstname.toLowerCase().includes(searchName)
        || patient.lastname.toLowerCase().includes(searchName));

    const onAdd = (patient:Patient) => {
        (async () => {
            const response = await axios.post("/api/patients",patient);
            setPatients([...patients, response.data]);
            setPatient(initial);
        })();
        setOpen(false);
    };

    const onUpdate = (patient:Patient) => {
        (async () => {
            const response = await axios.put("/api/patients/"+patient.id,patient);
            const updatedPatient =response.data;
            setPatients(patients.map(patient =>
                patient.id === updatedPatient.id
                    ? updatedPatient
                    : patient));
            setPatient(initial);
        })();
        setOpen(false);
    };

    const onDelete = (id:string|undefined) => {
        (async () => {
            await axios.delete(`/api/patients/${id}`);
            setPatients(patients.filter(patient => patient.id !==id));
        })();
    }

    const handleEditClick = async(editingPatient:Patient|undefined) =>{
        if (editingPatient) {
            setPatient(editingPatient);
            setOpen(true);
            setEditing(true);
        }else{
            console.log("No patient");
        }

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
                            onEdit={handleEditClick}/>

            <PatientForm patient={patient}
                         setPatient={setPatient}
                         setEditing={setEditing}
                         open={open}
                         handleClose={handleClose}
                         onSave={editing? onUpdate: onAdd}/>
        </Container>
    );
}