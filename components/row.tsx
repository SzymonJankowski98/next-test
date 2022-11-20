import styles from './row.module.css'
import { DraggableProvided } from 'react-beautiful-dnd'
import Toolbar from './toolbar'

export default function Row(props: {id: number, provided: DraggableProvided, content: any, showOutline: boolean}) {
  return (
    <div id={`r${props.id.toString()}`} className={`${styles.row} ${props.showOutline ? styles.outline : ''}`} {...props.provided.draggableProps} ref={props.provided.innerRef}>
      {props.content.map((cell :any)=>
        <div key={props.id} className={`${styles.cell} ql-editor`} dangerouslySetInnerHTML={{__html: cell.content}}></div>
        // <Toolbar
        //   content={<div className={`${styles.cell} ql-editor`} dangerouslySetInnerHTML={{__html: cell.content}}></div>}
        //   options={<><div>edit</div></>}
        // />
      )}
    </div>
  )
}
