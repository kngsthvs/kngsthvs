"use client";

import { Form as ReactForm } from "@base-ui-components/react/form";
import { visuallyHidden } from "@base-ui-components/react/utils";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useTheme } from "@kngsthvs/ui/functions/client/context/theme";
import { minDelay } from "@kngsthvs/ui/functions/shared/min-delay";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Textarea } from "@repo/ui/components/textarea";
import { Toast } from "@repo/ui/components/toast";
import { usePathname, useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { env } from "@/env";
import { usePages } from "../../_components/pages";
import { submitApplication } from "../_lib/action";
import styles from "./form.module.css";

type ActionResponse = {
  inputs?: {
    body?: string;
    company?: string;
    email?: string;
    name?: string;
  };
  message?: string;
  status?: "error" | "ok" | string | number;
};

export function Form() {
  const { setFocus, setTitle } = usePages();
  const pathname = usePathname();
  const router = useRouter();
  const [errors, _setErrors] = useState({
    body: "",
    company: "",
    email: "",
    name: "",
  });
  const captchaRef = useRef<any>(null);
  const [token, setToken] = useState("");
  const [
    {
      localStorage: { colorScheme },
    },
  ] = useTheme();

  const [state, action, pending] = useActionState(
    async (
      _previousState: ActionResponse | null,
      formData: FormData,
    ): Promise<ActionResponse> => {
      const inputs = {
        email: formData.get("email") as string,
        token: formData.get("h-captcha-response") as string,
      };

      try {
        if (token) {
          captchaRef.current.resetCaptcha();

          const res = await minDelay(submitApplication(formData), 3000);

          toast.custom(() => <Toast>{res?.message}</Toast>);

          if (res?.ok) {
            router.push("/");
          }

          return { inputs, ...res };
        } else {
          captchaRef.current.execute();

          return {
            inputs,
          };
        }
      } catch (error: any) {
        console.error(error);

        return error;
      }
    },
    null,
  );

  useEffect(() => {
    setFocus(true);
    setTitle("Partner");
  }, [pathname]);

  // TODO: Add Lord's day state

  return (
    <ReactForm className={styles.root} {...{ action }}>
      <Input.Group>
        <Input
          error={errors.name}
          label="Name"
          name="name"
          placeholder="Name"
          required
          value={state?.inputs?.name}
        />

        <Input
          error={errors.email}
          label="Email"
          name="email"
          placeholder="Email"
          required
        />
      </Input.Group>

      <Input
        error={errors.company}
        label="Company"
        name="company"
        placeholder="Company"
        required
      />

      <Textarea
        error={errors.body}
        label="Body"
        name="body"
        placeholder="Describe your project"
        required
      />

      <div style={visuallyHidden}>
        {env.NEXT_PUBLIC_HCAPTCHA_SITEKEY ? (
          <HCaptcha
            onError={(error) => {
              toast.custom(() => (
                <Toast>
                  <Toast.Icon variant="error" />

                  <Toast.Content>hCaptcha Error: {error}</Toast.Content>
                </Toast>
              ));
            }}
            onExpire={() => {
              toast.custom(() => (
                <Toast>
                  <Toast.Icon variant="error" />

                  <Toast.Content>hCaptcha token expired.</Toast.Content>
                </Toast>
              ));
            }}
            onLoad={() => {
              captchaRef.current.execute();
            }}
            onVerify={setToken}
            ref={captchaRef}
            sitekey={env.NEXT_PUBLIC_HCAPTCHA_SITEKEY}
            size="invisible"
            theme={colorScheme === "dark" ? "dark" : "light"}
          />
        ) : null}
      </div>

      <Button
        disabled={pending}
        loading={pending ? "true" : "false"}
        size="large"
        type="submit"
      >
        Apply
      </Button>
    </ReactForm>
  );
}
