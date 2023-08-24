<script lang="ts">
export default {
  data: function() {
    return {
      //variables
      variable: 0 as any,
    }
  },
  methods: {
    //functions
    test: function() {
      return 0;
    }
  },
  mounted: function() {
    //called on start
    console.log("here");
  }
};
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>Declaring variables and functions (most used)</h2>
    <div class="skip">Both are valid and do the same thing</div>
    <div class="code-wrapper">
      <div class="code">      
        <code>
          <span class="blue">export default</span> <span class="yellow">{</span><br>
          &nbsp;&nbsp;data: <span class="blue">function</span><span class="purple">() {</span><br>
          &nbsp;&nbsp;&nbsp;&nbsp;<span class="blue">return {</span><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="green">//variables</span><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variable: 0 <span class="blue">as</span> any,<br>
          &nbsp;&nbsp;&nbsp;&nbsp;<span class="blue">}</span><br>
          &nbsp;&nbsp;<span class="purple">}</span>,<br>
          &nbsp;&nbsp;methods: <span class="purple">{</span><br>
          &nbsp;&nbsp;&nbsp;&nbsp;<span class="green">//functions</span><br>
          &nbsp;&nbsp;&nbsp;&nbsp;test: <span class="blue">function() {</span><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="green">//code</span><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="green">//use this.variable</span><br>
          &nbsp;&nbsp;&nbsp;&nbsp;<span class="blue">}</span><br>
          &nbsp;&nbsp;<span class="purple">}</span>,<br>
          &nbsp;&nbsp;mounted: <span class="blue">function</span><span class="purple">() {</span><br>
          &nbsp;&nbsp;&nbsp;&nbsp;<span class="green">//called on start</span><br>
          &nbsp;&nbsp;&nbsp;&nbsp;console.log<span class="blue">(</span><span class="red">"started"</span><span class="blue">)</span>;<br>
          &nbsp;&nbsp;<span class="purple">}</span><br>
          <span class="yellow">}</span>;
        </code>      
      </div>      
      <div class="code">
        <code>
          <span class="blue">import</span> <span class="yellow">{</span> ref, onMounted <span class="yellow">}</span> from <span class="red">'vue'</span><br>
          <br>
          <span class="blue">const</span> variable = ref<span class="yellow">(</span>0 <span class="blue">as</span> any<span class="yellow">)</span>;<br>
          <br>
          onMounted<span class="yellow">(</span><span class="purple">()</span> <span class="blue">=></span> <span class="purple">{</span><br>
            &nbsp;&nbsp;<span class="green">//called on start</span><br>
            &nbsp;&nbsp;console.log<span class="blue">(</span><span class="red">"started"</span><span class="blue">)</span>;<br>
            <span class="purple">}</span><span class="yellow">)</span>;<br>
          <br>
          <span class="blue">function</span> test<span class="yellow">() {</span><br>
            &nbsp;&nbsp;<span class="green">//code</span><br>
            &nbsp;&nbsp;<span class="green">//use variable.value for global vars</span><br>
          <span class="yellow">}</span>
        </code>
      </div>
    </div>
    <div class="v-if">if v-if is false, the element literally doesn't exist, use v-show as alternative</div>
    <div class="v-model">using v-model can link an input-type element to a var</div>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/base.css';
.code-wrapper {
  display: flex;
  justify-content: start;
  > div {
    display: inline-block;
  }
}
.code {
  background-color: var(--color-background-mute);
  width: fit-content;
  padding: .3em;
  border: .4em solid var(--color-border);
  margin-left: 1em;
  border-radius: .7em;
  box-shadow: var(--wrapper-box-shadow);

  .blue { color: rgba(44, 122, 214, 1); }
  .yellow { color: rgba(255, 180, 23, 1); }
  .red { color: rgba(206, 145, 120, 1); }
  .purple { color: rgba(206, 112, 179, 1); }
  .green { color: rgba(54, 120, 85, 1); }
}

@media (max-width: 500px) {
  .code {
    margin: 0 auto;
  }
}
</style>
