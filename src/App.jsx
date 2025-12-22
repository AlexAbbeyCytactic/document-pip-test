import { useState, useRef, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import PipContent from './components/PipContent'
import ColorPicker from './components/ColorPicker'
import './App.css'

// Define colors array to be used by both main and PiP windows
const COLORS = [
  { name: 'White', value: '#ffffff' },
  { name: 'Blue', value: '#e3f2fd' },
  { name: 'Orange', value: '#fff3e0' },
  { name: 'Purple', value: '#f3e5f5' },
  { name: 'Green', value: '#e8f5e9' },
  { name: 'Pink', value: '#fce4ec' },
  { name: 'Yellow', value: '#fffde7' },
  { name: 'Cyan', value: '#e0f7fa' },
]

function App() {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
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

  // Handle color change from PiP window
  const handleColorChange = (newColor) => {
    setBackgroundColor(newColor)
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
        width: 420,
        height: 600,
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
      root.render(
        <PipContent
          colors={COLORS}
          currentColor={backgroundColor}
          onColorChange={handleColorChange}
        />
      )

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

  // Update PiP window when background color changes
  useEffect(() => {
    if (pipRoot.current && isPipOpen) {
      pipRoot.current.render(
        <PipContent
          colors={COLORS}
          currentColor={backgroundColor}
          onColorChange={handleColorChange}
        />
      )
    }
  }, [backgroundColor, isPipOpen])

  return (
    <div className="app" style={{ backgroundColor, transition: 'background-color 0.3s ease' }}>
      <div className="container">
        {!isPipSupported && (
          <div className="warning">
            <strong>Warning:</strong> Document Picture-in-Picture API is not supported in this browser.
            Please use Chrome 116+, Edge, or Opera.
          </div>
        )}

        <h1>Document Picture-in-Picture Demo</h1>
        <p className="description">
          Open a Picture-in-Picture window and control the main page background color from it!
        </p>

        <div className="controls">
          <button
            className="button primary"
            onClick={openPipWindow}
            disabled={!isPipSupported || isPipOpen}
          >
            Open PiP Window
          </button>

          <button
            className="button secondary"
            onClick={closePipWindow}
            disabled={!isPipOpen}
          >
            Close PiP Window
          </button>
        </div>

        <div className="status">
          <div className="status-item">
            <strong>PiP Status:</strong>
            <span className={isPipOpen ? 'status-badge open' : 'status-badge closed'}>
              {isPipOpen ? 'Open' : 'Closed'}
            </span>
          </div>
          <div className="status-item">
            <strong>Background Color:</strong>
            <span className="color-value">{backgroundColor}</span>
            <span
              className="color-preview"
              style={{ backgroundColor }}
            ></span>
          </div>
        </div>

        <div className="color-selector">
          <h2>Choose Background Color</h2>
          <p className="color-selector-description">
            Select a color here and watch it update in both windows!
          </p>
          <ColorPicker
            colors={COLORS}
            currentColor={backgroundColor}
            onColorChange={handleColorChange}
          />
        </div>

        <div className="info">
          <h2>How it works</h2>
          <ol>
            <li>Click "Open PiP Window" to launch the Picture-in-Picture control panel</li>
            <li>Change colors from either the main window or the PiP window</li>
            <li>Watch as both windows stay synchronized - the active color is highlighted</li>
            <li>Close the PiP window using the close button inside it or from the main page</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default App
