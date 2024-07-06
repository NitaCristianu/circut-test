import { voltage } from "../interfaces/keywords";
import { v4 } from 'uuid';
import { inCircle } from "../utils/math";
import { MouseObject } from "../hooks/useMouse";

const SCREEN_BOUND = 0.1;
const PIN_RADIUS = 20;

export interface PinProps {
    value?: voltage,
    y: number,
    type: 'input' | 'output',
    name?: string,
    id?: typeof v4,
}

export default class Pin {

    public declare value;
    public declare id;
    public declare y;
    public declare type;
    public declare name;
    public declare selected;
    public declare hold;
    private declare x;

    constructor(props: PinProps) {
        this.type = props.type;
        this.y = props.y;
        this.value = props.value || "unset";
        this.id = props.id || v4();
        this.name = props.name || 'Pin';
        this.selected = false;
        this.hold = false;
        this.x = 0;
    }

    set(value: voltage) { this.value = value }
    rename(name: string) { this.name = name }
    opposite() { this.value = this.value == 'high' ? 'low' : 'high' }

    public update(mouse: MouseObject, prevMouse: MouseObject) {
        const mx = mouse.position.x;
        const my = mouse.position.y;
        const left = mouse.buttons.left;
        const prevLeft = prevMouse.buttons.left;

        const oncircle = inCircle(mx, my, this.x, this.y, PIN_RADIUS);
        if (oncircle && left) this.hold = true;
        else if (!left) this.hold = false;

        if (this.hold) this.y += (my - prevMouse.position.y);
        if (oncircle && !left && prevMouse.buttons.left) {
            this.opposite();
        }
    }

    public draw(ctx: CanvasRenderingContext2D, screenWidth: number = 0) {
        this.x = this.type == 'input' ? screenWidth * SCREEN_BOUND : screenWidth * (1 - SCREEN_BOUND);

        ctx.beginPath();
        ctx.fillStyle = this.value == 'high' ? 'red' : 'grey';
        ctx.arc(this.x, this.y, PIN_RADIUS, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();

        if (this.selected || this.hold) {
            ctx.beginPath();
            ctx.fillStyle = 'rgba(255,255,255,0.3)';
            ctx.arc(this.x, this.y, PIN_RADIUS * 1.5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        }

    }
}