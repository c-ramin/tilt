import React, { PureComponent } from "react"
import { TriggerMode } from "./types"
import "./SidebarTriggerButton.scss"

type SidebarTriggerButtonProps = {
  resourceName: string
  isReady: boolean
  triggerMode: TriggerMode
  isSelected: boolean
  isDirty: boolean
}

const triggerUpdate = (name: string): void => {
  let url = `//${window.location.host}/api/trigger`

  fetch(url, {
    method: "post",
    body: JSON.stringify({ manifest_names: [name] }),
  }).then(response => {
    if (!response.ok) {
      console.log(response)
    }
  })
}

export default class SidebarTriggerButton extends PureComponent<
  SidebarTriggerButtonProps
> {
  render() {
    let props = this.props
    return (
      <button
        onClick={() => triggerUpdate(props.resourceName)}
        className={`SidebarTriggerButton ${props.isSelected ? "isSelected" : ""}
          ${props.isReady ? "isReady" : "isReady"}
          ${props.isDirty ? "isDirty" : ""}
        }`}
      />
    )
  }
}
