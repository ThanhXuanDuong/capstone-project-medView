import {Card, CardActions, CardContent, CardMedia, IconButton, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Patient from "../types/Patient";

export default function PatientCard({
    patient
}:{
    patient: Patient
}){
    return (
        <Card sx={{ display: 'flex' }}>
            <CardMedia
                component="img"
                width={ "100"}
                height="100"
                image="/public/profil-placeholder.png"
                alt="Profile"
            />

            <CardContent>
                <Typography variant="h4" color="text.secondary">
                    Lastname
                </Typography>
                <Typography variant="h5" color="text.secondary">
                    Firstname
                </Typography>
            </CardContent>

            <CardContent>
                <Typography variant="h6" color="text.secondary">
                    Patient-ID
                </Typography>
            </CardContent>

            <CardActions disableSpacing>
                <IconButton aria-label="edit">
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}