import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

// --- Smooth Scroll (Lenis) ---
let lenis; // Make lenis accessible globally within module scope

const initSmoothScroll = () => {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
  })

  // Sync Lenis with ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  // Scroll Progress Bar
  lenis.on('scroll', ({ scroll, limit }) => {
    const progress = scroll / limit
    const progressBar = document.getElementById('scroll-progress')
    if (progressBar) {
      progressBar.style.width = `${progress * 100}%`
    }
  })
}

// --- Three.js Background ---
const initThreeJS = () => {
  const container = document.getElementById('canvas-container')
  if (!container) return

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.appendChild(renderer.domElement)

  // Particles - Cyber Green Matrix Effect
  const particlesGeometry = new THREE.BufferGeometry()
  const count = 1500
  const positions = new Float32Array(count * 3)
  
  for(let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 15
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.03,
    sizeAttenuation: true,
    color: '#00ff41',
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  })

  const particles = new THREE.Points(particlesGeometry, particlesMaterial)
  scene.add(particles)

  camera.position.z = 4

  // Mouse interaction
  let mouseX = 0
  let mouseY = 0
  
  window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX / window.innerWidth - 0.5
    mouseY = event.clientY / window.innerHeight - 0.5
  })

  // Animation Loop
  const clock = new THREE.Clock()

  const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const scrollY = window.scrollY

    // Rotate particles slowly + scroll influence
    particles.rotation.y = elapsedTime * 0.05 + scrollY * 0.0002
    particles.rotation.x = scrollY * 0.0002 // Tilt on scroll
    
    // Move camera slightly based on scroll for parallax depth
    camera.position.y = -scrollY * 0.001

    // Mouse parallax (dampened)
    const targetX = mouseX * 0.5
    const targetY = mouseY * 0.5
    
    particles.rotation.x += 0.05 * (targetY - particles.rotation.x)
    particles.rotation.y += 0.05 * (targetX - particles.rotation.y)

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
  }

  tick()

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })
}

// --- GSAP Animations ---
const initAnimations = () => {
  // Reveal Text with 3D Effect
  const revealElements = document.querySelectorAll('.reveal-text')
  
  revealElements.forEach(element => {
    gsap.fromTo(element, 
      { 
        y: 100, 
        opacity: 0,
        rotationX: 45,
        transformOrigin: "0% 50% -100",
        filter: "blur(10px)"
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  })

  // Parallax for Project Cards
  const projectCards = document.querySelectorAll('#projects .group')
  projectCards.forEach((card, i) => {
    gsap.to(card, {
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: card,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    })
  })

  // Hero Image Parallax
  const heroImg = document.querySelector('img[alt="Rakesh Ranjan Pradhan"]')
  if (heroImg) {
    gsap.to(heroImg, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: heroImg,
        start: 'top center',
        end: 'bottom top',
        scrub: true
      }
    })
  }
}

// --- Contact Modal Logic ---
const initContactModal = () => {
  const modal = document.getElementById('contact-modal')
  const btn = document.getElementById('contact-btn')
  const closeBtn = document.getElementById('close-modal')
  const backdrop = document.getElementById('modal-backdrop')
  const content = document.getElementById('modal-content')
  const form = document.getElementById('contact-form')
  const successMsg = document.getElementById('success-message')

  if (!modal || !btn) return

  const openModal = () => {
    modal.classList.remove('hidden')
    // Small delay to allow display:block to apply before transition
    setTimeout(() => {
      content.classList.remove('scale-95', 'opacity-0')
      content.classList.add('scale-100', 'opacity-100')
    }, 10)
  }

  const closeModal = () => {
    content.classList.remove('scale-100', 'opacity-100')
    content.classList.add('scale-95', 'opacity-0')
    setTimeout(() => {
      modal.classList.add('hidden')
      // Reset form state if needed
      if (successMsg.classList.contains('hidden') === false) {
        setTimeout(() => {
          form.reset()
          form.style.display = 'block'
          successMsg.classList.add('hidden')
        }, 300)
      }
    }, 300)
  }

  btn.addEventListener('click', openModal)
  closeBtn.addEventListener('click', closeModal)
  backdrop.addEventListener('click', closeModal)

  // Handle Form Submission
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault()
      const submitBtn = form.querySelector('button[type="submit"]')
      const originalText = submitBtn.innerHTML
      
      // Loading State
      submitBtn.disabled = true
      submitBtn.innerHTML = '<span class="animate-pulse">TRANSMITTING...</span>'

      const formData = new FormData(form)
      
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        })
        
        if (response.ok) {
          // Success Animation
          form.style.display = 'none'
          successMsg.classList.remove('hidden')
          submitBtn.innerHTML = originalText
          submitBtn.disabled = false
          
          // Auto close after 5 seconds
          setTimeout(closeModal, 5000)
        } else {
          throw new Error('Transmission Failed')
        }
      } catch (error) {
        alert('Transmission Failed. Please try again or use direct comms.')
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
      }
    })
  }
}

