import {FC} from 'react'
import Editor from "@components/editor/editor"
import Description from "@components/problemItem/problemItem"

interface ProblemProps {
  tid: number
}

const Problem : FC<ProblemProps> = ({tid}) => {
  return <>
    <Description tid={tid}/>
    <Editor />
  </>
}

export default Problem