<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Form, Field, ErrorMessage } from '@/plugins/vee-validate'
import { useForm } from 'vee-validate'

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

const { handleSubmit } = useForm()

function onSubmit(values: any) {
  alert(JSON.stringify(values, null, 2))
}

const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const company = reactive({
  name: '',
  corporateName: '',
  cnpj: '',
  phone: '',
  email: '',
  cep: '',
  street: '',
  number: '',
  neighborhood: '',
  city: '',
  state: ''
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

    <v-col cols="12" class="d-flex justify-end">
      <v-btn class="mt-4" color="primary">Salvar</v-btn>
    </v-col>
  </v-row>

  <v-divider class="my-10" />

  <v-row>
    <v-col cols="12" md="4" class="pr-md-6">
      <h5 class="text-subtitle-1 font-weight-medium">Informações da Empresa</h5>
      <p class="text-body-2 text-medium-emphasis">
        Preencha os dados cadastrais da empresa.
      </p>
    </v-col>

    <v-col cols="12" md="8">
      <v-form>
        <v-row>
          <v-col cols="12" sm="12">
            <v-text-field
              v-model="company.name"
              label="Nome da empresa"
              variant="solo-filled"
              density="compact"
            />
          </v-col>
          <v-col cols="12" sm="12">
            <v-text-field
              v-model="company.corporateName"
              label="Razão Social"
              variant="solo-filled"
              density="compact"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="company.cnpj"
              label="CNPJ"
              variant="solo-filled"
              density="compact"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="company.phone"
              label="Telefone comercial"
              variant="solo-filled"
              density="compact"
            />
          </v-col>
          <v-col cols="12" sm="12">
            <v-text-field
              v-model="company.email"
              label="Email comercial"
              variant="solo-filled"
              density="compact"
              type="email"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="company.cep"
              label="CEP"
              variant="solo-filled"
              density="compact"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="8">
            <v-text-field
              v-model="company.street"
              label="Rua"
              variant="solo-filled"
              density="compact"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="company.number"
              label="Número"
              variant="solo-filled"
              density="compact"
            />
          </v-col>
          <v-col cols="12" sm="12">
            <v-text-field
              v-model="company.neighborhood"
              label="Bairro"
              variant="solo-filled"
              density="compact"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="company.city"
              label="Cidade"
              variant="solo-filled"
              density="compact"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="company.state"
              label="Estado"
              variant="solo-filled"
              density="compact"
            />
          </v-col>

          <v-col cols="12" class="d-flex justify-end">
            <v-btn class="mt-4" color="primary">Salvar</v-btn>
          </v-col>
        </v-row>
        
      </v-form>
    </v-col>
  </v-row>

  <v-divider class="my-10"></v-divider>

  <v-row>
    <v-col cols="12" md="4" class="pr-md-6">
      <h5 class="text-subtitle-1 font-weight-medium">Alterar Senha</h5>
      <p class="text-body-2 text-medium-emphasis">
        Atualize a senha associada à sua conta.
      </p>
    </v-col>

    <v-col cols="12" md="8">
      <Form @submit="handleSubmit(onSubmit)">
        <v-row>
          <v-col cols="12">
            <Field
              name="senha atual"
              rules="required|min:6"
              v-slot="{ field, errorMessage }"
            >
              <v-text-field
                v-bind="field"
                label="Senha Atual"
                :type="showCurrentPassword ? 'text' : 'password'"
                variant="solo-filled"
                density="compact"
                :error="!!errorMessage"
                :error-messages="errorMessage"
                :append-inner-icon="showCurrentPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showCurrentPassword = !showCurrentPassword"
              />
            </Field>
          </v-col>

          <v-col cols="12">
            <Field
              name="nova senha"
              rules="required|min:6"
              v-slot="{ field, errorMessage }"
            >
              <v-text-field
                v-bind="field"
                label="Nova Senha"
                :type="showNewPassword ? 'text' : 'password'"
                variant="solo-filled"
                density="compact"
                :error="!!errorMessage"
                :error-messages="errorMessage"
                :append-inner-icon="showNewPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showNewPassword = !showNewPassword"
              />
            </Field>
          </v-col>

          <v-col cols="12">
            <Field
              name="confirmação da nova senha"
              rules="required|confirmed:newPassword"
              v-slot="{ field, errorMessage }"
            >
              <v-text-field
                v-bind="field"
                label="Confirmação da Nova Senha"
                :type="showConfirmPassword ? 'text' : 'password'"
                variant="solo-filled"
                density="compact"
                :error="!!errorMessage"
                :error-messages="errorMessage"
                :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showConfirmPassword = !showConfirmPassword"
              />
            </Field>
          </v-col>

          <v-col cols="12" class="d-flex justify-end">
            <v-btn type="submit" color="primary">
              Salvar
            </v-btn>
          </v-col>
        </v-row>
      </Form>
    </v-col>
  </v-row>
</template>
