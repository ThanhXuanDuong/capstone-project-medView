import Patient from "../types/Patient";
import PatientCard from "./PatientCard";

export default function PatientGallery({
    patients
}:{
    patients: Patient[]
}) {
    return (
        <>
            {patients.map(patient => <PatientCard
                key={patient.id}
                patient ={patient}
            />)}
        </>
    )
}