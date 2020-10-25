
export function trackLengthFormat(length: number): string {
  length = length / 1000;
  const totalHours = Math.floor(length / (60 * 60));
  const isHours = Math.floor(length / (60 * 60));
  const seconds = length - (totalHours * 60 * 60);
  const totalMinutes = Math.floor(length / 60);
  const totalSeconds = Math.floor(seconds - (totalMinutes * 60));
  return isHours ? `${totalHours.toString().padStart(2, '0')}:${totalMinutes.toString().padStart(1, '0')}:${totalSeconds.toString().padStart(2, '0')} hours` : `${totalMinutes.toString().padStart(1, '0')}:${totalSeconds.toString().padStart(2, '0')} mins`;
}
