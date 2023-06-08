<script setup lang="ts">

</script>

<template>
    <div class="container">
        
        <div class="subcontainer">
            
            <div class="synopsisContainer">
                <h style="color: black; font-size: 1.4vw; font-weight: 700;">Title</h>
                <p style="color: var(--color-alt-on-background); font-size: 1.1vw;">Author</p>
                <p class="synopsis">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat </p>
            </div>
        </div>
        <img class="book" src="@/assets/kagami_no_kojou.png"/>
    </div>
</template>

<style scoped>
.container {
    /* width: 35vw; */
    height: 16.4vw;
}

.book {
    border-radius: 3px;
    position:absolute;
    bottom: 2vw;
    left: 2vw;
    width: 10vw;
    height: auto;
}

.subcontainer {
    width: 100%;
    height: 13.3vw;
    background-color: white;
    border-radius: 20px;
    bottom: 0;
    position: absolute;
}

.synopsisContainer {
    padding-left: 13vw;
    padding-top: 0.5rem;
    width: 34vw;
    /* background-color: red; */
}

.synopsis {
    overflow-y: scroll; 
    height: 7vw;
    font-size:1vw;
    color: var(--color-on-background);
}

.synopsis::-webkit-scrollbar {
  width: 0.4vw;
}

.synopsis::-webkit-scrollbar-thumb {
  background-color: rgb(153, 88, 88);
  border-radius: 8px;
}

</style>