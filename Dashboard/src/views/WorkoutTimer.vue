<template>
    <WorkoutTimer v-if="workoutRoutine" :workoutRoutine="workoutRoutine.exercises" />
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
            routines: [
                {
                    name: "ABS",
                    exercises: [
                        { name: "ABS", time: 45, exercise: true },
                        { name: "Pause", time: 15 }
                    ]
                },
                {
                    name: "Calisthenics",
                    exercises: [
                        { name: "Calisthenics", time: 45, exercise: true },
                        { name: "Pause", time: 15 }
                    ]
                },
                {
                    name: "Stretching",
                    exercises: [
                        { name: "Stretching", time: 45, exercise: true },
                        { name: "Pause", time: 15 }
                    ]
                }
            ] as Array<routine>,
        }
    },
    mounted() {
        const me = this;
        this.workoutRoutine = this.routines.find((el)=>{ return el.name.trim().toLowerCase() === me.$route.params.uuid.toString().trim().toLowerCase()}) || null;
        if(this.workoutRoutine === null) {
            this.$router.push({path: '/workout'});
            return;
        }
        this.$emit("updateCrumbs", [{title: this.$route.name,disabled: false,href: '/workout'}, {title: this.workoutRoutine.name, disabled: true}])
    },
}

</script>
