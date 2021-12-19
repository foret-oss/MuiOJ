
import {FC, useEffect, useState} from 'react'
import request from '@apis/common/authRequest'

interface ProblemItemProps {
  tid: number
}

const ProblemItem : FC<ProblemItemProps> = ({tid}) => {
  const [data, setData] = useState({})
  useEffect(() => {
    request('item/' + tid, {}).then(res => setData(res))
  }, [])
  console.log("data", data)
  return <div></div>
}

export default ProblemItem