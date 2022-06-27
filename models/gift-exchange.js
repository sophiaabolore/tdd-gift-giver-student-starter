const e = require("express");
const errors = require("../utils/errors");
class GiftExchange {
  constructor() {
    this.super();
  }
  //   names = [1, 2, 3];
  static pairs(names) {
    // if number of names is odd
    if (names.length % 2 == 1) {
      // 0 - false, 1 - true
      // -> throw an error
      throw new BadRequestError("Names should be defined");
    }
    // otherwise, randomly pair names together
    else {
      //Randomize the names into pairs
      const namedPairs = [];
      // while there are still names to process
      while (names.length) {
        // Create a placeholder to store the pairs
        const currPair = [];
        // While there is not a current pair
        while (currPair.length < 2 && names.length > 0) {
          // Create a random index
          const index = Math.floor(Math.random() * names.length);
          // Adds the random index to the current pair
          currPair.push(names[index]);
          // Remove that item from the names array
          names.splice(index, 1);
        }
        namedPairs.push(currPair);
      }
      return namedPairs;
    }
  }
  static traditional(names) {
    // Generate a list of pairs
    const pairs = this.pairs(names);

    // Build strings with the paired names
    const traditionalPairs = pairs.reduce((prev, item, index) => {
      if (index + 1 === pairs.length) {
        return [
          ...prev,
          `${item[0]} is giving a gift to ${item[1]}
                 ${item[1]} is giving a gift to ${pairs[0][0]}`,
        ];
      } else {
        return [
          ...prev,
          `${item[0]} is giving a gift to ${item[1]}
                 ${item[1]} is giving a gift to ${pairs[index + 1][0]}`,
        ];
      }
    }, []);
    // const traditionalPairs = pairs.map(
    //   (pair) => `${pair[0]} is giving a gift to ${pair[1]}`
    // );
    // Return the list of strings
    return traditionalPairs;
  }
}
module.exports = GiftExchange;
