<template>
    <div>
       Select Filter: 
        <select @change="filterTodos($event)">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
        </select>
    </div>
  
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'FilterTodos',
    methods: mapActions(['filterTodos'])
}
</script>

<style>

</style>