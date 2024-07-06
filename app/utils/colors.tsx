const hexdigits = "0123456789abcdef";

export const modify = (str: string, ammount: number) => {
    var output = "#";
    for (let i = 1; i < str.length; i++) {
        const char = str[i];
        const pos = hexdigits.indexOf(char);
        const newpos = Math.max(Math.min(pos+ammount, hexdigits.length), 0);
        if (pos != -1 && char != '0') 
            output += hexdigits[newpos];
        else if (char == '0')
            output += '0';
        else
            output += char;
    }
    return output;
}