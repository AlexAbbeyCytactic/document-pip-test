import { useState, useRef, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import PopupOverlay from './components/popups/PopupOverlay'
import BrowserPopup from './components/popups/BrowserPopup'
import ChatPopup from './components/popups/ChatPopup'
import CloudPopup from './components/popups/CloudPopup'
import ExplorerPopup from './components/popups/ExplorerPopup'
import MobilePopup from './components/popups/MobilePopup'
import SiemPopup from './components/popups/SiemPopup'
import TerminalPopup from './components/popups/TerminalPopup'
import NewsPopup from './components/popups/NewsPopup'
import PipContent from './components/PipContent'

function App() {
  const [activePopup, setActivePopup] = useState(null)

  // PiP State
  const [isPipOpen, setIsPipOpen] = useState(false)
  const pipWindow = useRef(null)
  const pipRoot = useRef(null)

  // Check if Document PiP API is supported
  const isPipSupported = 'documentPictureInPicture' in window

  // Copy all styles from main document to PiP window
  const copyStylesToPip = (pipWin) => {
    // Method 1: Clone all stylesheet links and style tags
    ;[...document.querySelectorAll('link[rel="stylesheet"], style')]
      .forEach((styleElement) => {
        pipWin.document.head.appendChild(styleElement.cloneNode(true))
      })

      // Method 2: Extract CSS rules for dynamically injected styles
      ;[...document.styleSheets].forEach((styleSheet) => {
        try {
          const cssRules = [...styleSheet.cssRules]
            .map((rule) => rule.cssText)
            .join('')
          const style = pipWin.document.createElement('style')
          style.textContent = cssRules
          pipWin.document.head.appendChild(style)
        } catch (e) {
          // Handle CORS-protected stylesheets
          if (styleSheet.href) {
            const link = pipWin.document.createElement('link')
            link.rel = 'stylesheet'
            link.type = 'text/css'
            link.href = styleSheet.href
            pipWin.document.head.appendChild(link)
          }
        }
      })
  }

  // Open Picture-in-Picture window
  const openPipWindow = async () => {
    // Check if PiP window already exists
    if (window.documentPictureInPicture.window) {
      console.log('PiP window already open')
      return
    }

    try {
      // Request PiP window with specified dimensions and options
      const pipWin = await window.documentPictureInPicture.requestWindow({
        width: 450,
        height: 700,
        disallowReturnToOpener: true,
        preferInitialWindowPlacement: true,
      })

      // Copy styles to PiP window
      copyStylesToPip(pipWin)

      // Create container for React content
      const pipDiv = pipWin.document.createElement('div')
      pipDiv.setAttribute('id', 'pip-root')
      pipWin.document.body.append(pipDiv)

      // Create React root and render PiP content
      const root = createRoot(pipDiv)
      root.render(<PipContent />)

      // Store references
      pipWindow.current = pipWin
      pipRoot.current = root
      setIsPipOpen(true)

      // Handle PiP window close
      pipWin.addEventListener('pagehide', handlePipClose)

      console.log('PiP window opened successfully')
    } catch (error) {
      console.error('Failed to open PiP window:', error)
    }
  }

  // Clean up when PiP window closes
  const handlePipClose = () => {
    if (pipRoot.current) {
      pipRoot.current.unmount()
      pipRoot.current = null
    }
    pipWindow.current = null
    setIsPipOpen(false)
    console.log('PiP window closed')
  }

  // Close PiP window programmatically
  const closePipWindow = () => {
    if (window.documentPictureInPicture.window) {
      window.documentPictureInPicture.window.close()
    }
  }

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (pipWindow.current) {
        pipWindow.current.close()
      }
      if (pipRoot.current) {
        pipRoot.current.unmount()
      }
    }
  }, [])


  const renderPopupContent = () => {
    const handleClose = () => setActivePopup(null)
    switch (activePopup) {
      case 'browser': return <BrowserPopup onClose={handleClose} />
      case 'news': return <NewsPopup onClose={handleClose} />
      case 'chat': return <ChatPopup onClose={handleClose} />
      case 'cloud': return <CloudPopup onClose={handleClose} />
      case 'explorer': return <ExplorerPopup onClose={handleClose} />
      case 'mobile': return <MobilePopup onClose={handleClose} />
      case 'siem': return <SiemPopup onClose={handleClose} />
      case 'terminal': return <TerminalPopup onClose={handleClose} />
      default: return null
    }
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Content Box Templates Demo</h1>
        <p className="description">
          Click the buttons below to open the demo content box templates.
        </p>

        <div className="controls" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '30px' }}>
          <button className="button primary" onClick={() => setActivePopup('browser')}>Browser</button>
          <button className="button primary" onClick={() => setActivePopup('news')}>News Article</button>
          <button className="button primary" onClick={() => setActivePopup('chat')}>Chat</button>
          <button className="button primary" onClick={() => setActivePopup('cloud')}>Cloud</button>
          <button className="button primary" onClick={() => setActivePopup('explorer')}>Explorer</button>
          <button className="button primary" onClick={() => setActivePopup('mobile')}>Mobile</button>
          <button className="button primary" onClick={() => setActivePopup('siem')}>SIEM</button>
          <button className="button primary" onClick={() => setActivePopup('terminal')}>Terminal</button>
        </div>

        <hr style={{ margin: '30px 0', border: '0', borderTop: '1px solid #eee' }} />

        <div className="pip-section">
          <h2>Document Picture-in-Picture</h2>
          <p className="description">
            Open the new Moderator Guidance design in a floating window.
          </p>

          {!isPipSupported && (
            <div className="warning">
              <strong>Warning:</strong> Document Picture-in-Picture API is not supported in this browser.
            </div>
          )}

          <div className="controls" style={{ justifyContent: 'center' }}>
            <button
              className="button secondary"
              onClick={openPipWindow}
              disabled={!isPipSupported || isPipOpen}
            >
              Open Moderator Guidance
            </button>

            <button
              className="button secondary"
              onClick={closePipWindow}
              disabled={!isPipOpen}
            >
              Close Moderator Guidance
            </button>
          </div>

          <div className="status" style={{ marginTop: '20px' }}>
            <div className="status-item">
              <strong>PiP Status:</strong>
              <span className={isPipOpen ? 'status-badge open' : 'status-badge closed'}>
                {isPipOpen ? 'Open' : 'Closed'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <PopupOverlay isOpen={!!activePopup} onClose={() => setActivePopup(null)}>
        {renderPopupContent()}
      </PopupOverlay>
    </div>
  )
}

export default App
