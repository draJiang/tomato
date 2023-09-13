export function millisecondsToTime(ms: number) {
  
  let minutes: string = Math.floor(ms / (60 * 1000)).toString();
  let seconds: string = ((ms % (60 * 1000)) / 1000).toFixed(0).toString();

  // padStart 方法将为 minutes 和 seconds 加上前导零，如果需要的话。
  minutes = String(minutes).padStart(2, '0');
  seconds = String(seconds).padStart(2, '0');

  return `${minutes}:${seconds}`;
}