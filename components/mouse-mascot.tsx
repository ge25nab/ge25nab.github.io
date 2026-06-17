'use client'

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react'

const ACTIONS = ['zoom', 'tease', 'hop', 'wiggle', 'spin'] as const
type Action = (typeof ACTIONS)[number]

const ACTION_DURATION: Record<Action, number> = {
  zoom: 1500,
  tease: 1000,
  hop: 850,
  wiggle: 750,
  spin: 850,
}

const CAR_W = 120
const CAR_H = 92
const FLEE_RADIUS = 150
const MARGIN = 12
const MAX_FORM = 5
const TF_TOTAL = 1700
const TF_SWAP = 850

const SPARKS = Array.from({ length: 14 }, (_, i) => {
  const a = (i / 14) * Math.PI * 2
  const d = 56 + (i % 3) * 20
  return {
    sx: Math.cos(a) * d,
    sy: Math.sin(a) * d,
    delay: 360 + (i % 5) * 34,
    color: i % 2 ? '#fde68a' : '#a5f3fc',
  }
})

export function MouseMascot() {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftEyeRef = useRef<SVGCircleElement>(null)
  const rightEyeRef = useRef<SVGCircleElement>(null)
  const leftPupilRef = useRef<SVGGElement>(null)
  const rightPupilRef = useRef<SVGGElement>(null)

  const [blink, setBlink] = useState(false)
  const [action, setAction] = useState<Action | null>(null)
  const [scared, setScared] = useState(false)
  const [form, setForm] = useState(0)
  const [transforming, setTransforming] = useState(false)

  const busyRef = useRef(false)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const scaredTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

    pos.current.x = window.innerWidth - CAR_W - 24
    pos.current.y = window.innerHeight - CAR_H - 24
    target.current.x = pos.current.x
    target.current.y = pos.current.y

    let raf = 0
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.14
      pos.current.y += (target.current.y - pos.current.y) * 0.14
      if (containerRef.current) {
        containerRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    const MAX_OFFSET = 3.2
    const moveEye = (eye: SVGCircleElement | null, pupil: SVGGElement | null, mx: number, my: number) => {
      if (!eye || !pupil) return
      const rect = eye.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const angle = Math.atan2(my - cy, mx - cx)
      const dist = Math.min(MAX_OFFSET, Math.hypot(mx - cx, my - cy) / 22)
      pupil.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`
    }

    const onMove = (e: MouseEvent) => {
      moveEye(leftEyeRef.current, leftPupilRef.current, e.clientX, e.clientY)
      moveEye(rightEyeRef.current, rightPupilRef.current, e.clientX, e.clientY)
      if (busyRef.current) return
      const cx = pos.current.x + CAR_W / 2
      const cy = pos.current.y + CAR_H / 2
      const dx = cx - e.clientX
      const dy = cy - e.clientY
      const dist = Math.hypot(dx, dy)
      if (dist < FLEE_RADIUS) {
        const nx = dx / (dist || 1)
        const ny = dy / (dist || 1)
        const push = FLEE_RADIUS - dist + 50
        target.current.x = clamp(pos.current.x + nx * push, MARGIN, window.innerWidth - CAR_W - MARGIN)
        target.current.y = clamp(pos.current.y + ny * push, MARGIN, window.innerHeight - CAR_H - MARGIN)
        setScared(true)
        if (scaredTimer.current) clearTimeout(scaredTimer.current)
        scaredTimer.current = setTimeout(() => setScared(false), 600)
      }
    }

    const onResize = () => {
      pos.current.x = clamp(pos.current.x, MARGIN, window.innerWidth - CAR_W - MARGIN)
      pos.current.y = clamp(pos.current.y, MARGIN, window.innerHeight - CAR_H - MARGIN)
      target.current.x = clamp(target.current.x, MARGIN, window.innerWidth - CAR_W - MARGIN)
      target.current.y = clamp(target.current.y, MARGIN, window.innerHeight - CAR_H - MARGIN)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('resize', onResize)

    const blinkInterval = setInterval(() => {
      setBlink(true)
      setTimeout(() => setBlink(false), 150)
    }, 4200)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      clearInterval(blinkInterval)
      if (scaredTimer.current) clearTimeout(scaredTimer.current)
    }
  }, [])

  const handleClick = () => {
    if (busyRef.current) return
    busyRef.current = true

    if (form < MAX_FORM) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) {
        setForm((f) => f + 1)
        busyRef.current = false
        return
      }
      setTransforming(true)
      setTimeout(() => setForm((f) => f + 1), TF_SWAP)
      setTimeout(() => {
        setTransforming(false)
        busyRef.current = false
      }, TF_TOTAL)
    } else {
      const pick = ACTIONS[Math.floor(Math.random() * ACTIONS.length)]
      setAction(pick)
      setTimeout(() => {
        setAction(null)
        busyRef.current = false
      }, ACTION_DURATION[pick])
    }
  }

  const renderEyes = (lx: number, rx: number, ey: number, r = 8.4, pr = 4.6): ReactNode => (
    <>
      <circle ref={leftEyeRef} cx={lx} cy={ey} r={r} fill="#ffffff" />
      <circle ref={rightEyeRef} cx={rx} cy={ey} r={r} fill="#ffffff" />
      <g style={{ transformOrigin: `${(lx + rx) / 2}px ${ey}px`, transform: blink ? 'scaleY(0.08)' : 'scaleY(1)', transition: 'transform 80ms ease' }}>
        <circle cx={lx} cy={ey} r={r} fill="#ffffff" />
        <circle cx={rx} cy={ey} r={r} fill="#ffffff" />
        <g ref={leftPupilRef} style={{ transition: 'transform 110ms ease-out' }}>
          <circle cx={lx} cy={ey + 1} r={pr} fill="#0f172a" />
          <circle cx={lx + 1.8} cy={ey - 2.1} r={pr * 0.37} fill="#ffffff" />
        </g>
        <g ref={rightPupilRef} style={{ transition: 'transform 110ms ease-out' }}>
          <circle cx={rx} cy={ey + 1} r={pr} fill="#0f172a" />
          <circle cx={rx + 1.8} cy={ey - 2.1} r={pr * 0.37} fill="#ffffff" />
        </g>
      </g>
    </>
  )

  const svgProps = {
    width: CAR_W,
    height: CAR_H,
    viewBox: '0 0 132 100',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    onClick: handleClick,
    className: 'pointer-events-auto cursor-pointer',
  } as const

  const renderCar = (f: number): ReactNode => {
    if (f === 1) {
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="s-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ff8a5b" /><stop offset="45%" stopColor="#ef4444" /><stop offset="100%" stopColor="#b01225" /></linearGradient>
            <linearGradient id="s-glass" x1="0.1" y1="0" x2="0.9" y2="1"><stop offset="0%" stopColor="#475569" /><stop offset="100%" stopColor="#0f172a" /></linearGradient>
            <radialGradient id="s-hub" cx="0.5" cy="0.4" r="0.6"><stop offset="0%" stopColor="#f8fafc" /><stop offset="55%" stopColor="#cbd5e1" /><stop offset="100%" stopColor="#64748b" /></radialGradient>
            <radialGradient id="s-tyre" cx="0.5" cy="0.4" r="0.65"><stop offset="0%" stopColor="#3b424d" /><stop offset="100%" stopColor="#0b0f14" /></radialGradient>
          </defs>
          <ellipse cx="66" cy="95" rx="44" ry="5" fill="#7f1d1d" opacity="0.18" style={{ transformOrigin: '66px 95px', animation: 'mascot-shadow 4s ease-in-out infinite' }} />
          <circle cx="40" cy="80" r="13" fill="url(#s-tyre)" /><circle cx="40" cy="80" r="5.4" fill="url(#s-hub)" />
          <circle cx="94" cy="80" r="13" fill="url(#s-tyre)" /><circle cx="94" cy="80" r="5.4" fill="url(#s-hub)" />
          <rect x="104" y="50" width="20" height="3.4" rx="1.7" fill="#7f1d1d" /><rect x="106" y="53" width="3" height="9" fill="#7f1d1d" /><rect x="119" y="53" width="3" height="9" fill="#7f1d1d" />
          <path d="M 10 80 L 11 70 C 11 66 15 64 21 63 L 42 60 L 54 48 L 80 48 L 90 60 L 112 62 C 119 63 122 68 122 74 L 122 80 C 122 82 120 82 118 82 L 14 82 C 11 82 10 81 10 80 Z" fill="url(#s-body)" />
          <path d="M 16 73 L 116 73 L 114 77 L 18 77 Z" fill="#7f1d1d" opacity="0.35" />
          <path d="M 56 50 L 78 50 L 86 60 L 48 60 Z" fill="url(#s-glass)" />
          <path d="M 60 50 L 67 50 L 60 59 L 53 59 Z" fill="#ffffff" opacity="0.18" />
          <path d="M 12 67 L 22 66 L 22 70 L 12 71 Z" fill="#fde68a" />
          {renderEyes(60, 76, 55, 6.6, 3.6)}
          {scared ? <ellipse cx="68" cy="64" rx="2.4" ry="3" fill="#0f172a" /> : <path d="M 64 64 Q 68 66.5 72 63.5" stroke="#0f172a" strokeWidth="1.9" strokeLinecap="round" fill="none" />}
        </svg>
      )
    }

    if (f === 2) {
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="u-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#334155" /><stop offset="45%" stopColor="#1e293b" /><stop offset="100%" stopColor="#0b1120" /></linearGradient>
            <linearGradient id="u-canopy" x1="0.1" y1="0" x2="0.9" y2="1"><stop offset="0%" stopColor="#a5f3fc" /><stop offset="100%" stopColor="#0e7490" /></linearGradient>
            <radialGradient id="u-thrust" cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stopColor="#67e8f9" stopOpacity="0.95" /><stop offset="100%" stopColor="#22d3ee" stopOpacity="0" /></radialGradient>
            <filter id="u-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.2" /></filter>
          </defs>
          <ellipse cx="42" cy="86" rx="16" ry="6" fill="url(#u-thrust)" filter="url(#u-glow)" style={{ animation: 'u-pulse 1.2s ease-in-out infinite' }} />
          <ellipse cx="90" cy="86" rx="16" ry="6" fill="url(#u-thrust)" filter="url(#u-glow)" style={{ animation: 'u-pulse 1.2s ease-in-out infinite' }} />
          <path d="M 10 64 L 26 58 L 28 66 L 12 70 Z" fill="#0b1120" /><path d="M 122 64 L 106 58 L 104 66 L 120 70 Z" fill="#0b1120" />
          <path d="M 18 66 C 20 54 36 48 66 48 C 96 48 112 54 114 66 C 115 72 110 75 102 75 L 30 75 C 22 75 17 72 18 66 Z" fill="url(#u-body)" stroke="#22d3ee" strokeWidth="1.6" />
          <path d="M 24 73 L 108 73" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" opacity="0.85" filter="url(#u-glow)" />
          <path d="M 46 52 Q 52 40 66 40 Q 80 40 86 52 Z" fill="url(#u-canopy)" />
          <path d="M 54 51 L 61 42 L 66 42 L 58 51 Z" fill="#ffffff" opacity="0.55" />
          <circle cx="22" cy="62" r="2.2" fill="#22d3ee" filter="url(#u-glow)" /><circle cx="110" cy="62" r="2.2" fill="#f0abfc" filter="url(#u-glow)" />
          {renderEyes(58, 74, 52, 6.4, 3.5)}
        </svg>
      )
    }

    if (f === 3) {
      // Armored off-roader
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="p-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c084fc" /><stop offset="45%" stopColor="#9333ea" /><stop offset="100%" stopColor="#5b21b6" /></linearGradient>
            <linearGradient id="p-glass" x1="0.1" y1="0" x2="0.9" y2="1"><stop offset="0%" stopColor="#e9d5ff" /><stop offset="100%" stopColor="#7c3aed" /></linearGradient>
            <radialGradient id="p-tyre" cx="0.5" cy="0.4" r="0.65"><stop offset="0%" stopColor="#44424a" /><stop offset="100%" stopColor="#0b0b10" /></radialGradient>
            <radialGradient id="p-hub" cx="0.5" cy="0.4" r="0.6"><stop offset="0%" stopColor="#fbbf24" /><stop offset="100%" stopColor="#b45309" /></radialGradient>
          </defs>
          <ellipse cx="66" cy="96" rx="48" ry="5" fill="#4c1d95" opacity="0.2" style={{ transformOrigin: '66px 96px', animation: 'mascot-shadow 4s ease-in-out infinite' }} />
          <circle cx="38" cy="78" r="16" fill="url(#p-tyre)" /><circle cx="38" cy="78" r="6" fill="url(#p-hub)" />
          <circle cx="96" cy="78" r="16" fill="url(#p-tyre)" /><circle cx="96" cy="78" r="6" fill="url(#p-hub)" />
          {[30, 38, 46].map((a) => <line key={'l' + a} x1="38" y1="78" x2={38 + 16 * Math.cos((a * 60 * Math.PI) / 180)} y2={78 + 16 * Math.sin((a * 60 * Math.PI) / 180)} stroke="#1f2937" strokeWidth="2" />)}
          <rect x="42" y="24" width="48" height="5" rx="2.5" fill="#3b0764" />
          <circle cx="50" cy="26.5" r="2" fill="#fde68a" /><circle cx="66" cy="26.5" r="2" fill="#fde68a" /><circle cx="82" cy="26.5" r="2" fill="#fde68a" />
          <rect x="40" y="30" width="52" height="26" rx="9" fill="url(#p-body)" />
          <path d="M 12 70 C 12 54 20 50 30 49 L 102 49 C 112 50 120 54 120 70 C 120 78 114 80 106 80 L 26 80 C 18 80 12 78 12 70 Z" fill="url(#p-body)" />
          <path d="M 16 70 L 116 70 L 114 75 L 18 75 Z" fill="#fb923c" opacity="0.4" />
          <path d="M 46 53 Q 51 36 66 35 Q 81 36 86 53 Z" fill="url(#p-glass)" />
          {renderEyes(58, 76, 44, 7.4, 4)}
          {scared ? <ellipse cx="67" cy="60" rx="2.6" ry="3.2" fill="#0f172a" /> : <path d="M 60 58 Q 67 63 74 58" stroke="#0f172a" strokeWidth="2.1" strokeLinecap="round" fill="none" />}
        </svg>
      )
    }

    if (f === 4) {
      // Gold luxury supercar
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="g-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fff3c4" /><stop offset="40%" stopColor="#f5c518" /><stop offset="100%" stopColor="#a16207" /></linearGradient>
            <linearGradient id="g-glass" x1="0.1" y1="0" x2="0.9" y2="1"><stop offset="0%" stopColor="#334155" /><stop offset="100%" stopColor="#020617" /></linearGradient>
            <radialGradient id="g-tyre" cx="0.5" cy="0.4" r="0.65"><stop offset="0%" stopColor="#3b424d" /><stop offset="100%" stopColor="#0b0f14" /></radialGradient>
            <radialGradient id="g-hub" cx="0.5" cy="0.4" r="0.6"><stop offset="0%" stopColor="#fffbeb" /><stop offset="60%" stopColor="#fcd34d" /><stop offset="100%" stopColor="#b45309" /></radialGradient>
          </defs>
          <ellipse cx="66" cy="94" rx="48" ry="5" fill="#78350f" opacity="0.2" style={{ transformOrigin: '66px 94px', animation: 'mascot-shadow 4s ease-in-out infinite' }} />
          <circle cx="40" cy="82" r="12.5" fill="url(#g-tyre)" /><circle cx="40" cy="82" r="5.2" fill="url(#g-hub)" />
          <circle cx="96" cy="82" r="12.5" fill="url(#g-tyre)" /><circle cx="96" cy="82" r="5.2" fill="url(#g-hub)" />
          <rect x="108" y="52" width="18" height="3" rx="1.5" fill="#78350f" /><rect x="110" y="55" width="2.6" height="8" fill="#78350f" /><rect x="123" y="55" width="2.6" height="8" fill="#78350f" />
          <path d="M 8 82 L 10 73 C 10 69 14 67 20 66 L 46 63 L 58 52 L 82 52 L 90 63 L 114 64 C 120 65 124 69 124 75 L 124 82 C 124 84 122 84 119 84 L 13 84 C 9 84 8 83 8 82 Z" fill="url(#g-body)" />
          <path d="M 14 75 L 118 75 L 116 79 L 16 79 Z" fill="#78350f" opacity="0.35" />
          <path d="M 60 54 L 80 54 L 88 63 L 50 63 Z" fill="url(#g-glass)" />
          <path d="M 64 54 L 71 54 L 64 62 L 57 62 Z" fill="#ffffff" opacity="0.16" />
          <path d="M 9 71 L 20 70 L 20 74 L 9 75 Z" fill="#fffbeb" />
          {renderEyes(62, 78, 57.5, 6.2, 3.3)}
          {scared ? <ellipse cx="70" cy="66" rx="2.2" ry="2.8" fill="#0f172a" /> : <path d="M 66 66 Q 70 68 74 65.5" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" fill="none" />}
        </svg>
      )
    }

    if (f === 5) {
      // Ultimate holographic rocket mecha-car
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="x-body" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0f172a" /><stop offset="100%" stopColor="#020617" /></linearGradient>
            <linearGradient id="x-holo" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#f0abfc" /><stop offset="50%" stopColor="#22d3ee" /><stop offset="100%" stopColor="#a3e635" /></linearGradient>
            <linearGradient id="x-canopy" x1="0.1" y1="0" x2="0.9" y2="1"><stop offset="0%" stopColor="#e9d5ff" /><stop offset="100%" stopColor="#7c3aed" /></linearGradient>
            <radialGradient id="x-flame" cx="0.7" cy="0.5" r="0.5"><stop offset="0%" stopColor="#fff7ed" stopOpacity="1" /><stop offset="45%" stopColor="#fb923c" stopOpacity="0.95" /><stop offset="100%" stopColor="#ef4444" stopOpacity="0" /></radialGradient>
            <filter id="x-glow" x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="2.4" /></filter>
          </defs>
          <ellipse cx="66" cy="92" rx="46" ry="4.5" fill="#1e1b4b" opacity="0.25" style={{ transformOrigin: '66px 92px', animation: 'mascot-shadow 4s ease-in-out infinite' }} />
          {/* Rocket flames at the rear (left) */}
          <g style={{ transformOrigin: '14px 64px', animation: 'x-flame 0.18s steps(2) infinite' }}>
            <ellipse cx="6" cy="64" rx="16" ry="6" fill="url(#x-flame)" filter="url(#x-glow)" />
            <ellipse cx="10" cy="64" rx="9" ry="3.5" fill="#fde68a" />
          </g>
          {/* Big swept wings */}
          <path d="M 96 50 L 124 40 L 126 50 L 104 60 Z" fill="#0b1120" stroke="url(#x-holo)" strokeWidth="1.4" />
          <path d="M 96 70 L 124 80 L 126 70 L 104 62 Z" fill="#0b1120" stroke="url(#x-holo)" strokeWidth="1.4" />
          {/* Hover jets */}
          <ellipse cx="44" cy="84" rx="14" ry="5" fill="#22d3ee" opacity="0.5" filter="url(#x-glow)" style={{ animation: 'u-pulse 1s ease-in-out infinite' }} />
          <ellipse cx="84" cy="84" rx="14" ry="5" fill="#a78bfa" opacity="0.5" filter="url(#x-glow)" style={{ animation: 'u-pulse 1s ease-in-out infinite' }} />
          {/* Aerodynamic body */}
          <path d="M 14 66 C 16 52 34 46 64 46 C 96 46 110 52 112 64 C 113 71 108 74 100 74 L 26 74 C 18 74 13 72 14 66 Z" fill="url(#x-body)" stroke="url(#x-holo)" strokeWidth="1.8" />
          {/* Holo racing stripe */}
          <path d="M 22 70 L 104 70" stroke="url(#x-holo)" strokeWidth="2.4" strokeLinecap="round" filter="url(#x-glow)" />
          <path d="M 30 58 C 40 50 56 48 66 48 C 80 48 94 51 100 58" stroke="url(#x-holo)" strokeWidth="1.2" fill="none" opacity="0.8" />
          {/* Canopy */}
          <path d="M 44 50 Q 50 38 64 38 Q 78 38 84 50 Z" fill="url(#x-canopy)" />
          <path d="M 52 49 L 59 40 L 64 40 L 56 49 Z" fill="#ffffff" opacity="0.5" />
          <circle cx="20" cy="61" r="2.4" fill="#22d3ee" filter="url(#x-glow)" />
          <circle cx="106" cy="61" r="2.4" fill="#f0abfc" filter="url(#x-glow)" />
          {renderEyes(57, 73, 50, 6.4, 3.5)}
        </svg>
      )
    }

    // Form 0: cheap tiny beater box car (base)
    return (
      <svg {...svgProps}>
        <defs>
          <linearGradient id="m-body" x1="0" y1="0.05" x2="0" y2="1"><stop offset="0%" stopColor="#ead98f" /><stop offset="45%" stopColor="#c9ab57" /><stop offset="100%" stopColor="#8f7733" /></linearGradient>
          <linearGradient id="m-roof" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f0e6b8" /><stop offset="100%" stopColor="#c4a85e" /></linearGradient>
          <linearGradient id="m-glass" x1="0.1" y1="0" x2="0.9" y2="1"><stop offset="0%" stopColor="#e8edf0" /><stop offset="100%" stopColor="#9fb3bd" /></linearGradient>
          <radialGradient id="m-hub" cx="0.5" cy="0.4" r="0.6"><stop offset="0%" stopColor="#e2e8f0" /><stop offset="60%" stopColor="#a8b2bd" /><stop offset="100%" stopColor="#6b7480" /></radialGradient>
          <radialGradient id="m-tyre" cx="0.5" cy="0.4" r="0.65"><stop offset="0%" stopColor="#3b424d" /><stop offset="100%" stopColor="#0e131a" /></radialGradient>
        </defs>
        <ellipse cx="66" cy="95" rx="30" ry="4" fill="#000000" opacity="0.14" style={{ transformOrigin: '66px 95px', animation: 'mascot-shadow 4s ease-in-out infinite' }} />
        <circle cx="50" cy="82" r="9.5" fill="url(#m-tyre)" /><circle cx="50" cy="82" r="3.8" fill="url(#m-hub)" />
        <circle cx="82" cy="82" r="9.5" fill="url(#m-tyre)" /><circle cx="82" cy="82" r="3.8" fill="url(#m-hub)" />
        {/* boxy little cabin + body */}
        <path d="M 46 53 L 52 40 L 80 40 L 86 53 Z" fill="url(#m-roof)" />
        <rect x="40" y="52" width="52" height="30" rx="6" fill="url(#m-body)" />
        <rect x="53" y="42" width="26" height="11" rx="2" fill="url(#m-glass)" />
        <path d="M 56 42 L 62 42 L 56 52 L 50 52 Z" fill="#ffffff" opacity="0.35" />
        {/* dull bumper + one cheap headlight */}
        <rect x="40" y="74" width="52" height="5" rx="2" fill="#5c4d22" opacity="0.45" />
        <circle cx="89" cy="62" r="2.6" fill="#fde68a" />
        <circle cx="43" cy="62" r="2.4" fill="#fca5a5" opacity="0.8" />
        {renderEyes(57, 75, 62, 7.2, 3.9)}
        {scared ? <ellipse cx="66" cy="71" rx="2.6" ry="3.2" fill="#0f172a" /> : <path d="M 61 70 Q 66 73 71 70" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />}
      </svg>
    )
  }

  return (
    <div ref={containerRef} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-50 select-none will-change-transform">
      <style>{`
        @keyframes mascot-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes mascot-shadow { 0%,100%{transform:scaleX(1);opacity:.18} 50%{transform:scaleX(.8);opacity:.09} }
        @keyframes u-pulse { 0%,100%{opacity:.55;transform:scaleX(.9)} 50%{opacity:1;transform:scaleX(1.12)} }
        @keyframes x-flame { 0%{transform:scaleX(.85) scaleY(1)} 100%{transform:scaleX(1.15) scaleY(.9)} }
        @keyframes act-zoom { 0%{transform:translateX(0) rotate(0)} 30%{transform:translateX(-140vw) rotate(-6deg)} 31%{transform:translateX(140vw) rotate(6deg)} 100%{transform:translateX(0) rotate(0)} }
        @keyframes act-tease { 0%{transform:translateX(0)} 40%{transform:translateX(-160px) rotate(-3deg)} 55%{transform:translateX(-128px) rotate(-2deg)} 100%{transform:translateX(0) rotate(0)} }
        @keyframes act-hop { 0%,100%{transform:translateY(0) scaleY(1)} 18%{transform:translateY(0) scaleY(.86)} 50%{transform:translateY(-32px) scaleY(1.06)} 82%{transform:translateY(0) scaleY(.9)} }
        @keyframes act-wiggle { 0%,100%{transform:rotate(0)} 20%{transform:rotate(-9deg)} 40%{transform:rotate(7deg)} 60%{transform:rotate(-5deg)} 80%{transform:rotate(3deg)} }
        @keyframes act-spin { 0%{transform:rotate(0)} 100%{transform:rotate(360deg)} }
        .act-zoom{animation:act-zoom 1.5s cubic-bezier(.5,0,.2,1) both}
        .act-tease{animation:act-tease 1s cubic-bezier(.34,1.56,.64,1) both}
        .act-hop{animation:act-hop .85s cubic-bezier(.34,1.56,.64,1) both}
        .act-wiggle{animation:act-wiggle .75s ease-in-out both}
        .act-spin{animation:act-spin .85s cubic-bezier(.45,.05,.2,1) both}

        /* clean 3D flip morph (no fragments) */
        .morph{position:absolute;left:0;top:0;width:${CAR_W}px;height:${CAR_H}px;perspective:720px}
        .morph-car{transform-style:preserve-3d;backface-visibility:hidden;animation:morph ${TF_TOTAL}ms cubic-bezier(.5,.05,.25,1) both}
        @keyframes morph {
          0%{transform:rotateY(0deg) scale(1);filter:brightness(1)}
          44%{transform:rotateY(88deg) scale(.82);filter:brightness(2) drop-shadow(0 0 8px rgba(125,211,252,.9))}
          56%{transform:rotateY(-88deg) scale(.82);filter:brightness(2) drop-shadow(0 0 8px rgba(244,114,182,.9))}
          100%{transform:rotateY(0deg) scale(1);filter:brightness(1)}
        }

        /* burst FX centered on the car */
        .tf-fx{position:absolute;left:50%;top:50%;width:0;height:0;pointer-events:none;z-index:2}
        .tf-flash{position:absolute;left:0;top:0;width:130px;height:130px;margin:-65px 0 0 -65px;border-radius:50%;
          background:radial-gradient(circle,#ffffff 0%,rgba(165,243,252,.7) 35%,transparent 70%);
          animation:tf-flash ${TF_TOTAL}ms ease-out both}
        @keyframes tf-flash{0%,40%{opacity:0;transform:scale(.3)}50%{opacity:.95}74%,100%{opacity:0;transform:scale(1.7)}}
        .tf-ring{position:absolute;left:0;top:0;width:24px;height:24px;margin:-12px 0 0 -12px;border-radius:50%;
          border:3px solid #e0f2fe;box-shadow:0 0 12px rgba(125,211,252,.9);
          animation:tf-ring ${TF_TOTAL}ms cubic-bezier(.2,.7,.3,1) both}
        @keyframes tf-ring{0%,40%{opacity:0;transform:scale(.2)}50%{opacity:.95}100%{opacity:0;transform:scale(6.5)}}
        .tf-ring.two{animation-delay:120ms;border-color:#f5d0fe}
        .spark{position:absolute;left:0;top:0;width:5px;height:5px;margin:-2.5px 0 0 -2.5px;border-radius:50%;
          animation:spark ${TF_TOTAL}ms ease-out both}
        @keyframes spark{0%,40%{opacity:0;transform:translate(0,0) scale(1)}50%{opacity:1}100%{opacity:0;transform:translate(var(--sx),var(--sy)) scale(.2)}}
        @media (prefers-reduced-motion: reduce){ .mascot-float-layer{animation:none!important} }
      `}</style>

      <div className={action ? `act-${action}` : undefined}>
        <div className="mascot-float-layer" style={{ animation: 'mascot-float 4s ease-in-out infinite', position: 'relative' }}>
          {transforming ? (
            <div className="morph">
              <div className="morph-car">{renderCar(form)}</div>
              <div className="tf-fx">
                <div className="tf-flash" />
                <div className="tf-ring" />
                <div className="tf-ring two" />
                {SPARKS.map((s, i) => (
                  <div
                    key={i}
                    className="spark"
                    style={{ background: s.color, boxShadow: `0 0 7px ${s.color}`, animationDelay: `${s.delay}ms`, ['--sx' as string]: `${s.sx}px`, ['--sy' as string]: `${s.sy}px` } as CSSProperties}
                  />
                ))}
              </div>
            </div>
          ) : (
            renderCar(form)
          )}
        </div>
      </div>
    </div>
  )
}
