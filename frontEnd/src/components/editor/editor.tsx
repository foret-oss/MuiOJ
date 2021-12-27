import React, { Component, Ref, useRef } from 'react';
//import logo from './logo.svg';
//import './App.css';
import { useEffect } from 'react'
import Editor, { loader } from "@monaco-editor/react";
import type { Monaco } from '@monaco-editor/react';
import useTheme from './config'
import {FC} from 'react'
import styles from './editor.module.css'
import styled from '@emotion/styled'

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
    <EditorLayout>
    <h3>
      因为最近jsDeliver的证书问题,国内访问Editor的Js可能会存在一些问题,因此如果下面的Editor打不开,请尝试使用代理打开
    </h3>
    <Editor 
            height="50vh" 
            defaultLanguage="cpp" 
            defaultValue="" 
            onMount={handleEditorDidMount}>
    </Editor>
    </EditorLayout>
  )
}

const EditorLayout = styled.div`
  width: 100%;
`

export default MonacoEditor

  // render(
  //   <Editor />,
  //   document.getElementById('root')
  // );