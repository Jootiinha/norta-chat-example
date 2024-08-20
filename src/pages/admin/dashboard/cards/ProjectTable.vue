<script setup lang="ts">
import { defineVaDataTableColumns } from 'vuestic-ui'
import { Project } from '../../../projects/types'
import UserAvatar from '../../../financial-assets/widgets/UserAvatar.vue'
import ProjectStatusBadge from '../../../projects/components/ProjectStatusBadge.vue'
import { useProjects } from '../../../projects/composables/useProjects'
import { Pagination } from '../../../../data/pages/projects'
import { ref } from 'vue'

const columns = defineVaDataTableColumns([
  { label: 'Nome', key: 'project_name', sortable: true },
  { label: 'Responsável', key: 'project_owner', sortable: true },
  { label: 'Status', key: 'status', sortable: true },
])

const pagination = ref<Pagination>({ page: 1, perPage: 5, total: 0 })
const { projects, isLoading, sorting } = useProjects({
  pagination,
})

const avatarColor = (userName: string) => {
  const colors = ['primary', '#FFD43A', '#ADFF00', '#262824', 'danger']
  const index = userName.charCodeAt(0) % colors.length
  return colors[index]
}
</script>

<template>
  <VaCard>
    <VaCardTitle class="flex items-start justify-between">
      <h1 class="card-title text-secondary font-bold uppercase">Ativos mais procurados</h1>
      <VaButton preset="primary" size="small" to="/projects">Visualizar todos os ativos</VaButton>
    </VaCardTitle>
    <VaCardContent>
      <div v-if="projects.length > 0">
        <VaDataTable
          v-model:sort-by="sorting.sortBy"
          v-model:sorting-order="sorting.sortingOrder"
          :items="projects"
          :columns="columns"
          :loading="isLoading"
        >
          <template #cell(project_name)="{ rowData }">
            <div class="ellipsis max-w-[230px] lg:max-w-[450px]">
              {{ rowData.project_name }}
            </div>
          </template>
          <template #cell(project_owner)="{ rowData }">
            <div class="flex items-center gap-2 ellipsis max-w-[230px]">
              <UserAvatar :user="rowData.project_owner" size="small" />
              {{ rowData.project_owner.fullname }}
            </div>
          </template>
        </VaDataTable>
      </div>
      <div v-else class="p-4 flex justify-center items-center text-[var(--va-secondary)]">Sem ativos</div>
    </VaCardContent>
  </VaCard>
</template>
../../../financial-assets/widgets/UserAvatar.vue
