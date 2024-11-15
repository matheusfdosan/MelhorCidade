import React, { createContext, useState, useEffect } from "react"

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  useEffect(() => {
    const root = document.documentElement
    if (theme === "light") {
      root.style.setProperty("--gray-one", "#424242")
      root.style.setProperty("--gray-inputs-border", "#a3a3a3")
      root.style.setProperty("--gray-inputs", "#e9e9e9")
      root.style.setProperty("--gray-scroll", "#a3a3a3")
      root.style.setProperty("--gray-background", "#f1f2f3")
      root.style.setProperty("--white", "#fbfbfb")
      root.style.setProperty("--dark", "#212121")
    } else {
      root.style.setProperty("--gray-one", "#323638")
      root.style.setProperty("--gray-inputs-border", "#4c5255")
      root.style.setProperty("--gray-inputs", "#242729")
      root.style.setProperty("--gray-scroll", "#4c5255")
      root.style.setProperty("--gray-background", "#1f2223")
      root.style.setProperty("--white", "#1a1c1e")
      root.style.setProperty("--dark", "#d7d4cf")
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext
