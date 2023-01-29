import Patient from "../types/Patient";
import PatientCard from "./PatientCard";
import {Box} from "@mui/material";

export default function PatientGallery({
    patients
}:{
    patients: Patient[]
}) {
    return (
            <Box sx={{display: 'flex'}}
                 flexDirection={"column"}
                 justifyContent={"space-between"}
                 alignItems={"center"}
                 gap= "1rem">
            {patients.map(patient => <PatientCard
                key={patient.id}
                patient ={patient}
            />)}
            </Box>
    )
}