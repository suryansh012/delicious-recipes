import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import LocalPizzaIcon from '@mui/icons-material/LocalPizza'
import LunchDiningIcon from '@mui/icons-material/LunchDining'
import RamenDiningIcon from '@mui/icons-material/RamenDining'
import KebabDiningIcon from '@mui/icons-material/KebabDining'
import { Fab, List } from '@mui/material'

const categories = [
  { to: '/cuisine/Italian', label: 'Italian', icon: <LocalPizzaIcon /> },
  { to: '/cuisine/American', label: 'American', icon: <LunchDiningIcon /> },
  { to: '/cuisine/Thai', label: 'Thai', icon: <RamenDiningIcon /> },
  { to: '/cuisine/Indian', label: 'Indian', icon: <KebabDiningIcon /> },
]

function Category() {
  return (
    <List
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap', // Allow items to wrap to the next line
      }}
    >
      {categories.map((category, index) => (
        <SLink key={index} to={category.to} underline="none">
          <Fab
            color="secondary"
            aria-label="edit"
            sx={{ width: 97, height: 97, m: 1 }}
          >
            {category.icon}
            {category.label}
          </Fab>
        </SLink>
      ))}
    </List>
  )
}

const SLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  border-radius: 100%;
  text-decoration: none;
  background: linear-gradient(to right, #9d27b2, #6b067f);
  cursor: pointer;
  transform: scale(0.7);

  svg {
    font-size: 2rem;
  }

  &:hover {
    background: linear-gradient(to right, #f27121, #e94057);
  }

  &.active {
    background: linear-gradient(to right, #f27121, #e94057);
  }
`

export default Category
