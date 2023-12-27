import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Card, CardContent, CardMedia, Grid } from '@mui/material'

function Veg() {
  const [veg, setVeg] = useState([])

  useEffect(() => {
    getVeg()
  }, [])

  const getVeg = async () => {
    try {
      const check = localStorage.getItem('veg')
      if (check) {
        const parsedVegData = JSON.parse(check)
        setVeg(parsedVegData)
      } else {
        const apiKey = import.meta.env.VITE_API_KEY
        const apiName = import.meta.env.VITE_API_NAME
        const api = await fetch(
          `https://${apiName}/random?apiKey=${apiKey}&number=12&tags=vegetarian`
        )
        const data = await api.json()
        localStorage.setItem('veg', JSON.stringify(data.recipes))
        setVeg(data.recipes)
      }
    } catch (error) {
      console.error('Error fetching vegetarian recipes:', error)
    }
  }

  return (
    <>
      <Typography variant="h4" sx={{ m: 3 }}>
        Our Vegetarian Picks
      </Typography>
      <Grid container spacing={2}>
        {veg.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card>
              <Link
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

export default Veg
