import { useState, useEffect, createContext, useContext } from 'react'
import styles from './NotificationSystem.module.css'

const NotificationContext = createContext()

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])

  const addNotification = (notification) => {
    const id = Date.now()
    const newNotification = {
      id,
      type: 'info',
      duration: 5000,
      ...notification
    }
    
    setNotifications(prev => [...prev, newNotification])
    
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
    }
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification }}>
      {children}
      <NotificationContainer notifications={notifications} onRemove={removeNotification} />
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider')
  }
  return context
}

function NotificationContainer({ notifications, onRemove }) {
  return (
    <div className={styles.container}>
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          notification={notification}
          onRemove={() => onRemove(notification.id)}
        />
      ))}
    </div>
  )
}

function Notification({ notification, onRemove }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  const handleRemove = () => {
    setIsVisible(false)
    setTimeout(onRemove, 300)
  }

  const getIcon = () => {
    switch (notification.type) {
      case 'success': return '✅'
      case 'error': return '❌'
      case 'warning': return '⚠️'
      case 'donation': return '💝'
      case 'impact': return '🌟'
      default: return 'ℹ️'
    }
  }

  return (
    <div 
      className={`${styles.notification} ${styles[notification.type]} ${isVisible ? styles.visible : ''}`}
      onClick={handleRemove}
    >
      <div className={styles.icon}>{getIcon()}</div>
      <div className={styles.content}>
        <div className={styles.title}>{notification.title}</div>
        {notification.message && <div className={styles.message}>{notification.message}</div>}
      </div>
      <button className={styles.closeBtn} onClick={handleRemove}>×</button>
    </div>
  )
}