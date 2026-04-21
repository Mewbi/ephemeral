import { Link } from 'react-router-dom'

export default function Project() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <p
        style={{
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-muted)',
          marginBottom: '1rem',
        }}
      >
        Coming soon
      </p>
      <Link
        to="/"
        style={{
          fontSize: '0.7rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--color-muted)',
        }}
      >
        ← Back
      </Link>
    </div>
  )
}
