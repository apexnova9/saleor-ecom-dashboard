import { Pill } from "@dashboard/components/Pill";
import React from "react";

interface SettledPill {
  isPaid: boolean;
}

export const SettledPill: React.FC<SettledPill> = ({ isPaid }) => {
  return (
    <Pill
      color={isPaid ? "success" : "error"}
      label={isPaid ? "SETTLED" : "UNSETTLED"}
      size="medium"
    />
  );
};
