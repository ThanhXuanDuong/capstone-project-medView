import {Container} from "@mui/material";
import {useEffect, useState} from "react";
import Patient from "../types/Patient";
import axios from "axios";
import PatientGallery from "../components/PatientGallery";

export default function DashboardPage(){
    const [patients, setPatients] = useState<Patient[]>([]);

    useEffect(() => {
        (async () =>{
            const response = await axios.get("api/patients");
            setPatients(response.data);
        })();
    },[]);

    return(
        <>
            <Container >
                <h1>Dashboard Page</h1>
                <PatientGallery patients={patients}/>
            </Container>
        </>

    );
}