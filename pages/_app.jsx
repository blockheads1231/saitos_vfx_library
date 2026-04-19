import {useEffect, useState} from 'react'
import '../styles/globals.css'
import {useMDXComponents} from 'nextra-theme-docs'

export  {useMDXComponents}

const targets = [
  '£ － ω ら － `',
  'Hello world!',
  '愛情を込めて',
  '✧˚ · .✧',
  'Mostly bug-free',
  'Fridays are off.',
  'Pushed at 3AM.',
  'Juan helped.',
  '...',
  'Tried my best',
  'Shipped to brazil',
  'For free',
  'system.status: dreaming...',
  'system.status: tired...',
  'error 404',
  'system.status: haha.',
  'system is cooked',
  'Keep me waiting!',
  'ピニク'
]

const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/\\'

function randomChar() {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
}

function ScrambleIntro({onDone}) {
  const [text, setText] = useState('')

  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const duration = 2200
    const chosenTarget = targets[Math.floor(Math.random() * targets.length)]

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)

      const frame = chosenTarget.split('').map((ch, i) => {
        if (ch === ' ') return ' '
        const reveal = t > i * 0.7/chosenTarget.length
        return reveal ? ch : randomChar()
      })

      setText(frame.join(''))

      if (t >= 1) {
        onDone()
        return
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        display: 'grid',
        placeItems: 'center',
        background: 'rgba(0,0,0,0.85)',
        pointerEvents: 'none'
      }}
    >
      <div
        style={{
          fontFamily: 'Monocraft, Miracode, monospace',
          fontSize: 'clamp(22px, 6vw, 55px)',
          letterSpacing: '0.12em',
          color: '#fff',
          textShadow: '0 0 18px rgba(255,255,255,0.5)'
        }}
      >
        {text}
      </div>
    </div>
  )
}

export default function App({ Component, pageProps }) {
  const [showIntro, setShowIntro] = useState(true)
  const [siteReady, setSiteReady] = useState(false)

  return (
    <>
      <div style={{ opacity: siteReady ? 1 : 0, transition: 'opacity 750ms ease' }}>
        <Component {...pageProps} />
      </div>

      {showIntro && (
        <ScrambleIntro
          onDone={() => {
            setShowIntro(false)
            setSiteReady(true)
          }}
        />
      )}
    </>
  )
}