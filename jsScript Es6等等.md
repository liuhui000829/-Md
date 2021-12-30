

# 一. javaScript

## 1. 基础部分 

### 1. var let const

**1. 不写修饰符的 b 在window上, 在全局声明的a也在window上**

```js
 var a = 123;;
 const fn = () => {
 console.info('箭头函数',this)      '' window
}
function hdms() {
   b = 456;
   var a = 456;
   console.info('普通函数',this);	'' window
  }
 fn();
 hdms();
 console.info(this === window);    '' true
```

**2. 预解析**

```js
  var web = 'beidaqingniao.com'
  console.log(web);        '' 并不是输出web之后再报错 关键字Class  js会进行预解析  直接报错
  var class='hdcms';      
```

**3. 变量提升**

```js
  console.info(web);        	'' undefined
  var web='hdms.com';
```

**4. let const 简单使用**

```js
 console.info(web,hdms);        '' Uncaught ReferenceError: Cannot access 'web' before initialization
 let web='hdms.com'
 const hdms='hdms.com'
```

**5. 暂存性死区**

```js
 let web = 'hdms.com';       
   function func() {
     console.log(web);		    '' Uncaught ReferenceError: Cannot access 'web' before initialization
     let web = 'hdms.com'
   }
 func();
```

**6. 可怕的全局污染**

```js
  web = 5  不声明直接使用
```

**7. var的弊端**

```js
 var i = 99;
 for (var i = 0; i < 5; i++) {
   console.log(i);     '' 0 1 2 3 4
 }
 console.log(i);       '' 5
```

**8. 块级作用域**

```js
let i = 99;
for (let i = 0; i < 5; i++) {
	console.log(i);     '' 0 1 2 3 4
}
console.log(i);         '' 99
```

**9. 块级作用域2**

```js
{
	let web='hdms.com';
}
console.log(web);      '' 访问不到
```

**10 .const 一探究竟    作用域问题可以 可以重复声明**

```js
const url = 'https://houdunren.com';
function show() {
	const url = 'https://houdunre.com'
}
show();
```

**11. 总结 let const var**

```js
1. var
	1.变量提升 
    2.可以重复声明 
    3.在全局声明的变量属于window(非常可怕)
2. let/const 
	1.同一作用域不能重复声明  
    2.都具有块级作用域  
    3.都具有暂存性死区  
    4.不能先使用在声明
3. const   
	1.引用类型的地址改变那么报错 
    2.基本类型不能更改
```

### 2. null和undefined

```js
let web;
console.log(web);         		'' undefined
console.log(typeof null);     	'' object
console.log(typeof undefined);  '' undefined
+
function show(name){
	console.log(name);     '' 没有传参为 undefined
}
console.log(show());       '' 没有返回值为 undefined
```

### 3.this指向

**this的指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定，this最终指向调用它的对象。**

#### 1. 函数调用模式

```
   
    当一个函数并非一个对象的属性时，那么它就是被当做函数来调用的。在此种模式下，
    this被绑定为全局对象，在浏览器环境下就是window对象

    function a(){
        var a = 'hello';
        console.log(this.hello);        //undefined
        console.log(this);              //window
    }
    a();
```

#### 2. 方法模式调用

```
 	当函数被保存为一个对象的属性时，它就可称为这个对象的方法。当一个方法被调用时，this被绑定到这个对象上。
 	如果调用表达式包含一个提取属性的动作（. 或 []），那么它被称为方法调用
	
    let o = {
        name:'hello',
        sayName(){
            console.log(this,this.name);     // {name: 'hello', sayName: ƒ}     hello
        }
    }
    o.sayName();
    这里的this指向的对象是o，因为调用这个sayName()函数是通过o.sayName()执行的。
    
    
    
    
    let o={
            name:'hello',
            b:{
                name:"world", 
                sayName:function(){
                console.log(this,this.name);     //{name: 'world', sayName: ƒ}     world
            }
            }

        }
       o.b.sayName();
       因为是o.b调用的这个函数，所以指向b这个对象
       
       
       
       
    let o = {
        name: 'hello',
        b: {
            sayName: function () {
                console.log(this, this.name);     //{ sayName: ƒ}     undefined
            }
        }
    }
    o.b.sayName();
    同理，因为是o.b调用的这个函数，所以指向b这个对象
    
    
    
    
    let name='外层name'
    let o = {
        name: 'hello',
        b: {
            name:'world',
            sayName() {
                console.log(this, this.name);     //window    ''
            }
        }
    }
    var t = o.b.sayName;
    t();
    t是全局变量，在全局环境下执行，this指向window   因为是let修饰的name不属于window 所以是''
```

#### 3. 构造函数模式

```
 	如果在一个函数前面加上new关键字来调用，那么就会创建一个连接到该函数的prototype成员的新对象，
    同时，this会被绑定到这个新对象上。这种情况下，这个函数就可以成为此对象的构造函数。
	
    function Fn() {
        console.log(this);          // Fn {}
    }
    new Fn;                         // 带不带括号都是一样的 目前


	
    function Fn() {
        this.name = 'hello'
    }
    let a = new Fn();
    console.log(a.name);             //hello

    当用new关键字，返回的是一个对象，this指向的就是那个返回的对象；
    
    
     // 如果返回的不是对象，this还是指向函数的实例，虽然null属于对象，但是返回null依然指向函数实例
     // 返回空对象 undefined
     function Fn() {
        this.name = 'hello'
        return {}
    }
    let a = new Fn;
    console.log(a.name);                   // undefined



	// 返回函数 无返回值    
    function Fn() {
        this.name = 'hello'
        return function () {

        }
    }
    var a = new Fn;
    console.log(a, a.name);                    //ƒ(){}   ''



	 // 返回基本类型
     function Fn() {
        this.name = 'hello'
        return 1
     }
    var a = new Fn;
    console.log(a,a.name);                    // {name: 'hello'}    'hello'



    // 返回undefined
    function Fn() {
        this.name = 'hello'
        return undefined
    }
    var a = new Fn;
    console.log(a, a.name);                    // {name: 'hello'}    'hello'




    // 返回数组 
    function Fn() {
        this.name = 'hello'
        return []
    }
    var a = new Fn;
    console.log(a, a.name);                      // [] undefined



    // 返回null 
    function Fn() {
        this.name = 'hello'
        return null
    }
    var a = new Fn;
    console.log(a, a.name);                      //  {name: 'hello'} 'hello'
```

#### 4. apply和call调用模式

```
	JS中，函数也是对象，所有函数对象都有两个方法：apply和call，
    这两个方法可以让我们构建一个参数数组传递给调用函数，也允许我们改变this的值

    var name='winName'
    let o={
        name:'obj'
    }
    function sayName(){
       console.log(this.name);
    }

    sayName();          //winName
    sayName.call();     //winName
    sayName.apply();    //winName
    sayName.call(o);    //obj
    sayName.call(o);    //obj
    sayName.bind(o)()   //obj


	// 结合前面的列子 一个汇总
    在全局范围内， this指向全局对象（浏览器下指window对象）
    对象函数调用时，this指向当前对象
    全局函数调用时，应该是指向调用全局函数的对象。
    使用new关键字实例化对象时，this指向新创建的对象
    当用apply和call上下文调用的时候指向传入的第一个参数


    var name = 'window';
    function showName() {
        console.log(this.name);
    }

    var person1 = {
        name: "hello",
        sayName: showName
    }

    var person2 = {
        name: 'world',
        sayName: function () {
           return person1.sayName;
            //fun();

        }
    }

    person1.sayName();                  //hello
    person2.sayName();                  //window

    在执行person1.sayName()时，方法调用模式，this代表person1这个对象
    在执行person2.sayName()时，方法调用，但是sayName，并没有执行，而是将sayName()
    这个函数赋值给fun这个变量，fun是函数调用模式，this指向window，故输出全局的name



    var color='green';
    var test={
        color:'blue',
        getColor:function(){
            var color='red';
            console.log(this.color);
        }
    }
    var getColor = test.getColor;
    getColor();             //green
    test.getColor();        //blue



    
    var A = { n: 4399 };
    var B = function () {
        this.n = 9999
    }
    var C = function () {
        var n = 8888
    }

    B.prototype = A;
    C.prototype = A;

    var b = new B();
    var c = new C();

    A.n++;
    console.log(b.n);       //9999
    console.log(c.n);       //4400


    执行console.log(b.n)时，b对象有自己的属性n值
    执行console.log(c.n)时，c对象没有自己的属性n值，会向上查找，找的A对象中的属性n值
```

### 4. 数组的方法

