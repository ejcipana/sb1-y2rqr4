export const TYPING_SPEED = 100;
export const PAUSE_BEFORE_SEARCH = 1000;

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function simulateTyping(
  text: string,
  onUpdate: (value: string) => void
): Promise<void> {
  let currentText = '';
  for (let i = 0; i < text.length; i++) {
    currentText += text[i];
    onUpdate(currentText);
    await sleep(TYPING_SPEED);
  }
}