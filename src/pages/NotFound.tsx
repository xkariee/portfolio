import { TbArrowLeft } from 'react-icons/tb'
import { Page } from '@/components/layout/Page/Page'
import { Button } from '@/components/ui/Button/Button'
import { SplitText } from '@/components/ui/SplitText/SplitText'
import styles from './NotFound.module.scss'

export default function NotFound() {
  return (
    <Page title="Not found">
      <section className={styles.section}>
        <div className={styles.glow} aria-hidden="true" />
        <h1 className={styles.code} data-text="404">
          <SplitText text="404" stagger={0.08} pieceClassName={styles.digit} />
        </h1>
        <p className={styles.text}>This page drifted off into the void.</p>
        <Button to="/" icon={<TbArrowLeft />} magnetic>
          Back home
        </Button>
      </section>
    </Page>
  )
}
