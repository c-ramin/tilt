import React, { PureComponent } from "react"
import AnsiLine from "./AnsiLine"
import "./ErrorPane.scss"
import { zeroTime } from "./time"
import { Build } from "./types"

class ErrorResource {
  public name: string
  public buildHistory: Array<Build>
  public resourceInfo: ResourceInfo

  constructor(resource: any) {
    this.name = resource.Name
    this.buildHistory = resource.BuildHistory
    if (resource.ResourceInfo) {
      this.resourceInfo = {
        podCreationTime: resource.ResourceInfo.PodCreationTime,
        podStatus: resource.ResourceInfo.PodStatus,
        podRestarts: resource.ResourceInfo.PodRestarts,
        podLog: resource.ResourceInfo.PodLog,
      }
    } else {
      this.resourceInfo = {
        podCreationTime: zeroTime,
        podStatus: "",
        podRestarts: 0,
        podLog: "",
      }
    }
  }
}

type ResourceInfo = {
  podCreationTime: string
  podStatus: string
  podRestarts: number
  podLog: string
}

type ErrorsProps = {
  resources: Array<ErrorResource>
}

class ErrorPane extends PureComponent<ErrorsProps> {
  render() {
    let el: JSX.Element = <p>No errors</p>
    let errorElements: Array<JSX.Element> = []
    this.props.resources.forEach(r => {
      if (
        r.resourceInfo.podStatus === "Error" ||
        r.resourceInfo.podStatus === "CrashLoopBackOff"
      ) {
        errorElements.push(
          <li key={"resourceInfoError" + r.name}>{r.resourceInfo.podLog}</li>
        )
      }
      r.buildHistory.forEach((b, i) => {
        if (b.Error !== null) {
          errorElements.push(
            <li key={r.name + i}>
              {b.Log.split("\n").map((l, j) => (
                <AnsiLine key={"logLine" + j} line={l} />
              ))}
            </li>
          )
        }
      })
    })

    if (errorElements.length > 0) {
      el = <ul>{errorElements}</ul>
    }

    return <section className="ErrorPane">{el}</section>
  }
}

export default ErrorPane
export { ErrorResource }
