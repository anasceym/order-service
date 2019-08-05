import { ApiModelProperty } from '@nestjs/swagger'

export enum PaymentStatus {
  DECLINED = 'DECLINED',
  CONFIRMED = 'CONFIRMED',
}

export class MakePaymentResponseDto {
  @ApiModelProperty({
    description: 'Reference ID managed by order-service',
    example: 'id-1234',
  })
  referenceId: string

  @ApiModelProperty({
    description: 'Status of the payment',
    example: 'CONFIRMED',
    enum: PaymentStatus,
  })
  status: PaymentStatus
}
