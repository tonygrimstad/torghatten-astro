// src/utils/textUtils.ts
export function formatLineBreaks(text: string): string {
  return text.replaceAll('\n', '<br>');
}

// Kan utvides med flere formateringsfunksjoner:
export function formatText(text: string): string {
  return text
    .replaceAll('\n', '<br>')           // Linjeskift
    .replaceAll(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Bold tekst
}
