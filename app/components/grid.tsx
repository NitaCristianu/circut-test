'use client';
// the grid includes inputs, outputs, and, not, custom chips
// the respectives classes are found in the class folder

import { useEffect, useRef } from "react";
import useMouse from "../hooks/useMouse";
import useSize from "../hooks/useSize"
import { Cips, Inputs } from "../data/elements";
import { usePrevious } from "../hooks/usePrevious";

export default function Grid() {
    const size = useSize();
    const mouse = useMouse();
    const prevMouse = usePrevious(mouse);
    const ref = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const ctx = ref.current?.getContext('2d');
        if (ctx == null || ctx == undefined) return;
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, size.x, size.y);

        // UPDAING EVERY ELEMENT
        Inputs.forEach(input => input.update(mouse, prevMouse));


        // DRAWING EVERY ELEMENT
        Inputs.forEach(input => input.draw(ctx, size.x));
        Cips.forEach(cip => cip.draw(ctx));

    }, [size, prevMouse, mouse])

    return (<canvas
        ref={ref}
        width={size.x}
        height={size.y}
    />)
}