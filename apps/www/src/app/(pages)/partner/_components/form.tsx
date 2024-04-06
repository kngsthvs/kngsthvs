"use client";

import { minDelay } from "@kngsthvs/ui/functions/shared/min-delay";
import { toast } from "@kngsthvs/ui/packages/sonner";
import { Form as FormPrimitive } from "@kngsthvs/ui/primitives/client/form";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "ui/components/button";
import { Input } from "ui/components/input";
import { Textarea } from "ui/components/textarea";
import { Toast } from "ui/components/toast";
import { usePages } from "../../_components/pages";
import { action } from "../_lib/action";
import styles from "./form.module.css";

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
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setFocus(true);
    setTitle("Partner");
  }, [pathname]);

  return (
    <FormPrimitive
      action={async (formData) => {
        const res = await minDelay(action(formData), 3000);

        toast.custom(() => <Toast>{res?.message}</Toast>);

        if (res && res.ok) {
          router.push("/");
        }

        setPending(false);
      }}
      className={styles.root}
      onSubmit={() => {
        setPending(true);
      }}
    >
      <Input.Group>
        <Input
          label="Name"
          message={errors.name}
          name="name"
          placeholder="Name"
          required
        />

        <Input
          label="Email"
          message={errors.email}
          name="email"
          placeholder="Email"
          required
        />
      </Input.Group>

      <Input
        label="Company"
        message={errors.company}
        name="company"
        placeholder="Company"
        required
      />

      <Textarea
        label="Body"
        message={errors.body}
        name="body"
        placeholder="Describe your project"
        required
      />

      <Button
        disabled={pending}
        loading={pending ? "true" : "false"}
        size="large"
        type="submit"
      >
        Apply
      </Button>
    </FormPrimitive>
  );
}
