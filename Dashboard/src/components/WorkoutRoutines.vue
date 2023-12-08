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
                    <v-menu>
                        <template v-slot:activator="{ props }">
                            <v-btn size="small" variant="text" icon="mdi-dots-vertical" v-bind="props"></v-btn>
                        </template>
                        <v-list>
                            <v-list-item v-for="(item, index) in contextOptions" :key="index" :value="index" @click="openContext(idx, item)">
                                <template v-slot:prepend>
                                    <v-icon :icon="item.icon"></v-icon>
                                </template>
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>

                </template>
            </v-list-item>
        </v-list>
    </v-layout>
</template>

<script lang="ts" setup>
</script>

<script lang="ts">

export interface exercise {
    name: string
    time: number
    exercise?: boolean
}

export interface routine {
    name: string
    exercises?: Array<exercise>
}

interface ContextOption {
    title: string
    icon: string
    action: string
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
            ] as Array<routine>,
            contextOptions: [
                { 
                    title: 'Edit',
                    icon: 'mdi-pencil',
                    action: 'edit'
                },
                { 
                    title: 'Delete',
                    icon: 'mdi-delete',
                    action: 'delete'
                },
            ] as Array<ContextOption>,
        }
    },
    mounted() {
    },
    methods: {
        selectRoutine: function (idx: number) {
            this.$router.push('/workout/'+this.routines[idx].name.toLowerCase())
        },
        openContext: function (routine_idx: number, option: ContextOption) {
            if(option.action === "delete")
                this.routines.splice(routine_idx,1);
        }
    }
}

</script>
