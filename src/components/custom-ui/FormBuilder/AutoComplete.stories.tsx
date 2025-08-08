import type { Meta, StoryObj } from "@storybook/react"
import { z } from "zod"
import { FormBuilder } from "./FormBuilder"

const meta: Meta<typeof FormBuilder> = {
  title: "Custom UI/FormBuilder/AutoComplete",
  component: FormBuilder,
  parameters: {
    layout: "padded",
  },
}

export default meta
type Story = StoryObj<typeof FormBuilder>

// Helper to show form data
const showFormData = (data: unknown) => {
  console.log("Form Data:", data)
  const formatted = JSON.stringify(data, null, 2)

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

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const LoginForm: Story = {
  args: {
    fields: [
      {
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "Enter your email",
        layout: "full",
        required: true,
        autoComplete: "email",
      },
      {
        name: "password",
        type: "password",
        label: "Password",
        placeholder: "Enter your password",
        layout: "full",
        required: true,
        autoComplete: "current-password",
      },
    ],
    schema: loginSchema,
    onSubmit: showFormData,
    submitLabel: "Sign In",
  },
}

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
})

export const ProfileForm: Story = {
  args: {
    fields: [
      {
        name: "firstName",
        type: "text",
        label: "First Name",
        placeholder: "Enter first name",
        layout: "half",
        required: true,
        autoComplete: "given-name",
      },
      {
        name: "lastName",
        type: "text",
        label: "Last Name",
        placeholder: "Enter last name",
        layout: "half",
        required: true,
        autoComplete: "family-name",
      },
      {
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "Enter email",
        layout: "half",
        required: true,
        autoComplete: "email",
      },
      {
        name: "phone",
        type: "tel",
        label: "Phone",
        placeholder: "Enter phone number",
        layout: "half",
        autoComplete: "tel",
      },
    ],
    schema: profileSchema,
    onSubmit: showFormData,
    submitLabel: "Save Profile",
  },
}

const addressSchema = z.object({
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
})

export const AddressForm: Story = {
  args: {
    fields: [
      {
        name: "street",
        type: "text",
        label: "Street Address",
        placeholder: "Enter street address",
        layout: "full",
        required: true,
        autoComplete: "street-address",
      },
      {
        name: "city",
        type: "text",
        label: "City",
        placeholder: "Enter city",
        layout: "third",
        required: true,
        autoComplete: "address-level2",
      },
      {
        name: "postalCode",
        type: "text",
        label: "Postal Code",
        placeholder: "Enter postal code",
        layout: "third",
        required: true,
        autoComplete: "postal-code",
      },
      {
        name: "country",
        type: "text",
        label: "Country",
        placeholder: "Enter country",
        layout: "third",
        required: true,
        autoComplete: "country",
      },
    ],
    schema: addressSchema,
    onSubmit: showFormData,
    submitLabel: "Save Address",
  },
}

export const AutoCompleteDisabled: Story = {
  args: {
    fields: [
      {
        name: "username",
        type: "text",
        label: "Username",
        placeholder: "Enter username",
        layout: "half",
        required: true,
        autoComplete: "off",
      },
      {
        name: "password",
        type: "password",
        label: "New Password",
        placeholder: "Create password",
        layout: "half",
        required: true,
        autoComplete: "new-password",
      },
    ],
    schema: z.object({
      username: z.string().min(3, "Username must be at least 3 characters"),
      password: z.string().min(8, "Password must be at least 8 characters"),
    }),
    autoComplete: "off", // Disable for entire form
    onSubmit: showFormData,
    submitLabel: "Create Account",
  },
}
