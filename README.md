利用方法
---

先に[cm\-wada\-yusuke/attendance\-management\-server:](https://github.com/cm-wada-yusuke/attendance-management-server)をデプロイしてください。
サーバーのURLを `src/environments/environment.ts` に追加します。

```js
  attendanceApi: {
    baseUrl: 'https://xxxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/v1'
  },
```

その後、起動します。

```bash
> ng serve
```

画面にアクセスし、Slackユーザー名を入力して検索すると、その月の労働時間とサマリが表示されます。
