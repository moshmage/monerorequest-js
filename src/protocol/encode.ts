import {Errors} from "../utils/constants/errors";
import {gzip} from "pako";
import type {MoneroPaymentRequestPayload, MoneroPaymentRequestPayload_V1} from "../types/payment-request-payload";
import type {EncodedPaymentRequest} from "../types/encoded-payment-request";

export class MoneroPaymentRequestEncoder {
  static fromJson(data: MoneroPaymentRequestPayload_V1, version = 1): EncodedPaymentRequest {
    if (!version)
      throw new Error(Errors.NoEncoderVersionProvided);

    let encoded = "";

    switch (version) {
      case 1:
        encoded = encoded.concat(MoneroPaymentRequestEncoder.v1_encode(data));
        break;
      default:
        throw new Error(Errors.unknownEncoderVersion);
    }

    return `monero-request:${version}:${encoded}`;
  }

  /**
   * sort json keys alphabetically
   */
  static v1_sorter(_key: string, value: string|number|object) {
    if (typeof value === "object" && value !== null) {
      const _sorted = {};
      Object.keys(value).sort().forEach(k => _sorted[k] = value[k])
      return _sorted;
    }

    return value;
  }

  static v1_encode(data: MoneroPaymentRequestPayload): string {

    /** convert the json data to string and sort it */
    const _data = JSON.stringify(data, MoneroPaymentRequestEncoder.v1_sorter);

    /** compress using pako */
    const compressed = gzip(new TextEncoder().encode(_data), {level: 9, windowBits: 31});

    /** return a base64 string */
    return Buffer.from(String.fromCharCode.apply(null, new Uint8Array(compressed))).toString("base64");
  }
}