<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">Nuxt todo App</h1>
      <ToDoList :todos="todos" />
      <div class="links">
        <div v-if="$auth.loggedIn">
          {{ $auth.user.email }}
          <a class="button--grey" @click="userLogout"> Logout </a>
        </div>
        <div v-else>
          <NuxtLink class="button--grey" to="/login">Login</NuxtLink>
        </div>
        <br />
        <br />
        <a
          href="https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fshahbaz17%2Fnuxt-todo"
          target="_blank"
          rel="noopener noreferrer"
          class="button--blue"
        >
          Deploy to Vercel
        </a>
        <a
          href="https://github.com/shahbaz17/nuxt-todo-app"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
        <a
          href="https://app.netlify.com/start/deploy?repository=https%3A%2F%2Fgithub.com%2Fshahbaz17%2Fnuxt-todo"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Deploy to Netlify
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      todos: {
        type: Array,
      },
      didToken: '',
    }
  },
  async asyncData() {
    try {
      const result = await axios.get('http://localhost:1337/todos', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth._token.local')}`,
        },
      })
      return {
        todos: result.data,
      }
    } catch (error) {
      console.log('handle error')
    }
  },

  middleware: 'auth',
  methods: {
    async userLogout() {
      await this.$auth.logout()
      this.$router.push('/loading')
    },
  },
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.links {
  padding-top: 15px;
}
</style>