​     扩展运算符
​     Array.from()
​     Array.of()
​     数组实例的 copyWithin()
​     数组实例的 find() 和 findIndex()
​     数组实例的 fill()
​     数组实例的 entries()，keys() 和 values()
​     数组实例的 includes()
​     数组实例的 flat()，flatMap()
​     数组的空位
​     Array.prototype.sort() 的排序稳定性

#### 1. 扩展运算符

```
   展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

    1.
    function push(array, ...items) {
        array.push(...items);
    }
    function add(x, y) {
        return x + y;
    }
    const numbers = [4, 38];
    add(...numbers) // 42



    2. 扩展运算符与正常的函数参数可以结合使用，非常灵活。
    function f(a, b, c, x, y) {
        console.log(a, b, c, x, y);
    }
    f(-1, ...[1, 2], 5, ...[3])



    3. 可以放表达式
    const arr = [...(6 > 0 ? ['a'] : []), 'b'];
    console.log(arr);            // ['a', 'b']




    4. 空数组不产生任何效果
    [...[], 1]              // [1]




    5. 注意,只有函数调用时,扩展运算符才可以放在圆括号中,否则会报错
    (...[1, 2])              // Uncaught SyntaxError: Unexpected number
    console.log((...[1, 2])) // Uncaught SyntaxError: Unexpected number
    console.log(...[1, 2])   // 1 2




    6. 替代函数的 apply 方法
    由于扩展运算符可以展开数组，所以不再需要apply方法，将数组转为函数的参数了。

    ES5 的写法
    function f(x, y, z) {
        console.log(x + y + z);
    }
    f.apply(null, [0, 1, 2]);            // 3


    ES6写法
    function f(x, y, z) {
        console.log(x + y + z);
    }
    f(...[0, 1, 2]);                    // 3




    7. 下面是扩展运算符取代apply方法的一个实际的例子，应用Math.max方法，简化求出一个数组最大元素的写法。
    ES5 的写法
    Math.max.apply(null, [14, 3, 77])            // 77

    ES6 的写法
    Math.max(...[14, 3, 77])

    等同于
    Math.max(14, 3, 77);


    8. 另一个例子是通过push函数，将一个数组添加到另一个数组的尾部
    let arr = [1, 2, 3];
    let arr2 = [3, 4, 5];

    arr.push(arr2)   [ 1, 2, 3, [ 3, 4, 5 ] ]        并没有追加在末尾

    Es5
    Array.prototype.push.apply(arr,arr2)
    console.log(arr);                       // [ 1, 2, 3, 3, 4, 5 ]

    Es6
    arr.push(...arr2)
    console.log(arr);                       //[ 1, 2, 3, 3, 4, 5 ]



    9. 另外一个例子
    let data1 = new (Date.bind.apply(Date, [null, 2015, 1, 1]))
    let data2 = new Date(...[2015, 1, 1]);
    console.log(data1, data2);   //2015-01-31T16:00:00.000Z 



    *******************************************扩展运算符的使用
    1. 复制数组
    2. 合并数组
    3. 与解构赋值结合
    4. 合并数组


    1. 复制数组

    es5
    let a = [1, 2];
    let b = a.concat();
    console.log(b, a === b);               // [1, 2] false

    es6
    let a = [1, 2];
    let b = [...a];
    console.log(b, a === b);               // [1, 2] false



    2. 合并数组
    let a = [1, 2];
    let b = [3, 4];
    Es5
    let c = a.concat(b);
    console.log(c);             // 1 2 3 4
    Es6
    let d = [...a, ...b];
    console.log(d);             // 1 2 3 4


    注意: 不过，这两种方法都是浅拷贝，使用的时候需要注意。
    let a = [{ a: 1 }];
    let b = [{ b: 2 }];
    //es5
    let c = a.concat(b);
    console.log(c);            //[ { a: 1 }, { b: 2 } ]
    //es6
    let d = [...a, ...b];
    console.log(d);            //[ { a: 1 }, { b: 2 } ]

    console.log(c[0] === a[0]);     //true
    console.log(d[0] === a[0]);     //true



    3. 与结构赋值结合 

    const [first, ...rest] = [1, 2, 3, 4, 5];
    console.log(
        first,              // 1
        rest                // [2, 3, 4, 5]
    );

    const [first, ...rest] = [];
    console.log(
        first,              // undefined
        rest                // []
    );

    const [first, ...rest] = ["foo"];
    console.log(
        first,  // "foo"
        rest    // []
    );


    注意: 如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错
    const [...butLast, last] = [1, 2, 3, 4, 5];                  // 报错
    const [first, ...middle, last] = [1, 2, 3, 4, 5];            // 报错



    4. 字符串转换成真正的数组
    let str = 'hello';
    let arr = [...str];
    console.log(arr);                           //[ 'h', 'e', 'l', 'l', 'o' ]



    5. 实现了 Iterator 接口的对象
    const go = function* () {
        yield 1;
        yield 2;
        yield 3;
    };
    console.log([...go()]);                    // [1, 2, 3]


```

#### 2. Array.from()

```
	Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6    	 新增的数据结构 Set 和 Map）。
       

    1. 下面是一个类似数组的对象，Array.from将它转为真正的数组。
    let arrayLike = {
        '0': 'a',
        '1': 'b',
        '2': 'c',
        length: 3
    };

    // ES5的写法
    var arr1 = [].slice.call(arrayLike); 
    console.log(arr1);                // ['a', 'b', 'c']

    // ES6的写法
    let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
    console.log(arr2);




    2. 实际应用中,常见的类似数组的对象是 
    DOM 操作返回的 NodeList 集合和函数内部的arguments对象 Array.from都可以将它们转为真正的数组。
    (1) NodeList对象
    const divList = document.querySelectorAll('div')
    console.log(divList);                          // NodeList(3) [div.div, div.div, div.div]
    divList.map(item => console.log(item))         // divList.map is not a function   divList不是真正的数组

    for (const item of divList) {        
            console.log(item);                         // 输出三个div Dom元素
    }

    Array.from(divList).map(item => {
        console.log(item);                             // 输出三个div Dom元素
    })

    console.log(...divList);                           // 输出三个div Dom元素

    for (const key in divList) {
        console.log(key);                              // 0 1 2 entries keys values forEach length
    }

    (2) arguments 对象
    function agrs() {
        console.log(arguments);// Arguments(3) [123, 456, Array(3), callee: ƒ,  Symbol(Symbol.iterator): ƒ]	
        console.log(Array.from(arguments));     // [123, 456, Array(3)]
    }
    agrs(123,456,[1,2,3])





    3. 字符串和 Set 结构都具有 Iterator 接口，因此可以被Array.from转为真正的数组。 
    如果参数是一个真正的数组，Array.from会返回一个一模一样的新数组。
    Array.from('hello')                  // ['h', 'e', 'l', 'l', 'o']
    let namesSet = new Set(['a', 'b'])
    Array.from(namesSet)                 // ['a', 'b']
    Array.from([1, 2, 3])                // [ 1, 2, 3]





    提醒: 扩展运算符（...）也可以将某些数据结构转为数组。
    // agruments对象
    function f() {
        console.log([...arguments]);        // [1, 2, 3]
    }
    f(1, 2, 3)
    // NodeList对象
    console.log([...document.querySelectorAll('div')]);  // [div.div, div.div, div.div]





    4. Array.from 还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
    let arr = [1, 2, 3];
    let arr2 = Array.from(arr, x => x * x);
    console.log(arr, arr2, arr === arr2);           // [1, 2, 3]  [1, 4, 9] false




    下面的例子是取出一组 DOM 节点的文本内容。
    let spans = document.querySelectorAll('div');
    // Es5
    let names1 = Array.prototype.map.call(spans, s => s.textContent);
    console.log(names1);                    // [' divContext1 ', ' divContext2 ', ' divContext3 ']

    // Es6
    let names2 = Array.from(spans, s => s.textContent)
    console.log(names2);                    // [' divContext1 ', ' divContext2 ', ' divContext3 ']

    将bool值返回为false
    let a = Array.from([1, , 2, , 3], n => n || 0)
    console.log(a);                         // [1, 0, 2, 0, 3]





    5. 另一个例子是返回各种数据的类型。
    function typesOf() {
        return Array.from(arguments, value => Object.prototype.toString.call(value))
    }
    console.log(typesOf(null, [], NaN));        // ['[object Null]', '[object Array]', '[object Number]']





    6.
    let a = Array.from({ length: 2 }, () => 'jack')
    console.log(a);                                 // ['jack', 'jack']
   
```

#### 3. Array.of

