import { useState, useEffect } from 'react'
import styles from './DonationBanner.module.css'

const DONATION_AREAS = [
  {
    id: 1,
    title: 'Education',
    description: 'Supporting schools and learning centers',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    icon: '📚',
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
    reverse: false
  },
  {
    id: 2,
    title: 'Healthcare',
    description: 'Medical aid and health facilities',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    icon: '🏥',
    gradient: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
    reverse: true
  },
  {
    id: 3,
    title: 'Animal Welfare',
    description: 'Rescue and care for animals',
    image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80',
    icon: '🐾',
    gradient: 'linear-gradient(135deg, #A8E063 0%, #56AB2F 100%)',
    reverse: false
  },
  {
    id: 4,
    title: 'Elderly Care',
    description: 'Support for senior citizens',
    image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&q=80',
    icon: '👴',
    gradient: 'linear-gradient(135deg, #F093FB 0%, #F5576C 100%)',
    reverse: true
  },
  {
    id: 5,
    title: 'Food & Nutrition',
    description: 'Fighting hunger and malnutrition',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    icon: '🍲',
    gradient: 'linear-gradient(135deg, #FFA500 0%, #FF6347 100%)',
    reverse: false
  },
  {
    id: 6,
    title: 'Environment',
    description: 'Conservation and sustainability',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
    icon: '🌱',
    gradient: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
    reverse: true
  }
]

export function DonationBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % DONATION_AREAS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const currentArea = DONATION_AREAS[currentIndex]

  return (
    <section className={styles.banner} style={{ background: currentArea.gradient }}>
      <div className={`${styles.content} ${currentArea.reverse ? styles.reverse : ''}`}>
        <div className={styles.textSection}>
          <div className={styles.label}>Where We Make Impact</div>
          <h2 className={styles.title}>
            <span className={styles.icon}>{currentArea.icon}</span>
            {currentArea.title}
          </h2>
          <p className={styles.description}>{currentArea.description}</p>
          <div className={styles.indicators}>
            {DONATION_AREAS.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`View ${DONATION_AREAS[index].title}`}
              />
            ))}
          </div>
        </div>
        <div className={styles.imageSection}>
          <img 
            src={currentArea.image} 
            alt={currentArea.title}
            className={styles.image}
          />
        </div>
      </div>
    </section>
  )
}
