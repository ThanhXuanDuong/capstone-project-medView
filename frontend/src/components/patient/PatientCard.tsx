import {
    Box,
    ButtonBase,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Patient from "../../types/Patient";
import {IMAGES_PATH} from "../../application";
import {useNavigate} from "react-router-dom";

export default function PatientCard({
    patient,
    onDelete,
    onEdit
}:{
    patient: Patient,
    onDelete: (id: string|undefined) => void,
    onEdit: (patient: Patient|undefined) => void
}){
    const navigate = useNavigate();

    return (
        <Card sx={{ display: 'flex',width:"100%",justifyContent:'space-evenly'}}>
            <ButtonBase onClick={() => navigate(`/patients/${patient.id}`)}>
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
            </ButtonBase>

            <Box sx={{ display: 'flex', flexDirection:'column'}}>
                <CardActions disableSpacing sx={{ height: '70%'}}>
                    <IconButton aria-label="edit"
                                onClick={() => onEdit(patient)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete"
                                onClick={() => onDelete(patient.id)}>
                        <DeleteIcon />
                    </IconButton>
                </CardActions>

                <Typography variant="body2" color="text.secondary" align={'center'}>
                     {new Date(patient.timeStamp).getFullYear() + "/" +
                      (new Date(patient.timeStamp).getMonth() + 1) + "/" +
                      new Date(patient.timeStamp).getDate() + " " +
                      new Date(patient.timeStamp).getHours() + ":" +
                      new Date(patient.timeStamp).getMinutes()
                    }
                </Typography>
            </Box>

        </Card>
    );
}