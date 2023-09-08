<template>
    <WorkoutSelecter />
    <div class="d-flex justify-center mb-6 flex-wrap" style="height: 60vh">
        <div class="d-flex justify-center flex-column flex-grow-1">
            <div style="font-size: 5vw;">
                <div class="text-center pa-5">
                    <v-progress-circular :rotate="360" :size="window.width > 750 ? window.width/4 : window.width/2" :width="window.width > 750 ? window.width/40 : window.width/20" :model-value="percent" color="primary">
                        <div class="ma-2 pa-2 text-primary">{{ (currTime / 100).toFixed(0) }}s</div>
                    </v-progress-circular>
                </div>
                <div v-if="workoutLength" class="d-flex justify-center">
                    <div class="ma-2 pa-2 text-primary">
                        {{ workoutName }}
                    </div>
                </div>
                <div v-if="workoutLength" class="d-flex justify-center mb-6">
                    <v-btn v-if="timerActive || currTime != 0" @click.stop="prevExercise" class="ma-2 pa-2"><v-icon icon="mdi-skip-previous" color="primary"></v-icon></v-btn>
                    <v-btn v-if="!timerActive" @click.stop="startTimer" class="ma-2 pa-2"><v-icon icon="mdi-play" color="primary"></v-icon></v-btn>
                    <v-btn v-if="timerActive" @click.stop="pauseTimer" class="ma-2 pa-2"><v-icon icon="mdi-pause" color="primary"></v-icon></v-btn>
                    <v-btn v-if="timerActive || currTime != 0" @click.stop="resetTimer" class="ma-2 pa-2"><v-icon icon="mdi-replay" color="primary"></v-icon></v-btn>
                    <v-btn v-if="timerActive || currTime != 0" @click.stop="nextExercise" class="ma-2 pa-2"><v-icon icon="mdi-skip-next" color="primary"></v-icon></v-btn>
                </div>
            </div>
        </div>
        <div v-if="window.width > 750" class="d-flex mb-6 mt-5 mr-10 flex-column flex-grow-0 justify-center"> <!-- Desktop mode-->
            <v-card class="d-flex flex-column overflow-auto" style="height: 75vh;">
                <v-btn v-for="(workout, idx) in workoutRoutine" :id="'exercise_'+idx" class="ma-2 pa-2" :color="idx == workoutExercise ? 'primary' : ''" @click.stop="idxExercise(idx)">
                    <v-icon v-if="workout.exercise == true" icon="mdi-dumbbell" :color="idx == workoutExercise ? $vuetify.theme.themes.dark.colors.background : ''"/>
                    <v-icon v-else icon="mdi-bed" :color="idx == workoutExercise ? $vuetify.theme.themes.dark.colors.background : ''"/>
                    <div class="pl-2" :style="{color: idx == workoutExercise ? $vuetify.theme.themes.dark.colors.background : ''}">
                        {{ workout.name }}
                    </div>
                </v-btn>
            </v-card>
        </div>
    </div>
    <div v-if="window.width <= 750">
            <v-card class="d-flex flex-column overflow-auto ma-5" style="height: 60vh;"> <!-- Mobile mode-->
                <v-btn v-for="(workout, idx) in workoutRoutine" :id="'exercise_'+idx" class="ma-2 pa-2" :color="idx == workoutExercise ? 'primary' : ''" @click.stop="idxExercise(idx)">
                    <v-icon v-if="workout.exercise == true" icon="mdi-dumbbell" :color="idx == workoutExercise ? $vuetify.theme.themes.dark.colors.background : ''"/>
                    <v-icon v-else icon="mdi-bed" :color="idx == workoutExercise ? $vuetify.theme.themes.dark.colors.background : ''"/>
                    <div class="pl-2" :style="{color: idx == workoutExercise ? $vuetify.theme.themes.dark.colors.background : ''}">
                        {{ workout.name }}
                    </div>
                </v-btn>
            </v-card>
        </div>
</template>

<script lang="ts" setup>
    import WorkoutSelecter from '@/components/WorkoutSelecter.vue'
</script>

<script lang="ts">

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
            window: {
                width: 0,
                height: 0
            },
            progressSize: 0
        }
    },
    props: {
        workoutRoutine: Array,
    },
    created() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
        this.clearTimer();
    },
    async mounted() {
        await this.getWorkouts();
    },
    methods: {
        handleResize() {
            this.window.width = window.innerWidth;
            this.window.height = window.innerHeight;
        },
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
            document.getElementById("exercise_" + this.workoutExercise).scrollIntoView();
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
            document.getElementById("exercise_" + this.workoutExercise).scrollIntoView();
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
            document.getElementById("exercise_" + this.workoutExercise).scrollIntoView();
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

