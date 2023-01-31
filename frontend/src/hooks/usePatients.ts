import {useEffect, useState} from "react";
import Patient from "../types/Patient";
import axios from "axios";

export default function usePatients(){

    const [patients, setPatients] = useState<Patient[]>([]);

    useEffect(() => {
        (async () =>{
            const response = await axios.get("api/patients");
            setPatients(response.data);
        })();
    },[]);

    return {patients,setPatients};
}
