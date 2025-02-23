import React, { useState, useEffect } from 'react'
import { Box, Typography, TextField, Button, Card, CardContent, Alert, 
         FormControl, InputLabel, Select, MenuItem, Input, IconButton,} from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'

const AddItem = () => {
  const [categories, setCategories] = useState([])
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [photo, setPhoto] = useState(null) // Changed to File object
  const [photoPreview, setPhotoPreview] = useState('') // Added photoPreview state
  const [msg, setMsg] = useState('')
  const [sapor, setSapor] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const resp = await fetch('https://technomedea.com/backend/fetch/categories.php')
        if (!resp.ok) {
          throw new Error(resp.statusText)
        }
        const res = await resp.json()
        setCategories(res.data)
      } catch (err) {
        setCategories([])
      }
    }

    fetchCategories()
  }, [])

  const handlePhotoChange = (event) => {
    const file = event.target.files[0]
    setPhoto(file) // Store the File object
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result) // Set the data URL for preview
      }
      reader.readAsDataURL(file)
    } else {
      setPhotoPreview('') // Clear the preview if no file is selected
    }
  }

  const addItem = async (event) => {
    event.preventDefault()
    setLoading(true)
    setMsg('')
    setSapor('')

    const formData = new FormData()
    formData.append('title', title)
    formData.append('category', category)
    formData.append('price', price)
    formData.append('photo', photo)

    try {
      const resp = await fetch('https://technomedea.com/backend/add_product.php', {
        method: 'POST',
        body: formData,
      })

      if (!resp.ok) {
        throw new Error(resp.statusText)
      }

      const res = await resp.json()

      if (res.success) {
        setMsg(res.message)
        setSapor('')
        // Reset the form
        setTitle('')
        setCategory('')
        setPrice('')
        setPhoto(null)
        setPhotoPreview('')
      } else {
        setSapor(res.error || 'An error occurred, please try again.')
        setMsg('')
      }
    } catch (err) {
      setSapor(err.message || 'An error occurred, please try again.')
      setMsg('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 2 }}>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          Ajouter un produit
        </Typography>
        {msg && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {msg}
          </Alert>
        )}
        {sapor && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {sapor}
          </Alert>
        )}
        <form onSubmit={addItem}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <InputLabel htmlFor="photo-upload">
              <IconButton component="span">
                <AddPhotoAlternateIcon />
              </IconButton>
            </InputLabel>
            <Input
              id="photo-upload"
              type="file"
              accept="image/*"
              name="photo"
              onChange={handlePhotoChange}
              style={{ display: 'none' }}
            />
            <TextField
              placeholder="Importer une image"
              variant="outlined"
              fullWidth
              value={photo ? photo.name : ''} // Show filename or empty string
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>

          <TextField
            label="Article"
            variant="outlined"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="category-label">Catégorie</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={category}
              label="Catégorie"
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <MenuItem value="">Sélectionner une catégorie</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Prix de vente"
            variant="outlined"
            fullWidth
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            disabled={loading}
          >
            {loading ? 'Ajout en cours...' : 'Ajouter'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default AddItem