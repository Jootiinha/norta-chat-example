<script setup lang="ts">
import { PropType, computed, ref, watch } from 'vue'
import { useForm } from 'vuestic-ui'
import { User, UserRole } from '../types'
import UserAvatar from './UserAvatar.vue'
import { useProjects } from '../../projects/composables/useProjects'
import { validators } from '../../../services/utils'

const props = defineProps({
  user: {
    type: Object as PropType<User | null>,
    default: null,
  },
  saveButtonLabel: {
    type: String,
    default: 'Adicionar',
  },
})

const defaultNewUser: User = {
  id: -1,
  avatar: '',
  fullname: '',
  role: 'user',
  username: '',
  notes: '',
  email: '',
  active: true,
  projects: [],
}

const newUser = ref<User>({ ...defaultNewUser })

const isFormHasUnsavedChanges = computed(() => {
  return Object.keys(newUser.value).some((key) => {
    if (key === 'avatar' || key === 'projects') {
      return false
    }

    return newUser.value[key as keyof User] !== (props.user ?? defaultNewUser)?.[key as keyof User]
  })
})

defineExpose({
  isFormHasUnsavedChanges,
})

watch(
  () => props.user,
  () => {
    if (!props.user) {
      return
    }

    newUser.value = {
      ...props.user,
      avatar: props.user.avatar || '',
    }
  },
  { immediate: true },
)

const avatar = ref<File>()

const makeAvatarBlobUrl = (avatar: File) => {
  return URL.createObjectURL(avatar)
}

watch(avatar, (newAvatar) => {
  newUser.value.avatar = newAvatar ? makeAvatarBlobUrl(newAvatar) : ''
})

const form = useForm('add-user-form')

const emit = defineEmits(['close', 'save'])

const onSave = () => {
  if (form.validate()) {
    emit('save', newUser.value)
  }
}

const roleSelectOptions: { text: Capitalize<UserRole>; value: UserRole }[] = [
  { text: 'Admin', value: 'admin' },
  { text: 'User', value: 'user' },
  { text: 'Owner', value: 'owner' },
]

const { projects } = useProjects({ pagination: ref({ page: 1, perPage: 9999, total: 10 }) })
</script>

<template>
  <VaForm v-slot="{ isValid }" ref="add-user-form" class="flex-col justify-start items-start gap-4 inline-flex w-full">
    <div class="self-stretch flex-col justify-start items-start gap-4 flex">
      <div class="flex gap-4 flex-col sm:flex-row w-full">
        <VaInput
          v-model="newUser.fullname"
          label="Título"
          class="w-full sm:w-1/2"
          :rules="[validators.required]"
          name="property_name"
        />
        <VaInput
          v-model="newUser.username"
          label="CPF do proprietário"
          class="w-full sm:w-1/2"
          :rules="[validators.required]"
          name="cpf_owner"
        />
      </div>
      <div class="flex gap-4 flex-col sm:flex-row w-full">
        <VaInput
          v-model="newUser.email"
          label="Endereço"
          class="w-full sm:w-2/3"
          :rules="[validators.required]"
          name="property_address"
        />
        <VaInput
          v-model="newUser.email"
          label="CEP"
          class="w-full sm:w-1/3"
          :rules="[validators.required]"
          name="property_address"
        />
      </div>

      <div class="flex gap-4 w-full">
        <VaSelect
          v-model="newUser.projects"
          label="Cidade"
          class="w-full sm:w-1/3"
          :options="projects"
          :rules="[validators.required]"
          name="projects"
          text-by="project_name"
          track-by="id"
          multiple
          :max-visible-options="2"
        />

        <VaSelect
          v-model="newUser.projects"
          label="Estado"
          class="w-full sm:w-1/3"
          :options="projects"
          :rules="[validators.required]"
          name="projects"
          text-by="project_name"
          track-by="id"
          multiple
          :max-visible-options="2"
        />
        <div class="flex items-center w-1/3 mt-4">
          <VaCheckbox v-model="newUser.active" label="Imóvel novo?" class="w-full" name="active" />
        </div>
      </div>

      <VaFileUpload
        v-model="avatar"
        type="gallery"
        file-types="image/*"
        dropzone
        drop-zone-text="Arraste as fotos aqui"
      />

      <VaTextarea
        v-model="newUser.notes"
        label="Descrição do imóvel"
        placeholder="Exemplo: Área total de 250 m² com 2 banheiros e 3 quartos"
        class="w-full"
        name="notes"
      />

      <div class="flex gap-2 flex-col-reverse items-stretch justify-end w-full sm:flex-row sm:items-center">
        <VaButton preset="secondary" color="secondary" @click="$emit('close')">Cancelar</VaButton>
        <VaButton :disabled="!isValid" @click="onSave">Adicionar</VaButton>
      </div>
    </div>
  </VaForm>
</template>
