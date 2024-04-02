"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { tinykeys } from "../../../packages/tinykeys";
import { type Key } from "../../types/keys";

/**
 * @see https://github.com/JohannesKlauss/react-hotkeys-hook/blob/main/src/BoundHotkeysProxyProvider.tsx
 */
const Subscription = createContext<
  | {
      addKey: (key: Key) => void;
      removeKey: (key: string) => void;
    }
  | undefined
>(undefined);

function useSubscription() {
  const context = useContext(Subscription);

  if (context === undefined) {
    throw new Error(
      "useSubscription must be used within an Subscription.Provider",
    );
  }

  return useContext(Subscription);
}

export const Context = createContext<{ keys: Key[] } | undefined>(undefined);

/**
 * @see https://github.com/JohannesKlauss/react-hotkeys-hook/blob/main/src/useHotkeys.ts#L23
 */
const useSafeLayoutEffect =
  typeof window !== undefined ? useLayoutEffect : useEffect;

/**
 * @see https://github.com/JohannesKlauss/react-hotkeys-hook/blob/main/src/useHotkeys.ts
 * @see https://github.com/streamich/react-use/blob/master/docs/useKey.md
 * @see https://github.com/streamich/react-use/blob/master/docs/useKeyPress.md
 */
export function useKeys(keys: string, cb: (event: KeyboardEvent) => void) {
  const context = useContext(Keys.Context);

  if (context === undefined) {
    throw new Error("useKeys must be used within an Keys.Provider");
  }

  const subscription = useSubscription();
  const callback = useCallback(cb, []);

  useSafeLayoutEffect(() => {
    subscription?.addKey({ callback, keys });

    return () => {
      subscription?.removeKey(keys);
    };
  }, []);

  return context;
}

/**
 * @see https://github.com/JohannesKlauss/react-hotkeys-hook/blob/main/src/HotkeysProvider.tsx
 */
export function Provider({ children }: { children: React.ReactNode }) {
  const [keys, setKeys] = useState<Key[]>([]);

  const addKey = useCallback((key: Key) => {
    setKeys((value) => [...value, key]);
  }, []);

  const removeKey = useCallback((key: string) => {
    setKeys((value) => value.filter(({ keys }) => keys === key));
  }, []);

  useSafeLayoutEffect(() => {
    if (keys.length > 0) {
      const unsubscribe = tinykeys(
        window,
        Object.fromEntries(
          new Map(
            keys.map((key) => [
              key.keys,
              (event) => {
                // FIX: Ignored events on inputs and textarea need to be scoped
                if (
                  (event.target as HTMLElement).tagName === "INPUT" ||
                  (event.target as HTMLElement).tagName === "TEXTAREA"
                ) {
                  return;
                }

                return key.callback(event);
              },
            ]),
          ),
        ),
      );

      return () => {
        unsubscribe();
      };
    }
  }, [keys]);

  return (
    <Context.Provider value={{ keys }}>
      <Subscription.Provider value={{ addKey, removeKey }}>
        {children}
      </Subscription.Provider>
    </Context.Provider>
  );
}

export const Keys = {
  Context,
  Provider,
};
