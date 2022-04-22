<template>
<div>
{{msg}}
<div id="app"></div>
</div>
</template>

<script>
    new Vue({
        el:'#app',
        name : "demo",
        data(){
            return{
                msg:"Hello World!!!"
            }
        }
    })
</script>
<style></style>
 