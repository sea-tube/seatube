import { useEffect, useState } from "react";

const LineComponent = ({ link, ...restProps }) => {

    const colors = {
        "default": "rgba(255, 255, 255, 0.08)",
        'connected': '#3d8f96',
    }

    const [stroke, setStroke] = useState(colors.default);

    useEffect(() => {
        // add a small delay to ensure properties are set
        setTimeout(function () {
            setStroke(link.target.connected ? colors.connected : colors.default);
        }, 100);
    }, [link])


    return (
        <line
            {...restProps}
            strokeWidth={2}
            stroke={stroke}
        />
    )
};

export default LineComponent;