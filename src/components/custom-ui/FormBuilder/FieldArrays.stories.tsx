import type { Meta, StoryObj } from "@storybook/react"
import { z } from "zod"
import { FormBuilder } from "./FormBuilder"
import type { FormFieldConfig } from "./types"

const meta: Meta<typeof FormBuilder> = {
  title: "Custom UI/FormBuilder/Field Arrays",
  component: FormBuilder,
  parameters: {
    layout: "padded",
  },
}

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
    background: white; padding: 2rem; border-radius: 0.5rem;
    max-width: 90vw; max-height: 90vh; overflow: auto;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  `

  const title = document.createElement("h3")
  title.textContent = "Form Data Submitted"
  title.style.cssText =
    "margin: 0 0 1rem 0; font-size: 1.25rem; font-weight: 600;"

  const pre = document.createElement("pre")
  pre.textContent = formatted
  pre.style.cssText = `
    margin: 0; padding: 1rem; background: #f8f9fa; 
    border-radius: 0.25rem; font-size: 0.875rem; 
    overflow: auto; white-space: pre-wrap;
  `

  const closeBtn = document.createElement("button")
  closeBtn.textContent = "Close"
  closeBtn.style.cssText = `
    margin-top: 1rem; padding: 0.5rem 1rem; 
    background: #007bff; color: white; border: none; 
    border-radius: 0.25rem; cursor: pointer;
  `
  closeBtn.onclick = () => document.body.removeChild(overlay)

  modal.appendChild(title)
  modal.appendChild(pre)
  modal.appendChild(closeBtn)
  overlay.appendChild(modal)
  document.body.appendChild(overlay)

  overlay.onclick = (e) => {
    if (e.target === overlay) {
      document.body.removeChild(overlay)
    }
  }
}

export default meta
type Story = StoryObj<typeof FormBuilder>

// Single field array - Tags
const tagsSchema = z.object({
  tags: z
    .array(
      z.object({
        name: z.string().min(1, "Tag name is required"),
      }),
    )
    .min(1, "At least one tag is required"),
})

const tagsField: FormFieldConfig[] = [
  {
    type: "field-array",
    name: "tags",
    label: "Tags",
    fields: [
      {
        type: "text",
        name: "name",
        label: "Tag",
        placeholder: "Enter tag name",
        layout: "full",
      },
    ],
    addButtonLabel: "Add Tag",
    maxItems: 5,
    layout: "full",
  },
]

export const SingleField: Story = {
  args: {
    fields: tagsField,
    schema: tagsSchema,
    onSubmit: showFormData,
    submitLabel: "Submit",
    resetLabel: "Reset",
    showReset: true,
  },
}

// Multi-field array - Countries
const countriesSchema = z.object({
  countries: z
    .array(
      z.object({
        name: z.string().min(1, "Country name is required"),
        code: z.string().min(1, "Country code is required"),
      }),
    )
    .min(1, "At least one country is required"),
})

const countriesField: FormFieldConfig[] = [
  {
    type: "field-array",
    name: "countries",
    label: "Countries",
    fields: [
      {
        type: "text",
        name: "name",
        label: "Country Name",
        placeholder: "Enter country name",
        layout: "half",
      },
      {
        type: "select",
        name: "code",
        label: "Country Code",
        placeholder: "Select country code",
        options: [
          { label: "United States (US)", value: "US" },
          { label: "United Kingdom (UK)", value: "UK" },
          { label: "Canada (CA)", value: "CA" },
          { label: "Germany (DE)", value: "DE" },
          { label: "France (FR)", value: "FR" },
          { label: "Japan (JP)", value: "JP" },
          { label: "Australia (AU)", value: "AU" },
          { label: "Brazil (BR)", value: "BR" },
        ],
        layout: "half",
      },
    ],
    addButtonLabel: "Add Country",
    minItems: 2,
    maxItems: 8,
    layout: "full",
  },
]

export const MultiField: Story = {
  args: {
    fields: countriesField,
    schema: countriesSchema,
    onSubmit: showFormData,
    submitLabel: "Submit",
    resetLabel: "Reset",
    showReset: true,
  },
}
