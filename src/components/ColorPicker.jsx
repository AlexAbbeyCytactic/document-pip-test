function ColorPicker({ colors, currentColor, onColorChange }) {
  return (
    <div className="color-buttons">
      {colors.map((color) => (
        <button
          key={color.value}
          className={`color-button ${currentColor === color.value ? 'active' : ''}`}
          style={{ backgroundColor: color.value }}
          onClick={() => onColorChange(color.value)}
          title={`${color.name} (${color.value})`}
          aria-label={`Change background to ${color.name}`}
        />
      ))}
    </div>
  )
}

export default ColorPicker
