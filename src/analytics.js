import {analytics} from './firebase'
import {logEvent} from 'firebase/analytics'
import {levels} from "./util";


/**
 * Records an event to google analytics.
 */
const recordEvent = (action, {category, label, ...params}) => {
  logEvent(analytics, action, {
    event_category: category,
    event_label: label,
    ...params
  })
}


const convertSelectionIdsToNames = (regionData, selection) => {
  const val = {}

  for (const level of levels) {
    const selectedId = selection[level]
    if (selectedId !== '') {
      const regionDataLevelIndex = regionData[level].map(region => region.id).indexOf(selectedId)

      if (regionDataLevelIndex !== -1) {
        val[level] = regionData[level][regionDataLevelIndex].name
        continue
      }
    }
    val[level] = ""
  }

  return val
}

export const recordRegionSelected = (regionData, selection) => {
  const selectionNames = convertSelectionIdsToNames(regionData, selection)
  const serialisedSelection = levels
      .map(level => selectionNames[level])
      .filter(name => name !== '')
      .join('_')
      .replace(/\s/g, '')

  console.log(`Recording region selection:`, serialisedSelection, selectionNames)

  recordEvent("region_selection", {label: serialisedSelection, category: "region_selection", ...selectionNames})
}