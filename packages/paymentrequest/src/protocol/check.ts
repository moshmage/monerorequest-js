import {SupportedCurrencies} from "../utils/constants/supported-currencies";

import {AddressCheckers} from "../types/address-checkers";
import {AddressValidCharsRegExp} from "../utils/constants/address-valid-chars";
import {RandomId} from "../types/random-id";
import {RandomChoicePool} from "../utils/constants/random-choice-pool";
import {Currencies} from "../types/currencies";

export class MoneroPaymentRequestValidator {

  static isValidName(name: string) {
    return typeof name === "string"
  }

  /**
   * checks SupportedCurrencies constant against the provided value
   *
   * @example
   * isCurrencyIsSupported("XMR") // true
   * isCurrencyIsSupported("USD") // true
   * isCurrencyIsSupported(["XMR", "USD"]) // true
   * isCurrencyIsSupported(["EUR"]) // false
   * isCurrencyIsSupported("EUR") // false
   */
  static isCurrencyIsSupported(currency: Currencies|Currencies[]|string|string[]) {
    if (typeof currency === "string")
      currency = [currency];

    return currency.every(_currency => SupportedCurrencies.includes(_currency as Currencies))
  }


  static isWalletAddress(address: string,
                  allowStandard = true,
                  allowIntegratedAddress = true,
                  allowSubAddress = false) {

    const allowedFirstChar = [];
    if (allowStandard)
      allowedFirstChar.push(AddressCheckers.FirstCharStandard);
    if (allowIntegratedAddress)
      allowedFirstChar.push(AddressCheckers.FirstCharIntegrated);

    if (!allowedFirstChar.includes(+address[0]))
      return false;

    const allowedLengths = [];
    if (allowStandard)
      allowedLengths.push(AddressCheckers.LengthForStandardAddress);
    if (allowIntegratedAddress)
      allowedLengths.push(AddressCheckers.LengthForIntegratedAddress);

    if (!allowedLengths.includes(address.length))
      return false;

    return address.match(AddressValidCharsRegExp);
  }


  static isPaymentId(id: RandomId) {
    return typeof id === "string"
      && id.length === RandomChoicePool.length
      && !!id.match(new RegExp(`^[${RandomChoicePool}]+$`))
  }

  /**
   *
   * @example
   * isValidDate("2023-10-29T10:31:43.459Z") // true
   * isValidDate("29/10/2023, 10:32:03") // false
   * isValidDate("Sun, 29 Oct 2023 10:32:33 GMT") // false
   */
  static isValidDate(date: string) {
    if (typeof date !== "string")
      return false;

    /** string might not be in date format, so try catch it */
    try {
      const _date = new Date(date);

      /** Check if UTC by offset and that the provided string matches the one from Date object */
      return _date.getTimezoneOffset() === 0 && _date.toISOString() === date;
    } catch (_) {
      return false;
    }
  }

  /**
   *
   * @example
   * isValidNumber("1.2") // true
   * isValidAmount("1,2") // true
   * isValidAmount(1.2) // false
   * isValidAmount("1,2,2") // false
   */
  static isValidAmount(amount: string): boolean {
    if (typeof amount !== "string")
      return false;

    /** cast the given string to number, replace commas to dots, and check if the result is a number */
    return !isNaN(+amount.replace(/,/,"."));
  }

  static isNumberAndBiggerThanZero(number: number) {
    return typeof number === "number" && number >= 0;
  }

  static isValidDaysPerBillingCycle(days: number) {
    return MoneroPaymentRequestValidator.isNumberAndBiggerThanZero(days);
  }

  static isValidNumberOfPayments(numberOfPayments: number) {
    return MoneroPaymentRequestValidator.isNumberAndBiggerThanZero(numberOfPayments);
  }

  static isValidChangeIndicatorUrl(url?: string) {
    if (!url)
      return true;

    if (typeof url !== "string")
      return false;

    try {
      const _url = new URL(url);
      return !!(_url.protocol && _url.host);
    } catch {
      return false;
    }
  }

}