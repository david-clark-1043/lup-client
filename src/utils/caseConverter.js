
// converts a single string from camelCase to snake_case
const camelToSnakeCase = (str) => {
    return str.replace(/[A-Z]/g, letter => {
        return `_${letter.toLowerCase()}`
    })
}

// recursively converts all properties on an object from camelCase to snake_case
export const convertToSnakeCase = (oldObject) => {
    const newObject = {}
    if (Array.isArray(oldObject)) {
        // if array, iterate over array checking for objects
        for (let i = 0; i < oldObject.length; i++) {
            oldObject[i] = convertToSnakeCase(oldObject[i])
        }
    } else if (typeof oldObject === 'object' &&
                oldObject !== null) {
        // if object, recursively convert keys to snake_case
        for (const key in oldObject) {
            // checks if the value is an object to also convert to snake_case
            const newValue = convertToSnakeCase(oldObject[key])
            // converts key name to snake_case
            const newKey = camelToSnakeCase(key)
            newObject[newKey] = newValue
        }
        return newObject
    }
    // if not an object return the passed argument
    // may have been edited to objects with snake_casing if it was an array
    return oldObject
}

// converts a single string from snake_case to camelCase
const snakeToCamelCase = (str) => {
    return str.toLowerCase().replace(/([-_][a-z])/g, group => {
        return group
                .toUpperCase()
                .replace('-', '')
                .replace('_', '')

    });
}

// converts all properties on an object recursively from snake_case to camelCase
export const convertToCamelCase = (oldObject) => {
    const newObject = {}
    if(
        typeof oldObject === 'object' &&
        !Array.isArray(oldObject) &&
        oldObject !== null
    ) {
        for (const key in oldObject) {
            const newValue = convertToCamelCase(oldObject[key])
            const newKey = snakeToCamelCase(key)
            newObject[newKey] = newValue
        }
        return newObject
    } else if (Array.isArray(oldObject)) {
        for (let i = 0; i < oldObject.length; i++) {
            oldObject[i] = convertToCamelCase(oldObject[i])
        }
        return oldObject
    } else {
        return oldObject
    }
}

// for testing:

// test_camel = "helloThere"

// camel_obj = {
//     "camelProp": 1,
//     "camelPropertyTwo": {
//         "subCamelProp": "test",
//         "subCamelProp2": "new"
//     }
// }
// camel_obj = {
//     "camelProp": 1,
//     "camelPropertyTwo": {
//         "subCamelProp": "test",
//         "subCamelProp2": "new"
//     },
//     "arrayTest": [
//         {
//             "subArray": "new"
//         },
//         {
//             "subArray2": "alsoNew"
//         },
//         {
//             "subSubArray": [
//                 {
//                     "alsoSubArray": "superSubArray"
//                 }
//             ]
//         }
//     ]
// }

// // console.log(test_camel)
// // console.log(camelToSnakeCase(test_camel))

// console.log(camel_obj)
// const converted = convertToSnakeCase(camel_obj)
// console.log("converted to snakeCase", converted)
// const snakeConvert = objToCamelCase(converted)
// console.log("converted to camel", snakeConvert)