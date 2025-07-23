import { useState, useRef } from 'react'
import { 
  Container, 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  Card, 
  CardContent,
  CardMedia,
  Chip,
  LinearProgress,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import { 
  CloudUpload, 
  PhotoCamera, 
  Delete, 
  Visibility, 
  CalendarToday,
  TrendingUp,
  Add
} from '@mui/icons-material'
import { useDropzone } from 'react-dropzone'
import './App.css'

interface HairPhoto {
  id: string
  file: File
  preview: string
  date: Date
  notes?: string
  uploaded: boolean
}

function App() {
  const [photos, setPhotos] = useState<HairPhoto[]>([])
  const [uploading, setUploading] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<HairPhoto | null>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onDrop = (acceptedFiles: File[]) => {
    const newPhotos: HairPhoto[] = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      date: new Date(),
      uploaded: false
    }))
    
    setPhotos(prev => [...newPhotos, ...prev])
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: true,
    noClick: true // Prevent click on dropzone from opening file dialog
  })

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const fileArray = Array.from(files)
      onDrop(fileArray)
      // Reset the input
      event.target.value = ''
    }
  }

  const handleUpload = async () => {
    setUploading(true)
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setPhotos(prev => prev.map(photo => ({ ...photo, uploaded: true })))
    setUploading(false)
  }

  const handleDelete = (id: string) => {
    setPhotos(prev => prev.filter(photo => photo.id !== id))
  }

  const handleViewPhoto = (photo: HairPhoto) => {
    setSelectedPhoto(photo)
    setOpenDialog(true)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <Box className="App">
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
            HairGrowth Tracker
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            Track your hair loss journey with daily photos
          </Typography>
        </Box>

        {/* Upload Section */}
        <Box 
          sx={{ 
            p: 4, 
            mb: 4, 
            textAlign: 'center',
            border: '2px dashed',
            borderColor: isDragActive ? 'primary.main' : 'grey.300',
            backgroundColor: isDragActive ? 'primary.50' : 'background.paper',
            transition: 'all 0.3s ease',
            borderRadius: 2,
            boxShadow: 3
          }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <CloudUpload sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            {isDragActive ? 'Drop your photos here' : 'Upload Hair Photos'}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Drag and drop your hair photos here, or use the button below to select files
          </Typography>
        </Box>

        {/* File Selection Button */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Button 
            variant="contained" 
            size="large" 
            onClick={handleFileSelect}
            startIcon={<PhotoCamera />}
            sx={{ mr: 2 }}
          >
            Select Photos
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInputChange}
            style={{ display: 'none' }}
          />
        </Box>

        {/* Upload Progress */}
        {uploading && (
          <Paper sx={{ p: 2, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Uploading Photos...
            </Typography>
            <LinearProgress sx={{ mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Please wait while we upload your photos
            </Typography>
          </Paper>
        )}

        {/* Action Buttons */}
        {photos.length > 0 && !uploading && (
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Button 
              variant="contained" 
              size="large" 
              onClick={handleUpload}
              startIcon={<CloudUpload />}
              sx={{ mr: 2 }}
            >
              Upload All Photos
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              onClick={() => setPhotos([])}
            >
              Clear All
            </Button>
          </Box>
        )}

        {/* Photos Grid */}
        {photos.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
              Your Hair Journey ({photos.length} photos)
            </Typography>
            <Grid container spacing={3}>
              {photos.map((photo) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={photo.id}>
                  <Card sx={{ height: '100%', position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={photo.preview}
                      alt="Hair photo"
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CalendarToday sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(photo.date)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip 
                          label={photo.uploaded ? 'Uploaded' : 'Pending'} 
                          color={photo.uploaded ? 'success' : 'warning'} 
                          size="small" 
                        />
                      </Box>
                    </CardContent>
                    <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
                      <IconButton 
                        size="small" 
                        onClick={() => handleViewPhoto(photo)}
                        sx={{ bgcolor: 'rgba(255,255,255,0.9)' }}
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDelete(photo.id)}
                        sx={{ bgcolor: 'rgba(255,255,255,0.9)' }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Empty State */}
        {photos.length === 0 && !uploading && (
          <Paper sx={{ p: 6, textAlign: 'center' }}>
            <PhotoCamera sx={{ fontSize: 80, color: 'grey.400', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No Photos Yet
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Start tracking your hair growth journey by uploading your first photo
            </Typography>
          </Paper>
        )}

        {/* Stats Section */}
        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Your Progress
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary">
                  {photos.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Photos
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="success.main">
                  {photos.filter(p => p.uploaded).length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Uploaded
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="info.main">
                  {photos.length > 0 ? Math.round((photos.filter(p => p.uploaded).length / photos.length) * 100) : 0}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completion
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Photo View Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Hair Photo - {selectedPhoto && formatDate(selectedPhoto.date)}
        </DialogTitle>
        <DialogContent>
          {selectedPhoto && (
            <Box sx={{ textAlign: 'center' }}>
              <img 
                src={selectedPhoto.preview} 
                alt="Hair photo" 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '400px', 
                  objectFit: 'contain' 
                }} 
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default App 