import {Box, Card, Divider} from "@mui/material";
import "./ImageViewer.css"
import React, {useEffect, useRef} from "react";
import {DrawShapes} from "../shape/DrawShapes";
import Shape from "../../types/Shape";
import Position from "../../types/Position";

export default function ImageViewer({
    ids,
    onImgDisplay,
    draw,
    newShape,
    mouseDownPos,
    mouseUpPos,
    shapes,
    onDelete
}:{
    ids: string[],
    onImgDisplay: (rect:DOMRect) => void,
    draw: boolean,
    newShape: Shape,
    mouseDownPos: Position,
    mouseUpPos:Position,
    shapes: Shape[],
    onDelete: (id:string|undefined)=> void
}){
    let imgRef = useRef<HTMLImageElement>(null);

    let gridHeight: string;
    let gridWidth :string;
    let fWrap : string = "nowrap";
    switch (ids.length){
        case 1:
            gridHeight = "100%";
            gridWidth = "100%";
            break;
        case 2:
            gridHeight = "100%";
            gridWidth= "49.9%";
            break;
        default:
            gridHeight = "49.8%";
            gridWidth= "49.8%";
            fWrap = "wrap";
    }

    useEffect(() => {
        const getSizeImg = () => {
            if (imgRef.current?.complete) {
                const rect = imgRef.current.getBoundingClientRect();
                onImgDisplay(rect);
            }
        };
        getSizeImg();

        window.addEventListener('resize', getSizeImg, false);
        return () => {
            window.removeEventListener('resize', getSizeImg)
        }

    },[ids,imgRef.current?.complete, onImgDisplay]);

    return (
        <>
            <Card id={"image-viewer"}
                  sx={{ display: 'flex',
                        height:"100%",
                        width:"100%",
                        alignItems:"center",
                        backgroundColor:"black",
                        flexWrap: fWrap}}>
                { ids.length >0 &&
                     ids.map(id =>
                         <>
                             <Box
                                 sx={{position:"relative",
                                 display: 'flex',
                                 justifyContent:"center",
                                 alignItems:"center",
                                 width: gridWidth,
                                 height: gridHeight,
                                 borderBottom: "1px solid darkgrey",
                                 p:"5%",
                                 alignSelf:"center"
                             }}>
                                 <img ref={ids.length===1 ? imgRef : null}
                                      key= {id}
                                      id={"image-in-viewer"}
                                      src={"/api/files/" + id}
                                      alt={"img"}
                                      draggable="false"
                                 />

                                 {ids.length===1 &&
                                     <DrawShapes shapes={shapes}
                                                 imgRect={imgRef.current?.getBoundingClientRect()}
                                                 draw={draw}
                                                 newShape={newShape}
                                                 mouseDownPos ={mouseDownPos}
                                                 mouseUpPos ={mouseUpPos}
                                                 onDelete={onDelete}
                                     />}

                             </Box>
                             {ids.length !==1 &&
                                 <Divider orientation="vertical" flexItem sx={{bgcolor: "darkgrey"}}/>
                             }
                         </>
                     )
                }
            </Card>
        </>
    );
}