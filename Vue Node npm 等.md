---



---

# Vue基础部分

### 1.属性代理

```
let person = {
​    name: "张三",
​    sex: "男",
  }
Object.defineProperty(person, 'age', {
​    // value:"18",
​    // enumerable: true,       //是否可以枚举(遍历)
​    // writable: false,        //修改
​    // configurable:true,      //删除
​    get() {
​      return number;
​    },
​    set(value) {
​      console.info(value)  
​      number = value;
​    }
  })
```

### 2.事件处理

1.<span style="color:red">prevent  stop(冒泡)   once(只触发一次)</span>    self只有event.target是当前操作的元素才触发事件

2.passive 事件的默认行为立即执行 无需等待时间回调执行完毕

3.wheel鼠标滚轮 scoll 滚动条 有点区别 

4.enter 回车 delete 删除和退格 退出esc space空格 tab换行 上下左右 up down left right -->

5.系统修饰符 用法特殊 ctrl alt  shift meta 

​      (1)配合keyup使用按下修饰键的同时 在按下其他键 随后释放其他键 事件才被触发

​      (2)配合keydown使用 正常触发事件

​       特殊 tab必须配合 keydown使用 ctrl alt shift meta(win键) 只有ctrl+y才行

<span style="color:red">具体的参考Vue 代码 01VueDay==> 事件处理</span>

### 3.计算属性与监听



```
 computed:{
​      // fullName:{
​      //   //get什么时候调用 :1.初次调用时 2.所依赖的数据发生改变
​      //   get(){
​      //     return xxx;
​      //   },
​      //   //当fullName被修改时
​      //   set(value){}
```

注意:

```
1.初始化时候会调用，所依赖的数据发生改变时调用

2.如果只是读取 那么只用一个get 如果要修改数据 就的用set(){}
3.computed 会有缓存 写法简单
```

```
//watch  data cumputed都能监听
        // watch: {
        //     info: {
        		   deep:true, 	 	 //深度监听
        //         immediate: true,  //立刻执行
        //         handler(newVal, oldVal) {
        //             console.log(newVal, oldVal);

        //         }
        //     }
        // }
        //简写形式 如果没有 deep 或者immediate等
        // watch:{
        //     isHot(newVal,oldVal){
        //         console.log(newVal,oldVal);
        //     }
        // }
```

如果有异步任务 就得用watch computed貌似不行  

### 4.样式

```
:class='red'  			 //字符串形式
:class="['font','red']"  //数组形式 	或者 :class="classArr"
:class="classObj"	 	 //对象形式
:style='styleObj'		 //style形式   或者 :style='{opacity}'
 		data() {
            return {
            	opacity:1
                red: 'red',
                blue: 'blue',
                font: 'font',
                classArr: ['font', 'blue'],
                classObj: {
                    red: 'red',
                    font: 'font'
                },
                styleObj: {
                    fontSize: 50 + 'px',			
                    backgroundColor: 'skyblue'
                }
            }
        },
```

```
注意:对象中 复合属性 要写成 fontSize backgroundColor 形式 
```

### 5.条件渲染

```
		<button @click="n++">n++</button>
		
		//以下三个方法为 可以这样写 跟这个例子无关
		<button @click="sortType=2">升序</button>
        <button @click="sortType=1">降序</button>
        <button @click="sortType=0">原顺序</button>
        
        //v-show
        <div class="div" v-show='n===1'>angular</div> 
       	
       	// v-if
        <div class="div" v-if='n===1'>angular</div> 
        <div class="div" v-else-if='n===2'>react</div> 
        <div class="div" v-else-if='n===3'>Vue</div> 
        <div class="div" v-else>VueMax</div> 
        
        <!-- template只能用 v-if  template不破坏数据结构 -->
        <template v-if="n===1">
            <div class="div">angular</div> 
        </template>
```

### 6.过滤器

```
 {{time | timeFormat}}
 {{time | timeFormat('YYYY-MM-DD') | mySlice}}		//过滤器可以叠加
 {{name | mySlice}}
 		//局部过滤器		//在vue对象里面写
        filters: {
            timeFormat(val, str = 'YYYY-MM-DD HH:mm:ss') {
                return dayjs(val).format(str);
            }
        }
         // 全局过滤器	//在vue外侧
    	Vue.filter('mySlice', val => {
        	return val.slice(0, 4);
    	})
```

### 7.内置指令

```
v-text='name'
v-html			//不安全
v-cloak			//v-cloak 可以解决 网速过慢 网页有 没有解析的语法等 配合 css
v-once			//只渲染 一次
v-pre			//v-pre速度更快 不解析

  <div v-text='name'></div>
  
  <div v-html='nameHTml'></div>
  
  <div v-cloak>{{name}} </div>
  
  <span v-once>{{n}}</span><br/>
  
  <span v-pre>{{n}}</span><br>
  
 		data() {
            return {
                n: 1,
                name: '你好,尚硅谷',
                nameHTml: '<h1>你好</h1>'
            }
        },
```

### 8.自定义指令

