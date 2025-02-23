import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Box, Typography, Button, Snackbar, Alert, TextField, IconButton, styled, Input } from '@mui/material'
import { Delete as DeleteIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [msg, setMsg] = useState('')
  const [sapor, setSapor] = useState('')
  const [successToastOpen, setSuccessToastOpen] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const resp = await fetch('https://technomedea.com/backend/fetch/products.php')
      if (!resp.ok) {
        throw new Error(resp.statusText)
      }
      const res = await resp.json()
      if (res && res.data && Array.isArray(res.data)) {
        const rowsWithId = res.data.map(row => ({ ...row, id: String(row.id) }))
        setProducts(rowsWithId)
      } else {
        throw new Error("Invalid data format from API")
      }
    } catch (error) {
      console.error("Error fetching products:", error)
      setSapor(error.message || 'Error fetching products.')
    }
  }

  const handleProcessRowUpdateError = useCallback((error) => {
    console.error("Row update error:", error)
    setSapor(error.message || 'An error occurred while saving.')
  }, [])

  const processRowUpdate = useCallback(async (newRow) => {
    try {
      const resp = await fetch('https://technomedea.com/backend/update.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRow), // Send the whole row for the backend to handle
      })
      if (!resp.ok) throw new Error(resp.statusText)
      const res = await resp.json()
      console.log(res)
      if (res.success) {
        setMsg(res.message)
        setSapor('')

        return new Promise((resolve) => {
          setProducts((prevState) => {
            const newProducts = prevState.map((row) =>
              row.id === newRow.id ? { ...newRow } : row
            )
            return newProducts
          })
          resolve(newRow)
        })
      } else {
        throw new Error(res.error || 'An error occurred while saving.')
      }
    } catch (error) {
      console.error("Row update failed:", error)
      setSapor(error.message || 'An error occurred while saving.')
      return newRow
    }
  }, [])

  const uploadImage = useCallback(async (event, row) => {
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('photo', file)
    formData.append('id', row.id)

    try {
      const resp = await fetch('https://technomedea.com/backend/update_image.php', {
        method: 'POST',
        body: formData,
      })

      if (!resp.ok) {
        throw new Error(resp.statusText)
      }

      const res = await resp.json()
      console.log(res)
      if (res.success) {
        setMsg(res.message)
        setSapor('')

        // Update the products state with the new image URL (if the backend returns it)
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === row.id ? { ...product, image: res.imageUrl } : product
          )
        )
      } else {
        throw new Error(res.error || 'An error occurred during image upload.')
      }
    } catch (error) {
      console.error("Image upload failed:", error)
      setSapor(error.message || 'An error occurred during image upload.')
    }
  }, [])

  const deleteItem = useCallback(async (prodId) => {
    try {
      const resp = await fetch('https://technomedea.com/backend/delete.php', {
        method: 'POST',
        body: JSON.stringify({ id: prodId }),
        headers: { 'Content-Type': 'application/json' }, // Add this line
      })
      if (!resp.ok) {
        throw new Error(resp.statusText)
      }
      const res = await resp.json()
      if (res.success) {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== prodId)) // Update state after deletion
        showSuccessToast(res.message)
      } else {
        throw new Error(res.error)
      }
    } catch (error) {
      console.error("Deletion failed:", error.message)
      setSapor(error.message)
    }
  }, [])

  const deleteSelectedItems = useCallback(async () => {
    try {
      const resp = await fetch('https://technomedea.com/backend/bulk_delete.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedRows }),
      })

      if (!resp.ok) throw new Error(resp.statusText)
      const res = await resp.json()

      if (res.success) {
        setMsg(res.message)
        setSapor('')
        setProducts((prevProducts) => prevProducts.filter((product) => !selectedRows.includes(product.id)))
        setSelectedRows([]) // Clear selected rows
        showSuccessToast(res.message)
      } else {
        throw new Error(res.error || 'An error occurred during bulk deletion.')
      }
    } catch (error) {
      console.error("Bulk deletion failed:", error)
      setSapor(error.message || 'An error occurred during bulk deletion.')
    }
  }, [selectedRows])

  const columns = useMemo(() => [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 200, editable: true },
    { field: 'quantity', headerName: 'Quantity', width: 100, type: 'number', editable: true },
    { field: 'price', headerName: 'Price', width: 120, type: 'number', editable: true },
    {
      field: 'image',
      headerName: 'Image',
      width: 150,
      renderCell: (params) => (
        <Box>
          <img
            src={`https://technomedea.com/${params.row.image}`}
            alt={params.row.title}
            style={{ width: '50px', height: '50px', objectFit: 'contain', marginRight: '8px' }}
          />
          <label htmlFor={`image-upload-${params.row.id}`}>
            <Input
              accept="image/*"
              style={{ display: 'none' }}
              id={`image-upload-${params.row.id}`}
              type="file"
              onChange={(event) => uploadImage(event, params.row)}
            />
            <IconButton color="primary" aria-label="upload picture" component="span">
              <CloudUploadIcon />
            </IconButton>
          </label>
        </Box>
      ),
      sortable: false,
      filterable: false,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => deleteItem(params.row.id)}
        />,
      ],
    },
  ], [deleteItem, uploadImage])

  const Input = styled('input')({
    display: 'none',
  })

  const showSuccessToast = (message) => {
    setMsg(message)
    setSuccessToastOpen(true)
  }

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Liste d'articles
      </Typography>
      <DataGrid
        rows={products}
        columns={columns}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        editMode="row"
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(newSelectionModel) => {
          setSelectedRows(newSelectionModel)
        }}
        selectionModel={selectedRows}
        sx={{
          '& .MuiDataGrid-row:nth-child(odd)': {
            backgroundColor: (theme) => theme.palette.action.hover,
          },
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
        }}
      />
      <Button
        variant="contained"
        color="error"
        onClick={deleteSelectedItems}
        disabled={selectedRows.length === 0}
        sx={{ mt: 2 }}
      >
        Supprimer Sélection
      </Button>
      <Snackbar
        open={successToastOpen}
        autoHideDuration={6000}
        onClose={() => setSuccessToastOpen(false)}
        message={msg}
      />
      <Snackbar
        open={!!sapor}
        autoHideDuration={6000}
        onClose={() => setSapor('')}
        message={sapor}
        severity="error"
      />
    </Box>
  )
}

export default ProductList