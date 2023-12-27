import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import { Typography, Card, CardMedia, CardContent, Grid } from '@mui/material'

function Searched() {
  const [searchedRecipes, setSearchedRecipes] = useState([])
  let params = useParams()

  const getSearched = async (name) => {
    try {
      const data = await fetch(
        `https://${import.meta.env.VITE_API_NAME}/complexSearch?apiKey=${
          import.meta.env.VITE_API_KEY
        }&query=${name}`
      )
      const recipes = await data.json()
      setSearchedRecipes(recipes.results)
    } catch (error) {
      console.error('Error fetching searched recipes:', error)
    }
  }

  useEffect(() => {
    getSearched(params.search)
  }, [params.search])

  return (
    <Grid container spacing={2}>
      {searchedRecipes.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
          <StyledCard>
            <Link to={`/recipe/${item.id}`}>
              <CardMedia
                component="img"
                height="60%"
                image={item.image}
                alt=""
              />
              <CardContent>
                <Typography variant="h6" align="center">
                  {item.title}
                </Typography>
              </CardContent>
            </Link>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  )
}

const StyledCard = styled(Card)`
  a {
    text-decoration: none;
  }
`

export default Searched
