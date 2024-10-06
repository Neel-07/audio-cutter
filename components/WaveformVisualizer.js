import { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

export default function WaveformVisualizer({ audioFile }) {
  const waveformRef = useRef(null);

  useEffect(() => {
    if (audioFile && waveformRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'violet',
        progressColor: 'purple',
        cursorColor: 'navy',
        height: 100,
      });

      wavesurfer.loadBlob(audioFile);

      return () => wavesurfer.destroy();
    }
  }, [audioFile]);

  return <div ref={waveformRef} />;
}