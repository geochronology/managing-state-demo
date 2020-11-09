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
function HomeContent() {
  return (
    <div className={styles.container}>
      <CountryDetails />
      <CountryPicker />
    </div>
  )
}

// CREATE CONTEXT 
const CountryContext = createContext()

// CONTEXT PROVIDER
function CountryProvider({ children }) {
  const [country, setCountry] = useState("CA")

  return <CountryContext.Provider value={{ country, setCountry }}>
    {children}
  </CountryContext.Provider>
}

// COUNTRY DETAILS
function CountryDetails() {
  const { country } = useContext(CountryContext)

  return <h1>{country}</h1>
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

