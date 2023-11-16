import {test} from "node:test";
import assert from "node:assert";
import {MoneroPaymentRequestDecoder} from "../../../dist/index.js";

test("v1_decode() version 1", () => {
  const code = "monero-request:1:H4sIAAAAAAACAy1P2U7DMBD8FeTnHjlLk7e0tEigItEWKH2xHHvbWPgIPmgTxL/jIJ52d2Z2ducbEam9cqhEcTEpCjRCtCHqDJgrxilx2mBvRKAvl8sErkS2AiZUyylp+VRqBUaPDXx6sG7Y9caAol3Qv+zu/gDrtMSC1DCYbLqbna8tNbx1XKsgYKSzuAWDay4EV2dMOyoAlWk0QsrLOjD6hFvSSVDOojLA/wPmLDgWJzqfR/OIxSxnNBoCWBACjMUXEuqQLKtcesjN12vX7vXpLD08FbZ4dqZnW8gXHtbGflRHHt8u9Hvd9J3Vfa8368Wsf1P7R3a/nFXXVVWvVjnt19u0Cd1DbWXWLOGQ7IaTjhiHGXHhc5RESTqOsnEy28dpmeVlmh7Rzy/y6ViJagEAAA==";

  assert.deepStrictEqual(MoneroPaymentRequestDecoder.fromCode(code), {
    amount: '19.99',
    change_indicator_url: 'www.example.com/api/monero-request',
    currency: 'USD',
    custom_label: 'My Subscription',
    days_per_billing_cycle: 30,
    number_of_payments: 0,
    payment_id: '9fc88080d1d5dc09',
    sellers_wallet: '4At3X5rvVypTofgmueN9s9QtrzdRe5BueFrskAZi17BoYbhzysozzoMFB6zWnTKdGC6AxEAbEE5czFR3hbEEJbsm4hCeX2S',
    start_date: '2023-04-26T13:45:33Z'
  })
});