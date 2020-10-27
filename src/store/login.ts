import { makeAutoObservable } from 'mobx'

export class LoginStore {
  visible = false
  constructor() {
    makeAutoObservable(this)
  }
  setVsible(param: boolean) {
    this.visible = param
  }
}

export const ls = new LoginStore()
