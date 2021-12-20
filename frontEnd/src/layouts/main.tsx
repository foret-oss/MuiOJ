import {FC} from 'react'
import styled from '@emotion/styled'
import Header from '@views/header'
import Content from '@layouts/content'
import {useNavigate} from 'react-router-dom'

let navigate : any

const Layout: FC= () => {
  navigate = useNavigate()
  return <>
    <HeaderLayout>
      <Header></Header>
    </HeaderLayout>
    <HeaderPlaceHolder />
    <Container>
      <Content/>
    </Container>
  </>
}

export {navigate}

const HeaderPlaceHolder = styled.div`
  height: 10vh;
  min-height: 80px; 
`

const HeaderLayout = styled.div`
  height: 10vh;
  min-height: 80px;
  position: fixed;
  margin: 0 5rem;
  width: calc(100% - 10rem);
  background: white;
  overflow: hidden;
  z-index: 1;
`

const Container = styled.div`
  display: flex;
  margin: 0 5rem;
  flex-direction: column;
  alignItems: center;
`

export default Layout;