<template>
  <form class="form" @submit.prevent="submit">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input v-model="email" type="email" placeholder="demo@email" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input v-model="password" type="password" placeholder="password" class="form-control" />
      </div>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary button_block">Войти</button>
    </div>
    <div class="form__append">
      Нет аккаунта?
      <a class="link">Зарегистрируйтесь</a>
    </div>
  </form>
</template>

<script>
import { login } from '../data';

export default {
  name: 'LoginPage',

  data() {
    return {
      errors: [],
      email: null,
      password: null,
    };
  },

  methods: {
    validate() {
      if (this.email && this.password) {
        return true;
      }

      this.errors = [];

      if (!this.email) {
        this.errors.push('Требуется ввести Email');
      }
      if (!this.password) {
        this.errors.push('Требуется ввести пароль');
      }

      if (this.errors.length > 0) {
        this.errors.forEach((e) => {
          alert(e);
        });
      }

      return false;
    },

    async submit() {
      if (this.validate()) {
        const res = await login(this.email, this.password);
        if (res.fullname) {
          alert(res.fullname);
          this.$router.push(this.$router.currentRoute?.query?.from || '/');
        } else if (res.message) {
          alert(res.message);
        }
      }
    },
  },
};
</script>

<style></style>
