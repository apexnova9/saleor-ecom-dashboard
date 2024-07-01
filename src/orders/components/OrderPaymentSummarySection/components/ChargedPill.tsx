import { Pill } from "@dashboard/components/Pill";
import { OrderChargeStatusEnum } from "@dashboard/graphql";
import React from "react";

interface ChargedPillProps {
  status: OrderChargeStatusEnum;
}

const getChargedColor = (status: OrderChargeStatusEnum) => {
  switch (status) {
    case OrderChargeStatusEnum.FULL:
      return "success";
    case OrderChargeStatusEnum.PARTIAL:
      return "warning";
    case OrderChargeStatusEnum.OVERCHARGED:
      return "error";
    case OrderChargeStatusEnum.NONE:
      return "generic";
    default:
      return "generic";
  }
};
const getChargedLabel = (status: OrderChargeStatusEnum) => {
  const label = () => {
    switch (status) {
      case OrderChargeStatusEnum.FULL:
        return "Full";
      case OrderChargeStatusEnum.PARTIAL:
        return "Partial";
      case OrderChargeStatusEnum.OVERCHARGED:
        return "Overcharged";
      case OrderChargeStatusEnum.NONE:
        return "None";
      default:
        return "None";
    }
  };

  return label().toUpperCase();
};

export const ChargedPill: React.FC<ChargedPillProps> = ({ status }) => {
  return <Pill color={getChargedColor(status)} label={getChargedLabel(status)} size="small" />;
};