```
    // Array.of()方法用于将一组值,转换为数组。

    Array.of(3, 11, 8)  // [3,11,8]
    Array.of(3)         // [3]
    Array.of(3).length  // 1
    这个方法的主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。
    Array()  			// []
    Array(3) 			// [, , ,]
    Array(3, 11, 8) 	// [3, 11, 8]

    Array.of() 			// []
    Array.of(undefined) // [undefined]
    Array.of(1) 		// [1]
    Array.of(1, 2) 		// [1, 2]
    Array.of()总是返回参数值组成的数组。如果没有参数，就返回一个空数组。

    Array.of()方法可以用下面的代码模拟实现。
    function ArrayOf() {
        return [].slice.call(arguments);
    }
```

#### 4. find() 和 findIndex()

```js
	// 1. Array.prototype.find()
    
    let arr = [1, 5, 10, 15];
    let a = arr.find((value, index, arr) => {
        arr[index] += 1
        return value > 9;
    })
    console.log(a, arr);             // 10   [2, 6, 11, 15]  因为第三次就返回了 所以最后一个没有改变




    // 2. Array.prototype.findIndex()
    
    let arr = [1, 5, 10, 15];
    let a = arr.findIndex((value, index, arr) => {
        return value > 9;
    })
    console.log(a);                  // 2   




    // 3. 可以绑定第二个参数
    
    function f(v) {
        return v > this.age;
    }
    let person = { name: 'John', age: 20 };
    let a = [10, 12, 26, 15].find(f, person);               // findIndex也可以绑定第二个参数
    console.log(a);                                         // 26





    // 4. 和indexOf的区别
    
    console.log([NaN].indexOf(NaN));                        // -1  
    console.log([NaN].findIndex(y => Object.is(NaN, y)));   // 0
    上面代码中，indexOf方法无法识别数组的NaN成员，但是findIndex方法可以借助Object.is方法做到。

```

#### 5. fill()

```js
	console.log(new Array(3));              		// [empty × 3]
    console.log(new Array(3).fill());       		// [undefined, undefined, undefined]
    console.log(new Array(3).fill('from'));         // ['from', 'from', 'from']
    console.log(['a', 'b', 'c'].fill(7));           // [7, 7, 7]
    let arr = ['a', 'b', 'c', 'd'];
    let arrFill = arr.fill(7, 1, 3)
    console.log(arr, arrFill, arr === arrFill);     // ['a', 7, 7, 'd']  ['a', 7, 7, 'd'] true  改变了原数组



    注意，如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。
    let arr = new Array(3).fill({ name: "Mike" });
    arr[0].name = "Ben";
    console.log(arr);                // [{name: "Ben"}, {name: "Ben"}, {name: "Ben"}]

    let arr1 = new Array(3).fill([]);
    arr1[0].push(5);
    console.log(arr1);               // [[5], [5], [5]]
```

#### 6. entries()，keys() 和 values()

```js
    for (let index of ['a', 'b'].keys()) {
        console.log(index);
    }
    // 0
    // 1

    for (let elem of ['a', 'b'].values()) {
        console.log(elem);
    }
    // 'a'
    // 'b'

    for (let [index, elem] of ['a', 'b'].entries()) {
        console.log(index, elem);
    }
    // 0 "a"
    // 1 "b"

    // 如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。
    let letter = ['a', 'b', 'c'];
    let entries = letter.entries();
    console.log(entries.next());            // {value: Array(2), done: false}
    console.log(entries.next());            // {value: Array(2), done: false}
    console.log(entries.next().value);      // [2, 'c']

```

#### 7. includes()

```
 
         [1, 2, 3].includes(2),        // true
         [1, 2, 3].includes(4),        // false

         [1, 2, NaN].includes(NaN),    // true

         [1, 2, 3].includes(3, 3),     // false
         [1, 2, 3].includes(2, -1),    // false   倒数位置开始

         [NaN].indexOf(NaN),           // -1  使用了严格相等的方式
         [NaN].includes(NaN),          // true



    // 下面代码用来检查当前环境是否支持该方法，如果不支持，部署一个简易的替代版本
    // const contains = (item, value) => {
    //     return Array.prototype.includes
    //         ? item.includes(value)
    //         : item.some(el => el === value);            // some 返回true false 是否符合条件
    // }
    // console.log(contains([1, 2], 3));

```

#### 8. flat()，flatMap()

```
 [1, 2, [3, 4]].flat(),          // [1, 2, 3, 4]  
        [1, 2, [3, [4, 5]]].flat(),     // [1, 2, 3, [4, 5]]
        [1, 2, [3, [4, 5]]].flat(2),    // [1, 2, 3, 4, 5] 
        
        如果不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数。
        [1, [2, [3]]].flat(Infinity),   // [1, 2, 3]
        
        如果原数组有空位，flat()方法会跳过空位。
        [1, 2, , 4, 5].flat(),           // [1, 2, 4, 5]
        Array.from([1, 2, , 4, 5]).flat(),  // [1, 2, undefined, 4, 5]


 flatMap()只能展开一层数组。
        相当于 [[[2]], [[4]], [[6]], [[8]]].flat()
        [1, 2, 3, 4].flatMap(x => [[x * 2]])          // [[2], [4], [6], [8]]
        
        arr.flatMap(function callback(currentValue[, index[, array]]) {
        // ...
    }[, thisArg])
```

#### 9 . 数组的空位

```
 	// forEach(), filter(), reduce(), every() 和some()都, flat() 会跳过空位。
    // map()会跳过空位，但会保留这个值
    // join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。
    
    console.log(
        // //forEach方法
        // [, 'a'].forEach((x, i) => console.log(i)), // 1

        // // filter方法
        // ['a', , 'b'].filter(x => true), // ['a','b']

        // // every方法
        // [, 'a'].every(x => x === 'a'), // true

        // // reduce方法
        // [1, , 2].reduce((x, y) => x + y), // 3

        // // some方法
        // [, 'a'].some(x => x !== 'a'), // false

        // // map方法
        // [, 'a'].map(x => 1), // [,1]

        // // join方法
        // [, 'a', undefined, null].join('#'), // "#a##"

        // // toString方法
        // [, 'a', undefined, null].toString(), // ,a,,

    );

    // ******************************** ES6 则是明确将空位转为undefined。******************************
    // Array.from方法会将数组的空位，转为undefined，也就是说，这个方法不会忽略空位。
    // 扩展运算符（...）也会将空位转为undefined。
    // copyWithin()会连空位一起拷贝
    // fill()会将空位视为正常的数组位置
    // for...of循环也会遍历空位。

    // console.log(
    //     Array.from(['a', , 'b']),              // [ "a", undefined, "b" ]
    //     [...['a', , 'b']],                     // [ "a", undefined, "b" ]
    //     [, 'a', 'b', ,].copyWithin(2, 0),      // [,"a",,"a"]
    //     new Array(3).fill('a'),                // ["a","a","a"]
    // );

    // let arr = [, ,];
    // for (let i of arr) {
    //     console.log(1);                        // 1 1
    // }
    // arr.map(item => console.log(item))         // 直接跳过什么都不输出
    // 上面代码中，数组arr有两个空位，for...of并没有忽略它们。如果改成map方法遍历，空位是会跳过的。


    //(2) entries()、keys()、values()、find()和findIndex()会将空位处理成undefined。

    console.log(
        // entries()
        // [...[, 'a'].entries()],         // [[0,undefined], [1, "a"]]

        // // keys()
        // [...[, 'a'].keys()],            // [0, 1]

        // // values()
        // [...[, 'a'].values()],          // [undefined, "a"]

        // // find()
        // [, 'a'].find(x => true),        // undefined

        // // findIndex()
        // [, 'a'].findIndex(x => true)    // 0

    );
```

### 5. call apply bind

```
    Function.prototype.call()
    Function.prototype.apply()
    Function.prototype.bind()		这个不确定
    
    // call
    let o = { name: '张三' }
    function f(...args) {
        console.log(this.name, ...args);        // 张三 1 2 3
    }
    f.call(o, 1, 2, 3);
 



    // apply
    let o = { name: '张三' }
    function f(...args) {
        console.log(this.name, args);           // 张三 [1, 2, 3]
    }
    f.apply(o, [1, 2, 3]);


    // 案例
    let max = Math.max.apply(Math,[1,3,2])
    console.log(max);               // 3  求最大值




    // bind 方法           详情参考: 犀牛书195
    function f(y, z) {
        return this.x + y + z
    }
    let g = f.bind({ x: 1 }, 2, 3)
    console.log(g());                 // 6


   
    const f = (x, y, z) => x + y + z;
    const g = f.bind(null)(1,2,3)
    console.log(g);
```

### 6. 对象的扩展

#### 1. 属性的简洁表示法

