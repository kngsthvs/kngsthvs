"use client";

import { Form as ReactForm } from "@base-ui-components/react/form";
import { minDelay } from "@kngsthvs/ui/functions/shared/min-delay";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
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
    <ReactForm
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
          error={errors.name}
          label="Name"
          name="name"
          placeholder="Name"
          required
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
