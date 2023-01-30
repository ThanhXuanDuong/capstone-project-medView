import {Card, CardActions, CardContent, CardMedia, IconButton, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Patient from "../types/Patient";
import {IMAGES_PATH} from "../application";

export default function PatientCard({
    patient
}:{
    patient: Patient
}){
    return (
        <Card sx={{ display: 'flex'}}>
            <CardMedia
                component="img"
                style={{ height: "120px", width:"120px", padding: "2%" }}
                image= {IMAGES_PATH + "profile-placeholder.png"}
                alt="Profile"
            />

            <CardContent>
                <Typography variant="h4" color="text.secondary">
                    {patient.lastname}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                    {patient.firstname}
                </Typography>
            </CardContent>

            <CardContent>
                <Typography variant="h6" color="text.secondary">
                    Patient-ID: {patient.id}
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