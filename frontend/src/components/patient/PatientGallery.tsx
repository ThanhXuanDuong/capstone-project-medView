import Patient from "../../types/Patient";
import PatientCard from "./PatientCard";
import {Box} from "@mui/material";

export default function PatientGallery({
    patients,
    onDelete,
    onEdit
}:{
    patients: Patient[],
    onDelete: (id: string|undefined) => void,
    onEdit: (patient: Patient|undefined) => void
}) {
    return (
            <Box sx={{display: 'flex', width:'100%'}}
                 flexDirection={"column"}
                 justifyContent={"space-between"}
                 alignItems={"center"}
                 gap= "1.5rem"
            >

                {patients.map(patient => <PatientCard
                    key={patient.id}
                    patient ={patient}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />)}
            </Box>
    )
}