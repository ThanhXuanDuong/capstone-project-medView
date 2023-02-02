import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {Box, Button, DialogActions, TextField} from "@mui/material";
import Note from "../../types/Note";

export default function NoteForm({
    note,
    setNote,
    setEditing,
    open,
    handleClose,
    onSave
}:{
    note: Note,
    setNote: (note:Note) => void,
    setEditing: (edit: boolean) => void
    open: boolean,
    handleClose: () => void,
    onSave: (note:Note) => void
}){
    const onCancel= () =>{
        handleClose();
        setEditing(false);
    }
    return (
        <Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Note</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        sx={{ width: 500, mb: 2 }}
                        margin="dense"
                        id="note"
                        label="Note"
                        type="text"
                        value={note.text}
                        variant="outlined"
                        onChange={(e) => setNote({...note, text: e.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button onClick={() => onSave(note)}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );

}