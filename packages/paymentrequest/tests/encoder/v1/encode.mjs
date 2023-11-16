import {test} from "node:test";
import {MoneroPaymentRequestEncoder} from "../../../dist/index.js";
import assert from "node:assert";

test("v1_encode", () => {
  const encoded = MoneroPaymentRequestEncoder.v1_encode("Hello, world!");

  assert.strictEqual(encoded, "H4sIAAAAAAACA1PySM3JyddRKM8vyklRVAIAzfrLaA8AAAA=")
})