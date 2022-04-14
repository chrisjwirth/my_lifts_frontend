import React from "react";
import { Input } from "@chakra-ui/react";

function EmailInput({ value, onChange }) {
  return (
    <Input
      name="email"
      type="email"
      value={value}
      placeholder="jack@chinchilla.com"
      required
      onChange={onChange}
    />
  );
}

export default EmailInput;
