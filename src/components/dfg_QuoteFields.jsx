// Ajoute ce fichier dans un composant séparé, par exemple: components/QuoteFields.jsx
// Et importe-le dans ta page Contact.js comme un bloc en dessous du champ message

import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'

export const QuoteFields = ({ formData, handleInputChange, handleSelectChange }) => {
  return (
    <div className="space-y-6 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="projectType">Type de projet *</Label>
          <Input
            id="projectType"
            name="projectType"
            value={formData.projectType || ''}
            onChange={handleInputChange}
            placeholder="Site vitrine, E-commerce, etc."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pageCount">Nombre de pages / écrans</Label>
          <Input
            id="pageCount"
            name="pageCount"
            type="number"
            value={formData.pageCount || ''}
            onChange={handleInputChange}
            placeholder="Ex: 5"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="features">Fonctionnalités principales</Label>
        <Textarea
          id="features"
          name="features"
          value={formData.features || ''}
          onChange={handleInputChange}
          placeholder="Authentification, tableau de bord, etc."
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="technologies">Technologies souhaitées</Label>
          <Input
            id="technologies"
            name="technologies"
            value={formData.technologies || ''}
            onChange={handleInputChange}
            placeholder="React, Laravel, WordPress..."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="languages">Langues à prévoir</Label>
          <Input
            id="languages"
            name="languages"
            value={formData.languages || ''}
            onChange={handleInputChange}
            placeholder="Français, Anglais, Arabe..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Date de début souhaitée</Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            value={formData.startDate || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="deadline">Deadline</Label>
          <Input
            id="deadline"
            name="deadline"
            type="date"
            value={formData.deadline || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  )
}

// Ensuite dans ta page Contact.jsx, importe le :
// import { QuoteFields } from '@/components/QuoteFields';
// Et ajoute-le dans ton formulaire après le champ "message"
// <QuoteFields formData={formData} handleInputChange={handleInputChange} handleSelectChange={handleSelectChange} />
