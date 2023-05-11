## 本地生成https证书
```bash
brew install mkcert
mkcert -install
mkcert local.weidian
```

# deploy 构建镜像

```bash
docker build . -t my-app
```

# run

```bash
docker run -d -p 8090:80 my-app
```
