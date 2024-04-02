// Theme

/**
 * @see https://github.com/JohannesKlauss/react-hotkeys-hook/blob/main/src/types.ts
 */
export interface Key {
  callback: (event: KeyboardEvent) => void;
  keys: string;
  scopes?: string | readonly string[];
}
