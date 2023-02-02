import usePatient from "../hooks/usePatient";
import ImageCard from "../components/image/ImageCard";
import {Box, Grid, IconButton, Typography} from "@mui/material";
import ImageViewer from "../components/image/ImageViewer";
import {useEffect, useState} from "react";
import NoteCard from "../components/note/NoteCard";
import Note from "../types/Note";
import axios from "axios";
import AddBoxIcon from "@mui/icons-material/AddBox";

export default function DetailPage(){

    const patient = usePatient();
    const [viewImageId, setViewImageId] = useState <string> (patient.imageIds[0]);
    const onView = (id:string) => setViewImageId(id);

    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        (async () =>{
            const response = await axios.get(`/api/notes/image/${viewImageId}`);
            setNotes(response.data);
        })();
    },[viewImageId]);

    const onDelete =() =>{};

    const onEdit =() =>{};

    return(
        <>
            <Grid container sx={{ mt:0, mb:0, height: "100vh"}} >
                <Grid xs={12} sm={8} sx={{backgroundColor:"black"}}>
                    <ImageViewer key={viewImageId} id={viewImageId}/>
                </Grid>

                <Grid xs={12} sm={4}>
                    <Box sx={{height: "4rem", p:2}}
                         boxShadow={1}
                    >
                        <Typography variant="h5" color="text.secondary">
                            {patient.lastname}, {patient.firstname}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Patient-ID: {patient.id}
                        </Typography>
                    </Box>

                    <Box sx={{display: 'flex',height: "20rem", p:2, overflow: 'auto'}}
                         flexDirection={"column"}
                         justifyContent={"flex-start"}
                         alignItems={"stretch"}
                         boxShadow={1}
                         gap= "1rem"
                    >
                        {patient.imageIds.map((id,index) =>
                            <ImageCard  key={id}
                                        id={id}
                                        index={index}
                                        onView={onView}
                            />)}
                    </Box>

                    <Box sx={{display: 'flex',height: 'calc(100vh - 24rem)', p:2, overflow: 'auto'}}
                         flexDirection={"column"}
                         justifyContent={"flex-start"}
                         alignItems={"stretch"}
                         boxShadow={1}
                         gap= "1rem"
                    >
                        <Box sx={{display: 'flex', justifyContent:"space-between",alignItems:"center"}}>
                            <Typography variant="h5" color="text.secondary">
                                Note
                            </Typography>

                            <IconButton aria-label="add">
                                <AddBoxIcon />
                            </IconButton>
                        </Box>

                        {notes.map(note =>
                            <NoteCard  key={note.id}
                                        note={note}
                                        onDelete={onDelete}
                                        onEdit={onEdit}
                            />)}
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}