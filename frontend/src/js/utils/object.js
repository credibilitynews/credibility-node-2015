export function arrayize(obj){
    var arr = [];
    Object.keys(obj).forEach((key) => {
        arr.push(obj[key]);
    });
    return arr;
}
