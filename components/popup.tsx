import { ReactComponentElement } from 'react'
import styles from './popup.module.css'
import QuillEditor from './quillEditor'

export default function Popup(props: { trigger: Boolean, setTrigger: any, children: any }) {
  return (props.trigger) ? (
    <div className={styles.background}>
      <div className={styles.window}>
        <div className={styles.header}>
          <h2>
            Title
          </h2>
          <div>
            <button className={styles.closeBtn} onClick={() => props.setTrigger(false)}>x</button>
          </div>
        </div>
        <div className={styles.content}>
          {props.children}
        </div>
      </div>
    </div>
  ) : ""
}
