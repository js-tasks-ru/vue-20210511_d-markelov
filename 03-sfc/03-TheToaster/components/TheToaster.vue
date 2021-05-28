<template>
  <div class="toasts">
    <div v-for="toast in toasts" :key="toast.id" class="toast" :class="toast.class">
      <app-icon :icon="toast.icon" />
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script>
import AppIcon from './AppIcon';

const DELAY = 5000;

export default {
  name: 'TheToaster',

  components: { AppIcon },

  data() {
    return {
      toasts: [],
    };
  },

  methods: {
    createToast(message, type) {
      let id = Math.random() + new Date().getTime;
      let icon = '';
      let tClass = '';

      switch (type) {
        case 'error':
          icon = 'alert-circle';
          tClass = 'toast_error';
          break;
        case 'success':
          icon = 'check-circle';
          tClass = 'toast_success';
          break;
      }

      this.toasts.splice(this.toasts.length, 0, {
        id,
        message,
        icon,
        class: tClass,
      });

      setTimeout(
        () =>
          this.toasts.splice(
            this.toasts.findIndex((element) => element.id === id),
            1,
          ),
        DELAY,
      );
    },

    error(message) {
      this.createToast(message, 'error');
    },

    success(message) {
      this.createToast(message, 'success');
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast > .icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
