import { Pill } from "@dashboard/components/Pill";
import { OrderAuthorizeStatusEnum } from "@dashboard/graphql";
import React from "react";

interface AuthorizedPillProps {
  status: OrderAuthorizeStatusEnum;
}

const getAuthorizedColor = (status: OrderAuthorizeStatusEnum) => {
  switch (status) {
    case OrderAuthorizeStatusEnum.FULL:
      return "success";
    case OrderAuthorizeStatusEnum.PARTIAL:
      return "warning";
    case OrderAuthorizeStatusEnum.NONE:
      return "generic";
    default:
      return "generic";
  }
};
const getAuthorizedLabel = (status: OrderAuthorizeStatusEnum) => {
  const label = () => {
    switch (status) {
      case OrderAuthorizeStatusEnum.FULL:
        return "Full";
      case OrderAuthorizeStatusEnum.PARTIAL:
        return "Partial";
      case OrderAuthorizeStatusEnum.NONE:
        return "None";
      default:
        return "None";
    }
  };

  return label().toUpperCase();
};

export const AuthorizedPill: React.FC<AuthorizedPillProps> = ({ status }) => {
  return (
    <Pill color={getAuthorizedColor(status)} label={getAuthorizedLabel(status)} size="small" />
  );
};
