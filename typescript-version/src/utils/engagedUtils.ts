// Function to generate new stackedBarData
export const generateStackedBarData = () => {
  const groups = ['Internal employees', 'Indigenous communities', 'External regional stakeholders']

  // Helper to normalize values to sum up to a total
  const generateValues = (total: number, length: number) => {
    const baseValues = Array.from({ length }, () => Math.random()) // Random values
    const sum = baseValues.reduce((a, b) => a + b, 0)

    return baseValues.map(v => Math.round((v / sum) * total)) // Scale values to match the total
  }

  // Generate random totals (not exceeding 20) for each group
  const groupTotals = groups.map(() => Math.floor(Math.random() * 21)) // Random total between 0 and 20

  // Generate normalized values for each group
  const groupValues = groupTotals.map(total => generateValues(total, 4)) // 4 segments per group

  return groups.map((group, idx) => ({
    group,
    values: groupValues[idx],
    total: groupTotals[idx]
  }))
}
