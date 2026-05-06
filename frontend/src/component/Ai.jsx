import React, { useContext, useState, useRef, useEffect } from 'react'
import ai from "../assets/ai.png"
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import open from "../assets/open.mp3"

function Ai() {
  let { showSearch, setShowSearch } = useContext(shopDataContext)
  let navigate = useNavigate()
  let [activeAi, setActiveAi] = useState(false)

  const recognitionRef = useRef(null)
  const isListeningRef = useRef(false)
  const tapCountRef = useRef(0)
  const tapTimerRef = useRef(null)

  function speak(message) {
    window.speechSynthesis.cancel()
    let utterance = new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      console.warn("Speech Recognition is not supported in this browser.")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = false
    recognition.lang = 'en-US'
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      isListeningRef.current = true
      setActiveAi(true)
    }

    recognition.onresult = (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim().toLowerCase()
      console.log("Heard:", transcript)

      try { recognition.stop() } catch (err) { }

      // ─── GREETINGS (must be before any short word checks) ──────────
      if (transcript.includes("hello") || transcript.includes("hi") || transcript.includes("hey")) {
        speak("Hello! How can I help you? Say help to hear all commands.")
      }
      else if (transcript.includes("thank")) {
        speak("You are welcome!")
      }

      // ─── HELP (must be before "scroll up" since help contains 'p') ─
      else if (transcript.includes("help") || transcript.includes("what can you do") || transcript.includes("commands")) {
        speak("You can say: open home, open cart, open collection, open about, open contact, open orders, open search, close search, checkout, go back, go forward, scroll down, scroll up, go to top, go to bottom, zoom in, zoom out, reset zoom, dark mode, light mode, refresh, print, stop, or thanks.")
      }

      // ─── STOP SPEAKING ─────────────────────────────────────────────
      else if (transcript.includes("stop") || transcript.includes("quiet") || transcript.includes("silence")) {
        window.speechSynthesis.cancel()
      }

      // ─── SEARCH (before navigation so "open search" doesn't hit "open home") 
      else if (transcript.includes("open search") || transcript.includes("search open")) {
        speak("Opening search")
        setShowSearch(true)
        navigate("/collection")
      }
      else if (transcript.includes("close search") || transcript.includes("search close")) {
        speak("Closing search")
        setShowSearch(false)
      }

      // ─── PAGE NAVIGATION ───────────────────────────────────────────
      else if (transcript.includes("home")) {
        speak("Opening home page")
        navigate("/")
        setShowSearch(false)
      }
      else if (transcript.includes("collection") || transcript.includes("product") || transcript.includes("shop")) {
        speak("Opening collection page")
        navigate("/collection")
      }
      else if (transcript.includes("about")) {
        speak("Opening about page")
        navigate("/about")
        setShowSearch(false)
      }
      else if (transcript.includes("contact")) {
        speak("Opening contact page")
        navigate("/contact")
        setShowSearch(false)
      }
      else if (transcript.includes("my order") || transcript.includes("my orders") || transcript.includes("orders")) {
        speak("Opening your orders")
        navigate("/order")
        setShowSearch(false)
      }
      else if (transcript.includes("cart")) {
        speak("Opening your cart")
        navigate("/cart")
        setShowSearch(false)
      }
      else if (transcript.includes("login") || transcript.includes("sign in")) {
        speak("Opening login page")
        navigate("/login")
        setShowSearch(false)
      }
      else if (
        transcript.includes("checkout") ||
        transcript.includes("check out") ||
        transcript.includes("buy now") ||
        transcript.includes("proceed")
      ) {
        speak("Proceeding to checkout")
        navigate("/place-order")
        setShowSearch(false)
      }

      // ─── NAVIGATION HISTORY ────────────────────────────────────────
      else if (transcript.includes("go back") || transcript.includes("go backward")) {
        speak("Going back")
        navigate(-1)
      }
      else if (transcript.includes("go forward")) {
        speak("Going forward")
        navigate(1)
      }

      // ─── SCROLL (generic "up/down" last so they don't steal other commands) ──
      else if (transcript.includes("go to top") || transcript.includes("top of page") || transcript === "top") {
        speak("Going to top")
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      else if (transcript.includes("go to bottom") || transcript.includes("bottom of page") || transcript === "bottom") {
        speak("Going to bottom")
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
      }
      else if (transcript.includes("scroll down") || transcript.includes("page down") || transcript === "down") {
        speak("Scrolling down")
        window.scrollBy({ top: 400, behavior: 'smooth' })
      }
      else if (transcript.includes("scroll up") || transcript.includes("page up") || transcript === "up") {
        speak("Scrolling up")
        window.scrollBy({ top: -400, behavior: 'smooth' })
      }

      // ─── ZOOM ──────────────────────────────────────────────────────
      else if (transcript.includes("zoom in") || transcript.includes("increase zoom")) {
        speak("Zooming in")
        document.body.style.zoom = (parseFloat(document.body.style.zoom || 1) + 0.1).toFixed(1)
      }
      else if (transcript.includes("zoom out") || transcript.includes("decrease zoom")) {
        speak("Zooming out")
        document.body.style.zoom = Math.max(0.5, (parseFloat(document.body.style.zoom || 1) - 0.1)).toFixed(1)
      }
      else if (transcript.includes("reset zoom") || transcript.includes("normal zoom")) {
        speak("Zoom reset")
        document.body.style.zoom = 1
      }

      // ─── PAGE ACTIONS ──────────────────────────────────────────────
      else if (transcript.includes("refresh") || transcript.includes("reload")) {
        speak("Refreshing page")
        window.location.reload()
      }
      else if (transcript.includes("print")) {
        speak("Opening print dialog")
        window.print()
      }

      // ─── DARK / LIGHT MODE ─────────────────────────────────────────
      else if (transcript.includes("dark mode") || transcript.includes("dark theme")) {
        speak("Switching to dark mode")
        document.documentElement.classList.add("dark")
        localStorage.setItem("theme", "dark")
      }
      else if (transcript.includes("light mode") || transcript.includes("light theme")) {
        speak("Switching to light mode")
        document.documentElement.classList.remove("dark")
        localStorage.setItem("theme", "light")
      }

      // ─── UNRECOGNISED ──────────────────────────────────────────────
      else {
        toast.error("Command not recognised. Say help to hear all commands.")
      }
    }

    recognition.onend = () => {
      isListeningRef.current = false
      setActiveAi(false)
    }

    recognition.onerror = (e) => {
      console.error("Speech recognition error code:", e.error)
      isListeningRef.current = false
      setActiveAi(false)

      if (e.error === 'not-allowed') {
        toast.error("Microphone access denied.")
      } else if (e.error === 'no-speech') {
        toast.error("No speech detected. Try again.")
      } else if (e.error === 'network') {
        toast.error("Network error. Check your internet connection.")
      } else if (e.error === 'aborted') {
        // silently ignore
      } else {
        toast.error(`Error: ${e.error}`)
      }
    }

    recognitionRef.current = recognition

    return () => {
      recognition.abort()
    }
  }, [])

  function handleTap() {
    tapCountRef.current += 1

    if (tapCountRef.current === 2) {
      clearTimeout(tapTimerRef.current)
      tapCountRef.current = 0

      if (!recognitionRef.current) {
        toast.error("Speech recognition not supported in this browser.")
        return
      }

      if (isListeningRef.current) {
        recognitionRef.current.stop()
      } else {
        try {
          const openingSound = new Audio(open)
          openingSound.play()
          recognitionRef.current.start()
        } catch (err) {
          console.error("Failed to start recognition:", err)
          isListeningRef.current = false
          setActiveAi(false)
        }
      }
    } else {
      tapTimerRef.current = setTimeout(() => {
        tapCountRef.current = 0
      }, 300)
    }
  }

  return (
    <div
      className='fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%]'
      onClick={handleTap}
    >
      <img
        src={ai}
        alt="Voice Assistant"
        className={`w-[100px] cursor-pointer transition-transform ${activeAi
          ? 'translate-x-[10%] translate-y-[-10%] scale-125'
          : 'translate-x-[0] translate-y-[0] scale-100'
          }`}
        style={{
          filter: activeAi
            ? "drop-shadow(0px 0px 30px #00d2fc)"
            : "drop-shadow(0px 0px 20px black)"
        }}
      />
      {activeAi && (
        <p className="text-xs text-center mt-1 text-blue-400 animate-pulse">
          Listening...
        </p>
      )}
    </div>
  )
}

export default Ai
