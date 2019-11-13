
export const debounce = (func, time) =>{
    let timeout;

    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), time)
    }
};