```
<span>{{n}}</span><br />
放大十倍后的值是:<b v-big-number='n'></b><br />
<button @click="n++">n++</button>
<br />
<input type="text" v-fbind:value="n">
        
Vue.directive('big-number', (element, binding) => {
        console.log(this);  //window  指令中的this 时window
        element.innerText = binding.value * 20;
    })
    new Vue({
        el: "#root",
        data() {
            return {
                n: 1,
            }
        },
        directives: {
            //调用时机: 1.指令与元素成功绑定时, 指令所在的模板被重新解析时
            // 'big-number'(element, binding) {
            //     //console.dir()可以显示一个对象所有的属性和方法
            //     //a:<span>放大十倍后的值是:</span>
            //     //b:{name: 'big', rawName: 'v-big', value: 1, expression: 'n', modifiers: {…}, …}
            //     element.innerText = binding.value * 10;

            // },

            fbind: {
                //指令与元素成功绑定时
                bind(element, binding) {
                    console.log(this);  //window  指令中的this 是window
                    element.value = binding.value
                },
                //指令所在元素成功插入页面时候
                inserted(element, binding) {
                    element.focus();
                },
                //指令所在模板被重新解析时
                update(element, binding) {
                    element.focus();
                    element.value = binding.value
                },
            }
        }

    })
```

### 9.生命周期

```
 this.$destroy();  调用 beforeDestroy 和destroyed的函数 可以在里面做一些清除定时器 取消订阅消息等等操作
 			
```

### 10 vue检测数组 ，对象的原理

```
  data() {
      return {
          arr: [1, 2, 3],
          persons: [
              { id: '001', name: '周冬雨', age: 30 },
              { id: '002', name: '马东梅', age: 20 },
              { id: '003', name: '周杰伦', age: 40 },
              { id: '004', name: '温兆伦', age: 25 },
          ],
           student: {
                    name: "tom",
                    age: { a: 1,  b: 2},
                    friends: [
                        { name: 'jerry', age: 25 },
                        { name: 'tony', age: 36 },
                    ]
                }
 			 }
        },
         
          this.arr[0] = 10;         //X  
          this.arr.splice(0,1,10);  //√
          this.$set(this.arr,0,100) //√			//把第0个替换成100
               
            updateMei() {
                let obj = { id: '001', name: '马老师', age: 50 }
                //对象地址 发生了改变 就不行了
                //this.persons[0] = obj;            // X
                //下面也是行的						// √
                this.persons[0].id = '001';
                this.persons[0].name = '马老师';
                this.persons[0].age = 50;
                
                // 这个改变的是原数组 所以地址没有发生改变  所以可以
                // this.persons.splice(0,1,obj);    //√ 

            }
        },
        //对象不牵扯 改变地址什么的	
        // this.student={}						 // √
        // this.student.sex='男';     		    // X	添加没有的属性会错误  
        // Vue.set(this.student, 'sex', '男');   // √  添加一个新的属性 sex 值为男
        // this.$set(this.student, 'sex', '男');
```

### 11. 模拟一个数据检测

```
let data = {
        a: 1,
        b: 2
    }
    const obs = new Observer(data)
    let vm = {}
    vm._data = data = obs;

    function Observer(obj) {
        const keys = Object.keys(obj)
        keys.forEach(k => {
            Object.defineProperty(this, k, {
                get() {
                    return obj[k]
                },
                set(val) {
                    obj[k] = val;
                }
            })
        })
    }
```



## 2.路由

### 1.路由配置

<!--简陋的路由配置 具体的在 项目中 Vue  router ==> index.js-->

```
new VueRouter({
  routes:[
     { path: '/', redirect: '/login' },
​    {
​      path:'/about',
​      component:About

​    },
​    {
​      path:'/home',
​      component:Home,
​      children:[   			//children中 如果有redirect path得写 /  没有则 path中 不写 / 
​        {
​           path:'news',
​           component:News
​        },
​        {
​          path:'message',
​          component:Message,
​          children:[						query配置
​            { 
			   name:'detail',     //给路由命名
​              path:'detail',
​              component:Detail
​            }
​          ]
​        },
​      ]
​    },
  ]
})
```



### 2.路由的query传参

1.路由配置

```
{
​          path:'message',
​          component:Message,
​          children:[
​            {  
			   name:'detail',     //给路由命名
​              path:'detail',     
​              component:Detail
​            }
​          ]
​        },
```

2.传递参数:

```
<!-- 跳转并携带query参数, to的字符串写法 -->
<router-link :to="`/home/message/detail?id=${val.id}&title=${val.title}`">{{val.title}}</router-link>

<!-- 跳转并携带query参数, to的对象写法 -->
    <router-link
     :to="{
       path:'/home/message/detail',			//如果路径太长 则用命名路由 把path替换成 name:'detail' 
       query:{
        id:val.id,
        title:val.title
      }
     }"
    \></router-link>
```

​	2.接收参数：

```
$route.query.id
$route.query.title
```

### 3.命名路由

1.作用 :可以简化路由的跳转

```
{
​          path:'message',
​          component:Message,
​          children:[
​            {  
			   name:'detail',     //给路由命名
​              path:'detail',	  //children中的path 都不写/ 
​              component:Detail
​            }
​          ]
​        },
```

2.简化跳转

```
<!--简化前，需要写完整的路径 -->
<router-link to='/demo/test/welcome'></router-link>

<!--简化后，需要写完整的路径 -->
<router-link :to="{name:'hello'}"></router-link>
```

### 4.路由的params传参

1.路由配置

```
{
​          path:'message',
​          component:Message,
​          children:[
​            {  
			   name:'detail',     //给路由命名
​              path:'detail/:id/:title',      //params占位
​              component:Detail
​            }
​          ]
​        },
```

2.路由传参

```
	 <!-- 跳转并携带params参数, to的字符串写法 -->
​    <!-- <router-link :to="`/home/message/detail/${val.id}/${val.title}`">{{val.title}}</router-link> -->

​    <!-- 跳转并携带params参数, to的字对象写法 -->
​    <router-link
​     :to="{
​       name:'detail',   //params只能用name
​       params:{
​        id:val.id,
​        title:val.title
​      }
​     }"
​    \>跳转</router-link>

```

