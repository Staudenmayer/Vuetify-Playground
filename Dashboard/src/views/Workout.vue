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
        <v-btn @click.stop="" class="ma-2 pa-2"><v-icon icon="mdi-skip-previous"></v-icon></v-btn>
        <v-btn @click.stop="startTimer" class="ma-2 pa-2"><v-icon icon="mdi-play"></v-icon></v-btn>
        <v-btn @click.stop="pauseTimer" class="ma-2 pa-2"><v-icon icon="mdi-pause"></v-icon></v-btn>
        <v-btn @click.stop="clearTimer" class="ma-2 pa-2"><v-icon icon="mdi-replay"></v-icon></v-btn>
        <v-btn @click.stop="" class="ma-2 pa-2"><v-icon icon="mdi-skip-next"></v-icon></v-btn>

    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            workouts: {},
            workoutName: "",
            workoutSet: [],
            timer: '',
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
        console.log(this.workoutSet);


    },
    methods: {
        async getWorkouts() {
            this.workouts = await this.$axios.get('/workouts');
            this.workoutSet = await this.workouts.data[0].sequence;
            this.workoutName = await this.workouts.data[0].name;
        },
        timerFunction() {
            if (this.currTime === this.setTime * 100) {
                this.currTime = 0;
                this.percent = 0;
            }
            if (this.currTime % this.setTime === 0)
                this.percent++;
            this.currTime++;

        },
        startTimer() {
            this.timer = setInterval(this.timerFunction, 10);
        },
        pauseTimer() {
            clearInterval(this.timer);
        },
        clearTimer(){
            this.pauseTimer();
            this.currTime = 0;
            this.percent = 0;
        }
    }
}
</script>
