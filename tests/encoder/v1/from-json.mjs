import {test} from "node:test";
import assert from "node:assert";
import {MoneroPaymentRequestEncoder} from "../../../dist/index.js";

test("fromJson() version 1", () => {
  const data = {
    "custom_label": "My Subscription",
    "sellers_wallet": "4At3X5rvVypTofgmueN9s9QtrzdRe5BueFrskAZi17BoYbhzysozzoMFB6zWnTKdGC6AxEAbEE5czFR3hbEEJbsm4hCeX2S",
    "currency": "USD",
    "amount": "19.99",
    "payment_id": "9fc88080d1d5dc09",
    "start_date": "2023-04-26T13:45:33Z",
    "days_per_billing_cycle": 30,
    "number_of_payments": 0,
    "change_indicator_url": "www.example.com/api/monero-request",
  }

  assert.strictEqual(MoneroPaymentRequestEncoder.fromJson(data, 1), "monero-request:1:H8KLCAAAAAAAAgMtT8OZTsODMBDDvBXDpMOnHjlLwpPCt8K0wrRIwqAiw5EWKH3CsRx7w5tYw7gIPmgTw4TCv8OjIMKedndmdnbDpxsRwqnCvXLCqERxMSkKNELCtCHDqgzCmCvDhilxw5pgb0TCoC/Cl8OLBMKuRMK2AiZUw4spacO5VGoFRsKPDXx6wrBuw5jDtcOGwoDCol3DkMK/w6zDrsO+AMOrwrTDhMKCw5QwwphswrrCm8Kdwq8tNcK8dVzCqyBgwqTCs8K4BcKDay4EV2dMOyoAwpVpNELDisOLOjDDusKEW8OSSVDDjsKiMsOAw78Dw6YsOBYnOsKfR8OzwojDhSxnNBoCWBACwozDhRcSw6rCkCzCq1x6w4jDjcOXa8OXw67DtcOpLD08FcK2eHbCpmdbw4gXHsOWw4Z+VEcew58uw7R7w53DtMKdw5V9wq83w6vDhcKsf1PDu0d2wr/CnFXDl1VVwq9WOcOtw5fDm8K0CcOdQ21lw5Ysw6HCkMOswobCk8KOGMKHGXHDoXPClERJOsKOwrJxMsObw4dpwpnDpWXCmh7DkcOPL8Oyw6lYwolqAQAA");
})