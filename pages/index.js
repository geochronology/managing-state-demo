import { useState, memo, createContext, useContext } from "react";
import { useQuery } from 'react-query'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [country, setCountry] = useState("CA")

  return (
    <div className={styles.container}>
      <CountryDetails country={country} />
      <CountryPicker country={country} setCountry={setCountry} />
    </div>
  )
}

function CountryDetails({ country }) {
  return <h1>{country}</h1>
}

function CountryPicker({ country, setCountry }) {

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

