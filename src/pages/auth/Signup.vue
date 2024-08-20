<template>
  <VaForm ref="form" @submit.prevent="submit">
    <h1 class="font-semibold text-4xl mb-4">{{ t('auth.createNewAccount') }}</h1>
    <p class="text-base mb-4 leading-5">
      {{ t('auth.haveAccount') }}
      <RouterLink :to="{ name: 'login' }" class="font-semibold text-primary">{{ t('auth.login') }}</RouterLink>
    </p>
    <VaInput
      v-model="formData.email"
      :rules="[(v) => !!v || t('auth.email_required'), (v) => /.+@.+\..+/.test(v) || t('auth.email_invalid')]"
      class="mb-4"
      :label="t('auth.email')"
      type="email"
    />
    <VaValue v-slot="isPasswordVisible" :default-value="false">
      <VaInput
        ref="password1"
        v-model="formData.password"
        :rules="passwordRules"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        :label="t('auth.password')"
        :messages="t('auth.password_info')"
        @clickAppendInner.stop="isPasswordVisible.value = !isPasswordVisible.value"
      >
        <template #appendInner>
          <VaIcon
            :name="isPasswordVisible.value ? 'mso-visibility_off' : 'mso-visibility'"
            class="cursor-pointer"
            color="secondary"
          />
        </template>
      </VaInput>
      <!-- <VaInput
        ref="password2"
        v-model="formData.repeatPassword"
        :rules="[
          (v) => !!v || t('auth.password_repeat_message'),
          (v) => v === formData.password || t('auth.password_repeat_error'),
        ]"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        :label="t('auth.password_repeat')"
        @clickAppendInner.stop="isPasswordVisible.value = !isPasswordVisible.value"
      >
        <template #appendInner>
          <VaIcon
            :name="isPasswordVisible.value ? 'mso-visibility_off' : 'mso-visibility'"
            class="cursor-pointer"
            color="secondary"
          />
        </template>
      </VaInput> -->
    </VaValue>

    <div class="flex justify-center mt-4">
      <VaButton class="w-full" @click="submit"> {{ t('auth.createAccount') }}</VaButton>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, useToast } from 'vuestic-ui'
import { signup } from '../../api/services/auth-service'

const { validate } = useForm('form')
const { push } = useRouter()
const { init } = useToast()

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const formData = reactive({
  email: '',
  password: '',
  repeatPassword: '',
})

const submit = async () => {
  if (validate()) {
    try {
      const data = await signup(formData)

      if (data.status === false) {
        throw new Error(data['message'])
      }

      init({
        message: data['message'],
        color: 'success',
      })

      push({ name: 'dashboard' })
    } catch (error) {
      init({
        message: String(error),
        color: 'error',
      })
    }
  }
}

const passwordRules: ((v: string) => boolean | string)[] = [
  // (v) => !!v || 'Password field is required',
  // (v) => (v && v.length >= 8) || 'Password must be at least 8 characters long',
  // (v) => (v && /[A-Za-z]/.test(v)) || 'Password must contain at least one letter',
  // (v) => (v && /\d/.test(v)) || 'Password must contain at least one number',
  // (v) => (v && /[!@#$%^&*(),.?":{}|<>]/.test(v)) || 'Password must contain at least one special character',
]
</script>
../../api/api.js ../../api/request.js
