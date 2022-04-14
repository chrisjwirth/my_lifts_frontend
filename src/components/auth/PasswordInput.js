import React from "react";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";

function PasswordInput({ confirmField, value, onChange }) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup>
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        value={value}
        placeholder={confirmField ? "Confirm Password" : "Enter Password"}
        required
        onChange={onChange}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

export default PasswordInput;