```
	1. 基本
    const foo = 'bar';
    const foo2 = 'bar2';
    const baz = { foo, foo2 };
    console.log(baz);           // {foo: 'bar', foo2: 'bar2'}
    等同于
    const baz = {foo: foo,foo2: foo2};




    // 2. CommonJS 模块输出一组变量，就非常合适使用简洁写法。
    let ms = {};

    function getItem (key) {
      return key in ms ? ms[key] : null;
    }

    function setItem (key, value) {
      ms[key] = value;
    }

    function clear () {
      ms = {};
    }

    module.exports = { getItem, setItem, clear };
    等同于
    module.exports = {
      getItem: getItem,
      setItem: setItem,
      clear: clear
    };



    
    // 3. 属性的赋值器（setter）和取值器（getter），事实上也是采用这种写法。
    const cart = {
        _wheels: 4,
        
        get wheels() {
            return this._wheels;
        },

        set wheels(value) {
            if (value < this._wheels) {
                throw new Error('数值太小了！');
            }
            this._wheels = value;
        }
    }




    
    // 4.注意，简写的对象方法不能用作构造函数，会报错。
    const obj = {
        f() {
            this.foo = 'bar';
            console.log(this.foo);

        }
    };

    new obj.f() //  Uncaught TypeError: obj.f is not a constructor

```



#### 2. 属性名表达式

```
	// 1. 基本概念
    // 方法一
    obj.foo = true;
    // 方法二
    obj['a' + 'bc'] = 123;



    // 2. 例子
    let lastWord = 'last word';
    const a = {
        'first word': 'hello',
        [lastWord]: 'world'
    };
    console.log(
        a['first word'],    // "hello"
        a[lastWord],        // "world"
        a['last word'],     // "world"
    );



    // 3. 表达式还可以用于定义方法名。
    let obj = {
        ['h' + 'ello']() {
            return 'hi';
        }
    };
    
    obj.hello() // hi

   


    // 4. 注意，属性名表达式与简洁表示法，不能同时使用，会报错。

    // 报错
    const foo = 'bar';
    const bar = 'abc';
    const baz = { [foo] };              // 编译报错

    // 正确
    const foo = 'bar';
    const baz = { [foo]: 'abc' };




   // 5. 注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]，这一点要特别小心。

    const keyA = { a: 1 };
    const keyB = { b: 2 };

    const myObject = {
        [keyA]: 'valueA',
        [keyB]: 'valueB'
    };

    console.log(
        myObject // {[object Object]: 'valueB'} 为什么keyA不见了 因为key都是一样的 所以后面覆盖前面
    );
```



#### 3. 方法的name属性

```
	// 1.基本
    const person = {
        sayName() {
            console.log('hello!');
        },
    };

    person.sayName.name         // "sayName"
    // 上面代码中，方法的name属性返回函数名（即方法名）



  
    // 2. 如果对象的方法使用了取值函数（getter）和存值函数（setter），
    // 则name属性不是在该方法上面，而是该方法的属性的描述对象的get和set属性上面，返回值是方法名前加上get和set。

    const obj = {
        get foo() { },
        set foo(x) { }
    };

    obj.foo.name     // TypeError: Cannot read property 'name' of undefined

    const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');
    
    descriptor.get.name  // "get foo"
    descriptor.set.name  // "set foo"




   
    // 3. 有两种特殊情况:bind方法创造的函数，(1) name属性返回bound加上原函数的名字；
    // (2) Function构造函数创造的函数，name属性返回anonymous。
    
    var doSomething = function () { };
    
    doSomething.bind().name      // "bound doSomething"
    
    new Function().name          // "anonymous"




    // 4. 如果对象的方法是一个 Symbol 值，那么name属性返回的是这个 Symbol 值的描述。

    const key1 = Symbol('description');
    const key2 = Symbol();
    let obj = {
        [key1]() { },
        [key2]() { },
    };
    obj[key1].name // "[description]"
    obj[key2].name // ""


```



#### 4. 属性的可枚举性和遍历

```
	1. 可枚举性
    对象的每个属性都有一个描述对象（Descriptor）,用来控制该属性的行为。
    Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象。

    let obj = { foo: 123, foo2: 456 };
    let descriptor = Object.defineProperty(obj, 'foo')
    console.log(descriptor);
    {
        value: 123,
        writable: true,
        enumerable: true,
        configurable: true
    }


	// (1)
    描述对象的enumerable属性，称为“可枚举性”，如果该属性为false，就表示某些操作会忽略当前属性。
    目前，有四个操作会忽略enumerable为false的属性。

    for...in循环：    只遍历对象自身的和继承的可枚举的属性。
    Object.keys()：   返回对象自身的所有可枚举的属性的键名。
    JSON.stringify()：只串行化对象自身的可枚举的属性。
    Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。

    这四个操作之中，前三个是 ES5 就有的，最后一个Object.assign()是 ES6 新增的。其中，
    只有for...in会返回继承的属性，其他三个方法都会忽略继承的属性，只处理对象自身的属性。
    实际上，引入“可枚举”（enumerable）这个概念的最初目的，就是让某些属性可以规避掉for...in操作，
    不然所有内部属性和方法都会被遍历到。比如，对象原型的toString方法，以及数组的length属性，
    就通过“可枚举性”，从而避免被for...in遍历到。 



	// (2)
    Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable		// false
    Object.getOwnPropertyDescriptor([], 'length').enumerable						// false
    
    上面代码中，toString和length属性的enumerable都是false，因此for...in不会遍历到这两个继承自原型的属性。另外，ES6 规定，	   所有 Class 的原型的方法都是不可枚举的。
    
    
    
	// (3)
    Object.getOwnPropertyDescriptor(class { foo() { } }.prototype, 'foo').enumerable // false
   
    总的来说，操作中引入继承的属性会让问题复杂化，大多数时候，我们只关心对象自身的属性。所以，尽量不要用for...in循环，而用		     Object.keys()代替。
    


     // 2. 属性的遍历
     // ES6 一共有 5 种方法可以遍历对象的属性。

    （1）for...in												(1)对象自身可枚举 (2) 继承可枚举
     for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。 

    （2）Object.keys(obj)										(1)对象自身可枚举	
     Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

    （3）Object.getOwnPropertyNames(obj)						(1)对象自身所有属性(包括不可枚举)
     Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

    （4）Object.getOwnPropertySymbols(obj)					(1)对象自身所有Symbol
     Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。

    （5）Reflect.ownKeys(obj)									(1)对象自身(symbol + 不可枚举)
     Reflect.ownKeys返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

    以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

        首先遍历所有数值键，按照数值升序排列。
        其次遍历所有字符串键，按照加入时间升序排列。
        最后遍历所有 Symbol 键，按照加入时间升序排列。
        Reflect.ownKeys({ [Symbol()]: 0, b: 0, 10: 0, 2: 0, a: 0 })
        // ['2', '10', 'b', 'a', Symbol()]
        上面代码中，Reflect.ownKeys方法返回一个数组，包含了参数对象的所有属性。这个数组的属性次序是这样的，
        首先是数值属性2和10，其次是字符串属性b和a，最后是 Symbol 属性。

```

#### 5. super关键字

```
	1.this关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字super，指向当前对象的原型对象。
    const proto = {
        foo: 'hello'
    };

    const obj = {
        foo: 'world',
        find() {
            return super.foo;
        }
    };
    Object.setPrototypeOf(obj, proto);
    obj.find() // "hello"
    上面代码中，对象obj.find()方法之中，通过super.foo引用了原型对象proto的foo属性。




    2. 注意,super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。
    const obj = {
        foo: super.foo               // 报错
    }

    const obj = {
        foo: () => super.foo         // 报错
    }

    const obj = {
        foo: function () {
            return super.foo         // 报错
        }
    }

    总结: 
    上面三种super的用法都会报错，因为对于 JavaScript 引擎来说，这里的super都没有用在对象的方法之中。
    第一种写法是super用在属性里面，第二种和第三种写法是super用在一个函数里面，然后赋值给foo属性。目前，
    只有对象方法的简写法可以让 JavaScript 引擎确认定义的是对象的方法。
    JavaScript 引擎内部，super.foo等同于Object.getPrototypeOf(this).foo（属性）或 	Object.getPrototypeOf(this).foo.call(this)（方法）。




    3. 一个例子
    const proto = {
        x: 'hello',
        foo() {
            console.log(this.x);
        },
    };

    const obj = {
        x: 'world',
        foo() {
            super.foo();
        }
    }

    Object.setPrototypeOf(obj, proto);
    obj.foo() // "world"
    上面代码中，super.foo指向原型对象proto的foo方法，但是绑定的this却还是当前对象obj,因此输出的就是world。
```

