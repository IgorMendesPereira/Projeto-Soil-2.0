export const distance = function(ponto1, ponto2) {
    return (
        Math.sqrt((Math.pow((ponto1[0] - ponto2[0]), 2) + (Math.pow((ponto1[1] - ponto2[1]), 2))))
    )
}