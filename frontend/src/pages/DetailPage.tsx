import usePatient from "../hooks/usePatient";
import ImageCard from "../components/image/ImageCard";
import {Box, Grid, IconButton, Typography} from "@mui/material";
import ImageViewer from "../components/image/ImageViewer";
import {useEffect, useState} from "react";
import NoteCard from "../components/note/NoteCard";
import Note from "../types/Note";
import axios from "axios";
import AddBoxIcon from "@mui/icons-material/AddBox";
import useFormActions from "../hooks/useFormActions";
import NoteForm from "../components/note/NoteForm";

export default function DetailPage(){

    const patient = usePatient();
    const [viewImageId, setViewImageId] = useState <string> (patient.imageIds[0]);
    const [notes, setNotes] = useState<Note[]>([]);
    const [note, setNote] = useState<Note>({imageId:"", text:""});
    const {open,setOpen, handleClickOpen, handleClose} = useFormActions();
    const [editing, setEditing] = useState<boolean>(false);

    const onView = (id:string) => {
        setViewImageId(id);
        setNote({...note, imageId: id});
    }

    useEffect(() => {
        (async () =>{
            const response = await axios.get(`/api/notes/image/${viewImageId}`);
            setNotes(response.data);
        })();
    },[viewImageId]);

    const onAdd= (createdNote:Note) => {
        (async () => {
            const response = await axios.post("/api/notes", createdNote);
            setNotes([...notes, response.data]);
            setNote({imageId: "", text: ""});
        })();
        setOpen(false);
    }

    const handleEditClick = async(editingNote:Note|undefined) =>{
        if (editingNote) {
            setNote(editingNote);
            setOpen(true);
            setEditing(true);
        }else{
            console.log("No note");
        }

    };
    const onEdit =(note:Note) =>{
       (async () => {
           const response = await axios.put(`/api/notes/${note.id}`,note);
           const editedNote = response.data;
           setNotes(notes.map(note =>
               note.id === editedNote.id
                   ? editedNote
                   : note));
           setNote({imageId: "", text: ""});
       })();
       setOpen(false);
    };

    const onDelete =(id: string|undefined) =>{
        (async () => {
            await axios.delete("/api/notes/" +id);
            setNotes(notes.filter(note => note.id !==id));
        })();
    };

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

                    <Box sx={{display: 'flex',
                            height: "20rem",
                            p:2,
                            overflow: 'auto'}}
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

                    <Box sx={{display: 'flex',
                            height: 'calc(100vh - 24rem)',
                            p:2,
                            overflow: 'auto'}}
                         flexDirection={"column"}
                         justifyContent={"flex-start"}
                         alignItems={"stretch"}
                         boxShadow={1}
                         gap= "1rem"
                    >
                        <Box sx={{display: 'flex',
                                justifyContent:"space-between",
                                alignItems:"center"}}>
                            <Typography variant="h5" color="text.secondary">
                                Note
                            </Typography>

                            <IconButton aria-label="add" onClick={handleClickOpen}>
                                <AddBoxIcon />
                            </IconButton>
                        </Box>

                        {notes.map(note =>
                            <NoteCard  key={note.id}
                                        note={note}
                                        onDelete={onDelete}
                                        onEdit={handleEditClick}
                            />)}

                        <NoteForm note={note}
                                  setNote={setNote}
                                  setEditing={setEditing}
                                  open={open}
                                  handleClose={handleClose}
                                  onSave={editing? onEdit: onAdd}/>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}