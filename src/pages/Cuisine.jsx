import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Card, CardContent, CardMedia, Grid } from '@mui/material'
import { useParams } from 'react-router-dom'

function Cuisine() {
  const [cuisine, setCuisine] = useState([])
  let params = useParams()

  const getCuisine = async (name) => {
    try {
      const data = await fetch(
        `https://${import.meta.env.VITE_API_NAME}/complexSearch?apiKey=${
          import.meta.env.VITE_API_KEY
        }&cuisine=${name}`
      )
      const recipes = await data.json()
      setCuisine(recipes.results)
    } catch (error) {
      console.error('Error fetching cuisine recipes:', error)
    }
  }

  useEffect(() => {
    getCuisine(params.type)
  }, [params.type])

  return (
    <Grid container spacing={2}>
      {cuisine.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
          <Card>
            <Link to={`/recipe/${item.id}`} style={{ textDecoration: 'none' }}>
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
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default Cuisine
