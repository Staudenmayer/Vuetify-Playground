<template>
    <v-avatar :size="size" @mouseenter="onHover(true)" @mouseleave="onHover(false)" @click="onClick">
        <v-img :src="profile" cover :width="size" :height="size">
            <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                    <v-icon v-if="!profile && !isHovering" icon="mdi-account-circle" :size="size"></v-icon>
                    <v-icon v-if="isHovering" icon="mdi-upload" :size="size"></v-icon>
                </div>
            </template>
        </v-img>
    </v-avatar>
</template>

<script lang="ts">
export default {
    data() {
        return {
            isHovering: false
        }
    },
    props: {
        size: String,
        hover: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        profile: function (): string {
            let res = "";
            if (this.$user?.img && this.$user?.imgFormat && !this.isHovering) {
                res = `data:image/${this.$user.imgFormat};base64, ${this.$user.img}`
            }
            return res;
        }
    },
    created() {
    },

    unmounted() {
    },
    mounted() {
    },
    methods: {
        onHover (on: boolean) {
            if(!this.hover) return;
            this.isHovering = on;
            this.profile;
        },
        onClick () {
            if (this.hover) {
                
            }
        }
    }
}
</script>
  
  