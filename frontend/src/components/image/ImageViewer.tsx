import {Box, Card, Divider} from "@mui/material";
import "./ImageViewer.css"
import React, {useEffect, useRef} from "react";
import {DrawShapes} from "../shape/DrawShapes";
import Shape from "../../types/Shape";

export default function ImageViewer({
    ids,
    onImgDisplay,
    imgPosition,
    draw,
    shapes
}:{
    ids: string[],
    onImgDisplay: (rect:DOMRect) => void,
    imgPosition:DOMRect|undefined
    draw: boolean,
    shapes: Shape[]
}){
    let imgRef = useRef<HTMLImageElement>(null);
    //const {mouseUpPos,mouseDownPos,mouseUpRelativePos,mouseDownRelativePos} =MouseUpDownPosition(draw);

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
            gridHeight = "49.9%";
            gridWidth= "49.9%";
            fWrap = "wrap";
    }

    useEffect(() => {
        const getSizeImg = () => {
            if (imgRef.current?.complete) {
                const rect = imgRef.current.getBoundingClientRect();
                onImgDisplay(rect)
            }
        };
        getSizeImg();

        window.addEventListener('resize', getSizeImg, false);
        return () => {
            window.removeEventListener('resize', getSizeImg)
        }

    },[ids,imgRef.current?.complete, onImgDisplay]);

    //console.log("downX"+ mouseDownPos.x+"downY"+ mouseDownPos.y);
    //console.log("upX"+ mouseUpPos.x+"upY"+ mouseUpPos.y);
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

                                 {ids.length===1 && <DrawShapes shapes={shapes} imgPosition={imgPosition}/>}
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