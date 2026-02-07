import { Link } from 'react-router-dom'
import styles from './DisasterAlert.module.css'

const ACTIVE_DISASTER = {
  title: 'Kerala Floods Relief',
  description: 'Urgent support needed for flood-affected families',
  amount: '₹50L',
  target: '₹1Cr',
  icon: '🚨',
  link: '/discover?category=disaster-relief'
}

export function DisasterAlert() {
  const progress = (5000000 / 10000000) * 100

  return (
    <div className={styles.alert}>
      <div className={styles.icon}>{ACTIVE_DISASTER.icon}</div>
      <div className={styles.content}>
        <div className={styles.title}>{ACTIVE_DISASTER.title}</div>
        <div className={styles.description}>{ACTIVE_DISASTER.description}</div>
        <div className={styles.progress}>
          <div className={styles.progressBar} style={{ width: `${progress}%` }} />
        </div>
        <div className={styles.stats}>
          <span>{ACTIVE_DISASTER.amount} raised of {ACTIVE_DISASTER.target}</span>
        </div>
      </div>
      <Link to={ACTIVE_DISASTER.link} className={styles.btn}>
        Donate Now
      </Link>
    </div>
  )
}
