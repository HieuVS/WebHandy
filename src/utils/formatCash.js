export const formatCash = (str) => {
    //console.log('Cashhhhhhh:     ',str)
    return (""+str).split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + '.')) + prev
    })
}