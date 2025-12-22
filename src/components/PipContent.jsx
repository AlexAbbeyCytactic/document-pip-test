import ColorPicker from './ColorPicker'

function PipContent({ colors, currentColor, onColorChange }) {
  console.log('PiP currentColor:', currentColor)

  return (
    <div className="pip-container">
      <div className="pip-scrollable-content">
        <h2>PiP Control Panel</h2>
        <p>Scroll down to explore all features!</p>
        <p style={{ fontSize: '12px', opacity: 0.8 }}>Current: {currentColor}</p>

        <div className="pip-section">
          <h3>Color Selector</h3>
          <p>Click a color to change the main window background:</p>
          <ColorPicker
            colors={colors}
            currentColor={currentColor}
            onColorChange={onColorChange}
          />
        </div>

        <div className="pip-section">
          <h3>Features</h3>
          <ul className="pip-list">
            <li>Real-time synchronization between windows</li>
            <li>Beautiful gradient background</li>
            <li>Smooth color transitions</li>
            <li>Active color highlighting</li>
            <li>Responsive design</li>
            <li>Scrollable content support</li>
          </ul>
        </div>

        <div className="pip-section">
          <h3>How to Use</h3>
          <ol className="pip-list">
            <li>Select any color from the palette above</li>
            <li>Watch the main window background change instantly</li>
            <li>The active color is highlighted with a gold border</li>
            <li>Both windows stay perfectly synchronized</li>
            <li>Scroll through this window to see all content</li>
          </ol>
        </div>

        <div className="pip-section">
          <h3>Tips & Tricks</h3>
          <ul className="pip-list">
            <li>You can resize this PiP window by dragging the edges</li>
            <li>The window stays on top of other applications</li>
            <li>Color changes happen in both windows simultaneously</li>
            <li>Try different colors to find your favorite!</li>
          </ul>
        </div>

        <div className="pip-section">
          <h3>Technical Details</h3>
          <div className="pip-info-box">
            <p><strong>API:</strong> Document Picture-in-Picture</p>
            <p><strong>Framework:</strong> React 19.2</p>
            <p><strong>Build Tool:</strong> Vite</p>
            <p><strong>Browser Support:</strong> Chrome 116+, Edge, Opera</p>
          </div>
        </div>

        <div className="pip-section">
          <h3>Benefits</h3>
          <ul className="pip-list">
            <li>Control your application from a floating window</li>
            <li>Multitask while keeping controls visible</li>
            <li>Perfect for video players, music controls, and more</li>
            <li>Native browser API - no external dependencies</li>
          </ul>
        </div>

        <div className="pip-footer">
          <button
            className="button close-button"
            onClick={() => window.documentPictureInPicture.window.close()}
          >
            Close Window
          </button>
          <p style={{ fontSize: '11px', opacity: 0.7, marginTop: '15px' }}>
            Scroll to top to change colors again
          </p>
        </div>
      </div>
    </div>
  )
}

export default PipContent