// --- Navbar Scroll Logic ---
const initNavbarScroll = () => {
  const navbar = document.getElementById('navbar')
  if (!navbar) return

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.remove('p-6', 'mix-blend-difference')
      navbar.classList.add('p-4', 'bg-black/90', 'backdrop-blur-md', 'border-b', 'border-cyber-green/20', 'shadow-[0_0_20px_rgba(0,255,65,0.1)]')
    } else {
      navbar.classList.add('p-6', 'mix-blend-difference')
      navbar.classList.remove('p-4', 'bg-black/90', 'backdrop-blur-md', 'border-b', 'border-cyber-green/20', 'shadow-[0_0_20px_rgba(0,255,65,0.1)]')
    }
  })
}

// --- Mobile Menu Logic ---
const initMobileMenu = () => {
  const btn = document.getElementById('mobile-menu-btn')
  const menu = document.getElementById('mobile-menu')
  const links = document.querySelectorAll('.mobile-link')
  const icon = btn?.querySelector('i')

  if (!btn || !menu) return

  const toggleMenu = () => {
    menu.classList.toggle('translate-x-full')
    
    // Toggle Icon
    if (menu.classList.contains('translate-x-full')) {
      icon.classList.remove('bx-x')
      icon.classList.add('bx-menu')
      document.body.style.overflow = '' // Enable scroll
    } else {
      icon.classList.remove('bx-menu')
      icon.classList.add('bx-x')
      document.body.style.overflow = 'hidden' // Disable scroll
    }
  }

  btn.addEventListener('click', toggleMenu)

  links.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu()
    })
  })
}

// --- Scroll Indicator Logic ---
const initScrollIndicator = () => {
  const indicator = document.getElementById('scroll-indicator')
  if (!indicator) return

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      indicator.style.opacity = '0'
    } else {
      indicator.style.opacity = '1'
    }
  })
}

// --- Back to Top Logic ---
const initBackToTop = () => {
  const desktopBtn = document.getElementById('back-to-top')
  const mobileBtn = document.getElementById('back-to-top-mobile')
  
  const toggleBtn = (btn) => {
    if (!btn) return
    if (window.scrollY > 500) {
      btn.classList.remove('translate-y-20', 'opacity-0')
    } else {
      btn.classList.add('translate-y-20', 'opacity-0')
    }
  }

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  window.addEventListener('scroll', () => {
    toggleBtn(desktopBtn)
    toggleBtn(mobileBtn)
  })

  if (desktopBtn) desktopBtn.addEventListener('click', scrollToTop)
  if (mobileBtn) mobileBtn.addEventListener('click', scrollToTop)
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll()
  initThreeJS()
  initAnimations()
  initContactModal()
  initNavbarScroll()
  initMobileMenu()
  initScrollIndicator()
  initBackToTop()
})

// Hide Loader on Load
window.addEventListener('load', () => {
  const loader = document.getElementById('loader-wrapper')
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0'
      setTimeout(() => {
        loader.style.display = 'none'
      }, 500)
    }, 1000) // Minimum 1s display time for effect
  }
})
