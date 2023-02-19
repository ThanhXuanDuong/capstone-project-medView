import {useEffect, useState} from "react";
import Position from "../../types/Position";
import Shape from "../../types/Shape";

export default function MouseUpDownPosition({
    draw,
    newShape,
    setNewShape
}:{
    draw:boolean,
    newShape:Shape
    setNewShape: (shape:Shape)=>void
}) {
    const [mouseUpRelativePos, setMouseUpRelativePos] = useState<Position>({x: 0.,y: 0.});
    const [mouseDownRelativePos, setMouseDownRelativePos] = useState<Position>({x: 0.,y: 0.});

    const imgViewer = document.getElementById("image-viewer");
    const img = document.getElementById("image-in-viewer");

    useEffect(() => {
        if (draw && imgViewer && img) {
            let rect = img.getBoundingClientRect();

            const handleMouseDown = (event: MouseEvent) => {
                setMouseDownRelativePos({
                    x: (event.clientX - rect.x) / rect.width,
                    y: (event.clientY - rect.y) / rect.height
                });
                setNewShape({...newShape, point1:[event.clientX,event.clientY]})
            };

            const handleMouseUp = (event: MouseEvent) => {
                setMouseUpRelativePos({
                    x: (event.clientX - rect.x) / rect.width,
                    y: (event.clientY - rect.y) / rect.height
                });
                setNewShape({...newShape, point2:[event.clientX,event.clientY]})
            };

            imgViewer.addEventListener('mousedown', handleMouseDown, {once:true});
            imgViewer.addEventListener('mouseup', handleMouseUp, {once:true});
            return () => {
                window.removeEventListener('mousedown', handleMouseDown);
                window.removeEventListener('mouseup', handleMouseUp);
            }
        }
    },[img, imgViewer, draw, setNewShape, newShape]);

    return {mouseUpRelativePos,mouseDownRelativePos};
}