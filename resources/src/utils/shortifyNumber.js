
export const shortifyNumber = (number, decPlaces = 1) => {
  number = parseInt(number);
  decPlaces = Math.pow(10, decPlaces);

  const abbrev = ["k", "m", "b", "t"];

  for (let i=abbrev.length-1; i>=0; --i) {

    // Convert array index to "1000", "1000000", etc
    const size = Math.pow(10, (i + 1) * 3);

    // If the number is bigger or equal do the abbreviation
    if(size <= number) {
      // Here, we multiply by decPlaces, round, and then divide by decPlaces.
      // This gives us nice rounding to a particular decimal place.
      number = Math.round(number*decPlaces/size)/decPlaces;

      // Handle special case where we round up to the next abbreviation
      if((number === 1000) && (i < abbrev.length - 1)) {
        number = 1;
        i++;
      }

      // Add the letter for the abbreviation
      number += abbrev[i];

      break;
    }
  }

  return number;
};
