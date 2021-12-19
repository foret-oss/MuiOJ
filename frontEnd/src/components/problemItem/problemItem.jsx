import { FC, useEffect, useState, FunctionComponent, useRef } from 'react'
import request from '@apis/common/authRequest'
import styles from './problemItem.module.css'
import Editor from '@components/editor/editor'
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

const Title = () => {
  return (
    <div>
    </div>
  );
};

const EditorContainer = () => {
  return <div></div>
}

const ProblemItem = (props) => {
  const [open,setOpen] = useState (false)
  const [snackbarMessage,setSnackbarMessage] = useState('')
  const [data, setData] = useState(
    {
      content: '',
      accept: 0,
      create_at: '',
      sampleIn: '',
      sampleOut: ''
    })
  const editorRef = useRef(null);
  const urlParams = new URL(window.location.href);
  const tid = urlParams?.pathname.substring(6);
  console.log("当前页面路由：", tid)
  //const tid = props.match.params.id

  useEffect(() => {
    request('/question/item/' + tid, {}).then(res => {
      if (res.code === 200) {
        console.log("getQuestionItem:", res)
        let getData = {
          content: res.message.content,
          accept: res.message.accept,
          create_at: res.message.create_at,
          sampleIn: res.message.sample[0].in,
          sampleOut: res.message.sample[0].out
        }
        setData(getData)
      }

    })
  }, [])


  //提交代码
  const handleClick = () => {
    const code = editorRef.current.getValue()
    console.log("code", code)
    const urlParams = new URL(window.location.href);
    const tid = urlParams?.pathname.substring(6);
    request('/question/item/' + tid, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: "cpp17",
        code: code
      }),
    }).then(res => {
      if (res.code === 200) {
        setOpen(true);
        setSnackbarMessage("提交成功！")
        console.log("submit success!")
      }
      else {
        console.log("submit error!")
      }
    })
  }



  const handleClose = (event , reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpen(false);
};




  console.log("ProblemItemData", data)

  return (<div className={styles.container}>
    <Snackbar
      open={open}
      autoHideDuration={1500}
      onClose={handleClose}
      message={snackbarMessage}
    />
    <div className={styles.title}>
      &ensp;{data.content}
    </div>
    <div className={styles.content}>
      <Editor forwardRef={editorRef}></Editor>
    </div>
    <Button onClick={() => handleClick()} className={styles.Button} variant="outlined" color="success">
      Submit
    </Button>
  </div>
  )
}

export default ProblemItem