import styles from './toolbar.module.css'

export default function Toolbar(props: {content: any, options: any, showToolbar: boolean}) {
  return (
    <div className={`${styles.rowWrapper} ${props.showToolbar ? styles.showToolbar : ''}`}>
      {props.content}
      <div className={styles.toolbar}>
        {props.options}
      </div>
    </div>
  )
}
