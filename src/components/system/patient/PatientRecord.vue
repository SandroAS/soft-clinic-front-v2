<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import GeneralInformationTab from './tabs/GeneralInformationTab.vue'

const route = useRoute()
const patientId = route.params.id as string

const activeTab = ref('geral')

const patient = ref({
  id: 1,
  name: 'João da Silva',
  email: 'joao@email.com',
  phone: '(11) 99999-0000',
  birthDate: '1990-05-01',
  cpf: '123.456.789-00',
  avatar: 'https://img.freepik.com/vetores-premium/icone-de-adesao-prateada-icone-de-perfil-de-avatar-padrao-icone-de-associacao-imagem-de-usuario-de-midia-social-ilustracao-vetorial_561158-4195.jpg?w=740',
  createdAt: '2024-01-10',
  address: {
    street: '',
    number: '',
    zip: '',
    neighborhood: '',
    complement: '',
    city: '',
    state: ''
  },
  isMinor: 'Não',
  responsibleName: '',
  responsiblePhone: '',
  insurance: '',
  insuranceCard: '',
  referralSource: '',
  indicatedBy: '',
  observations: ''
})

onMounted(() => {
  // Buscar paciente com ID da rota: `patientId`
  console.log(`Buscando paciente com ID: ${patientId}`)
})
</script>

<template>
  <v-container fluid>
    <v-card class="pa-4">
      <v-card-title class="text-h6">
        Ficha do Paciente: {{ patient.name }}
      </v-card-title>

      <v-tabs v-model="activeTab" class="mt-4">
        <v-tab value="geral">Informações Gerais</v-tab>
        <v-tab value="anamnese">Anamnese</v-tab>
        <v-tab value="odontograma">Odontograma</v-tab>
        <v-tab value="receita">Receita</v-tab>
        <v-tab value="atestado">Atestado</v-tab>
        <v-tab value="anexos">Anexos</v-tab>
      </v-tabs>

      <v-divider class="my-2" />

      <v-window v-model="activeTab">
        <v-window-item value="geral">
          <GeneralInformationTab />
        </v-window-item>

        <v-window-item value="anamnese">
          <p>Conteúdo da anamnese aqui...</p>
        </v-window-item>

        <v-window-item value="odontograma">
          <p>Conteúdo do odontograma aqui...</p>
        </v-window-item>

        <v-window-item value="receita">
          <p>Receitas do paciente...</p>
        </v-window-item>

        <v-window-item value="atestado">
          <p>Atestados emitidos...</p>
        </v-window-item>

        <v-window-item value="anexos">
          <p>Upload e visualização de arquivos anexos...</p>
        </v-window-item>
      </v-window>
    </v-card>
  </v-container>
</template>
