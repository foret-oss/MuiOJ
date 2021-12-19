import {FC} from 'react'
import styled from '@emotion/styled'
import Header from '@views/header'
import Content from './content'

const Layout: FC= () => {
  return <>
    <HeaderLayout>
      <Header username={"test"}></Header>
    </HeaderLayout>
    <HeaderPlaceHolder>

    </HeaderPlaceHolder>
    <Container>
      <Content/>
    </Container>
  </>
}

const HeaderPlaceHolder = styled.div`
  height: 10vh;
`

const HeaderLayout = styled.div`
  height: 10vh;
  position: fixed;
  margin: 0 5rem;
  width: calc(100% - 10rem);
`

const Container = styled.div`
  display: flex;
  margin: 0 5rem;
  flex-direction: column;
  alignItems: center;
`

export default Layout;