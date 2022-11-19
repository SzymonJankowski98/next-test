'use client';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import styles from './quillEditor.module.css'
import 'react-quill/dist/quill.snow.css';

export default function QuillEditor(props: {index: number, content: string, saveResult: any }) {
  const [value, setValue] = useState(props.content);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  return (
   <div>
    <ReactQuill theme="snow" value={value} modules={modules} formats={formats} onChange={setValue} />
    <button className={styles.save} onClick={()=>(props.saveResult(props.index, value))}>Save</button>
  </div>
  );
}