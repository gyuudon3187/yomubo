<script setup lang="ts">
import type { AccordionItem } from '@/types/misc'
const { items } = defineProps<{
    items: AccordionItem[]
}>()

function openAccordionItem(item: AccordionItem) {
    if(!item.selected.value) {
        items.forEach(otherItem => {
            if(otherItem.selected.value) {
                otherItem.selected.value = false;
            }
        })
        item.selected.value = true;
    }
}
</script>

<template>
    <div class="container">
        <div v-if="items.length !== 0" v-for="item in items">
            <p class="item" :class="{selectedItem: item.selected.value, unselectedItem: !item.selected.value}" @click="() => openAccordionItem(item)">
                {{ item.label }}
            </p>
            <Transition name="expand-vertically">
                <div class="pane" v-show="item.selected.value">
                    <div class="subItem" v-for="subItem in item.subItems">
                        <div class="subItemLabel">
                            <Icon :icon="subItem.icon" />
                            <p>{{ subItem.label }}</p>
                        </div>
                        <p class="subItemValue">{{ subItem.value }}</p>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<style scoped>
.container {
    background-color: var(--color-background);
    border-radius: 1vw;
    color: var(--color-on-background);
    padding: 1vw;
}

.item {
    cursor: pointer;
    font-size: 1.2vw;
    user-select: none;
}

.selectedItem {
    font-weight: bold;
}

.pane {
    background-color: white;
    border-radius: 0.5vw;
}

.expand-vertically-enter-active,
.expand-vertically-leave-active {
    transition: all 0.5s ease;
    max-height: 24vw;
    overflow: hidden;
}

.expand-vertically-enter-from,
.expand-vertically-leave-to {
    max-height: 0px;
}

.subItem {
    padding: 0.5vw 1vw;
    /* display: flex; */
    justify-content: space-between;
    font-size: 0.93vw;
}

.subItemLabel {
    display: flex;
    flex-direction: row;
    color: var(--color-alt-on-background);
}

.subItemLabel p {
    padding-left: 0.3vw;
}

.subItemValue {
    color: var(--color-on-background);
}
</style>