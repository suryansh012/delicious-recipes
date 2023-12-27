import Popular from '../components/Popular'
import Veg from '../components/Veg'
import { Container } from '@mui/material'

function Home() {
  return (
    <Container>
      <Veg />
      <Popular />
    </Container>
  )
}

export default Home
