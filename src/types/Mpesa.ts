type ResultParamaterKeys =
  | "TransactionAmount"
  | "TransactionReceipt"
  | "B2CRecipientIsRegisteredCustomer"
  | "B2CChargesPaidAccountAvailableFunds"
  | "ReceiverPartyPublicName"
  | "TransactionCompletedDateTime"
  | "B2CUtilityAccountAvailableFunds"
  | "B2CWorkingAccountAvailableFunds"
  | string;

interface IResultParameter {
  Key: ResultParamaterKeys;
  Value: number | string;
}

interface IReferenceItem extends IResultParameter {
  Key: string;
}
export interface IMpesaB2CResponse {
  Result: {
    ResultType: number;
    ResultCode: number;
    ResultDesc: string;
    OriginatorConversationID: string;
    ConversationID: string;
    TransactionID: string;
    ResultParameters: {
      ResultParameter: IResultParameter[];
    };
    ReferenceData: {
      ReferenceItem: IReferenceItem;
    };
  };
}
