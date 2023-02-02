import {useEffect, useState} from "react";
import axios from "axios";
import Note from "../types/Note";

export default function useNotes(id:string){
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        (async () =>{
            const response = await axios.get(`api/notes/image/${id}`);
            setNotes(response.data);
        })();
    },[id]);

    return notes;
}