#### 6. 对象的扩展运算符

##### 1. 解构赋值

```
	对象的解构赋值用于从一个对象取值，相当于将目标对象自身的所有可遍历的（enumerable）、但尚未被读取的属性，
    分配到指定的对象上面。所有的键和它们的值，都会拷贝到新对象上面。

    1. 基本
    let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
    x ==> 1
    y ==> 2
    z ==> { a: 3, b: 4 }
    上面代码中，变量z是解构赋值所在的对象。它获取等号右边的所有尚未读取的键（a和b），将它们连同值一起拷贝过来。




    2. 由于解构赋值要求等号右边是一个对象，所以如果等号右边是undefined或null，就会报错，因为它们无法转为对象。 
    let { ...z } = null;                 // 运行时错误
    let { ...z } = undefined;            // 运行时错误




    3. 解构赋值必须是最后一个参数，否则会报错。
    let { ...x, y, z } = someObject;     // 句法错误
    let { x, ...y, ...z } = someObject;  // 句法错误
    上面代码中，解构赋值不是最后一个参数，所以会报错。




    4. 注意:解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值
       拷贝的是这个值的引用，而不是这个值的副本。
    let obj = { a: { b: 1 } };
    let { ...x } = obj;
    obj.a === x.a  true
    上面代码中，x是解构赋值所在的对象，拷贝了对象obj的a属性。a属性引用了一个对象，修改这个对象的值，会影响到解构赋值对它的引用。




    5. 扩展运算符的解构赋值，不能复制继承自原型对象的属性。
    let o1 = { a: 1 };
    let o2 = { b: 2 };
    o2.__proto__ = o1;
    let { ...o3 } = o2;
    o3       // { b: 2 }
    o3.a     // undefined
    上面代码中，对象o3复制了o2，但是只复制了o2自身的属性，没有复制它的原型对象o1的属性。





    6. 下面是另一个例子。
    const o = Object.create({ x: 1, y: 2 });            // Object.create()==>原型对象
    o.z = 3;
    let { x, ...newObj } = o;
    let { y, z } = newObj;
    console.log(
        x, y, z                                         // 1 undefined 3
    );

    (1).变量x是单纯的解构赋值，所以可以读取对象o继承的属性；(2).变量y和z是扩展运算符的解构赋值只能读取对象o自身的属性
    所以变量z可以赋值成功，变量y取不到值。
    注意 :ES6 规定，变量声明语句之中，如果使用解构赋值，扩展运算符后面必须是一个变量名
         ,而不能是一个解构赋值表达式，所以上面代码引入了中间 变量newObj，如果写成下面这样会报错。

    let { x, ...{ y, z } } = o;
    //SyntaxError: ... must be followed by an identifier in declaration contexts





    7. 解构赋值的一个用处，是扩展某个函数的参数，引入其他操作。
    function baseFunction({ a, b }) {}
    function wrapperFunction({ x, y, ...restConfig }) {
    // 使用 x 和 y 参数进行操作
    // 其余参数传给原始函数
    return baseFunction(restConfig);
    }
    上面代码中，原始函数baseFunction接受a和b作为参数，函数wrapperFunction在baseFunction的基础上进行了扩展，
    能够接受多余的参数，并且保留原始函数的行为。

```

##### 2. 扩展运算符

```
    1. 对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。
    let z = { a: 3, b: 4 };
    let n = { ...z };
    n // { a: 3, b: 4 }



    2.由于数组是特殊的对象，所以对象的扩展运算符也可以用于数组。
    let foo = { ...['a', 'b', 'c'] };
    foo
    // {0: "a", 1: "b", 2: "c"}



    3.如果扩展运算符后面是一个空对象，则没有任何效果。
    {...{ }, a: 1 }
    // { a: 1 }



    4.如果扩展运算符后面不是对象，则会自动将其转为对象。
    // 等同于 {...Object(1)}
    {...1 } // {}
    上面代码中，扩展运算符后面是整数1，会自动转为数值的包装对象Number{ 1 }。由于该对象没有自身属性，所以返回一个空对象。



    5.下面的例子都是类似的道理。
    {...true }       // 等同于 {...Object(true)}          {}
    {...undefined }  // 等同于 {...Object(undefined)}     {}
    {...null }       // 等同于 {...Object(null)}          {}  



    6. 如果扩展运算符后面是字符串，它会自动转成一个类似数组的对象，因此返回的不是空对象。
    {...'hello' }        // {0: "h", 1: "e", 2: "l", 3: "l", 4: "o"}




    7. 对象的扩展运算符等同于使用Object.assign()方法。
    let aClone = { ...a };       // 等同于 let aClone = Object.assign({}, a);
    上面的例子只是拷贝了对象实例的属性，如果想完整克隆一个对象，还拷贝对象原型的属性，可以采用下面的写法。

    // 写法一
    const clone1 = {
        __proto__: Object.getPrototypeOf(obj),
        ...obj
    };

    // 写法二
    const clone2 = Object.assign(
        Object.create(Object.getPrototypeOf(obj)),
        obj
    );

    // 写法三
    const clone3 = Object.create(
        Object.getPrototypeOf(obj),
        Object.getOwnPropertyDescriptors(obj)
    )
    上面代码中，写法一的__proto__属性在非浏览器的环境不一定部署，因此推荐使用写法二和写法三。




    8. 扩展运算符可以用于合并两个对象。
    let ab = { ...a, ...b };         // 等同于 let ab = Object.assign({}, a, b);




    9. 如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。
    let a = { x: 1, y: 2 }
    let aWithOverrides = { ...a, x: 3, y: 4 };
    console.log(aWithOverrides);    //x = 3, y = 4

    等同于 let aWithOverrides = { ...a, ...{ x: 1, y: 2 } };
    等同于 let x = 1, y = 2, aWithOverrides = { ...a, x, y };
    等同于 let aWithOverrides = Object.assign({}, a, { x: 1, y: 2 });
    上面代码中，a对象的x属性和y属性，拷贝到新对象后会被覆盖掉。


    9.1 这用来修改现有对象部分的属性就很方便了。
    let newVersion = {
        ...previousVersion,
        name: 'New Name'         // Override the name property  重写了name属性
    };
    上面代码中，newVersion对象自定义了name属性，其他属性全部复制自previousVersion对象。


    9.2 如果把自定义属性放在扩展运算符前面，就变成了设置新对象的默认属性值。
    let aWithDefaults = { x: 1, y: 2, ...a };
    // 等同于 let aWithDefaults = Object.assign({}, { x: 1, y: 2 }, a);
    // 等同于 let aWithDefaults = Object.assign({ x: 1, y: 2 }, a);





    10. 与数组的扩展运算符一样，对象的扩展运算符后面可以跟表达式。
    const obj = {
        ...(x > 1 ? { a: 1 } : {}),
        b: 2,
    };




    11.扩展运算符的参数对象之中，如果有取值函数get，这个函数是会执行的。
    let a = {
        get x() {
            throw new Error('not throw yet');
        }
    }
    let aWithXGetter = { ...a }; // 报错
    上面例子中，取值函数get在扩展a对象时会自动执行，导致报错。
```



#### 7. AggregateError 错误对象

```
 	ES2021 标准之中，为了配合新增的Promise.any()方法（详见《Promise 对象》一章），还引入一个新的错误对象AggregateError，	也放在这一章介绍。
     AggregateError 在一个错误对象里面，封装了多个错误。如果某个单一操作，同时引发了多个错误，，需要同时抛出这些错误，
     那么就可以抛出一个 AggregateError 错误对象，把各种错误都放在这个对象里面。


     1. AggregateError 本身是一个构造函数，用来生成 AggregateError 实例对象。
     AggregateError(errors[, message])




     2. AggregateError()构造函数可以接受两个参数。
     errors：数组，它的每个成员都是一个错误对象。该参数是必须的。
     message：字符串，表示 AggregateError 抛出时的提示信息。该参数是可选的。

    const error = new AggregateError([
        new Error('ERROR_11112'),
        new TypeError('First name must be a string'),
        new RangeError('Transaction value must be at least 1'),
        new URIError('User profile link must be https'),
    ], 'Transaction cannot be processed')
    上面示例中，AggregateError()的第一个参数数组里面，一共有四个错误实例。第二个参数字符串则是这四个错误的一个整体的提示。




    3. AggregateError的实例对象有三个属性。
    name：错误名称，默认为“AggregateError”。
    message：错误的提示信息。
    errors：数组，每个成员都是一个错误对象。

    try {
        throw new AggregateError([
            new Error("some error"),
        ], 'Hello');
    } catch (e) {
        console.log(e instanceof AggregateError); // true
        console.log(e.message);                   // "Hello"
        console.log(e.name);                      // "AggregateError"
        console.log(e.errors);                    // [ Error: "some error" ]
```





















