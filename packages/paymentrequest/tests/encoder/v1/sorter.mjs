import {test} from "node:test";
import assert from "node:assert";
import {MoneroPaymentRequestEncoder} from "../../../dist/index.js";

test("v1_sorter", () => {
  const json = JSON.stringify({c: 1, d: 1, a: 1, b: 1}, MoneroPaymentRequestEncoder.v1_sorter);
  assert.strictEqual(json, `{"a":1,"b":1,"c":1,"d":1}`);
})