3.接收参数

```
$route.params.id
$route.params.title
```

**<span style="color:red">需要特别注意: 使用params对象写法时候 不能用path 配置项 必须使用name</span>**

### 5.路由的props配置

作用:让路由组件更方便的接收到参数



```
{
​              name: 'detail',           		//给路由命名
​              path: 'detail/:id/:title',       //params占位
​              component: Detail,
​              
			   //路由的props配置

​              //第一种写法 props为对象,该对象中所有的key value 的组合最终都会通过props传递给Detail组件
​              // props: { a: 1, b: 2 },
​              
			   //第二种写法 props为bool值 bool为true 则把路由收到的所有的params参数值通过props传给Detail组件 注意:只能                //是params的参数
​              // props: true,
​              
			   //第三种写法 props为函数,该函数返回的对象中每一组key value都会通过props传给detail组件 这个可以是		                  //query,params
​              
				props(route) {
​                return {
​                  id: route.query.id,
​                  title: route.query.title,
​                  a: 1,
​                  b: 2
​                }
​              }
​            }
```

2.组件接收

```
export default {
 props: ["id", "title"],
 data() {
  return {};
 },
```

### 6. router-link的replace属性

1.作用: 控制路由跳转时 操作浏览器历史记录的模式

2.浏览器的历史记录有两种写入方式 :分别是 push和 replace, push是追加历史记录 replace是替换 当前记录 路由跳转时 默认为push

3.如何开启 replace模式 <router-link replace to="">

### 7. 编程式路由导航

1.作用: 不借助 <router-link></router-link> 实现路由跳转，让路由跳转更加灵活

2.具体使用

  

```
<button @click='$router.back()'>后退</button>
<button @click="$router.forward()">前进</button>
<button @click="$router.go(0)">go(0)</button>

<!--$router.go(-1) $router.go(-2) $router.go(1) $router.go(0) 后退1步 2步 前进1步 相当于刷新页面-->

 pushShow(m) {
      this.$router.push({
        name: "detail", 
        params: {					//params 传参得用 params接收   //query传参得用 query接收
          id: m.id,
          title: m.title
        }
      });
    },
    replaceShow(m) {
      this.$router.replace({
        name: "detail", 
        params: {
          id: m.id,
          title: m.title
        }
      });
    }
```

### 8.缓存路由组件

1.作用: 让不展示的路由组件挂载 不被销毁

2.使用:

```
<!-- keep-alive  include 匹配的是组件的名字(name) 如果不写include 那么就是缓存所有的路由组件 两
	种写法 include='' 或者 :include='["a","b"]'
	缓存了两个路由组件
-->
    <keep-alive :include="['News','Message']">
      <router-view></router-view>
    </keep-alive>
```

### 9.两个新的生命周期钩子

​	1.作用: 路由组件所独有的两个钩子，用于捕获路由组件的激状态

​	2.具体名字:

```
1.activated 路由组件被激活时触发
2.deactivated 路由组件失活时触发
```

### 10 路由守卫

1.作用: 对路由进行权限控制

2.分类： <span style="color:red">全局守卫</span>  <span style="color:blue">独享守卫 </span> <span style="color:green">组件内守卫</span>

1.<span style="background-color:red">全局守卫</span> 

```
//全局前置守卫 初始化执行 每次路由切换前都执行
router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {		//判断当前路由是否需要权限控制
​    if (localStorage.getItem('school')) {	
​      next();				//放行
​    } else {
​      alert("没有权限")
​      // next({ name: 'about' })
​    }
  }
  else {
​    next();
  }
})
//全局前置守卫 初始化执行 每次路由切换后都执行
router.afterEach((to, from) => {
  console.info(to.meta.title)
  document.title = to.meta.title || '硅谷系统';			//修改网页title
})
```

2.<span style="background-color:blue">独享守卫 </span>

作用: 只是这一个路由需要守卫 

用法:这个跟全局后置路由守卫配合

```
 {
​          name: 'news',
​          path: 'news',
​          component: News,
​          meta: { isAuth: true, title: '新闻' },
​          //路由独享守卫
​          beforeEnter: (to, from, next) => {
​            if (to.meta.isAuth) {
​              if (localStorage.getItem('schools')) {
​                next();
​              } else {
​                alert("没有权限")
​              }
​            }
​            else {
​              next();
​            }
​          },
​        },
```

3.<span style="background-color:green">组件内守卫</span>

作用：某一个组件想用这个守卫 news新闻组件 在组件内写的 也是与afterEach(全局后置守卫配合)

```
 beforeRouteEnter(to, from, next) {
  if (to.meta.isAuth) {
   if (localStorage.getItem("school")) {
​    next();
   } else {
​    alert("没有权限");
​    next("/");
   }
  } else {
   next();
  }
 },

 //组件路由守卫 离开 不写next() 不放行 离开不了
 beforeRouteLeave(to, from, next) {
  next();
 }
```



# Vue脚手架

## 脚手架文件结构

	├── node_modules 
	├── public
	│   ├── favicon.ico: 页签图标
	│   └── index.html: 主页面
	├── src
	│   ├── assets: 存放静态资源
	│   │   └── logo.png
	│   │── component: 存放组件
	│   │   └── HelloWorld.vue
	│   │── App.vue: 汇总所有组件
	│   │── main.js: 入口文件
	├── .gitignore: git版本管制忽略的配置
	├── babel.config.js: babel的配置文件
	├── package.json: 应用包配置文件 
	├── README.md: 应用描述文件
	├── package-lock.json：包版本控制文件

## 关于不同版本的Vue

