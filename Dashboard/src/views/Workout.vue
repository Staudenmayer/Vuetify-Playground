<template>
    <WorkoutRoutines v-if="!workoutRoutine" @selectRoutine="selectRoutine"></WorkoutRoutines>
    <WorkoutTimer v-else :workoutRoutine="workoutRoutine.exercises" />
</template>

<script lang="ts" setup>
import WorkoutRoutines, { routine } from '@/components/WorkoutRoutines.vue'
import WorkoutTimer from '@/components/WorkoutTimer.vue'
</script>

<script lang="ts">
export default {
    data() {
        return {
            workoutRoutine: null as null | routine,
        }
    },
    mounted() {
    },
    methods: {
        selectRoutine(el: routine) {
            this.workoutRoutine = el;
            this.$emit("updateCrumbs", [{title: this.$route.name,disabled: false,href: '/workout'}, {title: el.name, disabled: true,}])
        }
    }
}

</script>
