import {useEffect, useState} from "react";
import Position from "../../types/Position";

export default function MouseUpDownPosition({
    draw,
    setSaveShape
}:{
    draw:boolean,
    setSaveShape:(save:boolean) => void
}) {
    const [mouseUpPos, setMouseUpPos] = useState<Position>({x: 0.,y: 0.});
    const [mouseDownPos, setMouseDownPos] = useState<Position>({x: 0.,y: 0.});

    const [mouseUpRelativePos, setMouseUpRelativePos] = useState<Position>({x: 0.,y: 0.});
    const [mouseDownRelativePos, setMouseDownRelativePos] = useState<Position>({x: 0.,y: 0.});

    const imgViewer = document.getElementById("image-viewer");
    const img = document.getElementById("image-in-viewer");

    useEffect(() => {
        if (draw && imgViewer && img) {
            let rect= img.getBoundingClientRect();
            setMouseDownPos({x: 0.,y: 0.});
            setMouseUpPos({x: 0.,y: 0.});

            const handleMouseDown = (event: MouseEvent) => {
                setMouseDownPos({x: event.clientX, y: event.clientY});
                console.log( event.clientY)
                setMouseDownRelativePos({
                    x: (event.clientX - rect.x) / rect.width,
                    y: (event.clientY - rect.y) / rect.height
                });
                console.log( rect.y);
                console.log( rect.height);
                console.log((event.clientY - rect.y) / rect.height)
            };

            const handleMouseUp = (event: MouseEvent) => {
                setMouseUpPos({x: event.clientX, y: event.clientY});
                setMouseUpRelativePos({
                    x: (event.clientX - rect.x) / rect.width,
                    y: (event.clientY - rect.y) / rect.height
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
    },[imgViewer, draw, img, setSaveShape]);

    return {mouseUpPos,mouseDownPos,mouseUpRelativePos,mouseDownRelativePos};
}