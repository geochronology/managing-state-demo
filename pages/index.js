import { useState, memo, createContext, useContext } from "react";
import { useQuery } from 'react-query'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <CountryDetails />
      <CountryPicker />
    </div>
  )
}

function CountryPicker() {
  const [country, setCountry] = useState("CA")

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

function CountryDetails() {
  return <h1>Country</h1>
}