1. vue.js与vue.runtime.xxx.js的区别：
   1. vue.js是完整版的Vue，包含：核心功能 + 模板解析器。
   2. vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。
2. 因为vue.runtime.xxx.js没有模板解析器，所以不能使用template这个配置项，需要使用render函数接收到的createElement函数去指定具体内容。

## vue.config.js配置文件

1. 使用vue inspect > output.js可以查看到Vue脚手架的默认配置。
2. 使用vue.config.js可以对脚手架进行个性化定制，详情见：https://cli.vuejs.org/zh

## ref属性

1. 被用来给元素或子组件注册引用信息（id的替代者）
2. 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象（vc）
3. 使用方式：
   1. 打标识：```<h1 ref="xxx">.....</h1>``` 或 ```<School ref="xxx"></School>```
   2. 获取：```this.$refs.xxx```

## props配置项

1. 功能：让组件接收外部传过来的数据

2. 传递数据：```<Demo name="xxx"/>```

3. 接收数据：

   1. 第一种方式（只接收）：```props:['name'] ```

   2. 第二种方式（限制类型）：```props:{name:String}```

   3. 第三种方式（限制类型、限制必要性、指定默认值）：

      ```js
      props:{
      	name:{
      	type:String, //类型
      	required:true, //必要性
      	default:'老王' //默认值
      	}
      }
      ```

   > 备注：props是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据。

## mixin(混入)

1. 功能：可以把多个组件共用的配置提取成一个混入对象

2. 使用方式：

   第一步定义混合：

   ```
   {
       data(){....},
       methods:{....}
       ....
   }
   ```

   第二步使用混入：

   ​	全局混入：```Vue.mixin(xxx)```
   ​	局部混入：```mixins:['xxx']	```

## 插件

1. 功能：用于增强Vue

2. 本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。

3. 定义插件：

   ```js
   对象.install = function (Vue, options) {
       // 1. 添加全局过滤器
       Vue.filter(....)
   
       // 2. 添加全局指令
       Vue.directive(....)
   
       // 3. 配置全局混入(合)
       Vue.mixin(....)
   
       // 4. 添加实例方法
       Vue.prototype.$myMethod = function () {...}
       Vue.prototype.$myProperty = xxxx
   }
   ```

4. 使用插件：```Vue.use()```

## scoped样式

1. 作用：让样式在局部生效，防止冲突。
2. 写法：```<style scoped>```

## webStorage

1. 存储内容大小一般支持5MB左右（不同浏览器可能还不一样）

2. 浏览器端通过 Window.sessionStorage 和 Window.localStorage 属性来实现本地存储机制。

3. 相关API：

   1. ```xxxxxStorage.setItem('key', 'value');```
      	该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。

   2. ```xxxxxStorage.getItem('person');```

      ​		该方法接受一个键名作为参数，返回键名对应的值。

   3. ```xxxxxStorage.removeItem('key');```

      ​		该方法接受一个键名作为参数，并把该键名从存储中删除。

   4. ``` xxxxxStorage.clear()```

      ​		该方法会清空存储中的所有数据。

4. 备注：

   1. SessionStorage存储的内容会随着浏览器窗口关闭而消失。
   2. LocalStorage存储的内容，需要手动清除才会消失。
   3. ```xxxxxStorage.getItem(xxx)```如果xxx对应的value获取不到，那么getItem的返回值是null。
   4. ```JSON.parse(null)```的结果依然是null。

## 组件的自定义事件

1. 一种组件间通信的方式，适用于：<strong style="color:red">子组件 ===> 父组件</strong>

2. 使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（<span style="color:red">事件的回调在A中</span>）。

3. 绑定自定义事件：

   1. 第一种方式，在父组件中：```<Demo @atguigu="test"/>```  或 ```<Demo v-on:atguigu="test"/>```

   2. 第二种方式，在父组件中：

      ```js
      <Demo ref="demo"/>
      ......
      mounted(){
         this.$refs.xxx.$on('atguigu',this.test)
      }
      ```

   3. 若想让自定义事件只能触发一次，可以使用```once```修饰符，或```$once```方法。

4. 触发自定义事件：```this.$emit('atguigu',数据)```		

5. 解绑自定义事件```this.$off('atguigu')```

6. 组件上也可以绑定原生DOM事件，需要使用```native```修饰符。

7. 注意：通过```this.$refs.xxx.$on('atguigu',回调)```绑定自定义事件时，回调<span style="color:red">要么配置在methods中</span>，<span style="color:red">要么用箭头函数</span>，否则this指向会出问题！

## 全局事件总线（GlobalEventBus）

1. 一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。

2. 安装全局事件总线：

   ```js
   new Vue({
   	......
   	beforeCreate() {
   		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
   	},
       ......
   }) 
   ```

3. 使用事件总线：

   1. 接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的<span style="color:red">回调留在A组件自身。</span>

      ```js
      methods(){
        demo(data){......}
      }
      ......
      mounted() {
        this.$bus.$on('xxxx',this.demo)
      }
      ```

   2. 提供数据：```this.$bus.$emit('xxxx',数据)```

4. 最好在beforeDestroy钩子中，用$off去解绑<span style="color:red">当前组件所用到的</span>事件。

## 消息订阅与发布（pubsub）

1. 一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。

2. 使用步骤：

   1. 安装pubsub：```npm i pubsub-js```

   2. 引入: ```import pubsub from 'pubsub-js'```

   3. 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的<span style="color:red">回调留在A组件自身。</span>

      ```js
      methods(){
        demo(data){......}
      }
      ......
      mounted() {
        this.pid = pubsub.subscribe('xxx',this.demo) //订阅消息
      }
      ```

   4. 提供数据：```pubsub.publish('xxx',数据)```

   5. 最好在beforeDestroy钩子中，用```PubSub.unsubscribe(pid)```去<span style="color:red">取消订阅。</span>

