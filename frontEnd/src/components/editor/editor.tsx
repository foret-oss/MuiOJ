import React, { Component, useRef } from 'react';
//import logo from './logo.svg';
//import './App.css';
import {useEffect} from 'react'
import { render } from 'react-dom'
import Editor, {loader} from "@monaco-editor/react";
import type {Monaco} from '@monaco-editor/react';
import useTheme from './config'

const defaultCode =
  `export default {
  name: 'name',
  code: 'code'
}`;

const MonacoEditor = () => {
  const editorRef =  useRef(null)
  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor
    useTheme(monaco)
  }
  return (
    <Editor height="70vh" defaultLanguage="javascript" defaultValue="" onMount={handleEditorDidMount}></Editor>
  )
}

export default MonacoEditor

  // render(
  //   <Editor />,
  //   document.getElementById('root')
  // );