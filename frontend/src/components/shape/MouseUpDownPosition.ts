import {useEffect, useState} from "react";
import Position from "../../types/Position";

export default function MouseUpDownPosition({
    draw,
    setSaveShape,
    imgRect
}:{
    draw:boolean,
    setSaveShape:(save:boolean) => void,
    imgRect:DOMRect|undefined
}) {
    const [mouseUpPos, setMouseUpPos] = useState<Position>({x: 0.,y: 0.});
    const [mouseDownPos, setMouseDownPos] = useState<Position>({x: 0.,y: 0.});

    const [mouseUpRelativePos, setMouseUpRelativePos] = useState<Position>({x: 0.,y: 0.});
    const [mouseDownRelativePos, setMouseDownRelativePos] = useState<Position>({x: 0.,y: 0.});

    const imgViewer = document.getElementById("image-viewer");

    useEffect(() => {
        if (draw && imgViewer && imgRect) {
            setMouseDownPos({x: 0.,y: 0.});
            setMouseUpPos({x: 0.,y: 0.});

            const handleMouseDown = (event: MouseEvent) => {
                setMouseDownPos({x: event.clientX, y: event.clientY});
                setMouseDownRelativePos({
                    x: (event.clientX - imgRect.x) / imgRect.width,
                    y: (event.clientY - imgRect.y) / imgRect.height
                });
            };

            const handleMouseUp = (event: MouseEvent) => {
                setMouseUpPos({x: event.clientX, y: event.clientY});
                setMouseUpRelativePos({
                    x: (event.clientX - imgRect.x) / imgRect.width,
                    y: (event.clientY - imgRect.y) / imgRect.height
                });
                setSaveShape(true);
            };

            imgViewer.addEventListener('mousedown', handleMouseDown, {once:true});
            imgViewer.addEventListener('mouseup', handleMouseUp, {once:true});
            return () => {
                imgViewer.removeEventListener('mousedown', handleMouseDown);
                imgViewer.removeEventListener('mouseup', handleMouseUp);
            }
        }
    },[imgViewer, draw, imgRect, setSaveShape]);

    return {mouseUpPos,mouseDownPos,mouseUpRelativePos,mouseDownRelativePos};
}