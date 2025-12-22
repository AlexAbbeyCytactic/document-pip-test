import ColorPicker from './ColorPicker'

function PipContent({ colors, currentColor, onColorChange }) {
  console.log('PiP currentColor:', currentColor)

  return (
    <div className="pip-container">
      <h2>PiP Control Panel</h2>
      <p>Click a color to change the main window background:</p>
      <p style={{ fontSize: '12px', opacity: 0.8 }}>Current: {currentColor}</p>

      <ColorPicker
        colors={colors}
        currentColor={currentColor}
        onColorChange={onColorChange}
      />

      <button
        className="button close-button"
        onClick={() => window.documentPictureInPicture.window.close()}
      >
        Close Window
      </button>
    </div>
  )
}

export default PipContent
