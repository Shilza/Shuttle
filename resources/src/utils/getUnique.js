
export const getUnique = (array = []) => {
    const result = [];
    const map = new Map();
    for (const item of array) {
        if (!map.has(item.id)) {
            map.set(item.id, true);
            result.push(item);
        }
    }
    return result;
};