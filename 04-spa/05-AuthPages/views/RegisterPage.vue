<template>
  <form class="form" @submit.prevent="submit">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input v-model="email" type="email" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Имя</label>
      <div class="input-group">
        <input v-model="fullname" type="text" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input v-model="password" type="password" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Повтор пароля</label>
      <div class="input-group">
        <input v-model="passwordRepeated" type="password" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="checkbox"><input v-model="agreed" type="checkbox" /> Я согласен с условиями <span></span></label>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary">Зарегистрироваться</button>
    </div>
    <div class="form__append">
      Уже есть аккаунт?
      <a class="link">Войдите</a>
    </div>
  </form>
</template>

<script>
import { register } from '../data';

export default {
  name: 'RegisterPage',

  data() {
    return {
      errors: [],
      email: null,
      fullname: null,
      password: null,
      passwordRepeated: null,
      agreed: false,
    };
  },

  methods: {
    validate() {
      if (this.email && this.fullname && this.password && this.password === this.passwordRepeated && this.agreed) {
        return true;
      }

      this.errors = [];

      if (!this.email) {
        this.errors.push('Требуется ввести Email');
      }
      if (!this.fullname) {
        this.errors.push('Требуется ввести полное имя');
      }
      if (!this.password) {
        this.errors.push('Требуется ввести пароль');
      }
      if (this.password != this.passwordRepeated) {
        this.errors.push('Пароли не совпадают');
      }
      if (!this.agreed) {
        this.errors.push('Требуется согласиться с условиями');
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
        const res = await register(this.email, this.fullname, this.password);
        if (res.id) {
          alert(res.id);
          this.$router.push('login');
        } else if (res.message) {
          alert(res.message);
        }
      }
    },
  },
};
</script>

<style></style>
