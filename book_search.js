/**
 * RECOMMENDATION
 *
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 *
 * The Developer Tools in Chrome are available under the "..." menu,
 * futher hidden under the option "More Tools." In Firefox, they are
 * under the hamburger (three horizontal lines), also hidden under "More Tools."
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for.
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */


function findSearchTermInBooks(searchTerm, scannedTextObj) {
  /** You will need to implement your search and
   * return the appropriate object here. */

  if (typeof searchTerm !== 'string' || searchTerm.trim() === '') {
    throw new Error("Invalid input: searchTerm must be a non-empty string.");
  }

  // Check if scannedTextObj is an array
  if (!Array.isArray(scannedTextObj)) {
      throw new Error("Invalid input: scannedTextObj must be an array.");
  }

  var result = {
    SearchTerm: searchTerm,
    Results: [],
  }; 

  //   Result = ISBN, Page#, Line#

  try {
    for (const book of scannedTextObj) {
      for (const content of book.Content) {
        textsInBook = content.Text;
        if (textsInBook.includes(searchTerm)) {
          result.Results.push({
            ISBN: book.ISBN,
            Page: content.Page,
            Line: content.Line,
          });
        }
      }
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }

  return result;
}



/** Example input object. */
const twentyLeaguesIn = [
  {
    Title: "Twenty Thousand Leagues Under the Sea",
    ISBN: "9780000528531",
    Content: [
      {
        Page: 31,
        Line: 8,
        Text: "now simply went on by her own momentum.  The dark-",
      },
      {
        Page: 31,
        Line: 9,
        Text: "ness was then profound; and however good the Canadian's",
      },
      {
        Page: 31,
        Line: 10,
        Text: "eyes were, I asked myself how he had managed to see, and",
      },
    ],
  },
];

/** Example output object */
const twentyLeaguesOut = {
  SearchTerm: "the",
  Results: [
    {
      ISBN: "9780000528531",
      Page: 31,
      Line: 9,
    },
  ],
};

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that
 * output to the console. We've provided two tests as examples, and
 * they should pass with a correct implementation of `findSearchTermInBooks`.
 *
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
  console.log("PASS: Test 1");
} else {
  console.log("FAIL: Test 1");
  console.log("Expected:", twentyLeaguesOut);
  console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn);
if (test2result.Results.length == 1) {
  console.log("PASS: Test 2");
} else {
  console.log("FAIL: Test 2");
  console.log("Expected:", twentyLeaguesOut.Results.length);
  console.log("Received:", test2result.Results.length);
}

/** My Personal Unit Test Functions **/

// I opted for the use of functions and implemented a more specific approach to indicate whether the test cases are passing or failing.

/**
 * Tests whether 'isInputEmptyOrString' correctly handles inputs with an empty string or non-string parameters.
 *
 * @param {string} searchTerm - The lower case word or term to search for in the scanned text.
 * @param {JSON} scannedTextObj - A JSON object within an array representing the scanned text.
 * @returns {void} - The function does not return a value but logs the test result to the console.
 */

function isInputEmptyOrString(searchTerm, scannedTextObj) {
  try {
    findSearchTermInBooks(searchTerm, scannedTextObj);
    console.log("Fail: Did not catch non-string or empty string input.");
  } catch (error) {
    if (error.message === "Invalid input: searchTerm must be a non-empty string.") {
      console.log("Pass: Successfully caught a non-string or empty string input.");
    } else {
      console.log("Fail: Incorrect error message for non-string or empty string input.");
      console.log("Expected error message: 'Invalid input: searchTerm must be a non-empty string.'");
      console.log("Received error message:", error.message);
    }
  }
}

// Testing the Unit Test 'isInputEmptyOrString'.
isInputEmptyOrString('', twentyLeaguesIn);


/**
 * Tests whether 'caseSensitiveTest' correctly handles inputs with different text cases.
 *
 * @param {string} lowerCaseWord - The lower case word or term to search for in the scanned text.
 * @param {string} upperCaseWord - The upper case word or term to search for in the scanned text.
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {void} - The function does not return a value but logs the test result to the console.
 */
function caseSensitiveTest(lowerCaseWord, upperCaseWord, scannedTextObj) {
  const resultCapitalized = findSearchTermInBooks(upperCaseWord, scannedTextObj);
  const resultLowercase = findSearchTermInBooks(lowerCaseWord, scannedTextObj);

  let pass = true;

  for (let capitalizedResult of resultCapitalized.Results) {
    if (resultLowercase.Results.some(lowercaseResult => 
        lowercaseResult.ISBN === capitalizedResult.ISBN && 
        lowercaseResult.Page === capitalizedResult.Page && 
        lowercaseResult.Line === capitalizedResult.Line)) {
      pass = false;
      break;
    }

    if (pass) {
      console.log("PASS: Case-sensitive Test");
    } else {
      console.log("FAIL: Case-sensitive Test");
      console.log("Found overlapping results for 'The' and 'the'.");
    }
  }
}

// Testing the Unit Test 'caseSensitiveTest'.
caseSensitiveTest('the','The', twentyLeaguesIn);


/**
 * Tests whether 'testForNonExistentTerm' correctly handles inputs with no result.
 *
 * @param {string} searchTerm - The word or term to search for in the scanned text.
 * @param {JSON} scannedTextObj - A JSON object within an array representing the scanned text.
 * @returns {void} - The function does not return a value but logs the test result to the console.
 */

function testForNonExistentTerm(searchTerm, scannedTextObj) {
  const result = findSearchTermInBooks(searchTerm, scannedTextObj);
  if (result.Results.length === 0) {
    console.log(`PASS: No results found for '${searchTerm}'`);
  } else {
    console.log(`FAIL: Should have no results for '${searchTerm}'`);
    console.log("Expected 0 matches, found:", result.Results.length);
  }
}

// Testing the Unit Test 'testForNonExistentTerm'.
testForNonExistentTerm("abc123", twentyLeaguesIn);

/**
 * Tests whether 'testMultipleOccurrences' correctly handles inputs with multiple results.
 *
 * @param {string} searchTerm - The word or term to search for in the scanned text.
 * @param {JSON} scannedTextObj - A JSON object within an array representing the scanned text.
 * @param {number} expectedCount - The expected count for the search term.
 * @returns {void} - The function does not return a value but logs the test result to the console.
 */

function testMultipleOccurrences(searchTerm, scannedTextObj, expectedCount) {
  const result = findSearchTermInBooks(searchTerm, scannedTextObj);
  if (result.Results.length === expectedCount) {
    console.log(`PASS: Multiple occurrences test for '${searchTerm}'`);
  } else {
    console.log(`FAIL: Multiple occurrences test for '${searchTerm}'`);
    console.log("Expected count:", expectedCount);
    console.log("Actual count:", result.Results.length);
  }
}

// Testing the Unit Test 'testMultipleOccurrences'.
testMultipleOccurrences("and", twentyLeaguesIn, 2);
