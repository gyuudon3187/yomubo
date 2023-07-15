<script setup lang="ts">
import type { AccordionItem, Club } from '@/types/misc';
import { changeSelectionOnScroll } from '@/components/util';
import { watch, ref, onMounted } from 'vue';
const { accordionProps, onSelected } = defineProps<{
    accordionProps: AccordionItem[],
    onSelected?: Function
}>()

accordionProps[0].selected = true;
const items = ref(accordionProps);
const selectedIndex = ref(0);

if(onSelected && items.value.length !== 0) onMounted(() => onSelected(items.value));
if(onSelected) watch(items, () => onSelected(items.value));

function openAccordionItem(item: AccordionItem) {
    items.value = items.value.map((otherItem, index) => {
        if(hasSameLabel(otherItem)) selectedIndex.value = index;
        return Object.assign(otherItem, { selected: hasSameLabel(otherItem) })

        function hasSameLabel(otherItem: AccordionItem) {
            return otherItem.label === item.label;
        }
    })
}

function changeClubSelectionOnScroll(e: WheelEvent) {
    changeSelectionOnScroll<AccordionItem>(e, selectedIndex, items);
}

</script>

<template>
    <div @wheel="changeClubSelectionOnScroll" class="container">
        <div v-if="items.length !== 0" v-for="item in items">
            <p class="item" :class="{selectedItem: item.selected, unselectedItem: !item.selected}" @click="() => openAccordionItem(item)">
                {{ item.label }}
            </p>
            <Transition name="expand-vertically">
                <div class="pane" v-show="item.selected">
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
    width: 14vw;
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
    font-size: 0.93vw;
}

.subItemLabel {
    display: flex;
    color: var(--color-alt-on-background);
}

.subItemLabel p {
    padding-left: 0.3vw;
}

.subItemValue {
    color: var(--color-on-background);
}
</style>