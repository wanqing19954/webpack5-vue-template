## 2022-8-18

- 本地开发支持 http2

  - 参考链接：[参考链接](https://gist.github.com/Grawl/bd0096b49276934c807b4a74088b081c)
  - 本地 host 配置

    ```js
    127.0.0.1 local.weidian

    brew install mkcert

    mkcert -install
    // devServer配置
    const devServer = {
      host: 'local.weidian',
      server: {
    	  type: 'spdy', //开启http2
    	  options: {    // 开启https
    		  key: fs.readFileSync(`${root}/local.weidian-key.pem`),
    		  cert: fs.readFileSync(`${root}/local.weidian.pem`),
    	  },
      }
    }
    ```

- 支持 typescript

  ```js
  pnpm add ts-loader typescript  fork-ts-checker-webpack-plugin
  ```

- eslint 配置

  ```js
  pnpm add @vue/eslint-config-typescript eslint-plugin-prettier eslint-config-prettier
  ```
