import { faker } from "@faker-js/faker";

export const mockB2c = (amount: number) => {
  const mockResp = {
    Result: {
      ResultType: 0,
      ResultCode: 0,
      ResultDesc: "The service request is processed successfully.",
      OriginatorConversationID: `${faker.number.int({
        min: 10000,
        max: 99999,
      })}-${faker.number.int({ min: 1000000, max: 9999999 })}-1`,
      ConversationID: `AG_${faker.date
        .recent()
        .getFullYear()}${faker.string.alphanumeric({ length: 20 })}`,
      TransactionID: faker.string.alphanumeric({ length: 10 }).toUpperCase(),
      ResultParameters: {
        ResultParameter: [
          {
            Key: "TransactionAmount",
            Value: amount,
          },
          {
            Key: "TransactionReceipt",
            Value: faker.string.alphanumeric({ length: 10 }).toUpperCase(),
          },
          {
            Key: "B2CRecipientIsRegisteredCustomer",
            Value: "Y",
          },
          {
            Key: "B2CChargesPaidAccountAvailableFunds",
            Value: faker.number.float({
              min: -5000,
              max: 5000,
              fractionDigits: 2,
            }),
          },
          {
            Key: "ReceiverPartyPublicName",
            Value: `254${faker.number.int({
              min: 700000000,
              max: 799999999,
            })} - ${faker.person.fullName()}`,
          },
          {
            Key: "TransactionCompletedDateTime",
            Value: faker.date
              .recent()
              .toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })
              .replace(/\//g, "."),
          },
          {
            Key: "B2CUtilityAccountAvailableFunds",
            Value: faker.number.float({
              min: 1000,
              max: 50000,
              fractionDigits: 2,
            }),
          },
          {
            Key: "B2CWorkingAccountAvailableFunds",
            Value: faker.number.float({
              min: 100000,
              max: 1000000,
              fractionDigits: 2,
            }),
          },
        ],
      },
      ReferenceData: {
        ReferenceItem: {
          Key: "QueueTimeoutURL",
          Value:
            "https://internalsandbox.safaricom.co.ke/mpesa/b2cresults/v1/submit",
        },
      },
    },
  };

  return mockResp;
};
