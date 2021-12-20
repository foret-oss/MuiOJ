import React, { Component, Ref, useRef } from 'react';
//import logo from './logo.svg';
//import './App.css';
import { useEffect } from 'react'
import Editor, { loader } from "@monaco-editor/react";
import type { Monaco } from '@monaco-editor/react';
import useTheme from './config'
import {FC} from 'react'
import styles from './editor.module.css'

const defaultCode =
  `export default {
  name: 'name',
  code: 'code'
}`;

interface EditorProps {
  forwardRef: any
}

const MonacoEditor : FC<EditorProps> = ({forwardRef}) => {
  const handleEditorDidMount = (editor: any, monaco : Monaco) => {
    useTheme(monaco)
    forwardRef.current = editor
    // code = value
    console.log("editor:", editor.getValue())
  }

  return (
    <Editor 
            height="50vh" 
            defaultLanguage="java" 
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