export function isUpperCase(char: string) {
  return isAlpha(char) && char === char.toUpperCase();
}

// Capitalise every word in a string
export function toTitleCase(str: string) {
  const tokens = str.split(' ');
  return tokens.map((token) => token.charAt(0).toUpperCase() + token.slice(1)).join(' ');
}

function isAlpha(str: string) {
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (
      !(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123) // lower alpha (a-z)
    ) {
      return false;
    }
  }
  return true;
}
