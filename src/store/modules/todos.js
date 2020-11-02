// import axios from 'axios';

import axios from "axios";

const state = {
    todos: []
};

const getters = {
    allTodos: (state) => state.todos
};

const actions = {
    async fetchTodos({commit}) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        
        if (response.status !== 200 )
            alert('Error fetching todos'); 
        
        const todosList = response.data;
        commit('setTodos', todosList);
    },
    async addTodo({commit}, title) {
        const resp = await axios.post('https://jsonplaceholder.typicode.com/todos', { title, completed: false});
        commit('newTodo', resp.data);
    },
    async deleteTodo({commit}, id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
        commit('deleteTodo', id);
    },

    async filterTodos({commit}, e) {
        const limit = +e.target.options[e.target.options.selectedIndex].innerText;
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
        commit('setTodos', response.data);
    },

    async updateTodo({commit}, updateTodo) {
        await axios.put(`https://jsonplaceholder.typicode.com/todos/${updateTodo.id}`);
        commit('updateTodo', updateTodo);
    }
};

const mutations = {
    setTodos: (state, todos) => { state.todos = todos; },
    newTodo: (state, todo) => { state.todos.unshift(todo)},
    deleteTodo: (state, id) => {
        state.todos = state.todos.filter( item => item.id !== id);
    },
    updateTodo: (state, todo) => {
        const index = state.todos.findIndex(i => i.id === todo.id);
        if( index !== -1) {
            state.todos.splice(index, 1, todo);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}