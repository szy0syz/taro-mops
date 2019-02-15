# taro-mops

    一个 Taro + Dva 框架的业务系统小程序。

## Introduction

全栈项目前端业务系统的实现。主要功能分别分为MongoDB中的订单、用户、流程、审批管理和金蝶EAS系统中出库、应收、报表管理。

## Tech Stack

* `Taro`：一套遵循 React 语法规范的 多端开发 解决方案
* `Dva`：Lightweight front-end framework based on redux and redux-saga
* `Webpack`
* `SCSS`
* `echarts`

## Top Features

* ECharts数据可视化，支持金蝶EAS系统报表：`销售统计`、`商品毛利`、`区域销售`、`即时库存`、`*事物收发汇总表`
* 复杂报表导出：`Excel` / `PDF`
* 商品二维码扫码填单

## 环境

> ✔️ 开发环境：macOS, Version 10.12.6 + NodeJS v10.13.0 + Taro v1.2.13

> ✔️ 开发环境：Windows 10 Enterprise LTSB + NodeJS v10.13.0 + Taro v1.2.13

## TODO

* [x] 🙂 ~~统一后端SqlServer与Mongodb字段差异，重构 `ListContent` 组件~~
* [x] 🙂 ~~重构 `SearchHeader` 组件~~