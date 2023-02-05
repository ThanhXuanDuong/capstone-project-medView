import {useEffect, useState} from "react";
import Patient from "../types/Patient";
import axios from "axios";

export default function usePatients(){

    const [patients, setPatients] = useState<Patient[]>([]);

    useEffect(() => {
        (async () =>{
            try{
                const response = await axios.get("api/patients");
                setPatients(response.data);
            }catch (e){
                console.log("No data found!");
            }

        })();
    },[]);

    return {patients,setPatients};
}
