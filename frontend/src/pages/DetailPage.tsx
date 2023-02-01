import usePatient from "../hooks/usePatient";
import ImageCard from "../components/image/ImageCard";
import {Box, Grid, Typography} from "@mui/material";
import ImageViewer from "../components/image/ImageViewer";
import {useState} from "react";

export default function DetailPage(){

    const patient = usePatient();
    const [viewImageId, setViewImageId] = useState <string> (patient.imageIds[0]);
    const onView = (id:string) => setViewImageId(id);

    return(
        <>
            <Grid container sx={{ mt:0, mb:0, height: "100vh"}} >
                <Grid xs={12} sm={8} sx={{backgroundColor:"black"}}>
                    <ImageViewer key={viewImageId} id={viewImageId}/>
                </Grid>

                <Grid xs={12} sm={4}>
                    <Box sx={{height: "10%", p:2}}
                         boxShadow={1}
                    >
                        <Typography variant="h5" color="text.secondary">
                            {patient.lastname}, {patient.firstname}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Patient-ID: {patient.id}
                        </Typography>
                    </Box>

                    <Box sx={{display: 'flex',height: "50%", p:2}}
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

                    <Box sx={{display: 'flex', height: "40%",m:2, p:2}}
                         flexDirection={"column"}
                         justifyContent={"space-between"}
                         alignItems={"stretch"}
                         gap= "1rem"
                    >
                        Ich bin die Notizen
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}