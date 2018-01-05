Vue.component('todo',{
	template: '<div class="container">'+
	'<div class="row justify-content-center">'+
	'<div class="col-md-6">'+
	'<h1 class="text-center">Todolist</h1>'+
	'<hr>'+
	'<input type="text" class="form-control" placeholder="Input todolist & enter" v-model="todo.name" v-on:keyup.enter="addTodo">'+
	'<hr>'+
	'<button @click="status=\'all\'">All</button>'+
	'<button @click="status=\'pending\'">Pending</button>'+
	'<button @click="status=\'done\'">Done</button>'+
	'<ul class="list-group">'+
	'<todo-item v-for="item,index in todos" v-bind:item="item" v-bind:key="index" ></todo-item>'+
	'</ul>'+
	'</div>'+
	'</div>'+
	'</div>',
	data: function(){
		return {
			status: 'all',
			todo: {
				name: '',
				done: false
			}
		}
	},
	computed: {
		todos(){
			
			if(this.status == 'all')
				return this.$store.state.todos	
			else if(this.status == 'done')
				return this.$store.getters.doneTodos
			else if(this.status == 'pending')
				return this.$store.getters.pendingTodos
		},
	},
	methods: {
		addTodo(){
			if(this.todo.name != ''){
				this.$store.commit('addTodo',this.todo)
				this.todo = {
					name: '',
					done: false
				}
			}
		}
	}
});

Vue.component('todo-item',{
	props: ['item'],
	template: '<li class="list-group-item" v-bind:style="isActive">{{ item.name }}'+
	'<button type="button" class="btn btn-success float-right" v-on:click="toggleTodo">'+
	'&or;'+
	'</button>'+
	'<button type="button" class="btn btn-danger float-right" aria-label="Close" v-on:click="deleteTodo">'+
	'<span aria-hidden="true">&times;</span>'+
	'</button>'+
	'</li>',
	methods: {
		toggleTodo(){
			this.$store.commit('toggleTodo',this.item)
		},
		deleteTodo(){
			this.$store.commit('deleteTodo',this.item)
		}
	},
	computed: {
		isActive(){
			if(this.item.done){
				return 'text-decoration:line-through'
			}
		}
	}
});

const store = new Vuex.Store({
	state: {
		todos: [
		{
			name: 'Todo 1',
			done: false,
		},
		{
			name: 'Todo 2',
			done: false,
		},
		{
			name: 'Todo 3',
			done: false,
		},	
		],
		todo: {
			name: '',
			done: false
		}
	},
	mutations: {
	    addTodo (state,payload) {

	      state.todos.push(payload)

	    },

	    deleteTodo (state,payload) {

	      let index = state.todos.indexOf(payload);
	      state.todos.splice(index,1)

	    },

	    toggleTodo(state,payload){

	    	let index = state.todos.indexOf(payload);
	      	state.todos[index].done = !state.todos[index].done

	    }
	  },
	getters: {
		doneTodos(state){

			return state.todos.filter(function(item){
				return item.done == true
			})

		},
		pendingTodos(state){

			return state.todos.filter(function(item){
				return item.done == false
			})

		},
	},
})

var app = new Vue({
	el: '#app',
	store,
	data: {
		'message': 'Hello world'
	},
});