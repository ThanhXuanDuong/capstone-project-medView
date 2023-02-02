import {Card,CardMedia} from "@mui/material";

export default function ImageViewer({
    id
}:{
    id:string
}){
    return (
        <Card sx={{ display: 'flex'}}>
            { id &&
                <CardMedia
                    sx={{p: '10%', backgroundColor:"black", objectFit:'fit'}}
                    component="img"
                    image={"/api/files/" + id}
                />
            }
        </Card>
    );
}