<template>
  <div>
    <apexchart width="500" type="bar" :options="options" :series="series"></apexchart>
    <v-btn @click.stop="test"></v-btn>
  </div>
</template>
  
<script lang="ts">

export default {
  data: function() {
    return {
      options: {
        chart: {
          foreColor: '#ccc',
          id: 'vuechart-example'
        },
        tooltip: {
          theme: 'dark'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        },
        theme: {
        palette:  'palette10'
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }]
    }
  },
  methods:{
    async test(){
      
    }
  }
}
</script>

<style>

</style>
  