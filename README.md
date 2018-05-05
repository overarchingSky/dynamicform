# 可配置动态表单

## 示例：https://overarchingsky.github.io/dynamicform/#/aorto-arteritis

## 文档（doc）

### 表单属性

title 表单标题
fields 字段集，eg:[{name:'demoFiled',type:'text',default:'测试数据'...}...]
multiple 如果为 true，该表单数据为多条记录
slug 表单的 key（同类表单唯一，如用户基本信息表单）
api：（全局）选项增删改查的地址，eg：
{
add:**_,
delete:_**,
update:**_,
get:_**
},
如果某个字段中配置了此项，则使用字段中的配置
default：multiple 为 true 时可用，Array,指定表格的默认值
defaultRows： multiple 为 true 时可用，Number，指定表格默认渲染的行数（优先级低于上述 default 属性）

### 字段属性

### 表单版本控制（后台）

id 表单 id（唯一）
version 表单版本号，应为大于 0 的整数（推荐每次表单被编辑后递增 1，同时生成一个新的 id，这样同一个表单（slug 相同的表单）可存在多个版本，方便已经上线的项目兼容老版本表单数据）

#### tip

为了达到兼容老版本表单的需求，在表单提交的数据时同时提交了表单 id 和 slug，这样，在查看已提交表单的详情数据时，可通过该 id 获取其对应表单的配置，实现了老数据在对应老版本的表单渲染，从而避免值和表单版本不一致的尴尬。
