import { Button } from "@mui/material";
import React from "react";

interface CustomButtonProps {
  variant: "outlined" | "contained";
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children: string;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
}

const ButtonCustomers = ({
  variant,
  onClick,
  children,
  color,
}: CustomButtonProps) => {
  return (
    <Button variant={variant} onClick={onClick} color={color}>
      {children}
    </Button>
  );
};
export default ButtonCustomers;
