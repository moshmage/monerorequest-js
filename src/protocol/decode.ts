import {EncodedPaymentRequest} from "../types/encoded-payment-request";
import {Errors} from "../utils/constants/errors";
import {inflate} from "pako";

export class MoneroPaymentRequestDecoder {
  static fromCode(paymentRequest: EncodedPaymentRequest) {
    const [prefix, version, data] = paymentRequest.split(`:`);

    if (typeof version !== "number")
      throw new Error(Errors.DecoderVersionIsNotANumber);

    let _data = null;

    switch (+version) {
      case 1:
        _data = MoneroPaymentRequestDecoder.v1_decode(data);
        break;
      default:
        throw new Error(Errors.UnknownDecoderVersion);
    }

    return _data;
  }

  static v1_decode(data: string) {
    return JSON.parse(inflate(Buffer.from(data, "base64"), {to: "string"}));
  }


}