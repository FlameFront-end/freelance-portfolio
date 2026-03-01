export const cn = (...tokens: Array<string | false | null | undefined>): string =>
  tokens.filter(Boolean).join(' ')
