export const calculateArcPath = (
  radius: number,
  percentage: number,
  chartCenter: number,
  startAngle: number = (-Math.PI * Math.random()) / 2 // Default random start angle
): string => {
  if (percentage === 100) {
    // Handle full circle separately
    return `
      M ${chartCenter} ${chartCenter - radius}
      A ${radius} ${radius} 0 1 1 ${chartCenter} ${chartCenter + radius}
      A ${radius} ${radius} 0 1 1 ${chartCenter} ${chartCenter - radius}
    `
  }

  const endAngle = startAngle + (percentage / 100) * 2 * Math.PI // Calculate end angle
  const largeArcFlag = percentage > 50 ? 1 : 0

  const startX = chartCenter + radius * Math.cos(startAngle)
  const startY = chartCenter + radius * Math.sin(startAngle)
  const endX = chartCenter + radius * Math.cos(endAngle)
  const endY = chartCenter + radius * Math.sin(endAngle)

  return `
    M ${startX} ${startY}
    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
  `
}

// Handles the base circular path
export const calculateBaseCirclePath = (radius: number, chartCenter: number): string => {
  return `
    M ${chartCenter} ${chartCenter - radius}
    A ${radius} ${radius} 0 1 1 ${chartCenter} ${chartCenter + radius}
    A ${radius} ${radius} 0 1 1 ${chartCenter} ${chartCenter - radius}
  `
}

// Splits text into multiple lines based on character limits
export const splitText = (text: string, maxChars: number): string[] => {
  const words = text.split(' ')
  const lines: string[] = []
  let currentLine = ''

  for (const word of words) {
    if ((currentLine + word).length > maxChars) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine += (currentLine ? ' ' : '') + word
    }
  }

  lines.push(currentLine) // Push the remaining text

  return lines
}

// Calculates the midpoint coordinates of an arc
export const calculateMidpoint = (
  radius: number,
  percentage: number,
  chartCenter: number
): { x: number; y: number } => {
  const midAngle = -Math.PI / 2 + (percentage / 100) * Math.PI // Middle of the arc angle
  const x = chartCenter + radius * Math.cos(midAngle)
  const y = chartCenter + radius * Math.sin(midAngle)

  return { x, y }
}

// Ensures connecting lines between labels and arcs are straight
export const calculateStraightLineCoordinates = (
  x1: number,
  y1: number,
  labelX: number,
  labelY: number
): { x2: number; y2: number } => {
  const isHorizontal = Math.abs(labelX - x1) > Math.abs(labelY - y1) // Determine alignment preference

  if (isHorizontal) {
    // Straight horizontal line
    return { x2: labelX, y2: y1 }
  } else {
    // Straight vertical line
    return { x2: x1, y2: labelY }
  }
}
