

## 基础

### 1. var let const

**1.不写修饰符的 b 在window上, 在全局声明的a也在window上**

```
 var a = 123;
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

```
  var web = 'beidaqingniao.com'
  console.log(web);        '' 并不是输出web之后再报错 关键字Class  js会进行预解析  直接报错
  var class='hdcms';      
```

**3. 变量提升**

```
  console.info(web);        	'' undefined
  var web='hdms.com';
```

**4. let const 简单使用**

```
 console.info(web,hdms);        '' Uncaught ReferenceError: Cannot access 'web' before initialization
 let web='hdms.com'
 const hdms='hdms.com'
```

**5. 暂存性死区**

```
 let web = 'hdms.com';       
   function func() {
     console.log(web);		    '' Uncaught ReferenceError: Cannot access 'web' before initialization
     let web = 'hdms.com'
   }
 func();
```

**6. 可怕的全局污染**

```
  web = 5  不声明直接使用
```

**7. var的弊端**

```
 var i = 99;
 for (var i = 0; i < 5; i++) {
   console.log(i);     '' 0 1 2 3 4
 }
 console.log(i);       '' 5
```

**8. 块级作用域**

```
let i = 99;
for (let i = 0; i < 5; i++) {
	console.log(i);     '' 0 1 2 3 4
}
console.log(i);         '' 99
```

**9. 块级作用域2**

```
{
	let web='hdms.com';
}
console.log(web);      '' 访问不到
```

**10 .const 一探究竟    作用域问题可以 可以重复声明**

```
const url = 'https://houdunren.com';
function show() {
	const url = 'https://houdunre.com'
}
show();
```

**总结 let const var**

```
   var 1.变量提升 2.可以重复声明 3.在全局声明的变量属于window(非常可怕)
​   let/const 1.同一作用域不能重复声明  2.都具有块级作用域  3.都具有暂存性死区  4.不能先使用在声明
​   const修饰 引用类型/基本类型 1.引用类型的地址改变那么报错 2.基本类型不能更改
```

### 2. null和undefined

```
let web;
console.log(web);         		'' undefined
console.log(typeof null);     	'' object
console.log(typeof undefined);  '' undefined

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
    divList.map(item => console.log(item))         // divList.map is not a function 貌似是divList不是真正的数组

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

```
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

```
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

```
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



 ## 浏览器 以及Dom对象

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



## 异步编程

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
 // Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。
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

 
