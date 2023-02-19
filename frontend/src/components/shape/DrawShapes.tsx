import Shape from "../../types/Shape";

export function DrawShapes({
    shapes,
    imgPosition
}:{
    shapes:Shape[],
    imgPosition:DOMRect|undefined
}) {
    return (
        <div style={{ position: "fixed",width: '100%', height: '100vh', top:0, right:0}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" >
                <g stroke="#FFCE44" fill="transparent" strokeWidth="3">
                    {imgPosition && shapes.map(shape => {
                        const point1X= shape.point1[0] * imgPosition.width + imgPosition.left;
                        const point1Y= shape.point1[1] * imgPosition.height + imgPosition.top;
                        const point2X= shape.point2[0] * imgPosition.width + imgPosition.left;
                        const point2Y= shape.point2[1] * imgPosition.height + imgPosition.top;
                        return shape.type === "square"
                            ? <rect x={point1X}
                                    y={point1Y}
                                    width={point2X- point1X}
                                    height={point2Y- point1Y}
                                    onClick={() => alert('You have clicked the square.')}/>
                            : <circle cx={point1X}
                                      cy={point1Y}
                                      r={Math.sqrt((point1Y - point1X) ** 2 + (point2Y - point2X) ** 2)}
                                      onClick={() => alert('You have clicked the circle.')}/>
                        })
                    }
                </g>
            </svg>
        </div>
    )
}