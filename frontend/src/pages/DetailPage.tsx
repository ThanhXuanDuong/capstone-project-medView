import usePatient from "../hooks/usePatient";
import ImageCard from "../components/image/ImageCard";
import {Box, Divider, Grid, IconButton, List, ListItem, Typography} from "@mui/material";
import ImageViewer from "../components/image/ImageViewer";
import React, {useEffect, useState} from "react";
import NoteCard from "../components/note/NoteCard";
import Note from "../types/Note";
import axios from "axios";
import AddBoxIcon from "@mui/icons-material/AddBox";
import useFormActions from "../hooks/useFormActions";
import NoteForm from "../components/note/NoteForm";
import useDialogActions from "../hooks/useDialogActions";
import ConfirmationDialog from "../components/ConfirmationDialog";
import usePatients from "../hooks/usePatients";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export default function DetailPage(){
    const {patients,setPatients} = usePatients();
    const {isReady,viewPatient,setViewPatient,viewImageId, setViewImageId} = usePatient();

    const [notes, setNotes] = useState<Note[]>([]);
    const [note, setNote] = useState<Note>({imageId:"", text:""});

    const {openForm, handleOpenForm, handleCloseForm} = useFormActions();
    const {openDialog,handleOpenDialog, handleCloseDialog} = useDialogActions();
    const [editing, setEditing] = useState<boolean>(false);
    const [deletingImageId, setDeletingImageId] = useState<string|undefined>("");
    const [deletingNoteId, setDeletingNoteId] = useState<string|undefined>("");
    const navigate = useNavigate();

    const onView = (id:string) => {
        setViewImageId(id);
        setNote({...note, imageId: id});
    }

    useEffect(() => {
        (async () =>{
            try{
            const response = await axios.get(`/api/notes/image/${viewImageId}`);
            setNotes(response.data.reverse());
            }catch (e:any){
                console.log("Error while loading data!")
                e.response.status === "401" && navigate("/login");
            }
        })();
    },[navigate, viewImageId]);

    const onAdd= (createdNote:Note) => {
        (async () => {
            try{
                const response = await axios.post("/api/notes", createdNote);
                setNotes([response.data,...notes]);

                toast.success("Successfully saving new note!",
                    {toastId:"successAdd"});
            }catch(e: any)
            {
                e.response.status === "401" && navigate("/login");
                toast.error("Error:"+
                    JSON.stringify(e.response.data, null, 2),
                    {toastId:"errorAdd"})
            }finally {
                setNote({...note, text: ""});
                handleCloseForm();
            }
        })();
    }

    const handleEditClick = async(editingNote:Note|undefined) =>{
        if (editingNote) {
            setNote(editingNote);
            handleOpenForm();
            setEditing(true);
        }else{
            toast.error("Note doesn't exist!",{toastId:"errorEditClick"})
        }

    };

    const onEdit =(note:Note) =>{
       (async () => {
           try{
               const response = await axios.put(`/api/notes/${note.id}`,note);
               const editedNote = response.data;
               setNotes(notes.map(note =>
                   note.id === editedNote.id
                       ? editedNote
                       : note));

               toast.success("Successfully saving edited note!",
                   {toastId:"successEdit"})
           }catch(e: any){
               e.response.status === "401" && navigate("/login");
               toast.error("Error: " +
                   JSON.stringify(e.response.data, null, 2),
                   {toastId:"errorEdit"})
           }finally {
               setNote({...note, text: ""});
               handleCloseForm();
           }

       })();
    };

    const onDeleteNote =(noteId: string|undefined) =>{
        (async () => {
            try{
                await axios.delete("/api/notes/" +noteId);
                setNotes(notes.filter(note => note.id !==noteId));
                setDeletingNoteId("");

                toast.success("Successfully deleting note!",
                    {toastId:"successDeleteNote"});
            }catch(e: any){
                e.response.status === "401" && navigate("/login");
                toast.error("Error while deleting note!",
                    {toastId:"errorDeleteNote"})
            }finally {
                handleCloseDialog();
            }
        })();

    };

    const onDeleteImage =(id: string|undefined) =>{
        (async () => {
            try{
                await axios.delete("/api/files/" +id);
                const p = {...viewPatient,
                    imageIds: viewPatient.imageIds.filter(imageId => imageId!==id)};
                setViewPatient(p);

                const response = await axios.put("/api/patients/" +p.id,p);
                const updatedPatient =response.data;
                setPatients(patients.map(outdatedPatient =>
                    outdatedPatient.id === updatedPatient.id
                        ? updatedPatient
                        : outdatedPatient));

                setDeletingImageId("");
                setNotes([]);

                toast.success("Successfully deleting image!",
                    {toastId:"successDeleteImage"})
            }catch (e: any){
                e.response.status === "401" && navigate("/login");
                toast.error("Error while deleting image!",
                    {toastId:"errorDeleteImage"})
            }finally {
                handleCloseDialog();
            }
        })();
    };

    return(
        <>  {!isReady
            ? null
            :
            <Grid container sx={{mt: 0, mb: 0, height: "100vh"}}>
                <Grid item xs={12} md={9} sm={8}  sx={{height: "100%", backgroundColor: "black"}}>
                    <ImageViewer key={viewImageId} id={viewImageId}/>
                </Grid>

                <Grid item xs={12} md={3} sm={4}  sx={{height: "100%"}}>
                    <Box sx={{height: "12%", p: 2}}>
                        <Typography variant="h5" color="text.secondary">
                            {viewPatient.lastname}, {viewPatient.firstname}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Patient-ID: {viewPatient.id}
                        </Typography>
                    </Box>

                    <Divider/>

                    <Box sx={{
                        display: 'flex',
                        height: '50%',
                        px: 2,
                        py:1
                        }}
                         flexDirection={'column'}
                         justifyContent={'center'}
                         alignItems={'stretch'}
                         gap='1rem'
                    >
                        <List sx={{
                            position: 'relative',
                            overflow: 'auto',
                            height: '95%',
                        }}>
                            {viewPatient.imageIds.map((id, index) => (
                                <ListItem key={`image-item-${id}`}>
                                    <ImageCard key={id}
                                               id={id}
                                               index={index}
                                               onView={onView}
                                               onDelete={() => {
                                                   handleOpenDialog();
                                                   setDeletingImageId(id);
                                               }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    <Divider />

                    <Box sx={{display: 'flex',
                              height: '30%',
                              px: 2,
                              py:1}}
                         flexDirection={'column'}
                         justifyContent={'flex-start'}
                         alignItems={'stretch'}
                         gap='1rem'
                    >
                        <Box sx={{
                            display: 'flex',
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <Typography variant="h5" color="text.secondary">
                                Note
                            </Typography>

                            <IconButton aria-label="add" onClick={handleOpenForm}>
                                <AddBoxIcon/>
                            </IconButton>
                        </Box>

                        <List sx={{
                            position: 'relative',
                            overflow: 'auto',
                            height: '95%',
                        }}>
                            {viewImageId
                                ? ( notes.length>0
                                    ? notes.map((note) => (
                                        <ListItem key={`note-item-${note.id}`}>
                                            <NoteCard key={note.id}
                                                      note={note}
                                                      onDelete={() => {
                                                          handleOpenDialog();
                                                          setDeletingNoteId(note.id);
                                                      }}
                                                      onEdit={handleEditClick}
                                            />
                                        </ListItem>))
                                    : <Typography variant="body2" color="text.secondary">
                                            There are no notes for this image.
                                        </Typography>
                                    )
                                : <Typography variant="body2" color="text.secondary">
                                    Chose image to see notes.
                                  </Typography>
                            }

                        </List>

                        <NoteForm note={note}
                                  setNote={setNote}
                                  setEditing={setEditing}
                                  open={openForm}
                                  handleClose={handleCloseForm}
                                  onSave={editing ? onEdit : onAdd}/>
                    </Box>

                    {deletingImageId &&
                        <ConfirmationDialog open={openDialog}
                                            handleClose={handleCloseDialog}
                                            onDelete={() => onDeleteImage(deletingImageId)}
                        />
                    }
                    {deletingNoteId &&
                        <ConfirmationDialog open={openDialog}
                                            handleClose={handleCloseDialog}
                                            onDelete={() => onDeleteNote(deletingNoteId)}
                        />
                    }
                </Grid>
            </Grid>
            }
        </>
    );
}