## nextTick

1. 语法：```this.$nextTick(回调函数)```
2. 作用：在下一次 DOM 更新结束后执行其指定的回调。
3. 什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行。

## Vue封装的过度与动画

1. 作用：在插入、更新或移除 DOM元素时，在合适的时候给元素添加样式类名。

2. 图示：<img src="https://img04.sogoucdn.com/app/a/100520146/5990c1dff7dc7a8fb3b34b4462bd0105" style="width:60%" />

3. 写法：

   1. 准备好样式：

      - 元素进入的样式：
        1. v-enter：进入的起点
        2. v-enter-active：进入过程中
        3. v-enter-to：进入的终点
      - 元素离开的样式：
        1. v-leave：离开的起点
        2. v-leave-active：离开过程中
        3. v-leave-to：离开的终点

   2. 使用```<transition>```包裹要过度的元素，并配置name属性：

      ```vue
      <transition name="hello">
      	<h1 v-show="isShow">你好啊！</h1>
      </transition>
      ```

   3. 备注：若有多个元素需要过度，则需要使用：```<transition-group>```，且每个元素都要指定```key```值。

## vue脚手架配置代理

### 方法一

​	在vue.config.js中添加如下配置：

```js
devServer:{
  proxy:"http://localhost:5000"
}
```

说明：

1. 优点：配置简单，请求资源时直接发给前端（8080）即可。
2. 缺点：不能配置多个代理，不能灵活的控制请求是否走代理。
3. 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器 （优先匹配前端资源）

### 方法二

​	编写vue.config.js配置具体代理规则：

```js
module.exports = {
	devServer: {
      proxy: {
      '/api1': {// 匹配所有以 '/api1'开头的请求路径
        target: 'http://localhost:5000',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api1': ''}
      },
      '/api2': {// 匹配所有以 '/api2'开头的请求路径
        target: 'http://localhost:5001',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api2': ''}
      }
    }
  }
}
/*
   changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
   changeOrigin默认值为true
*/
```

说明：

1. 优点：可以配置多个代理，且可以灵活的控制请求是否走代理。
2. 缺点：配置略微繁琐，请求资源时必须加前缀。

## 插槽

1. 作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于 <strong style="color:red">父组件 ===> 子组件</strong> 。

2. 分类：默认插槽、具名插槽、作用域插槽

3. 使用方式：

   1. 默认插槽：

      ```vue
      父组件中：
              <Category>
                 <div>html结构1</div>
              </Category>
      子组件中：
              <template>
                  <div>
                     <!-- 定义插槽 -->
                     <slot>插槽默认内容...</slot>
                  </div>
              </template>
      ```

   2. 具名插槽：

      ```vue
      父组件中：
              <Category>
                  <template slot="center">
                    <div>html结构1</div>
                  </template>
      
                  <template v-slot:footer>
                     <div>html结构2</div>
                  </template>
              </Category>
      子组件中：
              <template>
                  <div>
                     <!-- 定义插槽 -->
                     <slot name="center">插槽默认内容...</slot>
                     <slot name="footer">插槽默认内容...</slot>
                  </div>
              </template>
      ```

   3. 作用域插槽：

      1. 理解：<span style="color:red">数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定。</span>（games数据在Category组件中，但使用数据所遍历出来的结构由App组件决定）

      2. 具体编码：

         ```vue
         父组件中：
         		<Category>
         			<template scope="scopeData">
         				<!-- 生成的是ul列表 -->
         				<ul>
         					<li v-for="g in scopeData.games" :key="g">{{g}}</li>
         				</ul>
         			</template>
         		</Category>
         
         		<Category>
         			<template slot-scope="scopeData">
         				<!-- 生成的是h4标题 -->
         				<h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
         			</template>
         		</Category>
         子组件中：
                 <template>
                     <div>
                         <slot :games="games"></slot>
                     </div>
                 </template>
         		
                 <script>
                     export default {
                         name:'Category',
                         props:['title'],
                         //数据在子组件自身
                         data() {
                             return {
                                 games:['红色警戒','穿越火线','劲舞团','超级玛丽']
                             }
                         },
                     }
                 </script>
         ```

   ```
   
   ```

## Vuex

### 1.概念

​		在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。

### 2.何时使用？

​		多个组件需要共享数据时

### 3.搭建vuex环境

1. 创建文件：```src/store/index.js```

   ```js
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //应用Vuex插件
   Vue.use(Vuex)
   
   //准备actions对象——响应组件中用户的动作
   const actions = {}
   //准备mutations对象——修改state中的数据
   const mutations = {}
   //准备state对象——保存具体的数据
   const state = {}
   
   //创建并暴露store
   export default new Vuex.Store({
   	actions,
   	mutations,
   	state
   })
   ```

2. 在```main.js```中创建vm时传入```store```配置项

   ```js
   ......
   //引入store
   import store from './store'
   ......
   
   //创建vm
   new Vue({
   	el:'#app',
   	render: h => h(App),
   	store
   })
   ```

###    4.基本使用

