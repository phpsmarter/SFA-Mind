This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

{{TOC}}

## Scientific Ameraica  Mind 
### 其实早想做这个抓取了,对于科学美国人 心智 子刊一直比较欣赏.现在顺便做一个抓取的工具把,简单显示一下有关的文章.

###  在目录下创建 Graphcool数据库 
NewServer:https://api.graph.cool/simple/v1/cjdcrl3sl351201460qwi1f1w
前面还创建了一个数据库但是,目前不能添加 Cat,所以又新建了一个

`console 地址: https://console.graph.cool/NewServer/schema/types`

`schema`的类型
```
#用于列表显示
type  Mind @model {
  id: ID! @isUnique
  title: String @isUnique  ##添加inUnique,防止重复添加
  cat:String
  url: String
  img: String
  brief:String
  meta:String
  content:Content @relation(name:"ContentOfMind")
}

type Content @model{
  id:Id! @isUnique
  category:String!
  title:String
  img:String
  content:String 
  authoradhoc:String
  authorname:String
  authordesc:String
  mind:Mind @relation(name:"ContentOfMind")
}
```

### graphql  服务器搭建, 
```
'use strict'
/*****************
 *  从medium抓取一下感兴趣的内容，放到app中
 * 这个版本改用从meduium中找到的一个方法来实现多个异步流程的
 * compose方法。 网址是 https://medium.com/@jperasmus11/roll-your-own-async-compose-pipe-functions-658cafe4c46f
 * gist代码是 https://gist.githubusercontent.com/jperasmus/fbbcccb387896ff7db2c58797ebb76da/raw/c995e3c34bb6d5b566f3289107b267b8fa6e28d8/compose.js
 *
 * const compose = (…functions) => input => functions.reduceRight((chain, func) => chain.then(func),     Promise.resolve(input));

// Functions fn1, fn2, fn3 can be standard synchronous functions or return a Promise
compose(fn3, fn2, fn1)(input).then(result => console.log(`Do with the ${result} as you please`))
}

在给上面函数添加时间日志的时候 实际在包装的时候是给每个函数添加await标志， 想象如果直接在compose里就给每个函数天剑await标志呢？ 所以就是这个尝试版本
 * *******************/

import express from 'express'
// import bodyParser from 'body-parser'
import cors from 'cors'
import * as R from 'ramda'
import { request } from 'graphql-request'
const SAMindUrl = 'https://www.scientificamerican.com/cognition/?page=1'
const gDomApi = 'http://gdom.graphene-python.org/graphql'
const URL = 'http://localhost'
const PORT = 3001
// graphcool endpoint
const api = 'https://api.graph.cool/simple/v1/cjdcrl3sl351201460qwi1f1w'
// graphql模板
const dataArray = []
const mu = `mutation getSAMindList(
    $title: String! 
    $cat: String,
    $url: String,
    $img: String,
    $brief: String,
    $meta: String
){
   createMind(
    title:$title,
    cat:$cat,
    url: $url,
    img:$img,
    brief:$brief,
    meta:$meta
){
      
      title
   }

}`

const que = `query getMindList($url:String!){
    page(url: $url) {
        items: query(selector:".section-latest article") {
            title: text(selector:".listing-wide__inner h2 a")
            cat:text(selector:".listing-wide__thumb__category")
            img: attr(selector:".listing-wide__thumb img",name:"src")
            url: attr(selector:".listing-wide__thumb a",name:"href")
            brief:text(selector:".listing-wide__inner p")
            meta:text(selector:".listing-wide__inner .t_meta")
        
        }
    }
}`

export const start = async () => {
  try {
    const app = express()

    app.use(cors())
    app.use(express.static(__dirname))
    await app.listen(PORT, () => {
      console.log(`Visit ${URL}:${PORT}`)
    })
    const start = Date.now()
     // await compose(insertDataWaitForData, getArray, getDataFromMediumWaitForUrl)(variables).then(result => console.log(`Do with the ${result} as you please`));

    const Data = await getSingePageDataFromUrl(5, "cognition")

    const res = await insertDataWaitForData(Data)
    console.log(res)
    const end = Date.now()
    const elpase = end - start
    console.log('操作花费时间:', elpase)
  } catch (e) {
    console.log(e)
  };
}

// 抓取数据的方法,从目标网站获得Dom数据
const handleGrqphcoolDataTemplate = R.curry((api, template, variables) => (
 request(api, template, variables).then(data => {
   // console.log(data.page.items);
   return data
 })
))
// 柯理化  等待抓取的数据
const graphqlRequestMethodWaitForData = handleGrqphcoolDataTemplate(api, mu)

const insertDataWaitForData = R.map(graphqlRequestMethodWaitForData)
// 从Medium 网站获取数据的方法是一样的的，柯理化是处理参数不同,抓取是变量是网站地址
// 抓取后的数据作为insertDataWaitForData的数据

const getDataReactMindListWaitForUrl = handleGrqphcoolDataTemplate(gDomApi, que)
// 去毛处理
const getArray = (obj) => {
  console.log(obj.page.items)
  return obj.page.items
}

const compose = (...functions) => input => functions.reduceRight((chain, func) => chain.then(func), Promise.resolve(input))
//变量模板函数,等待传递参数
const variablesTemp = (page = 1, category = 'cognition') => (`{"url":"https://www.scientificamerican.com/${category}/?page=${page}"}`)

//拼接的 url 要经过处理才可以使用
const Resolvevar = (variaTemp) => JSON.parse(variaTemp)  // 格式化模板
// const queryPage = (queryStr) => getDataFromReactScriptWaitForUrl(queryStr)  // 查询数据

// const getDataFromReactScript = compose(getArray, queryPage, variables, variablesTemp)

const getSingePageDataFromUrl = compose(getArray, getDataReactMindListWaitForUrl, Resolvevar, variablesTemp)

```

数据可以插入 Grphcool 数据库

###  查询操作
带有筛选的查询操作

```
query {
  allMinds(filter: {
    cat_contains:"Behavior & Society"
  }) {
    id
    title
    cat
    brief
  }
}
```
###  高级查询
```javascript
query allMinds{
    allMinds(skip:10,last:20 filter: {
    cat_contains:"Behavior & Society"
  }){
    id 
    title 
  }
}
```
//meta 字符串的截取
```
function myFunction(){
	var str=  "February 2, 2018 — Christopher Intagliata";
	var n=str.split(' — ');
	document.getElementById("demo").innerHTML=n;
}
```