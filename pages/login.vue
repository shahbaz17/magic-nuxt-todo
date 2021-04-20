<template>
  <div class="container">
    <div class="login">
      <form @submit.prevent="userLogin">
        <h3>Login</h3>
        <label>
          <input
            v-model="email"
            type="email"
            name="email"
            placeholder="Email"
            required
            class="email-input"
            value
          />
        </label>
        <div class="submit">
          <button type="submit" name="button">Send Magic Link</button>
        </div>
      </form>
      <br />
      <NuxtLink class="button--grey" to="/">Home</NuxtLink>
    </div>
  </div>
</template>
<script>
import { Magic } from 'magic-sdk'

export default {
  data() {
    return {
      email: '',
    }
  },

  methods: {
    async userLogin() {
      try {
        const m = new Magic(process.env.NUXT_ENV_MAGIC_PUBLISHABLE_KEY)
        // let token = await m.auth.loginWithMagicLink({ email: this.email })
        await m.auth.loginWithMagicLink({ email: this.email })
        let token = await m.user.getIdToken(60 * 60 * 24 * 7) // 7 days, equal to the Magic login
        // console.log(token)
        if (token) {
          await this.$auth.loginWith('local', {
            data: { token: token },
          })

          this.$router.push('/loading')
        }
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap');
*,
*::before,
*::after {
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
  outline: none;
}
body {
  margin: 0;
  color: #333;
  background-color: #fff;
  min-height: 100%;
}
form,
label {
  display: flex;
  flex-flow: column;
  text-align: center;
}
.email-input {
  padding: 10px;
  margin: 1rem auto;
  border: 1px solid #ccc;
  border-radius: 50px;
  outline: none;
  transition: 0.5s;
  width: 80%;
}
.email-input:focus {
  border: 1px solid #42b983;
}
.submit {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  justify-content: space-between;
}
.submit > a {
  text-decoration: none;
}
.submit > button {
  padding: 0.6rem 1rem;
  cursor: pointer;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 50px;
  width: 80%;
  outline: none;
  transition: 0.3s;
  margin: 0 auto;
  font-size: 14px;
}
.submit > button:hover {
  border-color: #42b983;
}
.error {
  color: brown;
  margin: 1rem 0 0;
}
.container {
  max-width: 42rem;
  margin: 100px auto;
  padding: 2rem 1.25rem;
  overflow: auto;
}
.login {
  max-width: 20rem;
  margin: 0px auto;
  padding: 5rem 1rem;
  border: 1px solid rgb(204, 204, 204);
  border-radius: 4px;
  text-align: center;
}
</style>
