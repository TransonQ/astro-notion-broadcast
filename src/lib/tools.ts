export function parseNumber(str: string | undefined, defaultValue: number): number {
  const num = Number(str)
  return isNaN(num) ? defaultValue : num
}
