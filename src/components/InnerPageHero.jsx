import AccentText from './AccentText'

function InnerPageHero({ variant, eyebrow, title, description, children, meta = [] }) {
  return (
    <section className={`inner-hero inner-hero--${variant}`}>
      <div className="inner-hero-grid" aria-hidden="true" />
      <div className="inner-hero-orbit inner-hero-orbit--one" aria-hidden="true" />
      <div className="inner-hero-orbit inner-hero-orbit--two" aria-hidden="true" />

      <div className="container inner-hero-layout">
        <div className="inner-hero-copy">
          <h1 className="inner-hero-title reveal-up active" style={{ transitionDelay: '0.08s' }}>
            {title.map((part, index) => (
              <span key={`${part.text}-${index}`} className={part.accent ? 'accent' : ''}>{part.text}</span>
            ))}
          </h1>
          <p className="inner-hero-description reveal-up active" style={{ transitionDelay: '0.16s' }}>
            <AccentText parts={description} />
          </p>
          {meta.length > 0 && (
            <div className="inner-hero-meta reveal-up active" style={{ transitionDelay: '0.22s' }}>
              {meta.map((item) => <span key={item}>{item}</span>)}
            </div>
          )}
        </div>

        <div className="inner-hero-stage reveal-scale active" style={{ transitionDelay: '0.12s' }}>
          {children}
        </div>
      </div>
    </section>
  )
}

export default InnerPageHero
