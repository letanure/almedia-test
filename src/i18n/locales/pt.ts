/**
 * Portuguese locale translations aggregated from features
 */

import { demoFeature } from "@/features/demo"
import { todoFeature } from "@/features/todo"

export const pt = {
  todo: todoFeature.translations?.pt,
  demo: demoFeature.translations?.pt,
  app: {
    name: "Projeto Inicial",
    subtitle: "React + MobX + TypeScript",
  },
  theme: {
    toggle: "Alternar tema",
    light: "Claro",
    dark: "Escuro",
    system: "Sistema",
  },
  time: {
    justNow: "agora mesmo",
    minutesAgo_one: "há {{count}} minuto",
    minutesAgo_other: "há {{count}} minutos",
    hoursAgo_one: "há {{count}} hora",
    hoursAgo_other: "há {{count}} horas",
    daysAgo_one: "há {{count}} dia",
    daysAgo_other: "há {{count}} dias",
  },
  common: {
    loading: "Carregando...",
    confirm: "Confirmar",
    cancel: "Cancelar",
    delete: "Excluir",
    confirmDelete: "Confirmar Exclusão",
    confirmDeleteMessage:
      "Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.",
  },
  validation: {
    required: "Este campo é obrigatório",
    requiredSelect: "Por favor selecione uma opção",
    email: "Por favor digite um email válido",
    minLength: "Deve ter pelo menos {{min}} caracteres",
    maxLength: "Deve ter no máximo {{max}} caracteres",
    minNumber: "Deve ser pelo menos {{min}}",
    maxNumber: "Deve ser no máximo {{max}}",
    invalidFormat: "Formato inválido",
    url: "Por favor digite uma URL válida",
    phone: "Por favor digite um telefone válido",
    positiveNumber: "Deve ser um número positivo",
    integer: "Deve ser um número inteiro",
    invalid_type: "Este campo é obrigatório",
    array: {
      minItems: "Pelo menos {{min}} itens são obrigatórios",
      maxItems: "No máximo {{max}} itens são permitidos",
    },
  },
}
