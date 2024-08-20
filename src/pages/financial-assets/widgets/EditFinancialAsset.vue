<script setup lang="ts">
import { PropType, computed, ref, watch } from 'vue'
import { useForm, useToast } from 'vuestic-ui'
import { Property } from '../types'
import { validators } from '../../../services/utils'
import cepPromisse from 'cep-promise'
import { vMaska } from 'maska/vue'

import { createProperty } from '../../../api/services/property-service'
const { init } = useToast()

const props = defineProps({
  property: {
    type: Object as PropType<Property | null>,
    default: null,
  },
  saveButtonLabel: {
    type: String,
    default: 'Save',
  },
})

const defaultNewProperty: Property = {
  id: -1,
  title: '',
  document_number_landlord: '',
  rental_value: 0,
  sale_value: 0,
  address: '',
  cep_number: '',
  address_number: '',
  city: '',
  state: '',
  description: '',
  is_new: true,
}

const newProperty = ref<Property>({ ...defaultNewProperty })
const cepError = ref(false)

const isFormHasUnsavedChanges = computed(() => {
  return Object.keys(newProperty.value).some((key) => {
    if (key === 'avatar' || key === 'projects') {
      return false
    }

    return newProperty.value[key as keyof Property] !== (props.property ?? defaultNewProperty)?.[key as keyof Property]
  })
})

const getAddress = async () => {
  if (newProperty.value.cep_number) {
    try {
      const result = await cepPromisse(newProperty.value.cep_number.replace(/\D/g, ''))

      newProperty.value.address = result.street
      newProperty.value.city = result.city
      newProperty.value.state = result.state
    } catch (error) {
      cepError.value = true
      console.error('Erro ao buscar CEP. ' + error)
    }
  }
}

defineExpose({
  isFormHasUnsavedChanges,
})

watch(
  () => props.property,
  () => {
    if (!props.property) {
      return
    }

    newProperty.value = {
      ...props.property,
    }
  },
  { immediate: true },
)

const form = useForm('add-user-form')

const emit = defineEmits(['close', 'save'])

const onSave = () => {
  if (form.validate()) {
    createProperty(newProperty.value)
      .then((response) => {
        if (response.status == false) {
          init({
            message: String(response['message']),
            color: 'error',
          })
          throw new Error(response['message'])
        }

        response.status
        console.log(newProperty.value)
        emit('save', newProperty.value)
      })
      .catch((err) => {
        console.error(err)
        throw new Error(err['message'])
      })
  }
}
</script>

<template>
  <VaForm v-slot="{ isValid }" ref="add-user-form" class="flex-col justify-start items-start gap-4 inline-flex w-full">
    <div class="self-stretch flex-col justify-start items-start gap-4 flex">
      <div class="flex gap-4 flex-col sm:flex-row w-full">
        <VaInput
          v-model="newProperty.title"
          label="Título"
          class="w-full sm:w-1/2"
          :rules="[validators.required]"
          name="title"
        />
        <VaInput
          v-model="newProperty.document_number_landlord"
          v-maska="'###.###.###-##'"
          label="CPF do proprietário"
          class="w-full sm:w-1/2"
          :rules="[validators.required]"
          name="cpf_owner"
        />
      </div>

      <div class="flex gap-4 flex-col sm:flex-row w-full">
        <VaInput
          v-model="newProperty.rental_value"
          label="Valor aproximado do aluguel (R$)"
          class="w-full sm:w-1/2"
          :rules="[validators.required]"
          name="rental_value"
        />
        <VaInput
          v-model="newProperty.sale_value"
          label="Valor aproximado de venda (R$)"
          class="w-full sm:w-1/2"
          :rules="[validators.required]"
          name="sale_value"
        />
      </div>

      <div class="flex gap-4 flex-col sm:flex-row w-full">
        <VaInput
          v-model="newProperty.cep_number"
          v-maska="'###.##-###'"
          label="CEP"
          class="w-full sm:w-1/6"
          :rules="[validators.required]"
          name="cep_number"
          @blur="getAddress()"
        />

        <VaInput
          v-model="newProperty.address"
          label="Endereço"
          class="w-full sm:w-4/6"
          :rules="[validators.required]"
          name="address"
        />

        <VaInput
          v-model="newProperty.address_number"
          label="Numero"
          class="w-full sm:w-1/6"
          :rules="[validators.required]"
          name="address_number"
        />
      </div>

      <div class="flex gap-4 w-full">
        <VaInput
          v-model="newProperty.city"
          label="Cidade"
          class="w-full sm:w-1/3"
          :rules="[validators.required]"
          name="city"
        />

        <VaInput
          v-model="newProperty.state"
          label="Estado"
          class="w-full sm:w-1/3"
          :rules="[validators.required]"
          name="state"
        />
        <div class="flex items-center w-1/3 mt-4">
          <VaCheckbox v-model="newProperty.is_new" label="Imóvel novo?" class="w-full" name="is_new" />
        </div>
      </div>

      <VaTextarea
        v-model="newProperty.description"
        label="Descrição do imóvel"
        placeholder="Exemplo: Área total de 250 m² com 2 banheiros e 3 quartos"
        class="w-full"
        name="description"
      />

      <div class="flex gap-2 flex-col-reverse items-stretch justify-end w-full sm:flex-row sm:items-center">
        <VaButton preset="secondary" color="secondary" @click="$emit('close')">Cancelar</VaButton>
        <VaButton :disabled="!isValid" @click="onSave">Adicionar</VaButton>
      </div>
    </div>
  </VaForm>
</template>
