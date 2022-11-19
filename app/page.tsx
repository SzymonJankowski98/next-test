'use client';

import styles from './page.module.css'
import Row from '../components/row'
import { DragDropContext, Draggable, Droppable, DroppableProvidedProps } from '@hello-pangea/dnd';
import { useState } from 'react';
import Popup from '../components/popup';
import QuillEditor from '../components/quillEditor';
import Toolbar from '../components/toolbar';
import { faTrash, faPen, faCirclePlus, faArrowsUpDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function Page() {

  interface CellJson {
    content: string
  }

  interface RowJson {
    id: number,
    content: CellJson[]
  }

  const initialRows: RowJson[] = [
    {
      id: 1,
      content: [
        {
          content: "test content1"
        },
      ]
    },
    {
      id: 2,
      content: [
        {
          content: "test content2"
        },
      ]
    },
    {
      id: 3,
      content: [
        {
          content: "test content3"
        },
      ]
    },
    {
      id: 4,
      content: [
        {
          content: "test content4"
        },
      ]
    },
  ]

  const handleOnDragEnd = (result: any, provided: DroppableProvidedProps) => {
    if (!result.destination) return;

    let newRows = Array.from(rows);
    const [reorderedRow] = newRows.splice(result.source.index, 1)
    newRows.splice(result.destination.index, 0, reorderedRow);
    setRows(newRows);
  }

  const addNew = () => {
    const id = Math.max(...rows.map(r => r.id)) + 1
    const newCell = { content: `test content${id}` } as CellJson
    const newRow = { id: id, content: [newCell] } as RowJson;
    setRows([...rows, newRow] as RowJson[])
  }

  const removeRow = (index: number) => {
    let newRows = Array.from(rows);
    newRows.splice(index, 1)
    setRows(newRows)
  }

  const saveResult = (index: number, value: string) => {
    let newRows = Array.from(rows);
    newRows[index].content[0].content = value;
    setRows(newRows);
    setPopupVisible(false);
  }

  const showEdit = (index: number) => {
    setEditor(<QuillEditor index={index} content={rows[index].content[0].content} saveResult={saveResult}/>)
    setPopupVisible(true)
  }

  const addColumn = (index: number) => {
    let newRows = Array.from(rows);
    const id = rows[index].content.length + 1;
    const newCell = { content: `test content${id}` } as CellJson;
    newRows[index].content.push(newCell);
    setRows(newRows);
  }

  const [rows, setRows] = useState(initialRows)
  const [popupVisible, setPopupVisible] = useState(false)
  const [editor, setEditor] = useState(<QuillEditor content="" index={0} saveResult={saveResult}/>)

  const rowsList = (rows: RowJson[]) => {
    return rows.map((row, index) => {
      return (
        <Draggable key={row.id} draggableId={row.id.toString()} index={index}>
          {
            (provided, snapshot) => (
              <Toolbar showToolbar={snapshot.isDragging}
                content={<Row id={row.id} content={row.content} provided={provided} showOutline={snapshot.isDragging}></Row>}
                options= {
                  <>
                    <div onClick={() => removeRow(index)}><FontAwesomeIcon icon={faTrash} /></div>
                    <div onClick={() => showEdit(index)}><FontAwesomeIcon icon={faPen} /></div>
                    <div onClick={() => addColumn(index)}><FontAwesomeIcon icon={faCirclePlus} /></div>
                    <div {...provided.dragHandleProps} onClick={() => ""}><FontAwesomeIcon icon={faArrowsUpDown} /></div>
                  </>
                }
              />
            )
          }
        </Draggable>
      )
    });
  };

  return (
    <div>
      <h1>Test Page</h1>
      <div>
        <Popup trigger={popupVisible} setTrigger={setPopupVisible}>
          {editor}
        </Popup>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="rows">
            {(provided) => (
              <div>
                <div className={styles.container} {...provided.droppableProps} ref={provided.innerRef}>
                  {rowsList(rows)}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className={styles.addNewSection}>
        <div className={styles.addNewBtn} onClick={addNew}>
          <div>Add new row</div>
        </div>
      </div>
      <footer>footer</footer>
    </div>
  )
}
