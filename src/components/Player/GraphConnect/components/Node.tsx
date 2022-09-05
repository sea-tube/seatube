const NodeComponent = ({ node }: any) => {

    // colors
    const stroke = '#3d8f96';
    const fill = '#6acad1';

    const fontSize = 10;
    const radius = 10;

    const sizes = {
        radius: radius,
        textSize: fontSize,
        textX: radius * 1.5,
        textY: radius / 2,
    };
    const sizesImg = {
        radius: 30,
        textSize: fontSize,
        textX: 30 * 1.5,
        textY: 30 / 2,
    };

    return (
        <>
            {
                node.img
                    ? (
                        <image
                            href={node.img}
                            x="0"
                            y="0"
                            height={sizesImg.radius * 2}
                            width={sizesImg.radius * 2}
                            style={{
                                transform: `translate(-${sizesImg.radius}px, -${sizesImg.radius}px)`,
                            }}
                        />
                    )
                    : (
                        <circle
                            fill={fill}
                            stroke={stroke}
                            r={sizes.radius}
                        />
                    )
            }
            <g style={{ fontSize: sizes.textSize + 'px', fill: 'white', stroke: 'dark', strokeWidth: .2 }}>
                <text
                    x={node.img ? sizesImg.radius + 7 : sizes.radius + 3.5}
                    y={node.img ? (sizesImg.radius / 2) - sizesImg.textSize : sizes.radius / 2}
                >
                    {node.name}
                </text>
            </g>
        </>
    );
}


export default NodeComponent;