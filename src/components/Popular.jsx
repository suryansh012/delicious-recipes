import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Card, CardContent, CardMedia, Grid } from '@mui/material'

function Popular() {
  const [popular, setPopular] = useState([])

  useEffect(() => {
    getPopular()
  }, [])

  const getPopular = async () => {
    try {
      const check = localStorage.getItem('popular')
      if (check) {
        const parsedData = JSON.parse(check)
        setPopular(parsedData)
      } else {
        const apiName = import.meta.env.VITE_API_NAME
        const apiKey = import.meta.env.VITE_API_KEY
        const api = await fetch(
          `https://${apiName}/random?apiKey=${apiKey}&number=12`
        )
        const data = await api.json()
        localStorage.setItem('popular', JSON.stringify(data.recipes))
        setPopular(data.recipes)
      }
    } catch (error) {
      console.error('Error fetching popular recipes:', error)
    }
  }

  return (
    <>
      <Typography variant="h4" sx={{ m: 3 }}>
        Popular Picks
      </Typography>
      <Grid container spacing={2}>
        {popular.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card>
              <Link
                text
                to={`/recipe/${item.id}`}
                style={{ textDecoration: 'none' }}
              >
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
    </>
  )
}

export default Popular
