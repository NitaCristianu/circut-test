// return the squared distance between a and b
export const distSquared = (ax:number, ay:number, bx:number, by:number) => (bx-ax)*(bx-ax) + (by-ay)*(by-ay);
// return a boolean, whether point a is inside of circle at c with radius r
export const inCircle = (ax:number, ay : number, cx: number, cy:number, r:number) => distSquared(ax,ay,cx,cy) <= r * r;