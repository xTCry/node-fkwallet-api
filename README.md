# NodeJS [FKWallet](https://www.fkwallet.ru/docs) API

[![license](https://img.shields.io/npm/l/fkwallet?style=flat-square)](https://github.com/xTCry/node-fkwallet-api/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/v/fkwallet?style=flat-square)](https://npmjs.com/package/fkwallet)
[![downloads](https://img.shields.io/npm/dm/fkwallet?style=flat-square)](https://npmjs.com/package/fkwallet)
[![GitHub](https://img.shields.io/github/stars/xTCry/node-fkwallet-api?style=flat-square)](https://github.com/xTCry/node-fkwallet-api)
[![last commit](https://img.shields.io/github/last-commit/xTCry/node-fkwallet-api?style=flat-square)](https://github.com/xTCry/node-fkwallet-api)

## 📦 Установка

```shell
yarn add fkwallet
```

## 🛠️ Использование

```typescript
import 'dotenv/config';
import { ApiClient, CryptoType } from 'fkwallet';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const main = async () => {
  const api = new ApiClient(
    process.env.WALLET_PROVIDER_FKWALLET_SHOP_ID!,
    process.env.WALLET_PROVIDER_FKWALLET_API_KEY!,
  );

  let time = Date.now();
  const balance = await api.getBalance();
  console.log('balance', balance);
  console.log(`Time: ${Date.now() - time} ms`);

  await sleep(1e3);
  time = Date.now();
  const btcAddressNew = await api.createCryptoAddress(CryptoType.BTC);
  console.log('btcAddressNew', btcAddressNew);
  console.log(`Time: ${Date.now() - time} ms`);

  await sleep(1e3);
  time = Date.now();
  const btcAddress = await api.getCryptoAddress(CryptoType.BTC);
  console.log('btcAddress', btcAddress);
  console.log(`Time: ${Date.now() - time} ms`);

  await sleep(1e3);
  time = Date.now();
  const paymentStatus = await api.getPaymentStatus({ payment_id: 22664540 });
  console.log('paymentStatus', paymentStatus.data.payment_id);
  console.log(`Time: ${Date.now() - time} ms`);
};
main().then();

```
