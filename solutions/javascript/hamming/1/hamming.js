export function compute(left, right) {
    const length = left.length;
    if (length != right.length) {
        throw Error('left and right strands must be of equal length');
    }

    let distance = 0;
    for (let i = 0; i < length; i++) {
        if (left.charCodeAt(i) !== right.charCodeAt(i)) {
            distance += 1;
        }
    }
    return distance;
}
