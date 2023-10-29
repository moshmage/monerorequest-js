import {RandomId} from "./random-id";

export type MoneroPaymentRequestPayload = Record<string, number | string | boolean>

export type MoneroPaymentRequestPayload_V1 = MoneroPaymentRequestPayload & {
  /**
   * The amount field specifies the quantity of the specified currency to be transferred.
   * The actual Monero amount sent will be based on this value and the current exchange rate.
   *
   * @example
   *
   *     "19.99" (for 19.99 USD worth of Monero — assuming "Currency" was set to USD)
   *     "0.5" (for 0.5 XMR — assuming "Currency" was set to XMR)
   * */
  amount: string,

  /**
   * The change_indicator_url is a field designed for large merchants who wish to have the flexibility to request
   * modifications to an existing payment request. It's important to note that the merchant cannot enforce these changes.
   * When a change is requested, all related automatic payments are paused until the customer reviews and either
   * confirms or rejects the changes (canceling the payment request).
   *
   * More information [on the official docs](https://github.com/lukeprofits/Monero_Payment_Request_Standard#change-indicator-url)
   *
   * @example
   *
   *     "" (for small merchants who do not want to use this feature)
   *     "https://www.example.com/api/monero-request"
   *     "https://mywebsite.com/update-monero-payments"
   * */
  change_indicator_url: string,

  /**
   * All payments are made in Monero. The currency field is used to specify the currency in which the payment amount is
   * denominated. This allows merchants to base their prices on a variety of currencies.
   *
   * @example
   *
   *     "USD"
   *     "GBP"
   *     "XMR"
   * */
  currency: string,

  /**
   * The custom_label is a string field allowing users to attach a descriptive label to the payment request.
   * This label can be any text that helps identify or categorize the payment for the user.
   *
   * @example
   *
   *     "Monthly Subscription"
   *     "Donation to XYZ"
   *     "Invoice #12345" (For one-time payments)
   * */
  custom_label: string,

  /**
   * The days_per_billing_cycle field defines the frequency of payments for recurring payments.
   *
   * @example
   *
   *     30 (for monthly payments)
   *     7 (for weekly payments)
   * */
  days_per_billing_cycle: number,

  /**
   * The number_of_payments field indicates how many times a payment will occur.
   *
   * @example
   *
   *     1 (for a one-time payment)
   *     6 (for six scheduled payments)
   *     0 (for payments that will recur until canceled)
   * */
  number_of_payments: number,

  /**
   * The payment_id is a unique identifier generated for the payment request. It is used when generating an integrated
   * address for Monero payments. Merchants can identify which customer made a payment based on this ID, ensuring
   * privacy for the customer.
   *
   * @example
   *
   *      "9fc88080d1d5dc09"
   * */
  payment_id: RandomId,

  /**
   * The sellers_wallet field holds the Monero wallet address where payments will be sent.
   * This address must not be a subaddress since integrated addresses (which combine a Monero address and a payment ID)
   * don't support subaddresses.
   *
   * @example
   *
   *      "4At3X5rvVypTofgmueN9s9QtrzdRe5BueFrskAZi17BoYbhzysozzoMFB6zWnTKdGC6AxEAbEE5czFR3hbEEJbsm4hCeX2S"
   * */
  sellers_wallet: string,

  /**
   * The start_date field indicates when the first payment or subscription should commence.
   *
   * @example
   *
   *     2023-04-26T13:45:33.123Z
   *     2023-10-26T04:55:37.443Z
   * */
  start_date: string
}