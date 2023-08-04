<template>
    <WorkoutTimer :workoutRoutine="workoutRoutine"/>
</template>

<script lang="ts" setup>
  import WorkoutTimer from '@/components/WorkoutTimer.vue'
</script>

<script lang="ts">
 export default {
    data() {
        return {
            workoutRoutine: [
                {name: "Burpee", time: 45, exercise: true},
                {name: "Pause", time: 15},
                {name: "Pike Push Up", time: 45, exercise: true},
                {name: "Pause", time: 15},
                {name: "Burpee", time: 45, exercise: true},
                {name: "Pause", time: 15},
                {name: "Pike Push Up", time: 45, exercise: true},
                {name: "Pause", time: 15},
                {name: "Burpee", time: 45, exercise: true},
                {name: "Pause", time: 15},
                {name: "Pike Push Up", time: 45, exercise: true},
                {name: "Pause", time: 15},
                {name: "Burpee", time: 45, exercise: true},
                {name: "Pause", time: 15},
                {name: "Pike Push Up", time: 45, exercise: true},
                {name: "Pause", time: 15},
                {name: "Burpee", time: 45, exercise: true},
                {name: "Pause", time: 15},
                {name: "Pike Push Up", time: 45, exercise: true},
                {name: "Pause", time: 15},
                {name: "Burpee", time: 45, exercise: true},
                {name: "Pause", time: 15},
                {name: "Pike Push Up", time: 45, exercise: true},
                {name: "Pause", time: 15},
                {name: "Burpee", time: 45, exercise: true},
                {name: "Pause", time: 15},
                {name: "Pike Push Up", time: 45, exercise: true},
                {name: "Pause", time: 15},
                {name: "Burpee", time: 45, exercise: true},
                {name: "Pause", time: 15},
                {name: "Pike Push Up", time: 45, exercise: true},
                {name: "Pause", time: 15},
                {name: "Burpee", time: 45, exercise: true},
                {name: "Pause", time: 15},
                {name: "Pike Push Up", time: 45, exercise: true},
                {name: "Pause", time: 15},
            ],
        }
    },
    beforeUnmount() {
    },
    mounted() {

    },
    methods: {
    }
}

</script>
