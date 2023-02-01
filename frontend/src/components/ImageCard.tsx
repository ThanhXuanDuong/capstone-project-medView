import {Card, CardMedia} from "@mui/material";

export default function ImageCard({id}:{id:string}){
    return (
        <Card sx={{ display: 'flex'}}>
                <CardMedia
                    component="img"
                    image ={"/api/files/"+id}
                />
        </Card>
    );
}