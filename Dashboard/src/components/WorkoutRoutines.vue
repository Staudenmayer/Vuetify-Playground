<template>
    <!--
    <v-card v-for="(el, idx) in routines" class="d-flex pa-5 ma-3" @click="selectRoutine(idx)">
        {{ el.name }}
    </v-card>
    -->
    <v-layout class="mx-auto pa-2 justify-center">
        <v-list class="d-flex flex-column">
            <v-list-item v-for="(el, idx) in routines" @click="selectRoutine(idx)">
                <template v-slot:prepend>
                    {{ el.name }}
                </template>
                <template v-slot:append>
                    <v-btn size="small" variant="text" icon="mdi-dots-vertical" @click.stop="openContext(idx)"></v-btn>
                </template>
            </v-list-item>
        </v-list>
    </v-layout>
</template>

<script lang="ts" setup>
</script>

<script lang="ts">

export interface exercise {
    name: string,
    time: number,
    exercise?: boolean
}

export interface routine {
    name: string,
    exercises?: Array<exercise>
}

export default {
    data() {
        return {
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
            ] as Array<routine>
        }
    },
    mounted() {
    },
    methods: {
        selectRoutine: function (idx: number) {
            this.$emit('selectRoutine', this.routines[idx]);
        },
        openContext: function (idx: number) {

        }
    }
}

</script>
