"use client";

import { Cover } from "@/app/_components/cover";
import { animated } from "@react-spring/web";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useMeasure, useWindowScroll } from "react-use";
import { VisuallyHidden } from "ui/components";
import { Button } from "ui/components/button";
import { Footer } from "ui/components/footer";
import { Link as LinkPrimitive } from "ui/primitives/link";
import { App } from "../app";
import { Whispers } from "../whispers";
import { Aside } from "./aside";
import headerStyles from "./header.module.css";
import headingStyles from "./heading.module.css";
import styles from "./styles.module.css";
import { Ticker } from "./ticker";

function interpolate(
  start: number,
  end: number,
  value: number,
  options?: {
    min?: number;
    max?: number;
    x?: number;
    y?: number;
  },
) {
  const result = start + (value / 0.9) * (end - start);

  if (value <= 0 || (options?.y && options?.min && options.y < options.min)) {
    return start;
  }

  if (value >= 1) {
    return end;
  }

  if (start > end) {
    if (result <= end) {
      return end;
    }
  } else if (result >= end) {
    return end;
  }

  return result;
}

const Context = createContext<
  | {
      focus: boolean;
      setFocus: React.Dispatch<React.SetStateAction<boolean>>;
      setTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
    }
  | undefined
>(undefined);

export function usePages() {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("usePages must be used within a Provider");
  }

  return context;
}

function Provider({
  children,
  controls,
  whispers,
  ...props
}: {
  children: React.ReactNode;
  controls: React.ReactNode;
  home?: boolean;
  whispers?: string[];
}) {
  const [ref, { height }] = useMeasure<HTMLElement>();
  const pathname = usePathname();
  const home = pathname ? pathname === "/" || pathname === "/home" : props.home;
  // const style = useSpring({
  //   borderWidth: home ? 1 : 0,
  //   height: pathname ? (home ? height : 0) : 432,
  // });
  const [focus, setFocus] = useState(false);
  const [title, setTitle] = useState<string | undefined>();
  const { y } = useWindowScroll();
  const min = 32;
  const percentage = 1 / (96 / (y - min));

  useEffect(() => {
    return () => {
      setFocus(false);
      setTitle(undefined);
    };
  }, [pathname]);

  return (
    <Context.Provider value={{ focus, setFocus, setTitle }}>
      <nav className={styles.global} data-focus={focus}>
        <ul>
          <li>
            <a
              data-active={true}
              // href="https://www.kngsthvs.com"
              // rel="noreferrer"
              // target="_blank"
            >
              <Image alt="Chi Rho" height={16} src="/icon.svg" width={16} />

              <VisuallyHidden>Kings & Thieves</VisuallyHidden>
            </a>
          </li>

          <li>
            <a
            // href="https://log.kngsthvs.com"
            // rel="noreferrer"
            // target="_blank"
            >
              <Image alt="Anchor" height={16} src="/logos/log.svg" width={16} />

              <VisuallyHidden>Log</VisuallyHidden>
            </a>
          </li>

          <li>
            <a
            // href="https://ship.kngsthvs.com"
            // rel="noreferrer"
            // target="_blank"
            >
              <Image alt="Wheel" height={16} src="/logos/ship.svg" width={16} />

              <VisuallyHidden>Ship</VisuallyHidden>
            </a>
          </li>
        </ul>
      </nav>

      <header className={headerStyles.root} data-focus={focus}>
        <div>
          <LinkPrimitive className={headerStyles.icon} href="/" keys="h">
            <Image
              alt="Kings & Thieves icon"
              height={32}
              loading="eager"
              src="/icon.svg"
              width={32}
            />

            <VisuallyHidden>Kings & Thieves</VisuallyHidden>
          </LinkPrimitive>

          <nav>
            {!focus ? (
              <animated.div>
                {/* <div className="mobile">
                  <Button icon variant="tertiary">
                    Menu
                  </Button>
                </div> */}

                <ul>
                  {/* <li>
                    <Link href="/residency" keys="r">
                      Residency
                    </Link>
                  </li> */}

                  {/* <li>
                    <Link href="/archive" keys="a">
                      Archive
                    </Link>
                  </li> */}
                </ul>
              </animated.div>
            ) : null}

            {focus && title ? (
              <animated.h1
                style={{
                  opacity: pathname ? 1 : 0,
                  transform: `scale(${interpolate(2, 1, percentage, { min, y })}) translateY(${3 - interpolate(0, 3, percentage, { min, y })}rem)`,
                }}
              >
                {title}
              </animated.h1>
            ) : (
              <div />
            )}

            {!focus ? (
              <animated.div>
                <span>
                  <Button
                    href="https://x.com/kngsthvs/jobs"
                    keys="j"
                    variant="secondary"
                  >
                    Jobs
                  </Button>

                  <Button href="/partner" keys="p">
                    Partner
                  </Button>
                </span>
              </animated.div>
            ) : null}
          </nav>
        </div>
      </header>

      {home ? (
        <div
          className={headingStyles.root}
          style={{
            height: height === 0 ? (home ? 432 : 0) : height,
          }}
        >
          <article {...{ ref }}>
            <Ticker ticker>
              <p>An Appeal to Heaven.</p>
            </Ticker>

            <Cover>{whispers ? <Whispers {...{ whispers }} /> : null}</Cover>
          </article>
        </div>
      ) : null}

      <div className={styles.root} data-focus={focus}>
        <div>
          <Aside>
            <p>For the glory of Christ.</p>

            {!focus ? (
              <ul>
                {/* <li>
                  <Image
                    alt="Log icon"
                    height={24}
                    quality={100}
                    src="/logos/log.svg"
                    width={24}
                  />
                </li> */}

                {/* <li>
                  <Image
                    alt="Ship icon"
                    height={24}
                    quality={100}
                    src="/logos/ship.svg"
                    width={24}
                  />
                </li> */}
                <App keys="C" name="Crow’s Nest" path="/ship/crowsnest" />
                <App keys="H" name="Hold" path="/ship/hold" />
                <App keys="R" />
                <App keys="I" />
                <App keys="S" />
                <App keys="T" name="Tackle" path="/ship/tackle" />
                <App keys="O" />

                <li>
                  <kbd>[&#8679;]</kbd>
                </li>
              </ul>
            ) : null}
          </Aside>

          <article>
            <main>{children}</main>
          </article>
        </div>

        <nav className={styles.nav} data-focus={focus}>
          <Footer />

          {controls}
        </nav>
      </div>
    </Context.Provider>
  );
}

export { Context, Provider };
