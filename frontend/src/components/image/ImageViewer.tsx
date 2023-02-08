import {Card,CardMedia} from "@mui/material";

export default function ImageViewer({
    id
}:{
    id:string
}){
    return (
        <Card sx={{ display: 'flex',height:"100%"}}>
            { id &&
                <CardMedia
                    sx={{p:"5%",backgroundColor:"black", objectFit:'contain'}}
                    component="img"
                    image={"/api/files/" + id}
                />
            }
        </Card>
    );
}