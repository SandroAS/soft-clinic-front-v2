<script setup lang="ts">
import { reactive } from 'vue'

function uploadAvatar() {
  alert('Função de upload ainda não implementada')
}

const user = reactive({
  name: 'João Silva',
  email: 'joao@email.com',
  phone: '',
  cpf: '',
  avatar: 'https://img.freepik.com/vetores-premium/icone-de-adesao-prateada-icone-de-perfil-de-avatar-padrao-icone-de-associacao-imagem-de-usuario-de-midia-social-ilustracao-vetorial_561158-4195.jpg?w=740'
})
</script>

<template>
  <v-row>
    <v-col cols="12" md="4" class="pr-md-6">
      <h5 class="text-subtitle-1 font-weight-medium">Informações Pessoais</h5>
      <p class="text-body-2 text-medium-emphasis">
        Use um e-mail válido para receber notificações.
      </p>
    </v-col>

    <v-col cols="12" md="8">
      <v-form>
        <v-row>
          <v-col cols="12" md="6">
            <div class="d-flex align-center ga-4">
              <v-avatar size="120" class="border">
                <v-img :src="user.avatar" alt="Avatar" />
              </v-avatar>
              <div>
                <v-btn variant="outlined" class="mb-2" @click="uploadAvatar">
                  Trocar Avatar
                </v-btn>
                <div class="text-caption text-medium-emphasis">
                  JPG, GIF ou PNG. Máx. 1MB.
                </div>
              </div>
            </div>
          </v-col>
        </v-row>

        <v-row class="mt-6">
          <v-col cols="12" sm="6">
            <v-text-field label="First name" variant="solo-filled" density="compact" />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="Last name" variant="solo-filled" density="compact" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Email address" variant="solo-filled" density="compact" />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="Telefone" variant="solo-filled" density="compact" />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="CPF" variant="solo-filled" density="compact" />
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>