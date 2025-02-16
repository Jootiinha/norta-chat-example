<template>
  <div class="chat-container">
    <div ref="messagesContainer" class="messages">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="{ 'user-message': message.sender === 'user', 'bot-message': message.sender === 'bot' }"
      >
        <p>{{ message.text }}</p>
      </div>
    </div>
    <div class="input-container">
      <VaInput
        v-model="userInput"
        placeholder="Digite sua mensagem..."
        class="input-field"
        @keyup.enter="sendMessage"
      />
      <VaButton class="send-button" @click="sendMessage">Enviar</VaButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from 'vue'
import { useWindowSize } from '@vueuse/core'

interface Message {
  text: string
  sender: 'user' | 'bot'
}

export default defineComponent({
  name: 'Chat',
  setup() {
    const userInput = ref<string>('')
    const messages = ref<Message[]>([])
    const messagesContainer = ref<HTMLElement | null>(null)

    const { width } = useWindowSize()
    const isMobile = ref<boolean>(width.value < 600)

    const scrollToBottom = () => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      }
    }

    const sendMessage = async () => {
      if (userInput.value.trim() !== '') {
        messages.value.push({ text: userInput.value, sender: 'user' })
        const currentUserInput = userInput.value
        userInput.value = '' // Limpar o campo de entrada imediatamente
        await nextTick()
        scrollToBottom()
        const response = await getBotResponse(currentUserInput)
        messages.value.push({ text: response, sender: 'bot' })
        await nextTick()
        scrollToBottom()
      }
    }

    const getBotResponse = async (question: string): Promise<string> => {
      // Aqui você deve integrar com a API do ChatGPT
      // Este é um exemplo fictício
      const response = await fetch('http://localhost:5000/nortaia/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      })
      const data = await response.json()
      return data.data[0].answer
    }

    onMounted(() => {
      scrollToBottom()
    })

    return {
      userInput,
      messages,
      sendMessage,
      messagesContainer,
      isMobile,
    }
  },
})
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 85vh;
  background-color: #f7f7f8;
  padding: 10px;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

.user-message {
  align-self: flex-end;
  background-color: #dcf8c6;
  padding: 10px;
  border-radius: 10px;
  margin: 5px 0;
  max-width: 80%;
}

.bot-message {
  align-self: flex-start;
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  margin: 5px 0;
  border: 1px solid #e6e6e6;
  max-width: 80%;
}

.input-container {
  display: flex;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.input-field {
  flex: 1;
  margin-right: 10px;
}

.send-button {
  flex-shrink: 0;
}

@media (max-width: 600px) {
  .input-container {
    flex-direction: column;
  }

  .input-field {
    margin-right: 0;
    margin-bottom: 10px;
  }
}
</style>
