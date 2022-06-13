export const calcAbilityMod = (val: number) => {
    return Math.floor((val - 10) / 2)
}

export const getRandomInt = (count: number, max: number) => {
    let total = 0;
    for (let i = 0; i < count; i++) {
        total += Math.floor(Math.random() * max) + 1;
    }
    return total;
}