1. 初始化数据、配置```actions```、配置```mutations```，操作文件```store.js```

   ```js
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //引用Vuex
   Vue.use(Vuex)
   
   const actions = {
       //响应组件中加的动作
   	jia(context,value){
   		// console.log('actions中的jia被调用了',miniStore,value)
   		context.commit('JIA',value)
   	},
   }
   
   const mutations = {
       //执行加
   	JIA(state,value){
   		// console.log('mutations中的JIA被调用了',state,value)
   		state.sum += value
   	}
   }
   
   //初始化数据
   const state = {
      sum:0
   }
   
   //创建并暴露store
   export default new Vuex.Store({
   	actions,
   	mutations,
   	state,
   })
   ```

2. 组件中读取vuex中的数据：```$store.state.sum```

3. 组件中修改vuex中的数据：```$store.dispatch('action中的方法名',数据)``` 或 ```$store.commit('mutations中的方法名',数据)```

   >  备注：若没有网络请求或其他业务逻辑，组件中也可以越过actions，即不写```dispatch```，直接编写```commit```

### 5.getters的使用

1. 概念：当state中的数据需要经过加工后再使用时，可以使用getters加工。

2. 在```store.js```中追加```getters```配置

   ```js
   ......
   
   const getters = {
   	bigSum(state){
   		return state.sum * 10
   	}
   }
   
   //创建并暴露store
   export default new Vuex.Store({
   	......
   	getters
   })
   ```

3. 组件中读取数据：```$store.getters.bigSum```

### 6.四个map方法的使用

1. <strong>mapState方法：</strong>用于帮助我们映射```state```中的数据为计算属性

   ```js
   computed: {
       //借助mapState生成计算属性：sum、school、subject（对象写法）
        ...mapState({sum:'sum',school:'school',subject:'subject'}),
            
       //借助mapState生成计算属性：sum、school、subject（数组写法）
       ...mapState(['sum','school','subject']),
   },
   ```

2. <strong>mapGetters方法：</strong>用于帮助我们映射```getters```中的数据为计算属性

   ```js
   computed: {
       //借助mapGetters生成计算属性：bigSum（对象写法）
       ...mapGetters({bigSum:'bigSum'}),
   
       //借助mapGetters生成计算属性：bigSum（数组写法）
       ...mapGetters(['bigSum'])
   },
   ```

3. <strong>mapActions方法：</strong>用于帮助我们生成与```actions```对话的方法，即：包含```$store.dispatch(xxx)```的函数

   ```js
   methods:{
       //靠mapActions生成：incrementOdd、incrementWait（对象形式）
       ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   
       //靠mapActions生成：incrementOdd、incrementWait（数组形式）
       ...mapActions(['jiaOdd','jiaWait'])
   }
   ```

4. <strong>mapMutations方法：</strong>用于帮助我们生成与```mutations```对话的方法，即：包含```$store.commit(xxx)```的函数

   ```js
   methods:{
       //靠mapActions生成：increment、decrement（对象形式）
       ...mapMutations({increment:'JIA',decrement:'JIAN'}),
       
       //靠mapMutations生成：JIA、JIAN（对象形式）
       ...mapMutations(['JIA','JIAN']),
   }
   ```

> 备注：mapActions与mapMutations使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则参数是事件对象。

### 7.模块化+命名空间

1. 目的：让代码更好维护，让多种数据分类更加明确。

2. 修改```store.js```

   ```javascript
   const countAbout = {
     namespaced:true,//开启命名空间
     state:{x:1},
     mutations: { ... },
     actions: { ... },
     getters: {
       bigSum(state){
          return state.sum * 10
       }
     }
   }
   
   const personAbout = {
     namespaced:true,//开启命名空间
     state:{ ... },
     mutations: { ... },
     actions: { ... }
   }
   
   const store = new Vuex.Store({
     modules: {
       countAbout,
       personAbout
     }
   })
   ```

3. 开启命名空间后，组件中读取state数据：

   ```js
   //方式一：自己直接读取
   this.$store.state.personAbout.list
   //方式二：借助mapState读取：
   ...mapState('countAbout',['sum','school','subject']),
   ```

4. 开启命名空间后，组件中读取getters数据：

   ```js
   //方式一：自己直接读取
   this.$store.getters['personAbout/firstPersonName']
   //方式二：借助mapGetters读取：
   ...mapGetters('countAbout',['bigSum'])
   ```

5. 开启命名空间后，组件中调用dispatch

   ```js
   //方式一：自己直接dispatch
   this.$store.dispatch('personAbout/addPersonWang',person)
   //方式二：借助mapActions：
   ...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   ```

6. 开启命名空间后，组件中调用commit

   ```js
   //方式一：自己直接commit
   this.$store.commit('personAbout/ADD_PERSON',person)
   //方式二：借助mapMutations：
   ...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
   ```

 ## 路由

1. 理解： 一个路由（route）就是一组映射关系（key - value），多个路由需要路由器（router）进行管理。
2. 前端路由：key是路径，value是组件。

### 1.基本使用

1. 安装vue-router，命令：```npm i vue-router```

2. 应用插件：```Vue.use(VueRouter)```

3. 编写router配置项:

   ```js
   //引入VueRouter
   import VueRouter from 'vue-router'
   //引入Luyou 组件
   import About from '../components/About'
   import Home from '../components/Home'
   
   //创建router实例对象，去管理一组一组的路由规则
   const router = new VueRouter({
   	routes:[
   		{
   			path:'/about',
   			component:About
   		},
   		{
   			path:'/home',
   			component:Home
   		}
   	]
   })
   
   //暴露router
   export default router
   ```

4. 实现切换（active-class可配置高亮样式）

   ```vue
   <router-link active-class="active" to="/about">About</router-link>
   ```

5. 指定展示位置

   ```vue
   <router-view></router-view>
   ```

### 2.几个注意点

