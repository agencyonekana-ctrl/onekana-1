function AccentText({ parts, className = '' }) {
  return (
    <span className={className}>
      {parts.map((part, index) => {
        const value = typeof part === 'string' ? part : part.text
        const accent = typeof part === 'object' && part.accent

        return accent ? (
          <strong key={`${value}-${index}`} className="accent-copy">{value}</strong>
        ) : (
          <span key={`${value}-${index}`}>{value}</span>
        )
      })}
    </span>
  )
}

export default AccentText
