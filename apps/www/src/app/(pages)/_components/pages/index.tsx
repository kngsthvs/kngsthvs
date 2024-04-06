"use client";

import { useKeys } from "@kngsthvs/ui/functions/client/context/keys";
import { animated } from "@react-spring/web";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
import { useMeasure, useWindowScroll } from "react-use";
import { VisuallyHidden } from "ui/components";
import { Button } from "ui/components/button";
import { Link } from "ui/components/link";
import { Link as LinkPrimitive } from "ui/primitives/link";
import { App } from "../app";
import { Whispers } from "../whispers";
import { Aside } from "./aside";
import headerStyles from "./header.module.css";
import headingStyles from "./heading.module.css";
import styles from "./styles.module.css";
import { Ticker } from "./ticker";

function interpolate(start: number, end: number, value: number) {
  const result = start + (value / 0.9) * (end - start);

  if (value <= 0) {
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
  const router = useRouter();
  const home = pathname ? pathname === "/" || pathname === "/home" : props.home;
  // const style = useSpring({
  //   borderWidth: home ? 1 : 0,
  //   height: pathname ? (home ? height : 0) : 432,
  // });
  const [focus, setFocus] = useState(false);
  const [title, setTitle] = useState<string | undefined>();
  const { y } = useWindowScroll();
  const percentage = 1 / (96 / y);

  useKeys("b", () => {
    router.back();
  });
  useKeys("f", () => {
    router.forward();
  });
  useKeys("h", () => {
    router.push("/");
  });

  return (
    <Context.Provider value={{ focus, setFocus, setTitle }}>
      <header className={headerStyles.root}>
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
                  <li>
                    <Link href="/vision" keys="v">
                      Vision
                    </Link>
                  </li>

                  {/* <li>
                    <Link href="/residency" keys="r">
                      Residency
                    </Link>
                  </li> */}
                </ul>
              </animated.div>
            ) : null}

            {focus && title ? (
              <animated.h1
                style={{
                  opacity: pathname ? 1 : 0,
                  transform: `scale(${interpolate(2, 1, percentage)}) translateY(${3 - interpolate(0, 3, percentage)}rem)`,
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
                    href="mailto:contact@kngsthvs.com"
                    keys="c"
                    variant="secondary"
                  >
                    Contact us
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
              <p>Ardens sed virens.</p>
            </Ticker>

            <section>
              <div>
                <Image
                  alt="Chi Rho"
                  height={512}
                  loading="eager"
                  priority
                  src="/chi-rho.svg"
                  width={512}
                />

                <Image
                  alt="Kings & Thieves logo"
                  height={80}
                  loading="eager"
                  src="/word.svg"
                  width={512}
                />

                <VisuallyHidden>Kings & Thieves</VisuallyHidden>
              </div>

              {whispers ? <Whispers {...{ whispers }} /> : null}
            </section>
          </article>
        </div>
      ) : null}

      <div className={styles.root} data-focus={focus}>
        <div>
          <Aside>
            <p>For the glory of Christ.</p>

            {!focus ? (
              <animated.ul>
                <App name="Crow’s Nest" path="crowsnest" />
                {/* <App />
                    <App />
                    <App />
                    <App />
                    <App />
                    <App /> */}

                <li>
                  <kbd>[a]</kbd>
                </li>
              </animated.ul>
            ) : null}
          </Aside>

          <article>
            <main>{children}</main>
          </article>
        </div>

        <nav className={styles.nav}>
          <div>
            <div className={styles.flag} />

            <p>American built, owned, and operated.</p>
          </div>

          {controls}
        </nav>
      </div>
    </Context.Provider>
  );
}

export { Context, Provider };
