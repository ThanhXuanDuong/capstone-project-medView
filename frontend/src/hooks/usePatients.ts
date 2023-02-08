import {useEffect, useState} from "react";
import Patient from "../types/Patient";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function usePatients(){

    const [patients, setPatients] = useState<Patient[]>([]);
    const [isReady, setIsReady] =useState<boolean>(false);
    const navigate =useNavigate();

    useEffect(() => {
        (async () =>{
            try{
                const response = await axios.get("/api/patients");
                setPatients(response.data.reverse());
            }catch (e: any){
                e.response.status === "401" && navigate("/login");
                console.log("No data found!");
            }finally {
                setIsReady(true);
            }
        })();
    },[navigate]);

    return {patients,setPatients,isReady};
}
