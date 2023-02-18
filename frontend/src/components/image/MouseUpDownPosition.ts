import {useEffect, useState} from "react";
import Position from "../../types/Position";

export default function MouseUpDownPosition(draw:boolean) {
    const [mouseUpPos, setMouseUpPos] = useState<Position>({x: 0.,y: 0.});
    const [mouseDownPos, setMouseDownPos] = useState<Position>({x: 0.,y: 0.});

    const [mouseUpRelativePos, setMouseUpRelativePos] = useState<Position>({x: 0.,y: 0.});
    const [mouseDownRelativePos, setMouseDownRelativePos] = useState<Position>({x: 0.,y: 0.});

    const imgViewer = document.getElementById("image-viewer");
    const img = document.getElementById("image-in-viewer");

    useEffect(() => {
        setMouseDownPos({x: 0.,y: 0.});
        setMouseUpPos({x: 0.,y: 0.});

        if (draw && imgViewer && img) {
            let rect = img.getBoundingClientRect();

            const handleMouseDown = (event: MouseEvent) => {
                setMouseDownPos({x: event.clientX, y: event.clientY});
                setMouseDownRelativePos({
                    x: (event.clientX - rect.x) / rect.width,
                    y: (event.clientY - rect.y) / rect.height
                });
            };

            const handleMouseUp = (event: MouseEvent) => {
                setMouseUpPos({x: event.clientX, y: event.clientY});
                setMouseUpRelativePos({
                    x: (event.clientX - rect.x) / rect.width,
                    y: (event.clientY - rect.y) / rect.height
                });
            };

            imgViewer.addEventListener('mousedown', handleMouseDown, {once: true});
            imgViewer.addEventListener('mouseup', handleMouseUp, {once: true});
            return () => {
                window.removeEventListener('mousedown', handleMouseDown);
                window.removeEventListener('mouseup', handleMouseUp);
            }
        }
    },[img, imgViewer, draw]);

    return {mouseUpPos,mouseDownPos,mouseUpRelativePos,mouseDownRelativePos};
}