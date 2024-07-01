import { DashboardCard } from "@dashboard/components/Card";
import { GridTable } from "@dashboard/components/GridTable";
import Money from "@dashboard/components/Money";
import { OrderDetailsFragment } from "@dashboard/graphql";
import { Box, Skeleton, Text } from "@saleor/macaw-ui-next";
import React from "react";

import { AuthorizedPill } from "./components/AuthorizedPill";
import { ChargedPill } from "./components/ChargedPill";
import { SettledPill } from "./components/SettledPill";

interface OrderPaymentSummarySectionProps {
  order: OrderDetailsFragment | undefined;
}

export const OrderPaymentSummarySection: React.FC<OrderPaymentSummarySectionProps> = ({
  order,
}) => {
  if (!order) {
    return <Skeleton />;
  }

  return (
    <DashboardCard gap={1}>
      <DashboardCard.Title>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" flexDirection="column">
            <Text size={5} fontWeight="bold">
              Payment summary
            </Text>
            <Text color="default2" size={3}>
              A summary of all payments from registered transactions
            </Text>
          </Box>
          <SettledPill isPaid={order.isPaid} />
        </Box>
      </DashboardCard.Title>
      <DashboardCard.Content>
        <GridTable marginTop={5}>
          <GridTable.Row>
            <GridTable.Cell>
              <Text>Authorized</Text>
            </GridTable.Cell>
            <GridTable.Cell>
              <AuthorizedPill status={order.authorizeStatus} />
            </GridTable.Cell>
            <GridTable.Cell align="right">
              <Money money={order.totalAuthorized} />
            </GridTable.Cell>
          </GridTable.Row>
          <GridTable.Row>
            <GridTable.Cell>
              <Text>Charged</Text>
            </GridTable.Cell>
            <GridTable.Cell>
              <ChargedPill status={order.chargeStatus} />
            </GridTable.Cell>
            <GridTable.Cell align="right">
              <Money money={order.totalCharged} />
            </GridTable.Cell>
          </GridTable.Row>
          <GridTable.Row>
            <GridTable.Cell>
              <Text fontWeight="bold">Order balance</Text>
            </GridTable.Cell>
            <GridTable.Cell />
            <GridTable.Cell align="right">
              <Money money={order.totalBalance} />
            </GridTable.Cell>
          </GridTable.Row>
        </GridTable>
      </DashboardCard.Content>
    </DashboardCard>
  );
};
