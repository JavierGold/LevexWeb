export default function ServiceIcon({ name }) {
  if (name === 'calendar') {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M8 4v5M24 4v5M5 12h22M7 7h18a2 2 0 0 1 2 2v17H5V9a2 2 0 0 1 2-2Z" />
        <path d="m11 19 3 3 7-7" />
      </svg>
    )
  }

  if (name === 'equipment') {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="9" cy="25" r="3" />
        <circle cx="23" cy="25" r="3" />
        <path d="M6 22h20M10 21l5-7h5l4 7M15 14V8h8M23 8l3 3M8 8h4v4H8z" />
      </svg>
    )
  }

  if (name === 'delivery') {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M3 8h17v16H3zM20 13h5l4 5v6h-9z" />
        <circle cx="9" cy="25" r="3" />
        <circle cx="24" cy="25" r="3" />
        <path d="M23 13v6h6" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M6 6h20v15H14l-6 5v-5H6z" />
      <path d="M11 12h10M11 16h7" />
    </svg>
  )
}