1. 路由组件通常存放在```pages```文件夹，一般组件通常存放在```components```文件夹。
2. 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。
3. 每个组件都有自己的```$route```属性，里面存储着自己的路由信息。
4. 整个应用只有一个router，可以通过组件的```$router```属性获取到。

### 3.多级路由（多级路由）

1. 配置路由规则，使用children配置项：

   ```js
   routes:[
   	{
   		path:'/about',
   		component:About,
   	},
   	{
   		path:'/home',
   		component:Home,
   		children:[ //通过children配置子级路由
   			{
   				path:'news', //此处一定不要写：/news
   				component:News
   			},
   			{
   				path:'message',//此处一定不要写：/message
   				component:Message
   			}
   		]
   	}
   ]
   ```

2. 跳转（要写完整路径）：

   ```vue
   <router-link to="/home/news">News</router-link>
   ```

### 4.路由的query参数

1. 传递参数

   ```vue
   <!-- 跳转并携带query参数，to的字符串写法 -->
   <router-link :to="/home/message/detail?id=666&title=你好">跳转</router-link>
   				
   <!-- 跳转并携带query参数，to的对象写法 -->
   <router-link 
   	:to="{
   		path:'/home/message/detail',
   		query:{
   		   id:666,
               title:'你好'
   		}
   	}"
   >跳转</router-link>
   ```

2. 接收参数：

   ```js
   $route.query.id
   $route.query.title
   ```

### 5.命名路由

1. 作用：可以简化路由的跳转。

2. 如何使用

   1. 给路由命名：

      ```js
      {
      	path:'/demo',
      	component:Demo,
      	children:[
      		{
      			path:'test',
      			component:Test,
      			children:[
      				{
                            name:'hello' //给路由命名
      					path:'welcome',
      					component:Hello,
      				}
      			]
      		}
      	]
      }
      ```

   2. 简化跳转：

      ```vue
      <!--简化前，需要写完整的路径 -->
      <router-link to="/demo/test/welcome">跳转</router-link>
      
      <!--简化后，直接通过名字跳转 -->
      <router-link :to="{name:'hello'}">跳转</router-link>
      
      <!--简化写法配合传递参数 -->
      <router-link 
      	:to="{
      		name:'hello',
      		query:{
      		   id:666,
                  title:'你好'
      		}
      	}"
      >跳转</router-link>
      ```

### 6.路由的params参数

1. 配置路由，声明接收params参数

   ```js
   {
   	path:'/home',
   	component:Home,
   	children:[
   		{
   			path:'news',
   			component:News
   		},
   		{
   			component:Message,
   			children:[
   				{
   					name:'xiangqing',
   					path:'detail/:id/:title', //使用占位符声明接收params参数
   					component:Detail
   				}
   			]
   		}
   	]
   }
   ```

2. 传递参数

   ```vue
   <!-- 跳转并携带params参数，to的字符串写法 -->
   <router-link :to="/home/message/detail/666/你好">跳转</router-link>
   				
   <!-- 跳转并携带params参数，to的对象写法 -->
   <router-link 
   	:to="{
   		name:'xiangqing',
   		params:{
   		   id:666,
               title:'你好'
   		}
   	}"
   >跳转</router-link>
   ```

   > 特别注意：路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置！

3. 接收参数：

   ```js
   $route.params.id
   $route.params.title
   ```

### 7.路由的props配置

​	作用：让路由组件更方便的收到参数

```js
{
	name:'xiangqing',
	path:'detail/:id',
	component:Detail,

	//第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
	// props:{a:900}

	//第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
	// props:true
	
	//第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
	props(route){
		return {
			id:route.query.id,
			title:route.query.title
		}
	}
}
```

### 8.```<router-link>```的replace属性

1. 作用：控制路由跳转时操作浏览器历史记录的模式
2. 浏览器的历史记录有两种写入方式：分别为```push```和```replace```，```push```是追加历史记录，```replace```是替换当前记录。路由跳转时候默认为```push```
3. 如何开启```replace```模式：```<router-link replace .......>News</router-link>```

### 9.编程式路由导航

1. 作用：不借助```<router-link> ```实现路由跳转，让路由跳转更加灵活

2. 具体编码：

   ```js
   //$router的两个API
   this.$router.push({
   	name:'xiangqing',
   		params:{
   			id:xxx,
   			title:xxx
   		}
   })
   
   this.$router.replace({
   	name:'xiangqing',
   		params:{
   			id:xxx,
   			title:xxx
   		}
   })
   this.$router.forward() //前进
   this.$router.back() //后退
   this.$router.go() //可前进也可后退
   ```

### 10.缓存路由组件

1. 作用：让不展示的路由组件保持挂载，不被销毁。

2. 具体编码：

   ```vue
   <keep-alive include="News"> 
       <router-view></router-view>
   </keep-alive>
   ```

### 11.两个新的生命周期钩子

1. 作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态。
2. 具体名字：
   1. ```activated```路由组件被激活时触发。
   2. ```deactivated```路由组件失活时触发。

### 12.路由守卫

1. 作用：对路由进行权限控制

2. 分类：全局守卫、独享守卫、组件内守卫

3. 全局守卫:

   ```js
   //全局前置守卫：初始化时执行、每次路由切换前执行
   router.beforeEach((to,from,next)=>{
   	console.log('beforeEach',to,from)
   	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
   		if(localStorage.getItem('school') === 'atguigu'){ //权限控制的具体规则
   			next() //放行
   		}else{
   			alert('暂无权限查看')
   			// next({name:'guanyu'})
   		}
   	}else{
   		next() //放行
   	}
   })
   
   //全局后置守卫：初始化时执行、每次路由切换后执行
   router.afterEach((to,from)=>{
   	console.log('afterEach',to,from)
   	if(to.meta.title){ 
   		document.title = to.meta.title //修改网页的title
   	}else{
   		document.title = 'vue_test'
   	}
   })
   ```

