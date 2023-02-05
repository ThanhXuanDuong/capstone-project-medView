import { Card, CardActions, CardContent, IconButton, Typography} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Note from "../../types/Note";

export default function NoteCard({
    note,
    onDelete,
    onEdit
}:{
    note: Note,
    onDelete: (id: string|undefined) => void,
    onEdit: (note: Note|undefined) => void
}){
    return (
        <Card sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
        }}>

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {note.text}
                </Typography>
            </CardContent>

            <CardActions disableSpacing>
                <IconButton aria-label="edit"
                            onClick={() => onEdit(note)}>
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="delete"
                            onClick={() => onDelete(note.id)}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}