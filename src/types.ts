export enum ErrorType {
  InvalidPurse = 'InvalidPurse',
  InvalidCard = 'InvalidCard',
  BalanceToLow = 'BalanceToLow',
  CoolDown = 'CoolDown',
  Wait24Hour = 'Wait24Hour',
  Unknown = 'Unknown',
}

export enum ActionType {
  GetBalance = 'get_balance',
  Cashout = 'cashout',
  GetPaymentStatus = 'get_payment_status',
  Transfer = 'transfer',
  OnlinePayment = 'online_payment',
  Providers = 'providers',
  CheckOnlinePayment = 'check_online_payment',

  CreateCryptoAddress_BTC = 'create_btc_address',
  CreateCryptoAddress_LTC = 'create_ltc_address',
  CreateCryptoAddress_ETH = 'create_eth_address',
  GetCryptoAddress_BTC = 'get_btc_address',
  GetCryptoAddress_LTC = 'get_ltc_address',
  GetCryptoAddress_ETH = 'get_eth_address',
  GetCryptoTransaction_BTC = 'get_btc_transaction',
  GetCryptoTransaction_LTC = 'get_ltc_transaction',
  GetCryptoTransaction_ETH = 'get_eth_transaction',
}

export enum CryptoActionType {
  CreateCryptoAddress = 'create_crypto_address',
  GetCryptoAddress = 'get_crypto_address',
  GetCryptoTransaction = 'get_crypto_transaction',
}

export enum CryptoType {
  BTC = 'btc',
  LTC = 'ltc',
  ETH = 'eth',
}

export const cryptoActions: Record<CryptoType, Record<CryptoActionType, ActionType>> = {
  [CryptoType.BTC]: {
    [CryptoActionType.CreateCryptoAddress]: ActionType.CreateCryptoAddress_BTC,
    [CryptoActionType.GetCryptoAddress]: ActionType.GetCryptoAddress_BTC,
    [CryptoActionType.GetCryptoTransaction]: ActionType.GetCryptoTransaction_BTC,
  },
  [CryptoType.LTC]: {
    [CryptoActionType.CreateCryptoAddress]: ActionType.CreateCryptoAddress_LTC,
    [CryptoActionType.GetCryptoAddress]: ActionType.GetCryptoAddress_LTC,
    [CryptoActionType.GetCryptoTransaction]: ActionType.GetCryptoTransaction_LTC,
  },
  [CryptoType.ETH]: {
    [CryptoActionType.CreateCryptoAddress]: ActionType.CreateCryptoAddress_ETH,
    [CryptoActionType.GetCryptoAddress]: ActionType.GetCryptoAddress_ETH,
    [CryptoActionType.GetCryptoTransaction]: ActionType.GetCryptoTransaction_ETH,
  },
};

