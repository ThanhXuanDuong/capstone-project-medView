import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Patient from "../types/Patient";
import axios from "axios";

export default function usePatient(){
    const initial ={
        firstname: "",
        lastname: "",
        gender: "",
        address: "",
        birthday: "",
        telephone: "",
        imageIds: []
    };

    const {id} = useParams<{id:string}>();
    const [patient, setPatient] = useState<Patient>(initial);
    const [viewImageId, setViewImageId] = useState <string> ("");

    useEffect( () =>{
        try{
            (async () =>{
                const response = await axios.get("/api/patients/" +id);
                setPatient(response.data);
                setViewImageId(() =>patient.imageIds[0]);
            })()
        }catch(e){
            console.log("Patient not registered!");
        }
    },[id]);

    return {viewPatient: patient,setViewPatient: setPatient,viewImageId, setViewImageId};
}