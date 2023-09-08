<template>
    <v-select
        class="pa-5"
        :items="fruits"
        label="Workouts"
    >
    <template v-slot:prepend-item>
      <v-list-item
        @click="">
        <template v-slot:prepend>
            <v-icon icon="mdi-plus"></v-icon>
        </template>
    </v-list-item>

<v-divider class="mt-2"></v-divider>
</template>
    </v-select>
</template>

<script lang="ts">
export default {
    data() {
        return {
            window: {
                width: 0,
                height: 0
            },
            fruits: [
                'Apples',
                'Apricots',
                'Avocado',
                'Bananas',
                'Blueberries',
                'Blackberries',
                'Boysenberries',
                'Bread fruit',
                'Cantaloupes (cantalope)',
                'Cherries',
                'Cranberries',
                'Cucumbers',
                'Currants',
                'Dates',
                'Eggplant',
                'Figs',
                'Grapes',
                'Grapefruit',
                'Guava',
                'Honeydew melons',
                'Huckleberries',
                'Kiwis',
                'Kumquat',
                'Lemons',
                'Limes',
                'Mangos',
                'Mulberries',
                'Muskmelon',
                'Nectarines',
                'Olives'
            ]
        }
    },
    created() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    async mounted() {
    },
    methods: {
        handleResize() {
            this.window.width = window.innerWidth;
            this.window.height = window.innerHeight;
        }
    }
}
</script>

