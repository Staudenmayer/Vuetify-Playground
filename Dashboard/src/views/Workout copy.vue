<template>
    <apexchart height="70%" :options="options" :series="[percent]"></apexchart>

    <div class="d-flex justify-center mb-6">
        <v-card class="ma-2 pa-2" style="font-size: 70px;">
            {{ sequence[sequenceCount].name }}
        </v-card>
    </div>
    <div class="d-flex justify-center mb-6">
        <v-btn @click.stop="prevSequence" class="ma-2 pa-2"><v-icon icon="mdi-skip-previous"></v-icon></v-btn>
        <v-btn @click.stop="startTimer" class="ma-2 pa-2"><v-icon icon="mdi-play"></v-icon></v-btn>
        <v-btn @click.stop="pauseTimer" class="ma-2 pa-2"><v-icon icon="mdi-pause"></v-icon></v-btn>
        <v-btn @click.stop="clearSequence" class="ma-2 pa-2"><v-icon icon="mdi-replay"></v-icon></v-btn>
        <v-btn @click.stop="nextSequence" class="ma-2 pa-2"><v-icon icon="mdi-skip-next"></v-icon></v-btn>
        
    </div>
</template>

<script lang="ts">
export default {
    data: function () {
        return {
            sequence: [
                {
                    name: 'Warmup',
                    time: 45
                },
                {
                    name: 'Break',
                    time: 45
                },
                {
                    name: 'Burpee',
                    time: 45
                }
            ],
            sequenceCount: 0,
            percent: 0,
            timer: '',
            time: 45,
            options: {
                chart: {
                    height: 280,
                    type: "radialBar"
                },
                theme: {
                    monochrome: {
                        enabled: true,
                        color: '#FFFFFF'
                    }
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            margin: 15,
                            size: "70%"
                        },

                        dataLabels: {
                            showOn: "always",
                            name: {
                                show: false,
                                color: "#FFFFFF",
                                fontSize: "100px",
                            },
                            value: {
                                color: "#FFFFFF",
                                fontSize: "100px",
                                show: false,
                                formatter: function (val) {
                                    return val + 's'
                                }
                            }
                        }
                    }
                },
                stroke: {
                    lineCap: "round",
                }
            }
        }
    },
    mounted() {
        this.options.plotOptions.radialBar.dataLabels.name.color = this.$vuetify.theme.themes.dark.colors.primary;
        this.options.theme.monochrome.color = this.$vuetify.theme.themes.dark.colors.primary;
        this.getWorkouts();
    },
    methods: {
        incSec() {
            this.percent++;
        },
        startTimer() {
            this.timer = setInterval(this.incSec, 450);//450ms = 1% of 45s
        },
        pauseTimer() {
            clearInterval(this.timer);
        },
        clearTimer() {
            this.percent = 0;
            clearInterval(this.timer);
        },
        nextSequence() {
            this.clearTimer();
            this.startTimer();
            this.sequenceCount++;
        },
        prevSequence() {
            this.clearTimer();
            this.startTimer();
            this.sequenceCount--;
        },
        clearSequence() {
            this.clearTimer();
            this.sequenceCount = 0;
        },
        async getWorkouts(){
            let workouts = await this.$axios.get('/workouts');
            console.log(workouts.data);
        },
        async getWorkout(workout: string){
            let workouts = await this.$axios.get('/workouts/' + workout);
            return workouts.data;
        }
    },
    watch: {
        // whenever question changes, this function will run
        percent(curr, prev) {
            if (curr == 100) {
                this.nextSequence();
            }
        }
    },
}

</script>
