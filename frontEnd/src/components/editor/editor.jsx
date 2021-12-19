import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
import { render } from 'react-dom'
import Editor from "@monaco-editor/react";

const defaultCode =
  `export default {
  name: 'name',
  code: 'code'
}`;

const MonacoEditor = () => {
  return (
    <Editor height="90vh" theme="vs-dark" defaultLanguage="cpp" defaultValue="">

    </Editor>
  )
}

export default MonacoEditor

  // render(
  //   <Editor />,
  //   document.getElementById('root')
  // );