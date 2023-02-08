import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Patient from "../types/Patient";
import axios from "axios";

export default function usePatient(){
    const initial ={
        firstname: "",
        lastname: "",
        gender: "FEMALE",
        address: "",
        birthday: "",
        telephone: "",
        imageIds: [],
        timeStamp: ""
    };

    const {id} = useParams<{id:string}>();
    const [patient, setPatient] = useState<Patient>(initial);
    const [viewImageId, setViewImageId] = useState <string> (patient.imageIds[0]);
    const [isReady, setIsReady] = useState<boolean>(false);
    const navigate =useNavigate();

    useEffect( () =>{
        (async () =>{
            try{
            const response = await axios.get("/api/patients/" +id);
            setPatient(response.data);
            }catch(e: any){
                e.response.status === "401" && navigate("/login");
                console.log("Patient not registered!");
            }finally {
                setIsReady(true);
            }
        })();

    },[id, navigate]);

    return {isReady,viewPatient: patient,setViewPatient: setPatient,viewImageId, setViewImageId};
}