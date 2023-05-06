<template>
    <div class="text-center pa-4">
        <v-progress-circular :rotate="360" :size="500" :width="50" :model-value="percent" color="error"
            style="font-size: 70px;">
            {{ (currTime / 100).toFixed(0) }}s
        </v-progress-circular>
    </div>
    <div class="d-flex justify-center mb-6">
        <v-card class="ma-2 pa-2 text-red" style="font-size: 70px;">
            {{ workoutName }}
        </v-card>
    </div>
    <div class="d-flex justify-center mb-6">
        <v-btn v-if="timerActive || currTime != 0" @click.stop="prevExercise" class="ma-2 pa-2"><v-icon icon="mdi-skip-previous"></v-icon></v-btn>
        <v-btn v-if="!timerActive" @click.stop="startTimer" class="ma-2 pa-2"><v-icon icon="mdi-play"></v-icon></v-btn>
        <v-btn v-if="timerActive" @click.stop="pauseTimer" class="ma-2 pa-2"><v-icon icon="mdi-pause"></v-icon></v-btn>
        <v-btn v-if="timerActive || currTime != 0" @click.stop="clearTimer" class="ma-2 pa-2"><v-icon icon="mdi-replay"></v-icon></v-btn>
        <v-btn v-if="timerActive || currTime != 0" @click.stop="nextExercise" class="ma-2 pa-2"><v-icon icon="mdi-skip-next"></v-icon></v-btn>

    </div>
</template>

<script lang="ts">
import { start } from 'repl';

export default {
    data() {
        return {
            workouts: {},
            workoutName: "",
            workoutRoutine: [],
            workoutExercise: 0,
            workoutLength: 0,
            timer: '',
            timerActive: false,
            setTime: 45,
            currTime: 0,
            percent: 0,
        }
    },
    beforeUnmount() {
        //clearInterval(this.interval)
    },
    async mounted() {
        await this.getWorkouts();


    },
    methods: {
        async getWorkouts() {
            this.workouts = await this.$axios.get('/workouts');
            this.workoutRoutin = await this.workouts.data[0].sequence;
            this.workoutName = await this.workoutRoutin[this.workoutExercise].name;
            this.workoutLength = await this.workouts.data[0].sequence.length;
        },
        timerFunction() {
            if (this.currTime === this.setTime * 100) {
                this.currTime = 0;
                this.percent = 0;
                if(this.workoutExercise === this.workoutLength-1)
                    return this.clearTimer();
                this.workoutExercise++;
                this.workoutName = this.workoutRoutin[this.workoutExercise].name;
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
        nextExercise(){
            let timerActive = this.timerActive;
            this.clearTimer();
            if(this.workoutExercise !== this.workoutLength-1){
                this.workoutExercise++;
                this.workoutName = this.workoutRoutin[this.workoutExercise].name;
                if(timerActive)
                    this.startTimer();
            }
        },
        prevExercise(){
            let timerActive = this.timerActive;
            this.clearTimer();
            if(this.workoutExercise !== 0){
                this.workoutExercise--;
                this.workoutName = this.workoutRoutin[this.workoutExercise].name;
                if(timerActive)
                    this.startTimer();
            }
        }
    }
}
</script>
