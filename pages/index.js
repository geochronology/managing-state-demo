import { useState, memo, createContext, useContext } from "react";
import { useQuery } from 'react-query'
import styles from '../styles/Home.module.css'

// HOME HOC
export default function Home() {
  return (
    <CountryProvider>
      <HomeContent />
    </CountryProvider>
  )
}

// HOME CONTENT
const HomeContent = memo(() => {
  return (
    <div className={styles.container}>
      <CountryPicker />
      <CountryDetails />
    </div>
  )
})

// CREATE CONTEXT 
const CountryContext = createContext()

// CONTEXT PROVIDER
function CountryProvider({ children }) {
  const [country, setCountry] = useState("CA")

  return <CountryContext.Provider value={{ country, setCountry }}>
    {children}
  </CountryContext.Provider>
}

// FETCH COUNTRY DATA
// (Note: this appears *after* the CountryDetails useQuery explanation below)
// 13:50: Explanation for adding fetch helper method begins
// 1. Paste in the API link from earlier in the video
// 2. Replace 'ca' with country param
// 3. Convert the response to json and store it in data variable
// 4. Return data
//   * This can also be written as "return data =..." but splititng
//     into two lines helps with readability
async function fetchCountry(country) {
  const response = await fetch(`http://restcountries.eu/rest/v2/alpha/${country}`)
  const data = await response.json()
  return data
}


// COUNTRY DETAILS
// http://restcountries.eu/rest/v2/alpha/ca
function CountryDetails() {

  // 12:49 Explanation of react-query begins
  // Goal: Use react-query to pull information about the chosen country
  // 1. Import useQuery hook globally via react-query
  // 2. Import country locally via CountryContext
  // 2. Add useQuery boilerplate below: const { } = useQuery()
  // 3. Pass in a key as the first argument: useQuery(country)
  //   * Anytime the key changes tells react-query to refresh data
  //   * Result: whenever the country changes via user selection,
  //     go fetch new data using the fetchCountry function
  // 4. As a second parameter, add a reference to the function
  //    that makes the request to load the external data
  // 5. Wrap the key in brackets, turning it into a one-item array;
  //    multiple keys can be passed into the same useQuery hook
  // 6. Destructure data, isLoading, and error from useQuery
  // 7. Add conditional statements for data and isLoading
  //    * If neither of the two it means we have data
  // 8. Add div to return in event of having data and display
  //    the data in a <pre> tag
  // 9. Format the data using JSON Stringify
  //    * Enter params for value, replacer, and number of spaces
  //    * MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify 

  const { country } = useContext(CountryContext)
  const { data, isLoading, error } = useQuery([country], fetchCountry)

  if (isLoading) return <span>loading...</span>
  if (error) return <span>oop!! error ocurred</span>

  return (
    <div>
      <h1>{country}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

// COUNTRY PICKER
function CountryPicker() {
  const { country, setCountry } = useContext(CountryContext)

  return (
    <select
      value={country}
      onChange={(e) => {
        setCountry(e.target.value)
      }}
    >
      <option value="CA">Canada</option>
      <option value="CO">Columbia</option>
    </select>
  )
}