/** Список доступных валют */
export enum CurrencyType {
  /**
   * WebMoney WMZ *(комиссия 7.00%)*
   *
   * `Z12345678912` **Мин - 10 руб, Макс - 15000 руб**
   */
  WebMoney_WMZ = 2,
  /**
   * QIWI кошелек *(комиссия 4.00%)*
   *
   * `+79261234567` **Мин - 100 руб, Макс - 15000 руб**
   */
  QIWI = 63,
  /**
   * Perfect Money USD *(комиссия 8.00%)*
   *
   * `U1234567` **Мин - 10 руб, Макс - 15000 руб**
   */
  Perfect_Money_USD = 64,
  /**
   * Яндекс.Деньги *(комиссия 3.00%)*
   *
   * `410011812345678` **Мин - 10 руб, Макс - 15000 руб**
   */
  YooMoney = 45,
  /**
   * VISA/MASTERCARD UAH *(комиссия 2.50%)*
   *
   * `4012888812345678` **Мин - 272 руб, Макс - 27227 руб**
   * `4012888812345678` **Мин - 100 UAH, Макс - 10000 UAH**
   */
  Card_EAH = 67,
  /**
   * Perfect Money EUR *(комиссия 6.50%)*
   *
   * `U1234567` **Мин - 10 руб, Макс - 15000 руб**
   */
  Perfect_Money_EUR = 69,
  /**
   * PayPal *(комиссия 3.50%)*
   *
   * `user@site.ru` **Мин - 10 руб, Макс - 15000 руб**
   */
  PayPal = 70,
  /**
   * Мобильный Платеж Мегафон *(комиссия 1.00%)*
   *
   * `+79261234567` **Мин - 10 руб, Макс - 15000 руб**
   */
  Mobile_Megafon = 82,
  /**
   * Мобильный Платеж Билайн *(комиссия 1.00%)*
   *
   * `+79261234567` **Мин - 10 руб, Макс - 15000 руб**
   */
  Mobile_Beeline = 83,
  /**
   * обильный Платеж МТС *(комиссия 1.00%)*
   *
   * `+79261234567` **Мин - 10 руб, Макс - 15000 руб**
   */
  Mobile_MTS = 84,
  /**
   * VISA/MASTERCARD RUB *(комиссия 4.00%)*
   * `4012888812345678` **Мин - 100 руб, Макс - 10000 руб**
   */
  Card_RUB = 94,
  /**
   * Мобильный Платеж Tele2 *(комиссия 1.00%)*
   *
   * `+79261234567` **Мин - 10 руб, Макс - 15000 руб**
   */
  Mobile_Tele2 = 132,
  /**
   * PAYEER USD *(комиссия 4.00%)*
   *
   * `P12345678` **Мин - 712 руб, Макс - 35610 руб**
   * `P12345678` **Мин - 10 USD, Макс - 500 USD**
   */
  PAYEER_USD = 115,
  /**
   * PAYEER RUB *(комиссия 5.50%)*
   *
   * `P12345678` **Мин - 10 руб, Макс - 100000 руб**
   */
  PAYEER_RUB = 114,
  /**
   * FK WALLET RUB *(комиссия 0.00%)*
   *
   * `F123456789` **Мин - 10 руб, Макс - 600000 руб**
   */
  FK_WALLET_RUB = 133,
  /**
   * ADVCASH USD *(комиссия 8.00%)*
   *
   * `123456789` **Мин - 10 руб, Макс - 15000 руб**
   */
  ADVCASH_USD = 136,
  /**
   * ADVCASH RUB *(комиссия 5.00%)*
   *
   * `123456789` **Мин - 10 руб, Макс - 15000 руб**
   */
  ADVCASH_RUB = 150,
  /**
   * QIWI EURO *(комиссия 4.00%)*
   *
   * `+79261234567` **Мин - 100 руб, Макс - 15000 руб**
   */
  QIWI_EURO = 161,
  /**
   * VISA/MASTERCARD KZT *(комиссия 3.00%)*
   *
   * `4012888812345678` **Мин - 166 руб, Макс - 83426 руб**
   * `4012888812345678` **Мин - 1000 KZT, Макс - 500000 KZT**
   */
  Card_KTZ = 186,
}

/** Комиссия от типа валюты *(через какое-то время может измениться)* */
export const commissions: Record<CurrencyType, number> = {
  [CurrencyType.WebMoney_WMZ]: 0.07,
  [CurrencyType.QIWI]: 0.04,
  [CurrencyType.Perfect_Money_USD]: 0.08,
  [CurrencyType.YooMoney]: 0.03,
  [CurrencyType.Card_EAH]: 0.025,
  [CurrencyType.Perfect_Money_EUR]: 0.065,
  [CurrencyType.PayPal]: 0.035,
  [CurrencyType.Mobile_Megafon]: 0.01,
  [CurrencyType.Mobile_Beeline]: 0.01,
  [CurrencyType.Mobile_MTS]: 0.01,
  [CurrencyType.Card_RUB]: 0.04,
  [CurrencyType.Mobile_Tele2]: 0.01,
  [CurrencyType.PAYEER_USD]: 0.04,
  [CurrencyType.PAYEER_RUB]: 0.055,
  [CurrencyType.FK_WALLET_RUB]: 0.0,
  [CurrencyType.ADVCASH_USD]: 0.08,
  [CurrencyType.ADVCASH_RUB]: 0.05,
  [CurrencyType.QIWI_EURO]: 0.04,
  [CurrencyType.Card_KTZ]: 0.03,
};

/** Статус операции вывода из кошелька */
export enum PaymentType {
  /** Новая */
  New = 'New',
  /** В процессе */
  InProcess = 'In process',
  /** Выполнена */
  Completed = 'Completed',
  /** Отменена */
  Canceled = 'Canceled',
}

// Withdrawal

/** Параметры уведомления о выводе */
export type WithdrawalParams = {
  /** Ваш номер кошелька */
  wallet_id: string;
  /** Номер операции */
  order_id: number;
  /** Статус операции */
  status: WithdrawalStatusType;
  /** Сумма */
  amount: number;
  /** Ваш номер операции */
  user_order_id: number;
  /**
   * Контрольная подпись MD5, формируется из параметров
   * `wallet_id`, `order_id`, `user_order_id`, `status`, `amount` и `API ключа`, например
   *
   * ```js
   * md5('F123456789'.'123'.'321'.'1'.'100.12'.'JG68NC68DJC8S0DCH6')
   * ```
   */
  sign: string;
};

