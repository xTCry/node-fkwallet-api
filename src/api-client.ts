import axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';
import { stringify } from 'query-string';
import * as types from './types';
import { ResponseError } from './errors';
import { md5 } from './utils';

// TODO: сделать нормализацию возвращаемых параметров к правильным типам

export class ApiClient {
  public static readonly API_URL = 'https://www.fkwallet.ru/api_v1.php';

  private readonly _httpClient: AxiosInstance;

  constructor(public readonly walletId: string, public readonly apiKey: string, apiOptions: AxiosRequestConfig = {}) {
    this._httpClient = axios.create({
      baseURL: ApiClient.API_URL,
      timeout: 10e3,
      ...apiOptions,
    });

    // this._httpClient.interceptors.request.use((config) => {
    //   console.log('config', config);
    //   return config;
    // });
  }

  public async _callApi<T = unknown>(action: types.ActionType, data: any = {}, method: Method = 'POST') {
    try {
      const resp = await this._httpClient.request<types.IResponseData<T>>({
        method,
        data: stringify({
          wallet_id: this.walletId,
          ...data,
          action,
          sign: this.getSign(action, data),
        }),
      });
      if (resp.data.status === 'error') {
        throw new ResponseError(resp.data);
      }
      return resp.data;
    } catch (e) {
      if ((e as any as types.IResponseData<any>).status === 'error') {
        throw new ResponseError(e as types.IResponseData<any>);
      }
      throw e;
    }
  }

  public getSign(action: types.ActionType, payload: any) {
    switch (action) {
      case types.ActionType.GetBalance:
      case types.ActionType.Providers:
      case types.ActionType.CreateCryptoAddress_BTC:
      case types.ActionType.CreateCryptoAddress_LTC:
      case types.ActionType.CreateCryptoAddress_ETH:
      case types.ActionType.GetCryptoAddress_BTC:
      case types.ActionType.GetCryptoAddress_LTC:
      case types.ActionType.GetCryptoAddress_ETH:
        return md5(`${this.walletId}${this.apiKey}`);
      case types.ActionType.Cashout:
        return md5(`${this.walletId}${payload.currency}${payload.amount}${payload.purse}${this.apiKey}`);
      case types.ActionType.GetPaymentStatus:
      case types.ActionType.CheckOnlinePayment:
        return md5(`${this.walletId}${payload.payment_id || payload.user_order_id}${this.apiKey}`);
      case types.ActionType.Transfer:
        return md5(`${this.walletId}${payload.wallet_id}${payload.purse}${this.apiKey}`);
      case types.ActionType.OnlinePayment:
        return md5(`${this.walletId}${payload.amount}${payload.account}${this.apiKey}`);
      default:
        return null;
    }
  }

  /**
   * Проверяет подпись уведомления о выплате
   * @param body Объект уведомления
   * @returns {boolean} Признак валидности
   */
  public checkSignPayment(body: types.PaymentParams) {
    const compareSign = md5(
      `${this.walletId}${body.order_id}${body.user_order_id}${body.status}${body.amount}${this.apiKey}`,
    );

    return body.sign === compareSign;
  }

  /**
   * Проверяет подпись уведомления о новой крипто транзакции
   * @param body Объект уведомления
   * @returns {boolean} Признак валидности
   */
  public checkSignCryptoTransaction(body: types.CryptoTransactionParams) {
    const compareSign = md5(
      `${this.walletId}${body.address}${body.transaction_id}${body.amount}${body.fee}${body.confirmations}${body.date}${this.apiKey}`,
    );

    return body.sign === compareSign;
  }

  /**
   * Получает баланс кошелька
   *
   * *Пример возвращаемых данных*
   * ```json
   * {"status":"info","desc":"Wallet balance","data":{"RUB":"50.00","USD":"0.00","EUR":"0.00"}}
   * ```
   */
  public async getBalance() {
    return await this._callApi<types.ResponseBalance>(types.ActionType.GetBalance);
  }

  /**
   * Выводит средства из кошелька
   *
   * *Пример возвращаемых данных*
   * ```json
   * {"status":"info","desc":"Payment send","data":{"payment_id":"543273"}}
   * ```
   */
  public async cashout(params: types.ParamsCashout) {
    return await this._callApi<types.ResponseCashout>(types.ActionType.Cashout, params);
  }

