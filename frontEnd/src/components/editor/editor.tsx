import React, { Component, useRef } from 'react';
//import logo from './logo.svg';
//import './App.css';
import { useEffect } from 'react'
import Editor, { loader } from "@monaco-editor/react";
import type { Monaco } from '@monaco-editor/react';
import useTheme from './config'
import styles from './editor.module.css'

const defaultCode =
  `export default {
  name: 'name',
  code: 'code'
}`;

const MonacoEditor = (value:string) => {
  const editorRef = useRef(null)
  let code = ''
  const handleEditorDidMount = (editor: any, monaco : Monaco) => {
    editorRef.current = editor
    useTheme(monaco)
    // code = value
    console.log("editor:", editor.getValue())
  }

  return (
    <Editor height="50vh" 
            defaultLanguage="javascript" 
            defaultValue="" 
            onMount={handleEditorDidMount}>
    </Editor>
  )
}

export default MonacoEditor

  // render(
  //   <Editor />,
  //   document.getElementById('root')
  // );