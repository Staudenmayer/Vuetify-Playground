<template>
    <div class="d-flex justify-center mb-6">
        <div class="d-flex align-center flex-column flex-grow-1 pl-15">
            <div>
                <div class="text-center pa-10">
                    <v-progress-circular :rotate="360" :size="500" :width="50" :model-value="percent" color="#F44336"
                        style="font-size: 70px;">
                        <div class="ma-2 pa-2 text-red">{{ (currTime / 100).toFixed(0) }}s</div>
                    </v-progress-circular>
                </div>
                <div v-if="workoutLength" class="d-flex justify-center mb-6">
                    <div class="ma-2 pa-2 text-red" style="font-size: 70px;">
                        {{ workoutName }}
                    </div>
                </div>
                <div v-if="workoutLength" class="d-flex justify-center mb-6">
                    <v-btn v-if="timerActive || currTime != 0" @click.stop="prevExercise" class="ma-2 pa-2"><v-icon icon="mdi-skip-previous"></v-icon></v-btn>
                    <v-btn v-if="!timerActive" @click.stop="startTimer" class="ma-2 pa-2"><v-icon icon="mdi-play"></v-icon></v-btn>
                    <v-btn v-if="timerActive" @click.stop="pauseTimer" class="ma-2 pa-2"><v-icon icon="mdi-pause"></v-icon></v-btn>
                    <v-btn v-if="timerActive || currTime != 0" @click.stop="resetTimer" class="ma-2 pa-2"><v-icon icon="mdi-replay"></v-icon></v-btn>
                    <v-btn v-if="timerActive || currTime != 0" @click.stop="nextExercise" class="ma-2 pa-2"><v-icon icon="mdi-skip-next"></v-icon></v-btn>
                </div>
            </div>
        </div>
        <div class="d-flex mb-6 mt-5 mr-10 flex-column flex-grow-0 justify-center">
            <v-btn v-for="(workout, idx) in workoutRoutine" class="ma-2 pa-2" :class="{'text-red': idx == workoutExercise}" @click.stop="idxExercise(idx)">
                <v-icon v-if="workout.exercise == true" icon="mdi-dumbbell"/>
                <v-icon v-else icon="mdi-bed"/>
                <div class="pl-2">
                    {{ workout.name }}
                </div>
            </v-btn>
        </div>
    </div>
</template>

<script lang="ts">
import { createPublicKey } from 'crypto';


export default {
    data() {
        return {
            workouts: {},
            workoutName: "",
            workoutExercise: 0,
            workoutLength: 0,
            timer: '',
            timerActive: false,
            setTime: 45,
            currTime: 0,
            percent: 0,
        }
    },
    props: {
        workoutRoutine: Array,
    },
    beforeUnmount() {
        //clearInterval(this.interval)
    },
    async mounted() {
        await this.getWorkouts();
    },
    methods: {
        async getWorkouts() {
            if(!this?.workoutRoutine || !this?.workoutRoutine?.length)
                return;
            this.workoutExercise = 0;
            this.workoutName = this.workoutRoutine[this.workoutExercise].name;
            this.workoutLength = this.workoutRoutine.length;
        },
        timerFunction() {
            if (this.currTime === this.setTime * 100) {
                this.currTime = 0;
                this.percent = 0;
                if(this.workoutExercise === this.workoutLength-1)
                    return this.clearTimer();
                this.workoutExercise++;
                this.workoutName = this.workoutRoutine[this.workoutExercise].name;
            }
            if (this.currTime % this.setTime === 0)
                this.percent++;
            this.currTime++;
            this.timerActive=true;

        },
        startTimer() {
            this.timer = setInterval(this.timerFunction, 10);
        },
        pauseTimer() {
            clearInterval(this.timer);
            this.timerActive=false;
        },
        clearTimer(){
            this.pauseTimer();
            this.currTime = 0;
            this.percent = 0;
        },
        resetTimer(){
            this.workoutExercise = 0;
            this.workoutName = this.workoutRoutine[this.workoutExercise].name;
            this.clearTimer();
        },
        nextExercise(){
            let timerActive = this.timerActive;
            this.clearTimer();
            if(this.workoutExercise !== this.workoutLength-1){
                this.workoutExercise++;
                this.workoutName = this.workoutRoutine[this.workoutExercise].name;
                if(timerActive)
                    this.startTimer();
            }else{
                this.workoutExercise = 0;
                this.workoutName = this.workoutRoutine[this.workoutExercise].name;
            }
        },
        prevExercise(){
            let timerActive = this.timerActive;
            this.clearTimer();
            if(this.workoutExercise !== 0){
                this.workoutExercise--;
                this.workoutName = this.workoutRoutine[this.workoutExercise].name;
                if(timerActive)
                    this.startTimer();
            }
        },
        idxExercise(idx){
            let timerActive = this.timerActive;
            this.workoutExercise = idx;
            this.workoutName = this.workoutRoutine[this.workoutExercise].name;
            this.clearTimer();
            if(timerActive)
                    this.startTimer();
        }
    }
}
</script>
