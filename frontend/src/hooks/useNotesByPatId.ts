import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Note from "../types/Note";

export default function useNotesByPatId(){
    const {id} = useParams<{id:string}>();
    const [notesByPatId, setNotesByPatId]= useState<Map<string,Note[]>>(new Map());
    const navigate =useNavigate();

    useEffect(() => {
        (async () =>{
            try{
                const response = await axios.get(`/api/notes/patient/${id}`);
                setNotesByPatId(new Map(Object.entries(response.data)))
            }catch (e:any){
                console.log("Error while loading data!")
                e.response.status === "401" && navigate("/login");
            }
        })();
    },[id,navigate]);

    return notesByPatId;
}