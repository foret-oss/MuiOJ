import React, { Component } from 'react';
//import logo from './logo.svg';
import MonacoEditor from 'react-monaco-editor';
//import './App.css';
import {render} from 'react-dom'

class Editor extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        code: '// type your code...',
      }
    }
    editorDidMount(editor, monaco) {
      console.log('editorDidMount', editor);
      editor.focus();
    }
    onChange(newValue, e) {
      console.log('onChange', newValue, e);
    }
    render() {
      const code = this.state.code;
      const options = {
        selectOnLineNumbers: true
      };
      return (
        <MonacoEditor
          width="800"
          height="600"
          language="javascript"
          theme="vs-dark"
          value={code}
          options={options}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
        />
      );
    }
  }
  
  render(
    <Editor />,
    document.getElementById('root')
  );