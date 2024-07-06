import { v4 } from "uuid";
import { modify } from "../utils/colors";

const PIN_SPACING_Y = 32;
const ROUNDNESS = 16;
const OFFSETY = 16;
const SUBPIN_RADIUS = 10;

export interface CipProperties{
    color? : string,
    tag? : string,
    id? : string,
    x? : number,
    y? : number,
    inputsNum? : number,
    outputsNum? : number,
    width? : 50
}

export default class Cip{

    public declare color;
    public declare tag;
    public declare id;
    public declare x;
    public declare y;
    public declare inputsNum;
    public declare outputsNum;
    public declare width;

    constructor(props? : CipProperties){
        this.color = props?.color || "#ffffff";
        this.tag = props?.tag || "Cip";
        this.id = props?.id || v4();
        this.x = props?.x || 0;
        this.y = props?.y || 0;
        this.inputsNum = props?.inputsNum || 1;
        this.outputsNum = props?.outputsNum || 1;
        this.width = props?.width || 50;
    }

    draw(ctx : CanvasRenderingContext2D){
        ctx.beginPath();
        // calculate top left, width and height

        const width = this.width;
        const height = Math.max(this.outputsNum, this.inputsNum) * PIN_SPACING_Y + OFFSETY;

        const tlx = this.x - width / 2;
        const tly = this.y - height / 2;
        ctx.fillStyle = this.color;
        ctx.roundRect(tlx, tly, width, height, ROUNDNESS);
        ctx.fill();
        const pinOffColor = modify(this.color, -6);
        for(let i = -this.inputsNum/2; i < this.inputsNum/2; i++){
            var y =  tly + height/2 +  i * PIN_SPACING_Y;
            y += OFFSETY;
            ctx.beginPath();
            ctx.fillStyle = pinOffColor;
            ctx.strokeStyle = modify(pinOffColor, -4);
            ctx.lineWidth = r2;
            ctx.arc(tlx, y, SUBPIN_RADIUS, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        }
        for(let i = -this.outputsNum/2; i < this.outputsNum/2; i++){
            var y =  tly + height/2 +  i * PIN_SPACING_Y;
            y += OFFSETY;
            ctx.beginPath();
            ctx.fillStyle = pinOffColor;
            ctx.arc(tlx + width, y, SUBPIN_RADIUS, 0, 2 * Math.PI);
            ctx.fill();
        }

    }

}