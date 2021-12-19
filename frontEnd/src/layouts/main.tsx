import {FC} from 'react'
import styled from '@emotion/styled'
import Header from '@views/header'
import Content from './content'

const Layout: FC= () => {
  return <>
    <HeaderLayout>
      <Header username={"test"}></Header>
    </HeaderLayout>
    <Container>
      <Content/>
    </Container>
  </>
}

const HeaderLayout = styled.div`
  height: 20vh;
  position: fixed;
  margin: 5rem;
  display: flex;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  alignItems: center;
`

export default Layout;