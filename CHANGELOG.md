# CHANGELOG

> Taro-MOPS 前端小程序

## 0.2.2 (2018-12-27)

### Bug Fixes

* 修复[easDetai]组件fetch时加入 encodeURIComponent
* 修复[ListContent]组件支持basePath检索不同类型单据
* 修复应收对账单服务层baseUrl取值没经过环境变量的问题
* 修复订单新增页因客户名过长导致的换行显示问题

### Enhances

* [**Model**] 修改 CommonModel 中 `saleStatusAry` 字符串数组 -> 对象数组 (支持样式类名)
* [**Component**] ListComponent组件支持销售出库单状态样式
* [**Page**] 销售出库单详情页新增 审批人和审批原因
* [**Page**] 重构easDetial页面组件，支持多种类型单据显示
* [**Page**] 重构ListPage页中根据状态检索单据
* [**Page**] 重构customerSelect页面，可以复用
* [**Component**] 新增ListHeader、ListContent组件
* [**Component**] 新增CardList组件
* [**Page**] 应收对账单支持Excel阅读
* [**Page**] 更新用户页样式及功能
* [**Page**] 更新用户管理页 搜索、列表
* [**Page**] 更新 用户管理页 用户展示及搜索
* [**Page**] 更新 及时库存页 的表头信息显示

### Features

* [**Page**] 新增EAS销售出库单展示详情页
* [**Page**] 新增EAS客户应收对账单页
* [**Page**] 新增MongoDB用户管理页
* [**Page**] 完成用户新增功能
* [**Page**] 完成销售订单物流信息填写功能

## 0.2.1 (2018-12-09)

### Bug Fixes

* 修复 [AtIcon] 组件在 `Taro` 中不渲染 className 的问题

### Features

* [**Model**] 新增支持 EAS销售出库单状态 的对象数组
* [**Component**] 新增 [ListHeader]、[ListContent] 组件

### Enhances

* 删除 [ListContent] 组件的 totalAmount 属性，由组件内部自动计算，不需要从外部传入

## 0.2.0 (2018-12-08)

### Bug Fixes

* 修改[列表页]生命周期`componentDidShow`为异步函数，防止少数情况加载数据不渲染的问题 (c293590)
* 修复[列表页]`fetchOrders`函数中，在没查询到订单时不更新state的问题 (5c58530)

### Enhances

* 登录页面新增输入框去除左右空格 (0fc10c9)
* 修改抽屉日历的显示不准确 (20542d2)
* 保持后端数据库字段一致，修改订单页、明细页、详情页 `billTags` -> `orderTags` (dec4778)
* 修改标签选择模态框显示问题并复用`handleSearchConfirm`函数 (f3c3a8e)
* 修改同步单据后更新本地orderTags

### Features

* [明细页] 新增根据客户名称、订单号、订单备注查询功能 (bca876d)
* [明细页] 新增根据订单标签选择模态窗并查询功能 (0561cde)
* [明细页] 新增根据日历`Drawer`查询订单功能 (20542d2)
* [明细页] 新增在DatePicker选择完后查询订单功能 (c4407e5)
