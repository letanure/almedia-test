import type { Meta, StoryObj } from "@storybook/react"
import { z } from "zod"
import { FormBuilder } from "./FormBuilder"

const meta: Meta<typeof FormBuilder> = {
  title: "Custom UI/FormBuilder",
  component: FormBuilder,
  parameters: {
    layout: "padded",
  },
}

export default meta
type Story = StoryObj<typeof FormBuilder>

// Helper to show form data in a nice format
const showFormData = (data: unknown) => {
  const formatted = JSON.stringify(data, null, 2)

  // Create a modal-like display
  const overlay = document.createElement("div")
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; right: 0; bottom: 0; 
    background: rgba(0,0,0,0.8); z-index: 9999;
    display: flex; align-items: center; justify-content: center;
    font-family: ui-monospace, Monaco, monospace;
  `

  const modal = document.createElement("div")
  modal.style.cssText = `
    background: white; padding: 24px; border-radius: 8px; 
    max-width: 500px; width: 90%; max-height: 70vh; overflow: auto;
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
  `

  const title = document.createElement("h3")
  title.textContent = "Form Submitted"
  title.style.cssText = "margin: 0 0 16px 0; font-size: 18px; font-weight: 600;"

  const code = document.createElement("pre")
  code.textContent = formatted
  code.style.cssText = `
    background: #f3f4f6; padding: 16px; border-radius: 4px; 
    margin: 0; overflow: auto; font-size: 14px;
    border: 1px solid #e5e7eb;
  `

  const closeBtn = document.createElement("button")
  closeBtn.textContent = "Close"
  closeBtn.style.cssText = `
    margin-top: 16px; padding: 8px 16px; background: #3b82f6;
    color: white; border: none; border-radius: 4px; cursor: pointer;
    font-size: 14px; font-weight: 500;
  `

  closeBtn.onclick = () => document.body.removeChild(overlay)
  overlay.onclick = (e) =>
    e.target === overlay && document.body.removeChild(overlay)

  modal.appendChild(title)
  modal.appendChild(code)
  modal.appendChild(closeBtn)
  overlay.appendChild(modal)
  document.body.appendChild(overlay)
}

const singleFieldSchema = z.object({
  name: z.string().min(1, "Name is required"),
})

export const SingleField: Story = {
  args: {
    fields: [
      {
        name: "name",
        type: "text",
        label: "Name",
        placeholder: "Enter your name",
        layout: "full",
        autoComplete: "name",
      },
    ],
    schema: singleFieldSchema,
    onSubmit: (data) => {
      showFormData(data)
    },
    submitLabel: "Submit",
  },
}

const twoFieldsSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
})

export const TwoFields: Story = {
  args: {
    fields: [
      {
        name: "firstName",
        type: "text",
        label: "First Name",
        placeholder: "Enter first name",
        layout: "full",
      },
      {
        name: "lastName",
        type: "text",
        label: "Last Name",
        placeholder: "Enter last name",
        layout: "full",
      },
    ],
    schema: twoFieldsSchema,
    onSubmit: (data) => {
      showFormData(data)
    },
    submitLabel: "Submit",
  },
}

export const TwoFieldsInRow: Story = {
  args: {
    fields: [
      {
        name: "firstName",
        type: "text",
        label: "First Name",
        placeholder: "Enter first name",
        layout: "half",
        required: true,
      },
      {
        name: "lastName",
        type: "text",
        label: "Last Name",
        placeholder: "Enter last name",
        layout: "half",
        required: true,
      },
    ],
    schema: z.object({
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
    }),
    onSubmit: (data) => {
      showFormData(data)
    },
    submitLabel: "Submit",
  },
}

export const FourFieldsGrid: Story = {
  args: {
    fields: [
      {
        name: "firstName",
        type: "text",
        label: "First Name",
        placeholder: "Enter first name",
        layout: "quarter",
        required: true,
      },
      {
        name: "lastName",
        type: "text",
        label: "Last Name",
        placeholder: "Enter last name",
        layout: "quarter",
        required: true,
      },
      {
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "Enter email",
        layout: "quarter",
        required: true,
      },
      {
        name: "age",
        type: "number",
        label: "Age",
        placeholder: "Age",
        layout: "quarter",
        min: 0,
        max: 120,
      },
    ],
    schema: z.object({
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
      email: z.string().email({ message: "Invalid email address" }),
      age: z.number().min(0).max(120).optional(),
    }),
    onSubmit: (data) => {
      showFormData(data)
    },
    submitLabel: "Submit",
  },
}

export const WithSelect: Story = {
  args: {
    fields: [
      {
        name: "name",
        type: "text",
        label: "Name",
        placeholder: "Enter your name",
        layout: "half",
        required: true,
      },
      {
        name: "country",
        type: "select",
        label: "Country",
        placeholder: "Select a country",
        layout: "half",
        options: [
          { label: "United States", value: "us" },
          { label: "Canada", value: "ca" },
          { label: "United Kingdom", value: "uk" },
        ],
      },
    ],
    schema: z.object({
      name: z.string().min(1, "Name is required"),
      country: z.string().optional(),
    }),
    onSubmit: (data) => {
      showFormData(data)
    },
    submitLabel: "Submit",
  },
}

export const WithCheckbox: Story = {
  args: {
    fields: [
      {
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "Enter your email",
        layout: "full",
        required: true,
      },
      {
        name: "newsletter",
        type: "checkbox",
        label: "Subscribe to newsletter",
        layout: "full",
      },
    ],
    schema: z.object({
      email: z.string().email({ message: "Invalid email address" }),
      newsletter: z.boolean().optional(),
    }),
    onSubmit: (data) => {
      showFormData(data)
    },
    submitLabel: "Submit",
  },
}

export const WithTextarea: Story = {
  args: {
    fields: [
      {
        name: "name",
        type: "text",
        label: "Name",
        placeholder: "Enter your name",
        layout: "full",
        required: true,
      },
      {
        name: "message",
        type: "textarea",
        label: "Message",
        placeholder: "Enter your message",
        layout: "full",
        rows: 4,
        required: true,
      },
    ],
    schema: z.object({
      name: z.string().min(1, "Name is required"),
      message: z.string().min(10, "Message must be at least 10 characters"),
    }),
    onSubmit: (data) => {
      showFormData(data)
    },
    submitLabel: "Send",
  },
}

export const WithRadio: Story = {
  args: {
    fields: [
      {
        name: "name",
        type: "text",
        label: "Name",
        placeholder: "Enter your name",
        layout: "half",
        required: true,
      },
      {
        name: "contact",
        type: "radio",
        label: "Preferred Contact",
        layout: "half",
        options: [
          { label: "Email", value: "email" },
          { label: "Phone", value: "phone" },
          { label: "Text", value: "text" },
        ],
      },
    ],
    schema: z.object({
      name: z.string().min(1, "Name is required"),
      contact: z.enum(["email", "phone", "text"]).optional(),
    }),
    onSubmit: (data) => {
      showFormData(data)
    },
    submitLabel: "Submit",
  },
}

// Translation examples demonstrating i18n integration
export const WithTranslation: Story = {
  args: {
    fields: [
      {
        name: "username",
        type: "text",
        label: "Username",
        placeholder: "Enter username",
        layout: "full",
        required: true,
      },
      {
        name: "email",
        type: "email",
        label: "Email Address",
        placeholder: "Enter email",
        layout: "full",
        required: true,
      },
      {
        name: "password",
        type: "password",
        label: "Password",
        placeholder: "Enter password",
        layout: "full",
        required: true,
      },
    ],
    schema: z.object({
      username: z.string().min(1, "validation.required"),
      email: z.string().email({ message: "validation.invalidEmail" }),
      password: z.string().min(8, "validation.passwordTooShort"),
    }),
    onSubmit: (data) => {
      showFormData(data)
    },
    submitLabel: "Register",
    resetLabel: "Clear",
    showReset: true,
    // Example translation function that would be provided by i18n
    translateMessage: (key: string) => {
      const translations: Record<string, string> = {
        "validation.required": "This field is required",
        "validation.invalidEmail": "Please enter a valid email address",
        "validation.passwordTooShort":
          "Password must be at least 8 characters long",
      }
      return translations[key] || key
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'This example shows how to use the `translateMessage` prop to provide localized validation messages. The schema uses i18n keys like "validation.required" which are then translated by the provided function.',
      },
    },
  },
}

export const WithoutTranslation: Story = {
  args: {
    fields: [
      {
        name: "username",
        type: "text",
        label: "Username",
        placeholder: "Enter username",
        layout: "full",
        required: true,
      },
    ],
    schema: z.object({
      username: z.string().min(1, "validation.required"),
    }),
    onSubmit: (data) => {
      showFormData(data)
    },
    submitLabel: "Submit",
    // No translateMessage prop - shows raw validation keys
  },
  parameters: {
    docs: {
      description: {
        story:
          'This example shows what happens when no `translateMessage` function is provided. The raw validation keys from the schema (like "validation.required") are displayed directly to the user.',
      },
    },
  },
}
