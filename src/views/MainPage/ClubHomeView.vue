<script setup lang="ts">
import { Stage } from '@/components/util';
import { useClubStore } from '@/stores/club';
const clubStore = useClubStore();

type Stages = Stage.Start | Stage.Voting | Stage.Reading | Stage.Discussing;
const stages = Object.values(Stage);
const stagesLeftAfterPlanning = stages.filter(stage => stage !== Stage.Start);
const stagesLeftAfterVoting = stagesLeftAfterPlanning.filter(stage => stage !== Stage.Voting);

function verifyCompletedStages(requiredStage: Stages) {
    switch(requiredStage) {
        case Stage.Start:
            return true;
        case Stage.Voting:
            return stagesLeftAfterPlanning.some(stage => clubStore.isInStage(stage));
        case Stage.Reading:
            return stagesLeftAfterVoting.some(stage => clubStore.isInStage(stage));
        case Stage.Discussing:
            return clubStore.isInStage(Stage.Discussing);
    }
}
</script>

<template>
    <div class="clubContent" style="padding: 0; position: relative">
        <img src="src/assets/banner.png" />
        <div class="stages">
            <div class="beginningPhase" :class="{ beginningPhaseActive: verifyCompletedStages(Stage.Start) }">
                <p style="left: 3vw;">Planning</p>
                <div class="hideFlaw" style="right: -0.1vw"></div>
            </div>
            <div class="intermediaryPhase firstIntermediaryPhase" :class="{ firstIntermediaryPhaseActive: verifyCompletedStages(Stage.Voting) }">
                <p style="left: 1.8vw;">Voting</p>
                <div class="hideFlaw" style="left: -0.05vw"></div>
                <div class="hideFlaw" style="right: -0.07vw;"></div>
                <div class="shadow"></div>
            </div>
            <div class="intermediaryPhase scndIntermediaryPhase" :class="{ scndIntermediaryPhaseActive: verifyCompletedStages(Stage.Reading) }">
                <p style="left: 1.5vw;">Reading</p>
                <div class="hideFlaw" style="left: -0.05vw"></div>
                <div class="hideFlaw" style="right: -0.05vw;"></div>
                <div class="shadow"></div>
            </div>
            <div class="endPhase" :class="{ endPhaseActive: verifyCompletedStages(Stage.Discussing) }">
                <p style="left: 1vw;">Discussing</p>
                <div class="hideFlaw" style="left: -0.05vw"></div>
                <div class="shadow"></div>
            </div>
        </div>
        <div class="info">
            <h2 style="color: var(--color-on-background)">Introduction</h2>
            <p style="color: var(--color-alt-on-background)">Club owner has yet to add an introduction.</p>
        </div>
    </div>
</template>

<style scoped>
img {
    width: 100%;
    object-fit: cover;
    height: 43%;
    border-radius: 4.5vw 4.5vw 0 0;
}

.info {
    padding: 2vw 2vw;
}

.shadow {
    position: absolute;
    height: 1px;
    width: 3.01vw;
    left: -3vw;
    top: 4.2vw;
    z-index: -1;
    box-shadow: 0px 2px 0.7px rgba(0, 0, 0, 0.3), 0px 3px 1.5px rgba(0, 0, 0, 0.525);
}

.stages {
    position: absolute; 
    top: 15vw;
    display: flex; 
    flex-direction: row;
    transform: scale(0.72)
}

.stages p {
    position: absolute;
    color: #9A9A9A;
    font-size: 2vw;
    bottom: 0.6vw;
    user-select: none;
}

.stages>*:not(.endPhase) {
    margin-right: 3.5vw;
}

.stages>* {
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px rgba(0, 0, 0, 0.15);
}

.hideFlaw {
    position: absolute;
    width: 0.2vw;
    height: 4.4vw;
    background-color: #D9D9D9;
}

.beginningPhase {
    width: 12.4vw;
    height: 4.4vw;
    background-color: #D9D9D9;
    border-radius: 2.2vw 0 0 2.2vw;
    position: relative;
}

.beginningPhase::after {
    content: '';
    position: absolute;
    right: -3vw;
    width: 0;
    height: 0;
    border-left: 3vw solid #D9D9D9;
    border-top: 2.2vw solid transparent;
    border-bottom: 2.2vw solid transparent;
    padding-left: -2vw;
}

.beginningPhaseActive p {
    color: var(--color-on-primary);
}

.beginningPhaseActive {
    background-color: var(--color-on-primary-container);
}

.beginningPhaseActive::after {
    border-left: 3vw solid var(--color-on-primary-container);
}

.beginningPhaseActive>.hideFlaw {
    background-color: var(--color-on-primary-container);
}

.intermediaryPhase {
    width: 9.64vw;
    height: 4.4vw;
    background-color: #D9D9D9;
    position: relative;
}

.intermediaryPhase::before {
    content: '';
    position: absolute;
    left: -2.97vw;
    width: 0;
    height: 0;
    border-left: 3.01vw solid transparent;
    border-top: 2.2vw solid #D9D9D9;
    border-bottom: 2.2vw solid #D9D9D9;
}

.intermediaryPhase::after {
    content: '';
    position: absolute;
    right: -3vw;
    width: 0;
    height: 0;
    border-left: 3vw solid #D9D9D9;
    border-top: 2.2vw solid transparent;
    border-bottom: 2.2vw solid transparent;
    padding-left: -2vw;
}

.firstIntermediaryPhaseActive p {
    color: var(--color-on-primary);
}

.firstIntermediaryPhaseActive {
    background-color: var(--color-scnd-primary);
}

.firstIntermediaryPhaseActive::before {
    border-top: 2.2vw solid var(--color-scnd-primary);
    border-bottom: 2.2vw solid var(--color-scnd-primary);
}

.firstIntermediaryPhaseActive::after {
    border-left: 3vw solid var(--color-scnd-primary);
}

.firstIntermediaryPhaseActive>.hideFlaw {
    background-color: var(--color-scnd-primary);
}

.scndIntermediaryPhaseActive p {
    color: var(--color-on-primary);
}

.scndIntermediaryPhaseActive {
    background-color: var(--color-primary);
}

.scndIntermediaryPhaseActive::before {
    border-top: 2.2vw solid var(--color-primary);
    border-bottom: 2.2vw solid var(--color-primary);
}

.scndIntermediaryPhaseActive::after {
    border-left: 3vw solid var(--color-primary);
}

.scndIntermediaryPhaseActive>.hideFlaw {
    background-color: var(--color-primary);
}

.endPhase {
    width: 12.4vw;
    height: 4.4vw;
    background-color: #D9D9D9;
    position: relative;
    border-radius: 0 2.2vw 2.2vw 0;
}

.endPhase::before {
    content: '';
    position: absolute;
    left: -2.97vw;
    width: 0;
    height: 0;
    border-left: 3vw solid transparent;
    border-top: 2.2vw solid #D9D9D9;
    border-bottom: 2.2vw solid #D9D9D9;
}

.endPhaseActive p {
    color: var(--color-on-positive);
}

.endPhaseActive {
    background-color: var(--color-positive);
}

.endPhaseActive::before {
    border-top: 2.2vw solid var(--color-positive);
    border-bottom: 2.2vw solid var(--color-positive);
}

.endPhaseActive>.hideFlaw {
    background-color: var(--color-positive);
}
</style>