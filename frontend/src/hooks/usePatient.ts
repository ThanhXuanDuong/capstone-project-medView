import {useParams} from "react-router-dom";
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

    useEffect( () =>{
        (async () =>{
            try{
            const response = await axios.get("/api/patients/" +id);
            setPatient(response.data);
            }catch(e){
                console.log("Patient not registered!");
            }finally {
                setIsReady(true);
            }
        })();

    },[id]);

    return {isReady,viewPatient: patient,setViewPatient: setPatient,viewImageId, setViewImageId};
}