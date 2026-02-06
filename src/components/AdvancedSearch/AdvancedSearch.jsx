import { useState, useEffect, useRef } from 'react'
import styles from './AdvancedSearch.module.css'

export function AdvancedSearch({ onSearch, placeholder = "Search NGOs..." }) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef()

  const searchSuggestions = [
    { text: 'Children education NGOs', type: 'category', icon: '📚' },
    { text: 'Animal welfare organizations', type: 'category', icon: '🐾' },
    { text: 'Food donation centers', type: 'donation', icon: '🍽️' },
    { text: 'Medical aid foundations', type: 'category', icon: '🏥' },
    { text: 'Elderly care homes', type: 'category', icon: '👴' },
    { text: 'Volunteer opportunities', type: 'donation', icon: '🤝' },
    { text: 'Emergency relief funds', type: 'urgent', icon: '🚨' },
    { text: 'Environmental conservation', type: 'category', icon: '🌱' }
  ]

  useEffect(() => {
    if (query.length > 0) {
      const filtered = searchSuggestions.filter(s => 
        s.text.toLowerCase().includes(query.toLowerCase())
      )
      setSuggestions(filtered.slice(0, 5))
      setIsOpen(true)
    } else {
      setSuggestions(searchSuggestions.slice(0, 4))
      setIsOpen(false)
    }
  }, [query])

  const handleKeyDown = (e) => {
    if (!isOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex])
        } else {
          handleSearch()
        }
        break
      case 'Escape':
        setIsOpen(false)
        setSelectedIndex(-1)
        break
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.text)
    setIsOpen(false)
    setSelectedIndex(-1)
    onSearch(suggestion.text, suggestion.type)
  }

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim())
      setIsOpen(false)
    }
  }

  const handleFocus = () => {
    if (suggestions.length > 0) {
      setIsOpen(true)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <div className={styles.inputWrapper}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={() => setTimeout(() => setIsOpen(false), 200)}
            placeholder={placeholder}
            className={styles.input}
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className={styles.clearBtn}
            >
              ×
            </button>
          )}
        </div>
        <button onClick={handleSearch} className={styles.searchBtn}>
          Search
        </button>
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className={styles.suggestions}>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`${styles.suggestion} ${
                index === selectedIndex ? styles.selected : ''
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <span className={styles.suggestionIcon}>{suggestion.icon}</span>
              <span className={styles.suggestionText}>{suggestion.text}</span>
              <span className={`${styles.suggestionType} ${styles[suggestion.type]}`}>
                {suggestion.type}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}