## 2. 浏览器 以及Dom对象

### 1.冒泡、捕获、阻止、委托

```
const div1 = document.querySelector('[class=div1]');
const div2 = document.querySelector('[class=div2]');
const div3 = document.querySelector('[class=div3]');
const div4 = document.querySelector('[class=div4]');

// 1. 全部是冒泡
div1.addEventListener('click',function(){ console.log('冒泡div1');})
div2.addEventListener('click',function(){ console.log('冒泡div2');})
div3.addEventListener('click',function(){ console.log('冒泡div3');})
div4.addEventListener('click',function(){ console.log('冒泡div4');})

// 点击div4 冒泡4 > 冒泡3 > 冒泡2 > 冒泡1


// 2. 全部是捕获
div1.addEventListener('click',function(){ console.log('捕获div1');},true)
div2.addEventListener('click',function(){ console.log('捕获div2');},true)
div3.addEventListener('click',function(){ console.log('捕获div3');},true)
div4.addEventListener('click',function(){ console.log('捕获div4');},true)

// 点击div4 捕获1 > 捕获2 > 捕获3 > 捕获4



// 3. 既有冒泡 又有捕获 又有目标元素冒泡与捕获
div1.addEventListener('click', function () { console.log('捕获div1'); }, true)
div2.addEventListener('click', function (e) {console.log('冒泡div2'); })
div3.addEventListener('click', function () { console.log('捕获div3'); }, true)
div4.addEventListener('click', function () { console.log('冒泡div4'); })
div4.addEventListener('click', function () { console.log('捕获div4'); }, true)

// 点击div4 捕获div1 > 捕获div3 > 捕获div4 > 冒泡div4 > 冒泡div2



// 4. stopPropagation
div1.addEventListener('click', function () { console.log("捕获div1"); }, true)
div2.addEventListener('click', function () { console.log("冒泡div2"); })
div3.addEventListener('click', function () { console.log('捕获div3'); }, true)
div4.addEventListener('click', function (e) { console.log('冒泡div4'); e.stopPropagation(); })
div4.addEventListener('click', function () { console.log('捕获div4'); }, true)

// 点击div4  捕获div1 > 捕获div3 > 捕获div4 > 冒泡div4


// 5.  stopPropagation 2
div1.addEventListener('click', function () { console.log("捕获div1");}, true)
div2.addEventListener('click', function (e) { console.log("冒泡div2"); event.stopPropagation();})
div3.addEventListener('click', function () { console.log('捕获div3');}, true)
div4.addEventListener('click', function () { console.log('冒泡div4');})
div4.addEventListener('click', function () { console.log('捕获div4');}, true)

// 点击 div4 捕获div1 > 捕获div3 > 捕获div4 > 冒泡div4 > 冒泡div2


// 总结 阻止冒泡还是捕获 都是要走一遍 遇到event.stopPropagation()  整个事件流就停止了 
// retrun false 听说也是 阻止 事件冒泡捕获  但是自己没有成功 （在dom2级别事件中）





// 6. 事件委托
document.querySelector("ul").addEventListener('click', function (e) {
var event = e || window.event;
var target = event.target || event.srcElement;
if (target.nodeName.toLocaleLowerCase() === 'li') {
	console.log('the content is: ', target.innerHTML);
}
});

// 在上述代码中， target 元素则是在 #list 元素之下具体被点击的元素，
// 然后通过判断 target 的一些属性（比如：nodeName，id 等等）可以更
// 精确地匹配到某一类 #list li 元素之上；
```



## 3. 异步编程

### 1. Promise

#### 1.状态改变成另一个

```
let p1 = new Promise((resolve, reject) => {
setTimeout(() => {
	reject('456')
}, 3000);
})
  
let p2 = new Promise((resolve, reject) => {
setTimeout(() => {
	resolve(p1)
}, 1000);
})

p2.then(success => {
	console.log(success);
}, err => {
	console.log('err', err);
}).catch(aa => {
	console.log('catch', aa);
})
// err, 456
// p2的状态变成了p1  那么就走then 第二个回调 ，catch因为之前有人解决了这个状态 那么catch就不走了
```

#### 2. resolve 或者reject后面的代码还是会执行

```
new Promise((resolve, reject) => {
	resolve(1);
	console.log(2);
}).then(r => {
	console.log(r);
});
// 2  1   resolve在当前脚本所有同步任务执行完才会执行  


// 解决上个例子 情况
new Promise((resolve, reject) => {
	return resolve(1);
	// 后面的语句不会执行
	console.log(2);
}).then(r => {
	console.log(r);
});
// 1
```

#### 4. 返回一个Promsie的情况

```
new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('123')
    }, 2000);
}).then(fill => { }, err => {
	return new Promise((resolve, reject) => {
	resolve(err)
	}); // const f = () => console.log('now');
    // (
    //     () => new Promise(
    //         resolve => resolve(f())
    //     )
    // )();
    // console.log('next');
    // now
    // next
	console.log('a', a);
}, b => {
	console.log('b', b);
})
// 两秒钟之后输出 a 123
// 每个then都是拿到上一个then返回的结果，如果返回的是promise那么就等待他的状态，

```

#### 5. 继上一个例子不写return的情况

```
new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('123')
    }, 2000);
}).then(fill => { }, err => {
	new Promise((resolve, reject) => {
	reject(err)
	});
}).then(a => {
	console.log('a', a);
}, b => {
	console.log('b', b);
})

// a,undefined
// Uncaught (in promise) 123
```

#### 5.成功状态或者是失败状态

```
//如果状态是成功 没有处理(没有写then) 默认不会报错 
new Promise(resolve=>{
	resolve('success')
})

//如果状态是失败 没有处理(没有写then或者catch) 默认会报错
new Promise((resolve, reject)=>{
	reject('error')
})
// Uncaught (in promise) error
```

#### 6. 返回一个普通的值

```
new Promise((resolve, reject)=>{
	resolve('123')
}).then(resolve=>{
	return resolve
}).then(resolve=>{
	console.log(resolve);
})
//返回的是普通的值 那么就一直走第一个
```

#### 7. catch的使用

```
new Promise((resolve, reject) => {
	reject('123')
}).then(resolve => {
	return resolve
}).catch(err => {
	console.log('err1', err);
}).then(resolve => {
	console.log(resolve);
}).catch(err => {
	console.log('err2', err);
})
// err1 123  
// undefined
// 如果有catch 处理了这个错误 那么后方的catch就不会在处理了 紧接着走下一个then
// 上一个promise什么都没有返回 那么 下一个then就是undefined catch返回的也是要给promise

// 例子2
new Promise((resolve, reject) => {
	resolve(123)
}).then(resolve => {
	throw new Error(resolve)
}, reject => {
	console.log('reject', reject);
}).catch(a => console.log(a))

// Error 123
```

#### 8. promise处理与不处理的情况

```
//返回了 promsie
new Promise((resolve, reject) => {
        resolve('123')
    }).then(fill => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(fill)
            }, 1000)
        }).then(a => { }, b => {
            console.log('b', b);
        })
    }).then(resolve => {
        console.log('resolve', resolve);
    }).catch(error => {
        console.log('error', error);
    })
    // b 123
    // resolve undefined
    // 如果返回的promsie里面的状态自己处理了 ,那么接下来的then就不处理了
    
    
    
    //没有返回promise
    new Promise((resolve, reject) => {
        reject('123')
    }).then(resolve => {},reject=>{
       new Promise((resolve,reject)=>{
           setTimeout(() => {
              reject('456')
           }, 2000);
       })
    }).then(resolve => {
        console.log('a', resolve);
    }).catch(error=>{
        console.log('catch',error);
    })
    
    // a, undefined   Uncaught (in promise) 456 
```

####  11. then处理与没有处理的情况

```
// 处理了情况
 new Promise((resolve, reject) => {
        resolve('123')
    }).then(a=>{}).then().then(resolve => {
        console.log(resolve);
    }).catch(a => console.log(a))
    
// undefined
    
// 没有处理的情况
new Promise((resolve, reject) => {
         resolve('123')
    }).then().then().then(resolve => {
         console.log(resolve);
    }).catch(a => console.log(a))

//123  为什么不是undefined  因为第一个then和第二个then都没有处理    
```

#### 12. then默认是成功的

```
new Promise((resolve, reject) => {
        reject('失败')
    }).then().catch(error => {
        return error
    }).then(a => {
        console.log('a', a);
    }, b => {
        console.log('b', b);
    })       
   // a,失败
   // then默认是成功 虽然走的是catch 但是走的并不是 b回调
```