4. 独享守卫:

   ```js
   beforeEnter(to,from,next){
   	console.log('beforeEnter',to,from)
   	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
   		if(localStorage.getItem('school') === 'atguigu'){
   			next()
   		}else{
   			alert('暂无权限查看')
   			// next({name:'guanyu'})
   		}
   	}else{
   		next()
   	}
   }
   ```

5. 组件内守卫：

   ```js
   //进入守卫：通过路由规则，进入该组件时被调用
   beforeRouteEnter (to, from, next) {
   },
   //离开守卫：通过路由规则，离开该组件时被调用
   beforeRouteLeave (to, from, next) {
   }
   ```

### 13.路由器的两种工作模式

1. ```
   1. 对于一个url来说，什么是hash值？—— #及其后面的内容就是hash值。
   
   2. hash值不会包含在 HTTP 请求中，即：hash值不会带给服务器。
   
   3. hash模式：
      1. 地址中永远带着#号，不美观 。
      2. 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法。
      3. 兼容性较好。
   
   4. history模式：
      1. 地址干净，美观 。
      2. 兼容性和hash模式相比略差。
      3. 应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题。
   ```

   







# npm 常用库

<span style="background-color:pink">具体使用参考gitHub 或者 npm 包</span> 

npm：https://www.npmjs.com/  gitHub:  https://github.com/

**1.nanoid 生成全球唯一的字符串**

```
import { nanoid } from "nanoid";    生成全球唯一的字符串 用于 :key的唯一性  
使用: id: nanoid()
```



**2.day 日期插件**

```
import dayjs from 'dayjs'
dayjs(date).format('YYYY-MM-DD HH:mm:ss');
```



**3.vue-table-with-tree-grid   树形插件 效果**

![image-20211106170810478](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211106170810478.png)



**4 rimraf  快速删除node_modules**

```
cnpm install rimraf -g  
rimraf node_modules 		切换到 node_modules所在的目录
```

**5 element-china-area-data **

具体参考 npm ： https://www.npmjs.com/package/element-china-area-data

```
省市区 联动效果

使用:
import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
```











































# git

### 1. 基础部分

```
git add -m '  '
git commit -m ' '
git checkout <name>			//切换分支
git checkout -b <name>  	//基于什么并创建分支

git branch   			   //查看分支
git branch -d  分支名 		//删除本地分支

git push -u origin <name> 推送到远程

合并代码
master   Kyrie
Kyrie 提交所有代码  切换到 master分支 先跟远程同步一下(不然是本地代码) 
git merge Kyrie 合并完成 提交到远程

//配置用户名 和邮箱
git config --global user.name  "liuhui000829"
git config --global user.email  "asdasdliuhui@sina.com"



```



### 2. 连接远程仓库

```
1.git(github)配置密钥（私钥、ssh、公钥）

1.本地安装好git；

2.桌面右键 Git Bash Here 打开git命令行；

3.ssh-keygen -t rsa -C "nideyouxiang@xxx.com"   （全部按enter）；

4.cd ~/.ssh   （如果没有执行第三步，则不会有这个文件夹）；

5.cat id_rsa.pub     在命令行打开这个文件，会直接输出密钥；

6.复制，打开github   ，点自己头像 >> settings >> SSH and GPG keys >>New SSH key 

7. titile  随便写。  key里    粘贴第六步的内容；完成。

8.git clone
























```



























# 项目优化策略

**1.通过 chainWebpack 自定义打包入口**

新建 vue.config.js

```
module.exports = {
  chainWebpack: config => {
​    config.when(process.env.NODE_ENV==='production',config=>{
​      config.entry('app').clear().add('./src/main-prod.js')

 		 config.set('externals', {
                vue: 'Vue',
                'vue-quill-editor': 'VueQuillEditor',
                axios: 'axios',
                lodash: '_',
                echarts: 'echarts',
                'vue-table-with-tree-grid': 'TreeTable',
                dayjs: 'dayjs',
                'vue-router': 'Router'
            })
​    })
​    config.when(process.env.NODE_ENV==='development',config=>{
​      config.entry('app').clear().add('./src/main-dev.js')
​    })
  }
}
```



**2.通过externals加载外部CDN资源**

<link href="https://cdn.bootcdn.net/ajax/libs/quill/2.0.0-dev.4/quill.bubble.min.css" rel="stylesheet">

**3.路由懒加载**

详细地址:https://router.vuejs.org/zh/guide/advanced/lazy-loading.html

const Echarts = () => import(/* webpackChunkName: "order-echarts" */ './components/Echarts')

babel.config.js 中配置

```
module.exports = {
 presets: [
  '@vue/cli-plugin-babel/preset'
 ],
 "plugins": [...removeConsole,'@babel/plugin-syntax-dynamic-import']
}
```





















# node

**项目上线相关配置   使用pm2管理应用**

```
1.服务器中安装 pm2: npm i pm2 -g
2.启动项目 pm2 start脚本 --name自定义名称
3.查看运行项目 pm2 ls
4.重启项目 pm2 restart 自定义名称

pm2 stop 停止服务器
pm2 start .\server.js --name web_vueshop		启动
```



**中间件**

**1.compression	做gzip压缩** 

```
const compression =require('compression ');
app.use(compression())
```

**2.connect-history-api-fallback    做history模式配置**

```
const history =require('connect-history-api-fallback');
app.use(history())
```

