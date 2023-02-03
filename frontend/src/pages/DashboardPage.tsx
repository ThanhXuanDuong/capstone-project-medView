import {Box, Button, Container, TextField} from "@mui/material";
import React, {useState} from "react";
import Patient from "../types/Patient";
import axios from "axios";
import PatientGallery from "../components/patient/PatientGallery";
import PatientForm from "../components/patient/PatientForm";
import useFormActions from "../hooks/useFormActions";
import ConfirmationDialog from "../components/ConfirmationDialog";
import useDialogActions from "../hooks/useDialogActions";
import usePatients from "../hooks/usePatients";

export default function DashboardPage(){
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
    const {patients,setPatients} = usePatients();

    const {openForm, handleOpenForm, handleCloseForm} = useFormActions();
    const {openDialog,handleOpenDialog, handleCloseDialog} = useDialogActions();

    const [searchName, setSearchName] = useState<string>("");
    const [editing, setEditing] = useState<boolean>(false);
    const [deletingId, setDeletingId] = useState<string|undefined>("");

    const searchPatients = patients.filter(patient =>
        patient.firstname.toLowerCase().includes(searchName)
        || patient.lastname.toLowerCase().includes(searchName));

    const onAdd = (patient:Patient) => {
        (async () => {
            const response = await axios.post("/api/patients",patient);
            setPatients([...patients, response.data]);
            setPatient(initial);
        })();
        handleCloseForm();
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
        handleCloseForm();
    };

    const onDelete = (id:string|undefined) => {
        (async () => {
            await axios.delete(`/api/patients/${id}`);
            setPatients(patients.filter(patient => patient.id !==id));
        })();
        handleCloseDialog();
    }

    const handleClickDelete = (id:string|undefined) => {
       handleOpenDialog();
       setDeletingId(id);
    }

    const handleClickEdit = (editingPatient:Patient|undefined) =>{
        if (editingPatient) {
            setPatient(editingPatient);
            handleOpenForm();
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
                        onClick={handleOpenForm}
                >Add</Button>

            </Box>

            <PatientGallery patients={searchPatients}
                            onDelete={handleClickDelete}
                            onEdit={handleClickEdit}/>

            <PatientForm patient={patient}
                         setPatient={setPatient}
                         setEditing={setEditing}
                         open={openForm}
                         handleClose={handleCloseForm}
                         onSave={editing? onUpdate: onAdd}/>

            {deletingId &&
                <ConfirmationDialog open={openDialog}
                                    handleClose={handleCloseDialog}
                                    onDelete={() => onDelete(deletingId)}
                />
            }
        </Container>
    );
}