#### 13. then两种写法区别  

```
// 两个回调函数的写法
const p1 = new Promise((resolve, reject) => {
        resolve('123')
    })
    p1.then(a => {
       return Promise.reject('555')
    },b=>{
        console.log('b',b);
    })
 // then 第一个回调抛出的错误 后续没有处理所以   Uncaught (in promise) 555


// catch的写法
const p2 = new Promise((resolve, reject) => {
		reject('456')
	})
    p2.then(a => {
    	return Promise.reject('555')
    }).catch(error=>{
    	console.log('error',error);
    })

// catch 捕捉了 reject('456') 这个错误

```

#### 14. catch连续问题

```
const p3 = new Promise((resolve, reject) => {
        reject('456')
    })
    p3.then(fill => {
        return Promise.reject('555')
    },err=>{
        return Promise.reject(err)
    }).catch(error=>{
        console.log('error',error);
        return Promise.reject('失败')
    }).catch(error2=>{
        console.log("error2",error2);
    }).then(success=>{
        console.log('success',success);
    })
   // error 456
   // error2 失败
   // success undefined
   // 第一个catch捕捉了then中第二个回调 紧接着catch又返回一个错误 那么下方的catch又会捕捉到  
   // 如果 第一个then第二个回调函数err返回的是 Promise.resolve('成功') 那么输出 success,成功
   
   
   // 2
   const someAsyncThing = function () {
        return new Promise(function (resolve, reject) {
            // 下面一行会报错，因为x没有声明
            resolve(x + 2);
        });
    };
    someAsyncThing().then(function () {
        return someOtherAsyncThinga();
    }).catch(function (error) {
        console.log('oh no', error);
        // 下面一行会报错，因为 y 没有声明
        y + 2;
    }).then(function () {
        console.log('carry on');
    }).catch(error => {
        console.log('error', error);
    })
    // oh no ReferenceError: x is not defined
    // error ReferenceError: y is not defined
```

#### 15. promise体内状态改变与否 then的输出问题

```
const promise = new Promise(function (resolve, reject) {
        return 666
    });
    promise.then(a=>{
        console.log('a',a);
    }).catch(error=> {
        console.log(error);
    });
// 因为状态没有改变 那么不会有任何输出	一直是等待中

```

#### 16. promise体内出现错误的问题

```
    const promise = new Promise((resolve, reject)=> {
        // throw new Error('err')
        // a+1
        // resolve(a+1)
    });
    promise.then(a => {
        console.log('a', a);
    }).catch(error => {
        console.log('错误',error);
    });

    1.如果是自定义抛出错误 throw new Error('err') then第二个回调和catch都可以捕获
    2.如果是promise体内发成错误 a+1  ReferenceError: a is not defined
    3.如果是promise体内发成错误 resolve(a+1)  ReferenceError: a is not defined

```

#### 17. catch捕获的范围更广

```
  const promise = new Promise((resolve, reject)=> {
      resolve('132')
    });
    promise.then(a => {
        console.log('a', ab);
    }).catch(error => {
        console.log('错误',error);
    });
    // catch不仅可以捕获promise函数体内的错误 也可以捕获then里面的错误
    // '错误',ab is not defined 
    
```

#### 18. 状态一经改变无法回退

```
   // 1.
    const promise = new Promise((resolve, reject) => {
        throw new Error('test')
        resolve('ok');
    });
    promise.then(value => {}).catch(error => {
        console.log('error', error);
    });
    // error Error: test 状态一经改变 无法回退
    
    
   // 2.
      const promise = new Promise((resolve, reject) => {
        throw new Error('tests')
        setTimeout(() => {
            resolve('ok');
        }, 2000)
    });
    promise.then(value => {
        console.log(value)
    }).catch(error => {
        console.log('error', error);
    });
    // error Error: tests  虽然setTimeout改变了状态 但是promise已经结束了
    
    
    // 3.
     const promise = new Promise((resolve, reject) => {
        resolve('ok');
        setTimeout(() => {
            throw new Error('tests')
        }, 2000)
    });
    promise.then(value => {
        console.log(value)
    }).catch(error => {
        console.log('error', error);
    });

    // ok
    // Uncaught Error: tests  因为promise已经结束了 所以抛出错误没有捕捉(相当于在promise外面写的)

```

#### 19. Promise.all

```
// cosnt p = Promise.all([p1,p2,p3]) 
// p的状态由p1、p2、p3决定，分成两种情况。
// (1)只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1 p2 p3的返回值组成一个数组，传递给p的回调函数。
// (2)只要p1、p2、p3之中有一个被rejected， p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
// 总结 全部成功才调用回调   有一个失败就失败 
// 注意，如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法。
    
    const p1 = new Promise((resolve, reject) => {
        resolve('hello');
    })
        .then(result => result)
        .catch(e => e);

    const p2 = new Promise((resolve, reject) => {
        throw new Error('报错了');
    })
        .then(result => result)
        .catch(e => console.log(e));

    Promise.all([p1, p2])
        .then(result => console.log(result))
        .catch(e => console.log(e.message));
   // Error: 报错了
   // ['hello',undefined]
    // 因为 p2处理了自己的错误 所以Promise.all走的是then  详细的参考阮一峰 promise.all
    // 如果 p2没有处理自己的错误 那么Promise.all走的是catch
```

#### 20. Promise.rice

```
 // cosnt p = Promise.rice([p1,p2,p3]) 
 // 上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。
 // 那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。
    const p = Promise.race([
        fetch('/resource-that-may-take-a-while'),
        new Promise(function (resolve, reject) {
            setTimeout(() => reject(new Error('request timeout')), 5000)
        })
    ]);
    p.then(console.log).catch(console.error);
    上面代码中，如果 5 秒之内fetch方法无法返回结果，变量p的状态就会变为rejected，从而触发catch方法指定的回调函数。
```

#### 21. Promise.allSettled

```
// Promise.allSettled()方法接受一个数组作为参数，数组的每个成员都是一个 Promise 对象并返回一个新的 Promise 对象。
// 只有等到参数数组的所有 Promise 对象都发生状态变更（不管是fulfilled还是rejected),返回的 Promise 对象才会发生状态变更。
    cosnt p = Promise.allSettled([p1,p2,p3]) 
 	// p1 p2 p3 状态都改变了 p的状态才能改变     //而且状态只可能是fulfilled
    (async _ => {
        const promises = [Promise.reject(1), Promise.reject(2), Promise.resolve(3), Promise.resolve(4)]
        let result = await Promise.allSettled(promises)

        result = result.filter(item => {
            return item.status === 'rejected'
        })
        console.log(result);
    })()
    // 0: {status: 'rejected', reason: 1}
    // 1: {status: 'rejected', reason: 2}
```

#### 22. Promise.any

```
 cosnt p = Promise.any([p1,p2,p3]) 
    // 只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；
    // 如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。
    var resolved = Promise.resolve(42);
    var rejected = Promise.reject(-1);
    var alsoRejected = Promise.reject(Infinity);

    Promise.any([resolved, rejected, alsoRejected]).then(function (result) {
        console.log(result); // 42
    })
    Promise.any([rejected, alsoRejected]).catch(function (results) {
        console.log(results); // [-1, Infinity]  返回的不是一般的error对象 而是一个封装类
    });
```

#### 23. Promise.prototype.finally()

```
// Promise.prototype.finally()   // finally不接受任何参数  与状态无关
    Promise.reject('456').then().catch(err=>{
        console.log('err',err);
    }).finally(()=>{
        console.log('fin');
    })
    err, 456
    fin
```

#### 24.  Promise.resolve();

