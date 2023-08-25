import{_ as a,o as c,c as s,a as d}from"./index-8f82ef3c.js";const t={data:function(){return{variable:0}},methods:{test:function(){return 0}},mounted:function(){console.log("here")}};const n={class:"about"},e=d('<h1 data-v-cdca9c78>This is an about page</h1><h2 data-v-cdca9c78>Declaring variables and functions (most used)</h2><div class="skip" data-v-cdca9c78>Both are valid and do the same thing</div><div class="code-wrapper" data-v-cdca9c78><div class="code" data-v-cdca9c78><code data-v-cdca9c78><span class="blue" data-v-cdca9c78>export default</span> <span class="yellow" data-v-cdca9c78>{</span><br data-v-cdca9c78>   data: <span class="blue" data-v-cdca9c78>function</span><span class="purple" data-v-cdca9c78>() {</span><br data-v-cdca9c78>     <span class="blue" data-v-cdca9c78>return {</span><br data-v-cdca9c78>       <span class="green" data-v-cdca9c78>//variables</span><br data-v-cdca9c78>       variable: 0 <span class="blue" data-v-cdca9c78>as</span> any,<br data-v-cdca9c78>     <span class="blue" data-v-cdca9c78>}</span><br data-v-cdca9c78>   <span class="purple" data-v-cdca9c78>}</span>,<br data-v-cdca9c78>   methods: <span class="purple" data-v-cdca9c78>{</span><br data-v-cdca9c78>     <span class="green" data-v-cdca9c78>//functions</span><br data-v-cdca9c78>     test: <span class="blue" data-v-cdca9c78>function() {</span><br data-v-cdca9c78>       <span class="green" data-v-cdca9c78>//code</span><br data-v-cdca9c78>       <span class="green" data-v-cdca9c78>//use this.variable</span><br data-v-cdca9c78>     <span class="blue" data-v-cdca9c78>}</span><br data-v-cdca9c78>   <span class="purple" data-v-cdca9c78>}</span>,<br data-v-cdca9c78>   mounted: <span class="blue" data-v-cdca9c78>function</span><span class="purple" data-v-cdca9c78>() {</span><br data-v-cdca9c78>     <span class="green" data-v-cdca9c78>//called on start</span><br data-v-cdca9c78>     console.log<span class="blue" data-v-cdca9c78>(</span><span class="red" data-v-cdca9c78>&quot;started&quot;</span><span class="blue" data-v-cdca9c78>)</span>;<br data-v-cdca9c78>   <span class="purple" data-v-cdca9c78>}</span><br data-v-cdca9c78><span class="yellow" data-v-cdca9c78>}</span>; </code></div><div class="code" data-v-cdca9c78><code data-v-cdca9c78><span class="blue" data-v-cdca9c78>import</span> <span class="yellow" data-v-cdca9c78>{</span> ref, onMounted <span class="yellow" data-v-cdca9c78>}</span> from <span class="red" data-v-cdca9c78>&#39;vue&#39;</span><br data-v-cdca9c78><br data-v-cdca9c78><span class="blue" data-v-cdca9c78>const</span> variable = ref<span class="yellow" data-v-cdca9c78>(</span>0 <span class="blue" data-v-cdca9c78>as</span> any<span class="yellow" data-v-cdca9c78>)</span>;<br data-v-cdca9c78><br data-v-cdca9c78> onMounted<span class="yellow" data-v-cdca9c78>(</span><span class="purple" data-v-cdca9c78>()</span> <span class="blue" data-v-cdca9c78>=&gt;</span> <span class="purple" data-v-cdca9c78>{</span><br data-v-cdca9c78>   <span class="green" data-v-cdca9c78>//called on start</span><br data-v-cdca9c78>   console.log<span class="blue" data-v-cdca9c78>(</span><span class="red" data-v-cdca9c78>&quot;started&quot;</span><span class="blue" data-v-cdca9c78>)</span>;<br data-v-cdca9c78><span class="purple" data-v-cdca9c78>}</span><span class="yellow" data-v-cdca9c78>)</span>;<br data-v-cdca9c78><br data-v-cdca9c78><span class="blue" data-v-cdca9c78>function</span> test<span class="yellow" data-v-cdca9c78>() {</span><br data-v-cdca9c78>   <span class="green" data-v-cdca9c78>//code</span><br data-v-cdca9c78>   <span class="green" data-v-cdca9c78>//use variable.value for global vars</span><br data-v-cdca9c78><span class="yellow" data-v-cdca9c78>}</span></code></div></div><div class="v-if" data-v-cdca9c78>if v-if is false, the element literally doesn&#39;t exist, use v-show as alternative</div><div class="v-model" data-v-cdca9c78>using v-model can link an input-type element to a var</div>',6),l=[e];function p(v,r,o,x,A,u){return c(),s("div",n,l)}const i=a(t,[["render",p],["__scopeId","data-v-cdca9c78"]]);export{i as default};
