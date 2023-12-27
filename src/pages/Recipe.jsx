import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import HoverRating from '../components/Rating'
import MenuBookSharpIcon from '@mui/icons-material/MenuBookSharp'
import {
  Button,
  CardMedia,
  Card,
  CardHeader,
  Grid,
  List,
  Box,
  Typography,
  ListItemButton,
  Container,
  CardContent,
} from '@mui/material'

function Recipe() {
  let params = useParams()
  const [details, setDetails] = useState({})
  const [activeTab, setActiveTab] = useState('instructions')
  const fetchDetails = async () => {
    const apiKey = import.meta.env.VITE_API_KEY
    const apiName = import.meta.env.VITE_API_NAME
    const data = await fetch(
      `https://${apiName}/${params.name}/information?apiKey=${apiKey}&includeNutrition=false`
    )
    const detailData = await data.json()
    setDetails(detailData)
  }

  useEffect(() => {
    fetchDetails()
  }, [params.name])
  const [selectedIndex, setSelectedIndex] = useState(1)

  return (
    <Container fixed>
      <Card>
        <CardHeader title={details.title} />
        <CardMedia
          sx={{ p: 5, borderRadius: 4, display: 'flex' }}
          component="img"
          image={details.image}
          title={details.title}
        />
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              width: 500,
              height: 80,
              m: 'auto',
            }}
          >
            <Box>
              <Typography variant="h6"> Rate the Recipe :</Typography>{' '}
              <HoverRating />
            </Box>
          </Box>
          <Grid sx={{ m: 'auto' }}>
            <Button
              sx={{ height: 'auto', width: 115, m: 1 }}
              color="secondary"
              size="medium"
              variant={activeTab === 'instructions' ? 'contained' : 'outlined'}
              onClick={() => setActiveTab('instructions')}
            >
              Instructions
            </Button>
            <Button
              sx={{ height: 'auto', width: 115, m: 1 }}
              color="secondary"
              size="medium"
              variant={activeTab === 'ingredients' ? 'contained' : 'outlined'}
              onClick={() => setActiveTab('ingredients')}
            >
              Ingredients
            </Button>
          </Grid>
          {activeTab === 'instructions' && (
            <div>
              <br />
              <br />
              <Typography
                variant="body1"
                sx={{ p: 1 }}
                paragraph
                dangerouslySetInnerHTML={{ __html: details.summary }}
              ></Typography>
              <br />
              <br />
              <Typography
                variant="body1"
                sx={{ p: 1 }}
                paragraph
                dangerouslySetInnerHTML={{ __html: details.instructions }}
              ></Typography>
            </div>
          )}
          {activeTab === 'ingredients' && (
            <List sx={{ mt: 5 }}>
              {details.extendedIngredients.map((ingredient) => (
                <ListItemButton
                  key={ingredient.id}
                  selected={selectedIndex === ingredient.id}
                >
                  <MenuBookSharpIcon sx={{ mr: 2 }} />
                  {ingredient.original}
                </ListItemButton>
              ))}
            </List>
          )}
          ;
        </CardContent>
      </Card>
    </Container>
  )
}

export default Recipe
