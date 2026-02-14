<template>
  <Teleport to="body">
    <div class="popup-overlay" @click.self="$emit('close')">
      <div class="popup-card">
        <button class="close-btn" @click="$emit('close')">&times;</button>

        <div class="popup-header">
          <h2>{{ isRegister ? 'Join SpaceNews' : 'Welcome Back' }}</h2>
          <p>{{ isRegister ? 'Create an account to continue' : 'Login to your account' }}</p>
        </div>

        <form @submit.prevent="handleSubmit" class="popup-form">
          <div class="form-group" v-if="isRegister">
            <label>Name</label>
            <input type="text" v-model="form.name" required placeholder="John Doe" />
          </div>

          <div class="form-group">
            <label>Email</label>
            <input type="email" v-model="form.email" required placeholder="name@example.com" />
          </div>

          <div class="form-group">
            <label>Password</label>
            <input type="password" v-model="form.password" required placeholder="••••••••" />
          </div>

          <div v-if="error" class="error-msg">{{ error }}</div>

          <button type="submit" class="submit-btn" :disabled="loading">
            {{ loading ? 'Processing...' : (isRegister ? 'Sign Up' : 'Login') }}
          </button>
        </form>

        <div class="popup-footer">
          <span v-if="isRegister">
            Already have an account? <a href="#" @click.prevent="toggleMode">Login</a>
          </span>
          <span v-else>
            Don't have an account? <a href="#" @click.prevent="toggleMode">Sign Up</a>
          </span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const emit = defineEmits(['close', 'login-success']);

const isRegister = ref(false);
const loading = ref(false);
const error = ref('');

const form = reactive({
  name: '',
  email: '',
  password: ''
});

const toggleMode = () => {
  isRegister.value = !isRegister.value;
  error.value = '';
  form.name = '';
  form.email = '';
  form.password = '';
};

const handleSubmit = async () => {
  loading.value = true;
  error.value = '';

  const endpoint = isRegister.value ? '/api/register' : '/api/login';

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    emit('login-success', data);
    emit('close');
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="scss">
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

.popup-card {
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 32px;
  width: 100%;
  max-width: 400px;
  position: relative;
  box-shadow: var(--shadow-hover);
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  max-height: 90vh;
  overflow-y: auto;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 24px;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: var(--text-primary);
  }
}

.popup-header {
  text-align: center;
  margin-bottom: 24px;

  h2 {
    font-size: 24px;
    margin-bottom: 8px;
    background: linear-gradient(to right, #fff, #aaa);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: var(--text-secondary);
    font-size: 14px;
  }
}

.form-group {
  margin-bottom: 16px;

  label {
    display: block;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--text-secondary);
    margin-bottom: 6px;
    font-weight: 600;
  }

  input {
    width: 100%;
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: 8px;
    padding: 10px 12px;
    color: var(--text-primary);
    font-size: 14px;
    transition: all 0.2s;

    &:focus {
      outline: none;
      border-color: var(--accent);
      box-shadow: 0 0 0 2px var(--accent-glow);
    }
  }
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 8px;

  &:hover:not(:disabled) {
    background: var(--accent-hover);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.error-msg {
  color: #ff6b6b;
  font-size: 13px;
  text-align: center;
  margin-bottom: 12px;
  background: rgba(255, 107, 107, 0.1);
  padding: 8px;
  border-radius: 6px;
}

.popup-footer {
  margin-top: 20px;
  text-align: center;
  font-size: 13px;
  color: var(--text-secondary);

  a {
    color: var(--accent);
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>
