import {
    Box,
    ButtonBase,
    Card,
    CardActions,
    CardContent,
    CardMedia, Divider,
    IconButton, ThemeProvider,
    Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Patient from "../../types/Patient";
import {IMAGES_PATH} from "../../application";
import {useNavigate} from "react-router-dom";
import theme from "../styling/theme";

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
        <ThemeProvider theme={theme}>
        <Card sx={{ display: 'flex',
            width:"100%",
            justifyContent:'space-between',
            backgroundColor: '#202124'
        }}>
            <ButtonBase sx={{display:'flex',justifyContent:'flex-start', width:'80%'}}
                        onClick={() => navigate(`/patients/${patient.id}`)}>
                <CardMedia
                    component="img"
                    style={{ maxWidth: "8rem", maxHeight:"8rem", padding: "1.5rem" }}
                    image= {IMAGES_PATH + "profile-placeholder.png"}
                    alt="Profile"
                />

                <CardContent sx={{width:'40%'}}>
                    <Typography variant="h4" color="text.secondary">
                        {patient.firstname} {patient.lastname}
                    </Typography>
                </CardContent>

                <CardContent>
                    <Typography variant="h6" color="text.secondary">
                        Patient-ID: {patient.id}
                    </Typography>
                </CardContent>
            </ButtonBase>

            <Divider orientation="vertical" flexItem variant="middle" sx={{bgcolor: "darkgrey"}} />

            <Box sx={{ display: 'flex',
                flexDirection:'column',
                justifyContent:'space-between',
                alignItems:'center',
                p: 1,
                gap:'0.5rem'}}>
                <CardActions disableSpacing = {false} sx={{ height: '70%'}}>
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
        </ThemeProvider >
    );
}