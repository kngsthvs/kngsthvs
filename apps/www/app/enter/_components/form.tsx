"use client";

import { Button } from "ui/components/button";
import { Input } from "ui/components/input";
import { Textarea } from "ui/components/textarea";
import styles from "./form.module.css";

export function Form() {
  return (
    <form className={styles.root}>
      <Input.Group>
        <Input label="Name" name="name" placeholder="Name" />

        <Input label="Email" name="email" placeholder="Email" />
      </Input.Group>

      <Input label="Company" name="company" placeholder="Company" />

      <Textarea
        label="Body"
        name="description"
        placeholder="Describe your project"
      />

      <Button size="large" type="submit">
        Apply
      </Button>
    </form>
  );
}
