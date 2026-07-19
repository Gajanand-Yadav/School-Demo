import { useEffect, useState } from 'react'
import { LayoutGroup, motion } from 'motion/react'
import './App.css'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'programs', label: 'Academics' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'campus', label: 'Campus' },
  { id: 'tour', label: 'Campus Tour' },
  { id: 'contact', label: 'Contact' },
]

const programs = [
  {
    title: 'Early Years',
    text: 'Play-based discovery, stories, music and nature walks for joyful foundations.',
    icon: '✦',
    image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Primary School',
    text: 'Curious classrooms where literacy, math, arts and STEM grow together.',
    icon: '✎',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Middle School',
    text: 'Project learning, leadership clubs and mentoring for confident learners.',
    icon: '✺',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=900&q=80',
  },
]

const stats = [
  ['18:1', 'Student teacher ratio'],
  ['42+', 'Creative clubs'],
  ['96%', 'Parent satisfaction'],
]

const achievements = [
  {
    number: '28',
    label: 'State-level medals',
    text: 'Students shine in debate, robotics, arts and athletics.',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80',
  },
  {
    number: '12',
    label: 'Innovation awards',
    text: 'Young makers solve local problems through annual STEM showcases.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80',
  },
  {
    number: '100%',
    label: 'Portfolio growth',
    text: 'Every learner builds a creative academic portfolio each year.',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80',
  },
]

const tourStops = [
  {
    title: 'Library Grove',
    text: 'Quiet reading corners and storytelling circles under warm skylights.',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Makers Lab',
    text: 'Robotics tables, design walls and safe tools for hands-on invention.',
    image: 'https://images.unsplash.com/photo-1581091870622-7c7d0c0f4432?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Sports Lawn',
    text: 'Open green space for games, yoga, athletics and outdoor assemblies.',
    image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=900&q=80',
  },
]

