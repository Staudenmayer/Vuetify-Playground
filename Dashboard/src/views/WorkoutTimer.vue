<template>
    <WorkoutTimer v-if="workoutRoutine" :workoutRoutine="workoutRoutine.exercises" />
</template>

<script lang="ts" setup>
import { routine } from '@/components/WorkoutRoutines.vue'
import WorkoutTimer from '@/components/WorkoutClock.vue'
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
                        { name: "Warmup", time: 45 },
                        { name: "Pause", time: 15 },
                        { name: "Lying Leg Raises", time: 45, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Flutter Kicks", time: 45, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Hip Raises", time: 45, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Alternating Leg Raises", time: 45, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Lying Leg Raises (Arround the World)", time: 45, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Twisting Plank", time: 45, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Side Plank", time: 22, exercise: true  },
                        { name: "Side Plank", time: 22, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Sit Up", time: 45, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Bicycles", time: 45, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Russian Twist", time: 45, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Twisting Situp", time: 45, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Lying Leg Raises", time: 45, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Flutter Kicks", time: 45, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Hip Raises", time: 45, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Alternating Leg Raises", time: 45, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Lying Leg Raises (Arround the World)", time: 45, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Twisting Plank", time: 45, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Side Plank", time: 22, exercise: true  },
                        { name: "Side Plank", time: 22, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Sit Up", time: 45, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Bicycles", time: 45, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Russian Twist", time: 45, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Twisting Situp", time: 45, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Lying Leg Raises", time: 45, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Flutter Kicks", time: 45, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Hip Raises", time: 45, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Alternating Leg Raises", time: 45, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Lying Leg Raises (Arround the World)", time: 45, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Twisting Plank", time: 45, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Side Plank", time: 22, exercise: true  },
                        { name: "Side Plank", time: 22, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Sit Up", time: 45, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Bicycles", time: 45, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Russian Twist", time: 45, exercise: true  },
                        { name: "Pause", time: 15 },
                        { name: "Twisting Situp", time: 45, exercise: true  },
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
