const keyValuePairs = [['key1', 'value1'], ['key2', 'value2'], ['key3', 'value3']];
const obj = keyValuePairs.reduce((accumulator, currentValue) => {
  const [key, value] = currentValue; // Destructuring assignment
  accumulator[key] = value;          // Assigning value to the accumulator object
  return accumulator;
}, {});

console.log(obj); // Output: { key1: 'value1', key2: 'value2', key3: 'value3' }
