import {levels} from "./util";
import Plausible from "plausible-tracker";

// Initialise analytics
export const plausible = Plausible({
  domain: 'localelections.nz',
  trackLocalhost: true
})


/**
 * Records an event to google analytics.
 */
const recordEvent = (type, {...params}) => {
  plausible.trackEvent(type, {
    props: params
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
  const fullName = levels
      .map(level => selectionNames[level])
      .filter(name => name !== '')
      .join("->")

  console.log(`Recording region selection:`, fullName, selectionNames)

  recordEvent("region_selection", {fullName: fullName, ...selectionNames})
}