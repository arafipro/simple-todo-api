# 【Cloudflare Workers】無料で公開！ Hono ＋ Cloudflare D1でREST APIを作る

## YouTube

[!["【Cloudflare Workers】無料で公開！ Hono＋Cloudflare D1でREST APIを作る"](https://i.ytimg.com/vi/XyjACmtXqj0/maxresdefault.jpg)](https://youtu.be/XyjACmtXqj0)

## 技術選定

- TypeScript
- Hono
- Cloudflare D1
- Cloudflare Workers

## 初期設定

### NodeModuleをインストール

```bash
npm install
```

### データベースを作成

```bash
npx wrangler d1 create todo-api
```

### wrangler.tomlに追記

```toml
[[d1_databases]]
binding = "DB"
database_name = "todo-api"
database_id = "<unique-ID-for-your-database>"
```

`<unique-ID-for-your-database>`はデータベースを作成したときに出力されるID

### データベースにテーブルを作成

```bash
npx wrangler d1 execute todo-api --remote --file=./schema.sql
```

### APIに接続を許可するURLを指定(CORS)

`src/index.ts`のcorsのoriginに接続を許可するURLを指定する  
配列で複数指定することも可能  
接続を許可するURLを指定する場合は最後のスラッシュ（/）は不要  
例）`http://localhost:8000（/は不要）`    

#### /todos

idを指定しないURLの場合
GETとPOSTでしか使わない

```ts:src/index.ts
app.use(
  "/todos",
  cors({
    origin: ["{許可するURL1}", "{許可するURL2}"],
    allowHeaders: [
    "X-Custom-Header",
      "Upgrade-Insecure-Requests",
      "Content-Type",
    ],
    allowMethods: ["GET", "POST", "OPTIONS"],
		...
  })
);
```

#### /todos/*

idを指定したURLの場合
GETとPUTとDELETEでしか使わない

```ts:src/index.ts
app.use(
  "/todos/*",
  cors({
    origin: ["{許可するURL1}", "{許可するURL2}"],
    allowHeaders: [
      "X-Custom-Header",
      "Upgrade-Insecure-Requests",
      "Content-Type",
    ],
    allowMethods: ["GET", "PUT", "DELETE", "OPTIONS"],
		...
  })
);
```

#### 参考資料

Honoドキュメント：
https://hono.dev/middleware/builtin/cors

参考サイト：
https://zenn.dev/camomile_cafe/articles/b11a3f9b8f2f1d
