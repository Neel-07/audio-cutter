'use client'

import { useState } from 'react'
import { Container, Title, Text, Button, Center, Stack, Box, Image, MantineProvider } from '@mantine/core'
import AudioCutter from '../components/AudioCutter'

const theme = {
  colors: {
    dark: [
      '#C1C2C5',
      '#A6A7AB',
      '#909296',
      '#5C5F66',
      '#373A40',
      '#2C2E33',
      '#25262B',
      '#1A1B1E',
      '#141517',
      '#17171e',
    ],
    purple: ['#6653DC','#F3E8FF', '#E9D5FF', '#D8B4FE', '#C084FC', '#A855F7', '#9333EA', '#7E22CE', '#6B21A8', '#581C87', '#3B0764'],
  },
  primaryColor: 'teal',
}

export default function Home() {
  const [showCutter, setShowCutter] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
      setShowCutter(true)
    }
  }

  if (showCutter) {
    return <AudioCutter file={selectedFile} />
  }

  return (
    <MantineProvider theme={theme}>
      <Box bg="dark.9" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Container size="sm">
          <Stack align="center" spacing="xl" my="xl">
            <Title order={1} align="center" size={48} color="#ffffff" style={{ color: '#ffffff !important' }}>
              Audio Cutter
            </Title>
            <Text align="center" color="white" size="xl" style={{ fontSize: '24px' }}>
              Free editor to trim and cut any audio file online
            </Text>
            <Center>
              <Image src="/img.png" alt="Audio Cutter" />
            </Center>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              id="file-input"
            />
            <label htmlFor="file-input">
              <Button
                variant="outline"
                radius="xl"
                component="span"
                size="lg"
                styles={(theme) => ({
                  root: {
                    borderWidth: 2,
                    color: '#eee',
                    backgroundColor: 'transparent',
                    borderColor: 'rgb(102,93,195)',
                    '&:hover': {
                      backgroundColor: 'rgb(38, 38, 51)',
                    },
                  },
                })}
              >
                Browse All Files
              </Button>
            </label>
          </Stack>
        </Container>
      </Box>
    </MantineProvider>
  )
}