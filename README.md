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
