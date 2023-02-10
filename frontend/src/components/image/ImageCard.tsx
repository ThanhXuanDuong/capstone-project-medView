import {Box, Card, CardActionArea, CardActions, CardMedia, IconButton, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ImageCard({
    id,
    index,
    onView,
    onDelete
}:{
    id: string,
    index: number,
    onView: (id:string) => void,
    onDelete: (id:string) => void
}){
    const handleClick = () => {
        onView(id);
    }

    return (
        <Card sx={{
            display: 'flex',
            justifyContent:'space-evenly',
            alignItems:'center',
            width: '100%'
        }}
        >
            <CardActionArea onClick={handleClick}>
                <Box sx={{ display: 'flex', pl:'1rem'}}
                     justifyContent={"flex-start"}
                     alignItems={"center"}
                     gap= "1rem"
                >
                    <Typography variant="body1" color="text.secondary">
                        {index+1}
                    </Typography>

                    <CardMedia
                        sx={{ maxHeight:'120px', p:2, objectFit:'contain'}}
                        component="img"
                        style={{padding: "5%" }}
                        image ={"/api/files/"+id}
                    />
                </Box>
           </CardActionArea>
            <CardActions disableSpacing>
                <IconButton aria-label="delete"
                            onClick={() => onDelete(id)}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>

        </Card>
    );
}