function App() {
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [pageFlip, setPageFlip] = useState({ active: false, direction: 'down', key: 0 })

  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal')
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.16 },
    )

    revealItems.forEach((item) => revealObserver.observe(item))

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px' },
    )

    navItems.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) sectionObserver.observe(section)
    })

    return () => {
      revealObserver.disconnect()
      sectionObserver.disconnect()
    }
  }, [])

  const moveToSection = (id) => {
    const currentIndex = navItems.findIndex((item) => item.id === active)
    const nextIndex = navItems.findIndex((item) => item.id === id)
    const direction = nextIndex > currentIndex ? 'up' : 'down'

    setMenuOpen(false)
    setActive(id)
    setPageFlip((flip) => ({ active: true, direction, key: flip.key + 1 }))

    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 260)

    window.setTimeout(() => {
      setPageFlip((flip) => ({ ...flip, active: false }))
    }, 900)
  }

  return (
    <>
      {pageFlip.active && (
        <div className="page-turn" aria-hidden="true">
          <motion.div
            key={pageFlip.key}
            className={`page-sheet ${pageFlip.direction}`}
            initial={{ opacity: 0, rotateY: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              rotateY: pageFlip.direction === 'down' ? [0, 0, -112, -112] : [0, 0, 112, 112],
            }}
            transition={{ duration: 0.86, times: [0, 0.16, 0.72, 1], ease: [0.76, 0, 0.24, 1] }}
          />
        </div>
      )}

      <nav className="navbar">
        <button className="brand" onClick={() => moveToSection('home')} aria-label="Go to home">
          <span>Bloom</span> Academy
        </button>

        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span />
          <span />
        </button>

        <LayoutGroup id="main-navigation">
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {navItems.map((item) => {
              const isActive = active === item.id

              return (
                <motion.button
                  key={item.id}
                  className={isActive ? 'active' : ''}
                  onClick={() => moveToSection(item.id)}
                  whileHover={{ y: -3, scale: 1.04 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                >
                  {isActive && (
                    <motion.span
                      className="active-pill"
                      layoutId="active-nav-pill"
                      transition={{ type: 'spring', stiffness: 520, damping: 34 }}
                    />
                  )}
                  <span className="nav-label">{item.label}</span>
                </motion.button>
              )
            })}
          </div>
        </LayoutGroup>
      </nav>

      <main>
        <section id="home" className="hero section">
          <div className="hero-copy reveal visible">
            <p className="eyebrow">Independent day school • Est. 1998</p>
            <h1>Where curious minds learn, create and bloom.</h1>
            <p>
              A warm one-page school experience with inspiring academics, beautiful spaces,
              and a community that helps every child feel seen.
            </p>
            <div className="hero-actions">
              <button onClick={() => moveToSection('programs')}>Explore Programs</button>
              <button className="ghost" onClick={() => moveToSection('contact')}>Book a Visit</button>
            </div>
          </div>

          <div className="hero-art reveal visible" aria-hidden="true">
            <div className="sun" />
            <div className="photo-card main-card">
              <span>Creative Arts</span>
            </div>
            <div className="photo-card small-card">
              <strong>A+</strong>
              <span>STEM Lab</span>
            </div>
            <div className="floating-note">Admissions open 2026</div>
          </div>
        </section>

        <section id="about" className="section about">
          <div className="section-heading reveal">
            <p className="eyebrow">Our philosophy</p>
            <h2>Learning feels brighter when school feels like belonging.</h2>
          </div>
          <div className="about-grid">
            <div className="about-card reveal">
              <h3>Kind classrooms</h3>
              <p>Small groups, caring mentors and social-emotional learning are built into each day.</p>
            </div>
            <div className="about-card reveal delay-1">
              <h3>Hands-on discovery</h3>
              <p>Students build gardens, launch prototypes, perform plays and solve real problems.</p>
            </div>
            <div className="about-card reveal delay-2">
              <h3>Future ready</h3>
              <p>Digital literacy, collaboration and public speaking help learners find their voice.</p>
            </div>
          </div>
        </section>

        <section id="programs" className="section programs">
          <div className="section-heading reveal">
            <p className="eyebrow">Academics</p>
            <h2>Programs designed for every stage of growth.</h2>
          </div>
          <div className="program-list">
            {programs.map((program, index) => (
              <article className={`program-card reveal delay-${index}`} key={program.title}>
                <div className="program-photo">
                  <img src={program.image} alt={`${program.title} classroom`} />
                  <span className="program-icon">{program.icon}</span>
                </div>
                <h3>{program.title}</h3>
                <p>{program.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="achievements" className="section achievements">
          <div className="section-heading reveal">
            <p className="eyebrow">Achievements</p>
            <h2>Big wins by bright young learners.</h2>
          </div>
          <div className="achievement-grid">
            {achievements.map((item, index) => (
              <article className={`achievement-card reveal delay-${index}`} key={item.label}>
                <img src={item.image} alt={item.label} />
                <div className="achievement-content">
                  <strong>{item.number}</strong>
                  <h3>{item.label}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="campus" className="section campus">
          <div className="campus-panel reveal">
            <div>
              <p className="eyebrow">Life on campus</p>
              <h2>A peaceful campus made for imagination.</h2>
              <p>
                Sunny studios, library corners, sports lawns and outdoor learning pods create a
                rhythm of focus, movement and wonder.
              </p>
            </div>
            <div className="campus-gallery" aria-label="Campus photo gallery">
              <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80" alt="Main school building and walkway" />
              <img src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=900&q=80" alt="Library study area" />
              <img src="https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=900&q=80" alt="Students playing on campus lawn" />
            </div>
            <div className="stats">
              {stats.map(([number, label]) => (
                <div key={label}>
                  <strong>{number}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="tour" className="section tour">
          <div className="tour-copy reveal">
            <p className="eyebrow">Campus tour</p>
            <h2>Walk through the spaces where learning comes alive.</h2>
            <p>
              From calm reading nooks to energetic play fields, each stop is designed to help
              students explore, collaborate and feel at home.
            </p>
            <button onClick={() => moveToSection('contact')}>Schedule Guided Tour</button>
          </div>
          <div className="tour-map reveal delay-1">
            {tourStops.map((stop, index) => (
              <div className="tour-stop" key={stop.title}>
                <img src={stop.image} alt={stop.title} />
                <span>{index + 1}</span>
                <div>
                  <h3>{stop.title}</h3>
                  <p>{stop.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="contact-card reveal">
            <p className="eyebrow">Visit us</p>
            <h2>Ready to start your Bloom Academy journey?</h2>
            <p>Schedule a tour, meet our teachers and see our classrooms in action.</p>
            <form>
              <input type="text" placeholder="Parent name" aria-label="Parent name" />
              <input type="email" placeholder="Email address" aria-label="Email address" />
              <button type="submit">Request a Tour</button>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