```
    有时候需要将现有对象转为 Promise 对象，Promise.resolve()方法就起到这个作用  参数分为四种情况
    
    （1）参数是一个 Promise 实例
    	如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
    	
    （2）参数是一个thenable对象
    	thenable对象指的是具有then方法的对象，比如下面这个对象。
    	
    （3）参数不是具有then()方法的对象，或根本就不是对象
    	如果参数是一个原始值，或者是一个不具有then()方法的对象，则Promise.resolve()方法返回一个新的 Promise 对象，状态为		resolved。
    	
    (4) 不带有任何参数
    	Promise.resolve()方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。
    	所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用Promise.resolve()方法。


    // 1.参数是一个Promise实例 那么原封不动的返回这个实例
    const p1 = new Promise((resolve, reject) => {
        reject('123')
    })
    Promise.resolve(p1).then(resolve => {
        console.log('resolve', resolve);
    }).catch(err => {
        console.log('err', err);
    })
    // err 123



    // 2. 参数是一个thenable对象
    let thenable = {
        then(resolve, reject) {
            resolve(42);
        }
    };
    let p1 = Promise.resolve(thenable);
    p1.then(function (value) {
        console.log(value);  // 42
    });



    // 3.如果参数是一个原始值，或者是一个不具有then()方法的对象，则Promise.resolve()方法返回一个新的 Promise 对象，状态为		  resolved。
    Promise.resolve('hello').then(e=>console.log(e))            //hello



    需要注意的是，立即resolve()的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。 
    // Promise.resolve().then()是本轮事件的末尾执行的
    // const f = () => console.log('now');
    // Promise.resolve().then(f);
    // console.log('next');
    // next
    // now
    
    
    // const f = () => console.log('now');
    // (
    //     () => new Promise(
    //         resolve => resolve(f())
    //     )
    // )();
    // console.log('next');
    // now
    // next



	// 4. 不带有任何参数
    // Promise.resolve()方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。
    const p = Promise.resolve();
    p.then(function (e) {
        console.log(e);     //undefined
    });
```

#### 25. Promise.reject

```
     Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。
     Promise.reject().catch(e=>console.log(e))           //undefined
     console.log(123456);
    
    // 123456
    // undefined		在本轮事件的末尾执行 resolve也是一样的

```

#### 26. promise 异步加载图片

```
function loadingIMg(path) {
        return new Promise((resolve, reject) => {
            const image = new Image()
            image.onload = () => {
                resolve(image)
            }
            image.onerror = () => {
                reject('错误')
            }
            image.src = path
            document.body.appendChild(image)
        })
    }
    (async function () {
        try {
            const image = await loadingIMg('./vue.png')
            let width = 10;
            let height = 10;

            setInterval(() => {
                width += 1;
                height += 1;
                image.style.width = width + 'px';
                image.style.height = height + 'px';
            },10);
        } catch (e) {
            console.log(e);
        }
    })()
```

# 二. Vue

## 1. Vue基础部分

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

```vue
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

```vue
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

```vue
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

```vue
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

### 9. 生命周期

```
 this.$destroy();  调用 beforeDestroy 和destroyed的函数 可以在里面做一些清除定时器 取消订阅消息等等操作
 			
```

### 10. vue检测数组 ，对象的原理

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



## 3. Vue脚手架

###  脚手架文件结构

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

### 关于不同版本的Vue

1. vue.js与vue.runtime.xxx.js的区别：
   1. vue.js是完整版的Vue，包含：核心功能 + 模板解析器。
   2. vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。
2. 因为vue.runtime.xxx.js没有模板解析器，所以不能使用template这个配置项，需要使用render函数接收到的createElement函数去指定具体内容。

### vue.config.js配置文件

1. 使用vue inspect > output.js可以查看到Vue脚手架的默认配置。
2. 使用vue.config.js可以对脚手架进行个性化定制，详情见：https://cli.vuejs.org/zh

### ref属性

1. 被用来给元素或子组件注册引用信息（id的替代者）
2. 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象（vc）
3. 使用方式：
   1. 打标识：```<h1 ref="xxx">.....</h1>``` 或 ```<School ref="xxx"></School>```
   2. 获取：```this.$refs.xxx```

### props配置项

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

### mixin(混入)

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

### 插件

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

### scoped样式

1. 作用：让样式在局部生效，防止冲突。
2. 写法：```<style scoped>```

### webStorage

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

### 组件的自定义事件

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

### 全局事件总线（GlobalEventBus）

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

### 消息订阅与发布（pubsub）

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

### nextTick

1. 语法：```this.$nextTick(回调函数)```
2. 作用：在下一次 DOM 更新结束后执行其指定的回调。
3. 什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行。

### Vue封装的过度与动画

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

### vue脚手架配置代理

#### 方法一

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

#### 方法二

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

### 插槽

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

### Vuex

#### 1.概念

​		在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。

#### 2.何时使用？

​		多个组件需要共享数据时

#### 3.搭建vuex环境

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

####    4.基本使用

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

#### 5.getters的使用

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

#### 6.四个map方法的使用

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

#### 7.模块化+命名空间

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

 ### 路由

1. 理解： 一个路由（route）就是一组映射关系（key - value），多个路由需要路由器（router）进行管理。
2. 前端路由：key是路径，value是组件。

#### 1.基本使用

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

#### 2.几个注意点

1. 路由组件通常存放在```pages```文件夹，一般组件通常存放在```components```文件夹。
2. 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。
3. 每个组件都有自己的```$route```属性，里面存储着自己的路由信息。
4. 整个应用只有一个router，可以通过组件的```$router```属性获取到。

#### 3.多级路由（多级路由）

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

#### 4.路由的query参数

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

#### 5.命名路由

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

#### 6.路由的params参数

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

#### 7.路由的props配置

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

#### 8.```<router-link>```的replace属性

1. 作用：控制路由跳转时操作浏览器历史记录的模式
2. 浏览器的历史记录有两种写入方式：分别为```push```和```replace```，```push```是追加历史记录，```replace```是替换当前记录。路由跳转时候默认为```push```
3. 如何开启```replace```模式：```<router-link replace .......>News</router-link>```

#### 9.编程式路由导航

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

#### 10.缓存路由组件

1. 作用：让不展示的路由组件保持挂载，不被销毁。

2. 具体编码：

   ```vue
   <keep-alive include="News"> 
       <router-view></router-view>
   </keep-alive>
   ```

#### 11.两个新的生命周期钩子

1. 作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态。
2. 具体名字：
   1. ```activated```路由组件被激活时触发。
   2. ```deactivated```路由组件失活时触发。

#### 12.路由守卫

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

#### 13.路由器的两种工作模式

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

   

















































# 三. Git

## 1. 基础部分

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



## 2. 连接远程仓库

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

































# 四. Node.js

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



# 五.WebPack







# 六. 问题

 ### date11/3

2. map改变原数组

3. 直接修改数组 双向绑定 混乱 ,  slot 方式 ,还有 join 怎么就能行了

4. join 不会改变原来数组  join不会双向绑定   <span style='color:red'>要去看官网 这太死板 </span>

   1.**检测数组方法如下**

   https://cn.vuejs.org/v2/guide/list.html#%E6%95%B0%E7%BB%84%E6%9B%B4%E6%96%B0%E6%A3%80%E6%B5%8B

```
push()
pop()
shift()
unshift()
splice()
sort()
reverse(}  	数组操作  这几种方法是可以的 

new vue({
    data(){
        return{
			arr:[1,2,3]
        }
    },
    methods:{
    	aa(){
    	this.arr=[]  //这是对的
    	this.arr[0]=4  // 这个是数组值改变了 但vue没有检测到 没有双向绑定 这样不会报错
  		}
	}
})
```

**2.slot 方式也是 双向绑定**

注意 row 是 作用域插槽 scope.row 参数，发送http请求 body 中的参数 都是从row中取的	

```
async handleClose(row, i) {
​    const { data: res } = await this.$http.put(
​     `categories/${row.cat_id}/attributes/${row.attr_id}`,
​     {
​      attr_name: row.attr_name,
​      attr_sel: row.attr_sel,
​      attr_vals: row.attr_vals.join(","),     
​     }
​    );

```

**2.map可以改变原数组** 

```
let arr = [1, 2, 3]
let arr2 = arr
 arr.map((val, i, array) => {
    array[i] = val + 1
})

console.log(arr2,arr);  	//[ 2, 3, 4 ] [ 2, 3, 4 ]
```

### date11/4

1.各种this指向  			√

2.罗胖的插件 				√



### date 11/5

1.promise ()   			√

2.call applay  bind ()   √

3. 箭头函数

4.Object对象

5.Proxy es6



























# 七. 错误原因

## 1. 概念错误

date:11/3

概念错误 导致代码过多 卡了很久 不知如何下手 很经典的例子

```
let arr=[1, 2, 3 ]

arr.splice(i,1).join(',')   这是头脑中的一直坚信是对的  以为这就是 数组删除一个并且用逗号链接 想要的结果是删除任意一个 并且转换成 字符串  

可是: splice(0,1) 返回的是 被删除的元素组成的数组 ==》[1] .join(',')

正确的是
arr.splice(i,1)
arr.join(',')
```



## 2. 没有区分大小写的错误

```
Property or method "handleCurrentChange" is not defined
```

```
很经典的问题 由于使用方法的时候是 handleCurrentChange， methods中写的是 handlecurrentChange 写成了小写
控制台总是报 handleCurrentChange 找不到 编辑器中用ctrl+F 查找也没有找到 因为它不区分大小写 
```

 项目优化策略

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

# 八. NPM 常用库

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

// 测试

```















