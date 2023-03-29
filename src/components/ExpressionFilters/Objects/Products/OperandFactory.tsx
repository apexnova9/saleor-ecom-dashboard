import React from "react"

import { Operand } from "../../State/types"
import { AttributeDropdownOperand, CategoryOperand, ChannelOperand, CollectionOperand, EmptyOperand, PriceOperand, ProductTypeOperand } from "./DataTypeOperands"

interface OperandFactoryProps {
  operand: Operand
}

export const OperandFactory = ({ operand }: OperandFactoryProps) => {
  if (operand.dataType === "category" && operand.type === "autocomplete") {
    return (
      <CategoryOperand operand={operand} />
    )
  }

  if (operand.dataType === "channel" && operand.type === "dropdown") {
    return (
      <ChannelOperand operand={operand} />
    )
  }

  if (operand.dataType === "product-type" && operand.type === "autocomplete") {
    return (
      <ProductTypeOperand operand={operand} />
    )
  }

  if (operand.dataType === "collection" && operand.type === "autocomplete") {
    return (
      <CollectionOperand operand={operand} />
    )
  }

  if (operand.dataType === "price" && (operand.type === "number" || operand.type === "range")) {
    return (
      <PriceOperand operand={operand} />
    )
  }

  if (operand.dataType === "attr:DROPDOWN" && operand.type === "dropdown") {
    return (
      <AttributeDropdownOperand operand={operand} />
    )
  }

  return <EmptyOperand />
}