/** Статус выплаты */
export enum WithdrawalStatusType {
  /** Успешно выполнен */
  Success = 1,
  /** В процессе */
  Process = 7,
  /** Ошибка */
  Error = 9,
}

// Crypto transaction

/** Уведомление о новой крипто транзакции */
export type CryptoTransactionParams = {
  /**	Ваш номер кошелька */
  wallet_id: string;
  /**	Адрес */
  address: string;
  /**	ID транзакции */
  transaction_id: string;
  /**	Сумма */
  amount: string;
  /**	Комиссия */
  fee: string;
  /**	Количество подтверждений */
  confirmations: string;
  /**	Дата */
  date: string;
  /**
   * Контрольная подпись MD5, формируется из параметров
   * `wallet_id`, `address`, `transaction_id`, `amount`, `fee`, `confirmations`, `date` и `API ключа`, например
   *
   * ```js
   * md5('F123456789'.'567897688tgydscsd8985'.'gb56yu3txdy237dy2xu8d2983tdxy23dux2873d7yx20d'.'0.001'.'0'.'0'.'2017-01-01 23:32:33'.'JG68NC68DJC8S0DCH6')
   * ```
   */
  sign: string;
};

// Responses

export interface IResponseData<T> {
  status: 'info' | 'error' | /* ? */ 'success';
  desc: string;
  data: T;
}

export type ResponseBalance = Record<string, string>;

// Cashout

export type ParamsCashout = {
  /** Кошелек для вывода */
  purse: string;
  /** Сумма вывода */
  amount: number;
  /** Примечание */
  desc: string;
  /** Валюта для вывода */
  currency: CurrencyType;
  /** Отключить автоматический обмен */
  disable_exchange: number | boolean;
  /** Ваш номер операции (целое положительное число) */
  order_id?: number;
  /**
   * При указании номера операции с данным параметром, будет выдана ошибка,
   * если заявка с таким номером операции уже существует
   */
  check_duplicate: number | boolean;
};

export type ResponseCashout = { payment_id: string };

// GetPaymentStatus

export type ParamsGetPaymentStatus = {
  /** Номер операции полученный при отправке запроса */
  payment_id?: number;
  /** **или** ваш номер операции */
  user_order_id?: number;
};

export type ResponseGetPaymentStatus = {
  payment_id?: string;
  user_order_id?: number;
  status: PaymentType;
};

// Transfer

export type ParamsTransfer = {
  /** Кошелек для перевода */
  purse: string;
  /** Сумма перевода */
  amount: number;
};

export type ResponseTransfer = undefined;

// OnlinePayment

export type ParamsOnlinePayment = {
  /** ID услуги */
  service_id: number;
  /** Кошелек для перевода */
  account: string;
  /** Сумма перевода */
  amount: number;
  /** Ваш номер операции (целое положительное число) */
  order_id?: number;
  /**
   * При указании номера операции с данным параметром, будет выдана ошибка,
   * если заявка с таким номером операции уже существует
   */
  check_duplicate?: number | boolean;
};

export type ResponseOnlinePayment = {
  payment_id: string;
};

// Providers

export type ResponseProviders = {
  /** Ид сервиса */
  id: string;
  /**
   * Название сервиса.
   *
   * Например, `"МТС"`, `"Билайн"`
   */
  name: string;
  /**
   * Минимальная сумма перевода
   *
   * Например, `"5.00"`
   */
  min_amount: string;
  /**
   * Комиссия перевода
   *
   * Например, `"0"`
   */
  commission: string;
}[];

// CheckOnlinePayment

export type ParamsCheckOnlinePayment = {
  /** Номер платежа, полученный при отправке */
  payment_id?: number;
  /** **или** ваш номер операции */
  user_order_id?: number;
};

export type ResponseCheckOnlinePayment = {
  payment_id?: string;
  user_order_id?: number;
  status: PaymentType;
};

// CreateCryptoAddress

export type ResponseCreateCryptoAddress = {
  address: string;
};

// GetCryptoAddress

export type ResponseGetCryptoAddress = {
  address: string;
  valid: string;
};

// GetCryptoAddress

export type ResponseGetCryptoTransaction = {
  address: string;
  transaction_id: string;
  amount: string;
  fee: string;
  confirmations: string;
  date: string;
}[];
