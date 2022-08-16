## compiler hooks

-   `entryOption` (SyncBailHook)

    -   回调参数：context, entry
    -   在 webpack 选项中的 entry 被处理过之后调用。

-   `run` (AsyncSeriesHook)

    -   回调参数：`compiler`
    -   在开始读取 `records` 之前调用。

-   `compilation`(SyncHook) (compilation 创建之后执行。)

    -   回调参数：`compilation`, compilationParams

    ```js
    compiler.hooks.compilation.tap(PluginName, (compilation) => {
    	compilation.hooks.processAssets.tap({ name: PluginName }, (assets) => {})
    })
    ```

-   `emit` (AsyncSeriesHook)

    -   回调参数：`compilation`
    -   输出 asset 到 output 目录之前执行。这个钩子 不会 被复制到子编译器。

-   `done` (AsyncSeriesHook)
    -   回调参数：`stats`
    -   在 compilation 完成时执行。

## compilation hooks

-   optimize

    -   优化阶段开始时触发。

-   processAssets
    -   Hook 参数：
        -   `name`: string — 插件名称
        -   `stage`: Stage — a stage to tap into (see the list of supported stages below)
        -   `additionalAssets`?: true | (assets, [callback]) => (void | Promise<void>) — a callback
            for additional assets (see below)
    -   回调参数
        -   assets: { [pathname: string]: Source } — 普通对象，其中 key 是 asset 的路径名，value 是
            asset 的数据，具体的代表请参考 Source。
    ```js
    compilation.hooks.processAssets.tap(
    	{
    		name: 'MyPlugin',
    		stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS // see below for more stages
    	},
    	(assets) => {
    		console.log('List of assets and their sizes:')
    		Object.entries(assets).forEach(([pathname, source]) => {
    			console.log(`— ${pathname}: ${source.size()} bytes`)
    		})
    	}
    )
    ```

## compilation 方法

-   emitAssets `function (file, source, assetInfo = {})`

    > `输出一个新文件`

    -   file - 资源名称。
    -   source - 资源来源。
    -   assetInfo - 附加资源信息。

-   finish `function (callback)`
    > `完成编译并调用给定的回调`
    -   callback - 编译完成之后调用的函数。
