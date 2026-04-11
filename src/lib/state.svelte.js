import sources from '../data/sources.json'
import adaptations from '../data/adaptations.json'
import personas from '../data/personas.json'

const adaptationMap = new Map(adaptations.map(a => [a.id, a]))
const sourceMap = new Map(sources.map(s => [s.id, s]))

let selectedPersonaId = $state('default')
let selectedSourceId = $state('housing')

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

export { sources, adaptations, personas, sourceMap, adaptationMap }