  /**
   * Получает статус операции вывода из кошелька
   *
   * *Пример возвращаемых данных*
   * ```json
   * {"status":"info","desc":"Order status","data":{"payment_id":"543273","status":"Canceled"}}
   * ```
   */
  public async getPaymentStatus(params: types.ParamsGetPaymentStatus) {
    return await this._callApi<types.ResponseGetPaymentStatus>(types.ActionType.GetPaymentStatus, params);
  }

  /**
   * Переводит на другой кошелек
   *
   * *Пример возвращаемых данных*
   * ```json
   * {"status":"info","desc":"Payment send"}
   * ```
   */
  public async transfer(params: types.ParamsTransfer) {
    return await this._callApi<types.ResponseTransfer>(types.ActionType.Transfer, params);
  }

  /**
   * Оплата онлайн услуг
   *
   * *Пример возвращаемых данных*
   * ```json
   * {"status":"info","desc":"Payment send","data":{"payment_id":"543273"}}
   * ```
   */
  public async onlinePayment(params: types.ParamsOnlinePayment) {
    return await this._callApi<types.ResponseOnlinePayment>(types.ActionType.OnlinePayment, params);
  }

  /**
   * Получает список сервисов для онлайн оплаты
   *
   * *Пример возвращаемых данных*
   * ```json
   * {
   *   "status": "info",
   *   "desc": "Providers list",
   *   "data": [
   *     {
   *       "id": "1",
   *       "name": "МТС",
   *       "min_amount": "5.00",
   *       "commission": "0"
   *     },
   *     {
   *       "id": "2",
   *       "name": "Билайн",
   *       "min_amount": "5.00",
   *       "commission": "0"
   *     }
   *   ]
   * }
   * ```
   */
  public async providers() {
    return await this._callApi<types.ResponseProviders>(types.ActionType.Providers);
  }

  /**
   * Проверяет статус онлайн платежа
   *
   * *Пример возвращаемых данных*
   * ```json
   * {"status":"info","desc":"Order status","data":{"payment_id":"6532323","status":"Canceled"}}
   * ```
   */
  public async checkOnlinePayment(params: types.ParamsCheckOnlinePayment) {
    return await this._callApi<types.ResponseCheckOnlinePayment>(types.ActionType.CheckOnlinePayment, params);
  }

  /**
   * Создает крипто адрес
   *
   * **Адрес резервируется на 3 дня, для продления резерва необходимо повторно отправить данный запрос**
   * *(не ранее, чем через 24 часа с момента резерва).*
   *
   * *Пожалуйста не спамьте запросами, достаточно отправлять запрос раз в 2 дня, чтобы адрес постоянно был зарезервирован за вами*
   *
   * *Пример возвращаемых данных*
   * ```json
   * {"status":"info","desc":"Address created","data": {"address": "4eftk98j9h76g5454er5ty8uh3dwec"}}
   * ```
   */
  public async createCryptoAddress(crypo: types.CryptoType) {
    return await this._callApi<types.ResponseCreateCryptoAddress>(
      types.cryptoActions[crypo][types.CryptoActionType.CreateCryptoAddress],
    );
  }

  /**
   * Получает крипто адрес
   *
   * *Пример возвращаемых данных*
   * ```json
   * {
   *   "status": "info",
   *   "desc": "Адрес 46D98a09Fd204C9C72d2A2Dd3563fF5495aD41D0 успешно зарезервирован до 2009-01-03 21:15:42",
   *   "data": {
   *     "address": "46D98a09Fd204C9C72d2A2Dd3563fF5495aD41D0",
   *     "valid": "2020-05-16 14:54:52"
   *   }
   * }
   * ```
   */
  public async getCryptoAddress(crypo: types.CryptoType) {
    return await this._callApi<types.ResponseGetCryptoAddress>(
      types.cryptoActions[crypo][types.CryptoActionType.GetCryptoAddress],
    );
  }

  /**
   * Получает информацию по крипто транзакции
   *
   * *Пример возвращаемых данных*
   * ```json
   * {
   *   "status": "info",
   *   "desc": "",
   *   "data": [
   *     {
   *       "address": "4eftk98j9h76g5454er5ty8uh3dwec",
   *       "transaction_id": "gb56yu3txdy237dy2xu8d2983tdxy23dux2873d7yx20d",
   *       "amount": "0.001",
   *       "fee": "0",
   *       "confirmations": "4",
   *       "date": "2017-01-01 23:32:33"
   *     }
   *   ]
   * }
   * ```
   */
  public async getCryptoTransaction(crypo: types.CryptoType) {
    return await this._callApi<types.ResponseGetCryptoTransaction>(
      types.cryptoActions[crypo][types.CryptoActionType.GetCryptoTransaction],
    );
  }
}
