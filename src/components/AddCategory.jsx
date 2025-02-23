import React, { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
} from '@mui/material'

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('')
  const [msg, setMsg] = useState('')
  const [sapor, setSapor] = useState('')
  const [loading, setLoading] = useState(false)

  const addCategory = async (event) => {
    event.preventDefault() // Prevent default form submission

    setLoading(true)
    setMsg('')
    setSapor('')

    try {
      const response = await fetch('https://technomedea.com/backend/add_category.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: categoryName }), // Send data as JSON
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const data = await response.json()

      if (data.success) {
        setMsg(data.message)
        setSapor('')
      } else {
        setSapor(data.error || 'An error occurred, please try again.')
        setMsg('')
      }
    } catch (error) {
      setSapor(error.message || 'An error occurred, please try again.')
      setMsg('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 2 }}>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          Ajouter une catégorie
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
        <form onSubmit={addCategory}>
          <TextField
            label="Catégorie"
            variant="outlined"
            fullWidth
            required
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
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

export default AddCategory