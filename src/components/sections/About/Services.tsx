import { services } from '@/data/about'
import { trackPointer } from '@/lib/pointer'
import { Reveal } from '@/components/ui/Reveal/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading'
import styles from './Services.module.scss'

export function Services({ index }: { index?: string }) {
  return (
    <section className={styles.section} aria-labelledby="services-title">
      <div className="container">
        <SectionHeading index={index} title="What I do" id="services-title" />
        <ul className={styles.grid}>
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <li key={service.title}>
                <Reveal delay={i * 0.1} className={styles.reveal}>
                  <article className={styles.card} onPointerMove={trackPointer}>
                    <span className={styles.icon}>
                      <Icon aria-hidden="true" />
                    </span>
                    <span className={styles.number}>{String(i + 1).padStart(2, '0')}</span>
                    <h3 className={styles.title}>{service.title}</h3>
                    <p className={styles.text}>{service.text}</p>
                    <ul className={styles.tags}>
                      {service.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
