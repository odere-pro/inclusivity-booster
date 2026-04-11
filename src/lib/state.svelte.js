import sources from '../data/sources.json'
import adaptations from '../data/adaptations.json'
import personas from '../data/personas.json'

const adaptationMap = new Map(adaptations.map(a => [a.id, a]))
const sourceMap = new Map(sources.map(s => [s.id, s]))

let selectedPersonaId = $state('default')
let selectedSourceId = $state('housing')
let activeFilters = $state({})

export function getSelectedPersonaId() {
  return selectedPersonaId
}

export function setSelectedPersonaId(id) {
  selectedPersonaId = id
}

export function getSelectedSourceId() {
  return selectedSourceId
}

export function setSelectedSourceId(id) {
  selectedSourceId = id
}

export function getSelectedPersona() {
  return personas.find(p => p.id === selectedPersonaId) ?? personas[personas.length - 1]
}

export function getSelectedSource() {
  return sourceMap.get(selectedSourceId)
}

export function getSelectedAdaptation() {
  const persona = getSelectedPersona()
  const adaptationId = persona.adaptations[selectedSourceId]
  return adaptationMap.get(adaptationId) ?? null
}

export function getBaselineAdaptation() {
  const baseline = personas.find(p => p.id === 'default')
  if (!baseline) return null
  const adaptationId = baseline.adaptations[selectedSourceId]
  return adaptationMap.get(adaptationId) ?? null
}

// Filter support
function getPersonaProfile(persona) {
  const adaptationId = persona.adaptations['housing']
  return adaptationMap.get(adaptationId)?.profile ?? null
}

export function getActiveFilters() {
  return activeFilters
}

export function setFilter(key, value) {
  if (value) {
    activeFilters = { ...activeFilters, [key]: value }
  } else {
    const { [key]: _, ...rest } = activeFilters
    activeFilters = rest
  }
  // If current selection is filtered out, auto-select first match
  const filtered = getFilteredPersonas()
  if (filtered.length > 0 && !filtered.find(p => p.id === selectedPersonaId)) {
    selectedPersonaId = filtered[0].id
  }
}

export function clearFilters() {
  activeFilters = {}
}

export function getFilteredPersonas() {
  if (Object.keys(activeFilters).length === 0) return personas

  return personas.filter(p => {
    const profile = getPersonaProfile(p)
    if (!profile) return false

    for (const [key, value] of Object.entries(activeFilters)) {
      if (key === 'language' && profile.language !== value) return false
      if (key === 'readingLevel' && profile.readingLevel !== value) return false
      if (key === 'ageGroup' && profile.ageGroup !== value) return false
      if (key === 'culturalLens' && profile.culturalLens !== value) return false
    }
    return true
  })
}

// Extract unique filter options from persona profiles
export function getFilterOptions() {
  const options = {
    language: new Map(),
    readingLevel: new Set(),
    ageGroup: new Set(),
    culturalLens: new Set()
  }

  for (const p of personas) {
    const profile = getPersonaProfile(p)
    if (!profile) continue
    options.language.set(profile.language, profile.languageLabel)
    options.readingLevel.add(profile.readingLevel)
    options.ageGroup.add(profile.ageGroup)
    options.culturalLens.add(profile.culturalLens)
  }

  return {
    language: [...options.language.entries()].map(([v, l]) => ({ value: v, label: l })),
    readingLevel: [...options.readingLevel].map(v => ({ value: v, label: v.charAt(0).toUpperCase() + v.slice(1) })),
    ageGroup: [...options.ageGroup].map(v => ({ value: v, label: v.charAt(0).toUpperCase() + v.slice(1) })),
    culturalLens: [...options.culturalLens].map(v => ({ value: v, label: v.charAt(0).toUpperCase() + v.slice(1) }))
  }
}

export { sources, adaptations, personas, sourceMap, adaptationMap }
