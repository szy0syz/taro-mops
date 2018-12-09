# CHANGELOG

> Taro-MOPS 前端小程序

## 0.2.1 (2018-12-09)

* [ ] 打算重构billheader 和 billbody

## 0.2.0 (2018-12-08)

### Features

* [CommonModel] 新增支持 EAS销售出库单状态 的对象数组

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
