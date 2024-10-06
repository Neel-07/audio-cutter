"use client"

import { useState, useRef, useEffect } from 'react'
import { Box, Group, Button, Text, Stack, Select, ActionIcon, TextInput } from '@mantine/core'
import { IconPlayerPlay, IconPlayerPause, IconCut, IconTrash, IconArrowsMaximize, IconPlayerSkipBack, IconPlayerSkipForward, IconX } from '@tabler/icons-react'
import WaveformVisualizer from './WaveformVisualizer'

export default function AudioCutter({ file }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(0)
  const [format, setFormat] = useState('mp3')
  const audioRef = useRef(null)
  const waveformRef = useRef(null)

  useEffect(() => {
    if (file && audioRef.current) {
      const audio = audioRef.current
      audio.src = URL.createObjectURL(file)
      audio.onloadedmetadata = () => {
        setDuration(audio.duration)
        setEndTime(audio.duration)
      }
      audio.ontimeupdate = () => setCurrentTime(audio.currentTime)
    }
  }, [file])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    const milliseconds = Math.floor((seconds % 1) * 10)
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}.${milliseconds}`
  }

  const parseTime = (timeString) => {
    const [minutes, seconds] = timeString.split(':')
    return parseFloat(minutes) * 60 + parseFloat(seconds)
  }

  const handlePlayPause = () => {
    const audio = audioRef.current
    if (isPlaying) {
      audio.pause()
    } else {
      audio.currentTime = startTime
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleCut = () => {
    // In a real implementation, you would use the Web Audio API to cut the audio
    console.log(`Cutting audio from ${formatTime(startTime)} to ${formatTime(endTime)}`)
    // For demonstration, we'll just update the start and end times
    setCurrentTime(startTime)
    if (audioRef.current) {
      audioRef.current.currentTime = startTime
    }
  }

  const handleRemove = () => {
    // In a real implementation, you would use the Web Audio API to remove the selected portion
    console.log(`Removing audio from ${formatTime(startTime)} to ${formatTime(endTime)}`)
    // For demonstration, we'll just reset the selection
    setStartTime(0)
    setEndTime(duration)
  }

  const handleSave = () => {
    // Implement save logic here
    console.log(`Saving audio in ${format} format`)
  }

  return (
    <Box bg="dark.9" p="xl" style={{ minHeight: '100vh', color: '#C1C2C5' }}>
      <Stack spacing="xl">
        <Group position="apart">
          <Text size="lg" weight={500}>{file.name}</Text>
          <ActionIcon variant="subtle" color="gray">
            <IconArrowsMaximize size={18} />
          </ActionIcon>
        </Group>
        <Box style={{ height: '200px', backgroundColor: '#25262B', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
          <WaveformVisualizer
            audioFile={file}
            ref={waveformRef}
            currentTime={currentTime}
            startTime={startTime}
            endTime={endTime}
            duration={duration}
            onTimeUpdate={(start, end) => {
              setStartTime(start)
              setEndTime(end)
            }}
          />
          <Text 
            style={{ 
              position: 'absolute', 
              top: '10px', 
              right: '10px', 
              backgroundColor: 'rgba(0, 0, 0, 0.5)', 
              padding: '5px 10px', 
              borderRadius: '4px' 
            }}
          >
            {formatTime(currentTime)} / {formatTime(duration)}
          </Text>
        </Box>
        <audio ref={audioRef} style={{ display: 'none' }} />
        <Group position="apart">
          <Group>
            <ActionIcon variant="subtle" color="gray" onClick={() => audioRef.current.currentTime = Math.max(currentTime - 5, 0)}>
              <IconPlayerSkipBack size={18} />
            </ActionIcon>
            <Button
              variant="subtle"
              color="gray"
              leftIcon={isPlaying ? <IconPlayerPause size={18} /> : <IconPlayerPlay size={18} />}
              onClick={handlePlayPause}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <ActionIcon variant="subtle" color="gray" onClick={() => audioRef.current.currentTime = Math.min(currentTime + 5, duration)}>
              <IconPlayerSkipForward size={18} />
            </ActionIcon>
          </Group>
          <Group spacing="xs">
            <Text size="sm">Start:</Text>
            <TextInput 
              value={formatTime(startTime)}
              onChange={(event) => setStartTime(parseTime(event.currentTarget.value))}
              styles={(theme) => ({
                input: {
                  backgroundColor: 'transparent',
                  borderColor: theme.colors.dark[4],
                  color: theme.colors.gray[0],
                  width: '80px',
                },
              })}
            />
            <Text size="sm">End:</Text>
            <TextInput 
              value={formatTime(endTime)}
              onChange={(event) => setEndTime(parseTime(event.currentTarget.value))}
              styles={(theme) => ({
                input: {
                  backgroundColor: 'transparent',
                  borderColor: theme.colors.dark[4],
                  color: theme.colors.gray[0],
                  width: '80px',
                },
              })}
            />
          </Group>
        </Group>
        <Group position="apart">
          <Group>
            <Button 
              variant="subtle" 
              color="gray" 
              leftIcon={<IconCut size={18} />} 
              onClick={handleCut}
              styles={(theme) => ({
                root: {
                  '&:hover': {
                    backgroundColor: theme.colors.dark[6],
                  },
                },
              })}
            >
              Cut
            </Button>
            <Button 
              variant="subtle" 
              color="gray" 
              leftIcon={<IconTrash size={18} />} 
              onClick={handleRemove}
              styles={(theme) => ({
                root: {
                  '&:hover': {
                    backgroundColor: theme.colors.dark[6],
                  },
                },
              })}
            >
              Remove
            </Button>
          </Group>
          <Group spacing="xs">
            <Text size="sm">format:</Text>
            <Select
              value={format}
              onChange={setFormat}
              data={[
                { value: 'mp3', label: 'mp3' },
                { value: 'wav', label: 'wav' },
              ]}
              styles={(theme) => ({
                input: { 
                  backgroundColor: 'transparent',
                  borderColor: theme.colors.dark[4],
                  color: theme.colors.gray[0],
                  width: '80px',
                },
                item: { 
                  '&[data-selected]': { 
                    backgroundColor: theme.colors.dark[6] 
                  } 
                },
              })}
            />
            <Button onClick={handleSave} color="green">Save</Button>
          </Group>
        </Group>
      </Stack>
    </Box>
  )
}