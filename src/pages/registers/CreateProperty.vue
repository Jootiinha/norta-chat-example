<script setup lang="ts">
import { ref } from 'vue'
import UsersTable from './widgets/UsersTable.vue'
import EditUserForm from './widgets/CreatePropertyForm.vue'
import { User } from './types'
import { useUsers } from './composables/useUsers'
import { useModal, useToast } from 'vuestic-ui'

const doShowEditUserModal = ref(false)

const { users, isLoading, filters, sorting, pagination, ...usersApi } = useUsers()

const userToEdit = ref<User | null>(null)

const showEditUserModal = (user: User) => {
  userToEdit.value = user
  doShowEditUserModal.value = true
}

const showAddUserModal = () => {
  userToEdit.value = null
  doShowEditUserModal.value = true
}

const { init: notify } = useToast()

const onUserSaved = async (user: User) => {
  if (userToEdit.value) {
    await usersApi.update(user)
    notify({
      message: `${user.fullname} has been updated`,
      color: 'success',
    })
  } else {
    usersApi.add(user)
    notify({
      message: `${user.fullname} has been created`,
      color: 'success',
    })
  }
}

const onUserDelete = async (user: User) => {
  await usersApi.remove(user)
  notify({
    message: `${user.fullname} has been deleted`,
    color: 'success',
  })
}

const editFormRef = ref()

const { confirm } = useModal()

const beforeEditFormModalClose = async (hide: () => unknown) => {
  if (editFormRef.value.isFormHasUnsavedChanges) {
    const agreed = await confirm({
      maxWidth: '380px',
      message: 'Form has unsaved changes. Are you sure you want to close it?',
      size: 'small',
    })
    if (agreed) {
      hide()
    }
  } else {
    hide()
  }
}
</script>

<template>
  <h1 class="page-title">Registrar imóvel</h1>

  <VaCard>
    <VaCardContent>
      <EditUserForm
        ref="editFormRef"
        :user="userToEdit"
        :save-button-label="userToEdit ? 'Save' : 'Add'"
        @save="
          (user) => {
            onUserSaved(user)
          }
        "
      />
    </VaCardContent>
  </VaCard>

  <VaModal
    v-slot="{ cancel, ok }"
    v-model="doShowEditUserModal"
    size="small"
    mobile-fullscreen
    close-button
    hide-default-actions
    :before-cancel="beforeEditFormModalClose"
  >
    <h1 class="va-h5">{{ userToEdit ? 'Edit user' : 'Add user' }}</h1>
    <EditUserForm
      ref="editFormRef"
      :user="userToEdit"
      :save-button-label="userToEdit ? 'Save' : 'Add'"
      @close="cancel"
      @save="
        (user) => {
          onUserSaved(user)
          ok()
        }
      "
    />
  </VaModal>
</template>
