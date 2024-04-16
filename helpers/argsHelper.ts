const processedArgs = () => {
    // Removes irrelevant args
    const args = process.argv.slice(2)
    if (args.length >= 1) {
        // converts all of the arugments into numbers
        let intArgs: number[] = args.map(arg => Number(arg))
        // checks recursively if any number within the array is NaN
        if (intArgs.some(number => Number.isNaN(number))) {
            throw new Error('Args must be numbers!')
        }
        return intArgs
    } else {
        throw new Error('No args given!')
    }
}
export default processedArgs