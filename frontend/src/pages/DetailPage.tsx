import usePatient from "../hooks/usePatient";
import ImageCard from "../components/image/ImageCard";
import {
    Box,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ThemeProvider,
    Typography
} from "@mui/material";
import ImageViewer from "../components/image/ImageViewer";
import React, {useEffect, useState} from "react";
import NoteCard from "../components/note/NoteCard";
import Note from "../types/Note";
import axios from "axios";
import useFormActions from "../hooks/useFormActions";
import NoteForm from "../components/note/NoteForm";
import useDialogActions from "../hooks/useDialogActions";
import ConfirmationDialog from "../components/ConfirmationDialog";
import usePatients from "../hooks/usePatients";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import NavBar from "../components/NavBar";
import theme from "../components/styling/theme";
import PopoverToolbar from "../components/PopoverToolbar";
import CommentIcon from '@mui/icons-material/Comment';
import MousePosition from "../components/MousePosition";
import NotePopover from "../components/NotePopover";
import useNotesByPatId from "../hooks/useNotesByPatId";

export default function DetailPage(){
    const [markup, setMarkup] = useState<boolean>(false)
    const {mousePos,mouseRelativePos} =MousePosition(markup);

    const {patients,setPatients} = usePatients();
    const {isReady,viewPatient,setViewPatient} = usePatient();

    const [notes, setNotes] = useState<Note[]>([]);
    const [note, setNote] = useState<Note>(
        { imageId:"", text:"",
                    relativeX: 0,
                    relativeY: 0});

    const {openForm, handleOpenForm, handleCloseForm} = useFormActions();
    const {openDialog,handleOpenDialog, handleCloseDialog} = useDialogActions();
    const [editing, setEditing] = useState<boolean>(false);
    const [deletingImageId, setDeletingImageId] = useState<string|undefined>("");
    const [deletingNoteId, setDeletingNoteId] = useState<string|undefined>("");

    const [viewImageIds, setViewImageIds] = useState <string[]> ([]);
    const [grids, setGrids] = useState<number>(1);
    const notesByPatId =useNotesByPatId();
    const navigate = useNavigate();

    const [dimensions, setDimensions] = React.useState({
        height: document.body.clientHeight,
        width: document.body.clientWidth
    })

    const onView = (id:string) => {
        if (grids===1){
            setViewImageIds([id]);
        }else if (viewImageIds.length >= grids){
            viewImageIds.push(id);
            viewImageIds.shift();
        }else{
            setViewImageIds([...viewImageIds,id]);
        }
        setNote({...note, imageId: id});
    }

    useEffect(() => {
        (async () =>{
            try{
                for (let viewImageId of viewImageIds){
                    const response = await axios.get(`/api/notes/image/${viewImageId}`);
                    setNotes(response.data.reverse());
                }

                window.addEventListener(
                    'resize',
                    () => setDimensions({
                        height: document.body.clientHeight,
                        width: document.body.clientWidth
                    }))

            }catch (e:any){
                console.log("Error while loading data!")
                e.response.status === "401" && navigate("/login");
            }
        })();
    },[navigate, viewImageIds]);

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
                setMarkup(false);
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

    const handleDeleteClick = async(id: string|undefined) =>{
        if(id){
            handleOpenDialog();
            setDeletingNoteId(id)
        }else{
            toast.error("Note doesn't exist!",{toastId:"errorDeleteClick"})
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
        <ThemeProvider theme={theme}>
            <NavBar showIcons={true}/>

            {!isReady
            ? null
            :
            <Grid container sx={{mt: "48px",
                                mb: 0,
                                height: 'calc(100vh - 48px)',
                                overflow:"hidden"}}>
                <Grid container item xs={12} md={9} sm={8}
                      sx={{position:"relative",
                          justifyContent:"center",
                          height: "100%",
                          backgroundColor: "black"}}>
                    <ImageViewer ids={viewImageIds}/>
                    <Box sx={{position:"absolute",
                        display:"flex",
                        top: 30,
                        right: 15,
                        backgroundColor:"action.selected",
                        borderRadius:"4px"}}>
                        <PopoverToolbar setGrids={setGrids}
                                        viewImageIds={viewImageIds}
                                        setViewImageIds={setViewImageIds}/>
                        <Divider orientation="vertical" flexItem />
                        <Box alignSelf={"center"}>
                            <IconButton onClick={() => setMarkup(true)}>
                                <CommentIcon/>
                            </IconButton>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} md={3} sm={4}  sx={{height: "100%"}}>
                    <Box sx={{maxHeight: "15%", mt:'16px', p: 2}}>
                        <Typography variant="h5" color="text.primary">
                            {viewPatient.lastname}, {viewPatient.firstname}
                        </Typography>
                        <Typography variant="body1" color="text.primary">
                            Patient-ID: {viewPatient.id}
                        </Typography>
                    </Box>

                    <Divider/>

                    <Box sx={{
                        display: 'flex',
                        height: '55%',
                        px: 2,
                        py:2
                    }}
                         flexDirection={'column'}
                         justifyContent={'center'}
                         alignItems={'stretch'}
                    >
                        <List sx={{
                            position: 'relative',
                            overflow: 'auto',
                            height: '95%',
                            py:0,
                            my:0
                        }}>
                            {viewPatient.imageIds.map((id, index) => (
                                <ListItem key={`image-item-${id}`}>
                                    <ImageCard key={id}
                                               id={id}
                                               notesByPatId={notesByPatId}
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

                    <Box sx={{
                        position:'relative',
                        display: 'flex',
                        maxHeight: '32%',
                        px: 2}}
                         flexDirection={'column'}
                         justifyContent={'flex-start'}
                         alignItems={'stretch'}
                    >
                        <Box sx={{
                            py:1
                        }}>
                            <Typography variant="h5" color="text.primary" sx={{pb:0}}>
                                Note
                            </Typography>
                        </Box>

                        <List sx={{
                            position: 'relative',
                            overflow: 'auto',
                            py:0,
                            my:0
                        }}>
                            {notes.map((note) => (
                                <ListItem key={`note-item-${note.id}`}>
                                    <NoteCard key={note.id}
                                              note={note}
                                              onDelete={() => {
                                                  handleOpenDialog();
                                                  setDeletingNoteId(note.id);
                                              }}
                                              onEdit={handleEditClick}
                                    />
                                </ListItem>
                            ))}
                        </List>

                        <NoteForm note={note}
                                  mouseRelativePos={mouseRelativePos}
                                  setNote={setNote}
                                  editing={editing}
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

                {viewImageIds.length===1 && notes.map(note => {
                    const x= note.relativeX * dimensions.width;
                    const y= note.relativeY * dimensions.height;
                    return <NotePopover key={note.id}
                                        position={{x,y}}
                                        editing={true}
                                        handleOpenForm={handleOpenForm}
                                        handleEditClick={handleEditClick}
                                        handleDeleteClick={handleDeleteClick}
                                        note={note}
                    />}
                )}

                { markup && (mousePos.x!==0 && mousePos.y!==0) &&
                    <NotePopover position={mousePos}
                                 editing={false}
                                 handleOpenForm={handleOpenForm}
                                 handleEditClick={handleEditClick}
                                 handleDeleteClick={handleDeleteClick}
                                 note={{...note}}
                    />
                }
            </Grid>
            }
        </ThemeProvider >
    );
}