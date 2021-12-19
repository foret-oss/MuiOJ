import React, { Component } from 'react';
//import logo from './logo.svg';
import MonacoEditor from 'react-monaco-editor';
//import './App.css';
import { render } from 'react-dom'

const defaultCode =
  `export default {
  name: 'name',
  code: 'code'
}`;

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: defaultCode,
    }
    this.onChange = this.onChange.bind(this)
  }

  editorDidMount(editor, monaco) {
    console.log('editorDidMount', editor);
    editor.focus();
  }
  onChange(newValue, e) {
    this.setState({
      code: newValue
    })
    console.log('onChange', newValue, e);
  }


  onMouseMove() {
    this.editor.onMouseMove(e => {
      if (!this.isJsEditor()) return
      this.removeFakeBreakPoint()
      if (e.target.detail && e.target.detail.offsetX && e.target.detail.offsetX >= 0 && e.target.detail.offsetX <= 10) {
        let line = e.target.position.lineNumber
        this.addFakeBreakPoint(line)
      }
    })
    this.editor.onMouseLeave(() => {
      this.removeFakeBreakPoint()
    })
    this.editor.onKeyDown(e => {
      if (e.code === 'Enter') {
        this.removeFakeBreakPoint()
      }
    })
  }


  trigger(id) {
    if (!this.editor) return
    this.editor.trigger('anyString', id)
  }


  insertContent(text) {
    if (this.editor) {
      let selection = this.editor.getSelection()
      let range = new this.monaco.Range(selection.startLineNumber, selection.startColumn, selection.endLineNumber, selection.endColumn)
      let id = {
        major: 1,
        minor: 1
      }
      let op = {
        identifier: id,
        range: range,
        text: text,
        forceMoveMarkers: true
      }
      this.editor.executeEdits(this.root, [op])
      this.editor.focus()
    }
  }

  editorMousDown() {
    this.editor.onMouseDown(e => {
      if (!this.isJsEditor()) return
      if (e.target.detail && e.target.detail.offsetX && e.target.detail.offsetX >= 0 && e.target.detail.offsetX <= 10) {
        let line = e.target.position.lineNumber
        if (this.editor.getModel().getLineContent(line).trim() === '') {
          return
        }
        if (!this.hasBreakPoint(line)) {
          this.addBreakPoint(line)
        } else {
          this.removeBreakPoint(line)
        }
        if (this.lastPosition) {
          this.editor.setPosition(this.lastPosition)
        } else {
          document.activeElement.blur()
        }
      }
      if (e.target.type === 6 || e.target.type === 7) {
        this.lastPosition = this.editor.getPosition()
      }
    })
  }
 
  isJsEditor() {
    return this.editor.getModel().getLanguageIdentifier().language === 'javascript'
  }
 
  addFakeBreakPoint(line) {
    if (this.hasBreakPoint(line)) return;
    let value = {
      range: new this.monaco.Range(line, 1, line, 1),
      options: {
        isWholeLine: true,
        linesDecorationsClassName: 'breakpoints-fake'
      }
    }
    this.decorations = this.editor.deltaDecorations(this.decorations, [value])
  }
 
  removeFakeBreakPoint() {
    this.decorations = this.editor.deltaDecorations(this.decorations, [])
  }
 
  async addBreakPoint(line) {
    let model = this.editor.getModel()
    if (!model) return
    let value = {
      range: new this.monaco.Range(line, 1, line, 1),
      options: {
        isWholeLine: true,
        linesDecorationsClassName: 'breakpoints'
      }
    }
    model.deltaDecorations([], [value])
  }
 
  async removeBreakPoint(line) {
    let model = this.editor.getModel()
    if (!model) return
    let decorations
    let ids = []
    if (line !== undefined) {
      decorations = this.editor.getLineDecorations(line)
    } else {
      decorations = this.editor.getAllDecorations()
    }
    for (let decoration of decorations) {
      if (decoration.options.linesDecorationsClassName === 'breakpoints') {
        ids.push(decoration.id)
      }
    }
    if (ids && ids.length) {
      model.deltaDecorations(ids, [])
    }
  }
 
  hasBreakPoint(line) {
    let decorations = this.editor.getLineDecorations(line)
    for (let decoration of decorations) {
      if (decoration.options.linesDecorationsClassName === 'breakpoints') {
        return true
      }
    }
    return false
  }





  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true,
      renderSideBySide: false
    };
    return (
      <div >
        <div className="wrapper">
          <div className="" >
            <MonacoEditor className='monacoEditorWrapper'
              height="90vh"
              width= "1000px"      
              language="javascript"
              theme="vs-dark"
              value={code}
              options={options}
              onChange={this.onChange}
              editorDidMount={this.editorDidMount}
            />
          </div>
          <div className="view">
            {this.state.code}
          </div>
        </div>
      </div>
    );
  }
}

export default Editor

  // render(
  //   <Editor />,
  //   document.getElementById('root')
  // );