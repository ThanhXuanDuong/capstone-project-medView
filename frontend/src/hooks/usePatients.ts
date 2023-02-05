import {useEffect, useState} from "react";
import Patient from "../types/Patient";
import axios from "axios";

export default function usePatients(){

    const [patients, setPatients] = useState<Patient[]>([]);
    const [isReady, setIsReady] =useState<boolean>(false);

    useEffect(() => {
        (async () =>{
            try{
                const response = await axios.get("api/patients");
                setPatients(response.data.reverse());
            }catch (e){
                console.log("No data found!");
            }finally {
                setIsReady(true);
            }
        })();
    },[]);

    return {patients,setPatients,isReady};
}
