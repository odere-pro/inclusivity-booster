import sources from '../data/sources.json'
import adaptEnWoman from '../data/adaptations-en-woman.json'
import adaptEnMan from '../data/adaptations-en-man.json'
import adaptEnNonBinary from '../data/adaptations-en-non-binary.json'
import adaptEnGenderfluid from '../data/adaptations-en-genderfluid.json'
import adaptUkrWoman from '../data/adaptations-ukr-woman.json'
import adaptUkrMan from '../data/adaptations-ukr-man.json'
import adaptUkrNonBinary from '../data/adaptations-ukr-non-binary.json'
import adaptUkrGenderfluid from '../data/adaptations-ukr-genderfluid.json'
import enWoman from '../data/personas-en-woman.json'
import enMan from '../data/personas-en-man.json'
import enNonBinary from '../data/personas-en-non-binary.json'
import enGenderfluid from '../data/personas-en-genderfluid.json'
import ukrWoman from '../data/personas-ukr-woman.json'
import ukrMan from '../data/personas-ukr-man.json'
import ukrNonBinary from '../data/personas-ukr-non-binary.json'
import ukrGenderfluid from '../data/personas-ukr-genderfluid.json'

const adaptations = [
  ...adaptEnWoman, ...adaptEnMan, ...adaptEnNonBinary, ...adaptEnGenderfluid,
  ...adaptUkrWoman, ...adaptUkrMan, ...adaptUkrNonBinary, ...adaptUkrGenderfluid
]

const personas = [
  ...enWoman, ...enMan, ...enNonBinary, ...enGenderfluid,
  ...ukrWoman, ...ukrMan, ...ukrNonBinary, ...ukrGenderfluid
]

const adaptationMap = new Map(adaptations.map(a => [a.id, a]))
const sourceMap = new Map(sources.map(s => [s.id, s]))

let selectedPersonaId = $state(personas[0]?.id ?? 'default')
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
  return personas.find(p => p.id === selectedPersonaId) ?? personas[0]
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
      if (key === 'gender' && profile.gender !== value) return false
      // child/teen personas lack culturalLens and format — exclude them when those filters are active
      if (key === 'culturalLens') {
        if (!profile.culturalLens || profile.culturalLens !== value) return false
      }
      if (key === 'format') {
        if (!profile.format || profile.format !== value) return false
      }
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
    culturalLens: new Set(),
    gender: new Set(),
    format: new Set()
  }

  for (const p of personas) {
    const profile = getPersonaProfile(p)
    if (!profile) continue
    options.language.set(profile.language, profile.languageLabel)
    options.readingLevel.add(profile.readingLevel)
    options.ageGroup.add(profile.ageGroup)
    if (profile.culturalLens) options.culturalLens.add(profile.culturalLens)
    if (profile.gender) options.gender.add(profile.gender)
    if (profile.format) options.format.add(profile.format)
  }

  const formatLabel = (v) => v.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  return {
    language: [...options.language.entries()].map(([v, l]) => ({ value: v, label: l })),
    readingLevel: [...options.readingLevel].map(v => ({ value: v, label: v.charAt(0).toUpperCase() + v.slice(1) })),
    ageGroup: [...options.ageGroup].map(v => ({ value: v, label: formatLabel(v) })),
    culturalLens: [...options.culturalLens].map(v => ({ value: v, label: v.charAt(0).toUpperCase() + v.slice(1) })),
    gender: [...options.gender].map(v => ({ value: v, label: formatLabel(v) })),
    format: [...options.format].map(v => ({ value: v, label: formatLabel(v) }))
  }
}

export { sources, adaptations, personas, sourceMap, adaptationMap }
