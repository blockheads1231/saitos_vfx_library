import { useEffect, useState } from 'react'
import '../styles/globals.css'
import { useMDXComponents } from 'nextra-theme-docs'
import Head from 'next/head'

export { useMDXComponents }

const targets = [
  '£ － ω ら － `',
  'Hello world!',
  '愛情を込めて',
  'Mostly bug-free',
  'Fridays are off.',
  'Pushed at 3AM.',
  'Juan helped.',
  '...',
  'Tried my best',
  'Shipped to brazil',
  'For free',
  'system.status: tired...',
  'error 404',
  'system.status: haha.',
  'system is cooked',
  'ピニク',
  'The cake is not real',
  ':)',
  'F',
]

const GLITCH_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/\\'

function randomChar() {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
}

function ScrambleIntro({ onDone }) {
  const [text, setText] = useState('')

  useEffect(() => {
    let raf = 0
    let cancelled = false
    const start = performance.now()
    const duration = 2200
    const chosenTarget = targets[Math.floor(Math.random() * targets.length)]

    const finish = () => {
      if (cancelled) return
      cancelled = true
      cancelAnimationFrame(raf)
      onDone()
    }

    const tick = (now) => {
      if (cancelled) return

      const t = Math.min((now - start) / duration, 1)

      const frame = chosenTarget.split('').map((ch, i) => {
        if (ch === ' ') return ' '
        const reveal = t > (i * 0.7) / chosenTarget.length
        return reveal ? ch : randomChar()
      })

      setText(frame.join(''))

      if (t >= 1) {
        finish()
        return
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [onDone])

  return (
    <div
  style={{
    position: 'fixed',
    inset: 0,
    display: 'grid',
    placeItems: 'center',
    overflow: 'hidden',
  }}
>
  {/* Background */}
  <div
  onClick={onDone}
  onPointerDown={onDone}
    style={{
      position: 'absolute',
      inset: 0,
      backgroundImage: 'url("/icons/vfx_star.png")',
      backgroundSize: '650px 600px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      opacity: 0.3,
      filter: 'blur(10px)',
      zIndex: 0,
    }}
  />
      <div
        style={{
          fontFamily: 'Monocraft, Miracode, monospace',
          fontSize: 'clamp(22px, 6vw, 55px)',
          letterSpacing: '0.12em',
          color: '#fff',
          textShadow: '0 0 18px rgba(255,255,255,0.5)',
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

  const handleDone = () => {
    setShowIntro(false)
    setSiteReady(true)
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/icons/star_favicon2.png" />
      </Head>

      <div style={{ opacity: siteReady ? 1 : 0, transition: 'opacity 750ms ease' }}>
        <Component {...pageProps} />
      </div>

      {showIntro && <ScrambleIntro onDone={handleDone} />}
    </>
  )
}