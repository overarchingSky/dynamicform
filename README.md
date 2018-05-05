# 可配置动态表单

## 示例：https://overarchingsky.github.io/dynamicform/#/aorto-arteritis

## 文档（doc）

### 表单属性
name|描述  
-|-
title|表单标题  
fields|字段集，同时支持在字段中配置此字段，进行嵌套，eg:```[{name:'demoFiled',type:'text',default:'测试数据'...}...]```
multiple |如果为 true，该表单数据为多条记录  
slug |表单的 key（同类表单唯一，如用户基本信息表单）  
api（全局）|选项增删改查的地址，eg：```{add:**_,delete:_**,update:**_,get:_**},```如果某个字段中配置了此项，则使用字段中的配置
default|multiple 为 true 时可用，Array,指定表格的默认值
defaultRows | multiple 为 true 时可用，Number，指定表格默认渲染的行数（优先级低于上述 default 属性）

### 字段属性
带星号的为必需字段  

name|二级属性名称|描述|默认值
-|-|-|-
label	||该字段的名称（用于显示的标签）|
description	|| 字段意义的描述|
placeholder||	空白时的输入提示	|
*type	|| 该字段的类型值（参照字段类型定义表）|  
*name	|| 字段的key，推荐首字母小写，多个单词采用驼峰命名。|  
required ||该字段是否为必填字段|false
editable||该字段是否可编辑|true
multiple||该字段是否为多个值，如果为多个，则默认使用table布局（table形式的表单），否则使用form布局（即普通形式的表单）|false
enAbleLabel||在multiple为false时候，配置字段是否显示label|	true
labelStyle||label的排版方式：inline单行显示，block，多行显示|inline
default||字段默认值|null
visible||该字段是否可见|true
rely||该字段和其他字段的依赖关系|null
||formula|该字段的字段值计算公式，例如计算年龄：DAYS(TODAY()-$birthday#)|null
||fields|该字段依赖的其他字段的字段名数组，表单内依赖：[String],跨表单依赖：[Object]，eg：1.[{name:'fieldName',position:'client',formId:'***'}]，此类型需要将被依赖表单的值从value属性传入2.[{name:'fieldName',position:'client-extra']，此类型会从extra参数中查找依赖的属性值（extra参数接收一个键值对构成的对象，其键名为被依赖的字段名）3.远程依赖：Object,eg:（目前尚未实现）eg:```[{name:'fieldName',position:'remote',formId:'***'}]```|null
||visibility|该字段的显示条件，可通过公式控制字段是否显示以实现联动（值为一个字符串计算公式）|null
||immediate|是否在表单初始化时触发一次公式，boolean类型。注意，如果该公式是为了控制显示（即rely中配置了visibility字段），则immediate会默认为true，这是为了在值回填到表单时，能够立即触发隐藏的字段或选项显示。反之，则默认为false。设置为true，将给初始化带来更大的性能开销，因此，采用了两种默认策略，将true的情况控制在最小的范围。|如果配置了visibility字段，则默认true，否者默认false
validator	||该字段的数据验证公式|null
||message|验证失败时提示的文字信息|null
||formula|该字段的字段值验证公式|null
options||配置下拉框、checkbox，radio等选择型输入类型选项可用值，例如：```[{"label": "阴","value": 1},{"label": "阳","value": 2}]```|null
||rely|选项也可以配置依赖关系，一般用于控制选项的可见性，如：```[{"label": "阴","value": 1,visible: false,rely: {fields: ["demoFiled"],visibility: "'$demoFiled#'=='测试选项'"}},...]```|null
~~optionsName~~||~~（需要配置api属性）远程服务器上，选项组的名称，在下拉框、checkbox，radio等选择型输入类型中配置，用来取代options，会请求api配置项中，get字段所对应地址上名为optionsName所配置值的一组枚举（选项）~~|~~null~~
unit ||字段单位，对于文本或数字类型字段，可以指定单位，例如“天”，或者“ml”|	null
display||为单个字段自定义显示效果|	null
||~~formSize~~|~~字段在表单里的输入框大小，可选值为mini/small/large~~|~~large~~
||layout|强制指定使用的布局form/table，默认取决于multiple字段，multiple=true，则默认table布局，否则默认form布局|
||style|设置某个字段的特殊样式，例如：```{"min-width": 200}```|
fields||设置一组子字段，同表单属性中的fields，也支持无限嵌套|	null
isLockedField||配置在单个字段定义中，指示该字段及其值是否另外存一份到property中（property格式为key-value对象，一般指定了列表中显示的字段及数据），Boolean类型，配置为true则该字段会存到stash（又名property），stash的值会在表单on-value-change事件中抛出（该事件第一个参数为整个表单的值，第二个为stash，即property的值）|false
highlightRow||仅在表格布局（table）生效，指定高亮的行，使用方式：1.Number形式:5，2.Object形式：```{rowIndex:5,class:'success-row'}```3.Array形式：```[1,3,5,6,7,8]```或者```[{rowIndex:5,class:'success-row'}]```或者混用```[1,2,5,{rowIndex:6,class:'success-row'}]```其中class用于指定样式。注意，这里指定的class需要自己实现，另外行号从0开始计|默认使用dynamic-table-form-highlight-row样式
fixed||仅表格形式（table-form）生效，配置在字段上，指定是否固定该列而不随横向滚动条滚动|false

### 表单字段输入类型

name|二级配置|描述|默认值
-|-|-|-
text||单行文本|
number||数字|
textarea||文本框，该类型字段在输入时为多行输入|
select||下拉选择，可根据用户的输入查询备选项，最后保存选项的值（不保存选项文本）|
||allowInput|是否允许自己输入|false
||multiple|是否允许多选|false
SelectWidthInput||带有input输入框的下拉选择类型|参见select
||showExtraInput|指定出现input框时，下拉框选中项的值（如果该选项没有value，则为label）|
selectWithAdd||可新增选项到远程服务器的下拉框|
||*api|选项增删改查的地址，eg：```{add:***,delete:***,update:***,get:***}```如果项目中所有字段增删改查地址都一样，此字段可在表单属性中配置，但优先级低于在字段内配置|null
||optionsName|选项组的名字|
~~autocomplete~~||~~自动完成型字段，可根据用户的输入自动查询备选项，最后仅保存选项的文本。~~|
date||日期，通过一个日期选择器选择日期或时间，统一存储为单位为毫秒的unix时间戳|
||dateType|日期选择的类型，可以是date, time, 或者datetime|date
subform||子字段组类型，配置为此类型后，必须配置fields字段|
address||地址选择|

### 使用远程选项  
select、radio等选择类型选项可通过在字段上配置options属性来指定，除此之外，还可使用optionsName + api的方式来配置，即从远程服务器上获取选项，使用这种方式，需要后台配合写好选项增、查的接口，其中增加的接口，要接收一个如下格式的参数：```[{name: "手术名称", label: "阿斯顿发生", value: "阿斯顿发生"}...]```，其中name为选项组的名称。一组选项应该具有一个名称，该名称即为optionsName值，本组件内部通过调用api配置的接口地址，并传递optionsName作为参数获取选项。

### 表单版本控制（后台）
name|描述  
-|-
id |表单 id（唯一）
version| 表单版本号，应为大于 0 的整数（推荐每次表单被编辑后递增 1，同时生成一个新的 id，这样同一个表单（slug 相同的表单）可存在多个版本，方便已经上线的项目兼容老版本表单数据）

#### tip

为了达到兼容老版本表单的需求，在表单提交的数据时同时提交了表单 id 和 slug，这样，在查看已提交表单的详情数据时，可通过该 id 获取其对应表单的配置，实现了老数据在对应老版本的表单渲染，从而避免值和表单版本不一致的尴尬。
